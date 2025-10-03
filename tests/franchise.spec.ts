import { Page } from "@playwright/test";
import { test, expect } from "playwright-test-coverage";
import { Franchise, Role, Store, User } from "../src/service/pizzaService";

test("Home page loads", async ({ page }) => {
  await page.goto("http://localhost:5173/");

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle("JWT Pizza");
});

async function basicInit(page: Page) {
  let loggedInUser: User | undefined;
  const validUsers: Record<string, User> = {
    "f@jwt.com": {
      id: "3",
      name: "pizza franchisee",
      email: "f@jwt.com",
      password: "franchisee",
      roles: [{ role: Role.Diner }, { objectId: "1", role: Role.Franchisee }],
    },
  };

  const franchises: Franchise[] = [
    {
      id: "1",
      name: "pizzPocket",
      admins: [
        {
          id: "3",
          name: "pizza franchisee",
          email: "f@jwt.com",
        },
      ],
      stores: [
        {
          id: "1",
          name: "SLC",
          totalRevenue: 0,
        },
      ],
    },
  ];

  await page.route("*/**/api/auth", async (route) => {
    const loginReq = route.request().postDataJSON();
    const user = validUsers[loginReq.email];
    if (!user || user.password !== loginReq.password) {
      await route.fulfill({ status: 401, json: { error: "Unauthorized" } });
      return;
    }
    loggedInUser = validUsers[loginReq.email];
    const loginRes = {
      user: loggedInUser,
      token: "abcdef",
    };
    expect(route.request().method()).toBe("PUT");
    await route.fulfill({ json: loginRes });
  });

  await page.route("*/**/api/franchise/3", async (route) => {
    expect(route.request().method()).toBe("GET");
    // Return an array, as the API docs specify
    await route.fulfill({ json: franchises });
  });

  await page.route("*/**/api/franchise/1/store", async (route) => {
    if (route.request().method() === "POST") {
      const storeReq = route.request().postDataJSON();
      const storeRes = {
        id: "6",
        franchiseId: "1",
        name: storeReq.name,
      };
      const toPush = {
        id: "6",
        name: storeReq.name,
        totalRevenue: 0,
      };
      franchises[0]["stores"].push(toPush);
      await route.fulfill({ json: storeRes });
    } else {
      await route.fulfill({ json: franchises });
    }
  });

  await page.route("*/**/api/franchise/1/store/6", async (route) => {
    expect(route.request().method()).toBe("DELETE");
  });

  await page.goto("/");
}

test("Create and delete store", async ({ page }) => {
  await basicInit(page);
  await page.getByRole("link", { name: "Login" }).click();
  await page.getByRole("textbox", { name: "Email address" }).fill("f@jwt.com");
  await page.getByRole("textbox", { name: "Password" }).fill("franchisee");
  await page.getByRole("button", { name: "Login" }).click();
  await page.waitForTimeout(1000);
  await page
    .getByLabel("Global")
    .getByRole("link", { name: "Franchise" })
    .click();
  await expect(page.getByText("Everything you need to run an")).toBeVisible();
  await page.getByRole("button", { name: "Create store" }).click();
  await page.getByRole("textbox", { name: "store name" }).fill("test");
  await page.getByRole("button", { name: "Create" }).click();
  await expect(page.getByRole("cell", { name: "test" })).toBeVisible();
  await page
    .getByRole("row", { name: "test 0 ₿ Close" })
    .getByRole("button")
    .click();
  await expect(page.getByText("Sorry to see you go")).toBeVisible();
  await page.getByRole("button", { name: "Close" }).click();
});
