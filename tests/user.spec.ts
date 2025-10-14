import { Page } from "@playwright/test";
import { test, expect } from "playwright-test-coverage";
import { User, Role } from "../src/service/pizzaService";

async function basicInit(page: Page) {
  let loggedInUser: User | undefined;
  const validUsers: Record<string, User> = {
    "d@jwt.com": {
      id: "3",
      name: "pizza diner",
      email: "d@jwt.com",
      password: "diner",
      roles: [{ role: Role.Diner }],
    },
  };
  const validUsers2: Record<string, User> = {
    "d@jwt.com": {
      id: "3",
      name: "pizza dinerx",
      email: "d@jwt.com",
      password: "diner",
      roles: [{ role: Role.Diner }],
    },
  };

  await page.route("*/**/api/auth", async (route) => {
    const method = route.request().method();

    if (method === "PUT") {
      const loginReq = route.request().postDataJSON();
      const user = validUsers[loginReq.email];
      if (!user || user.password !== loginReq.password) {
        await route.fulfill({ status: 401, json: { error: "Unauthorized" } });
        return;
      }
      loggedInUser = validUsers2[loginReq.email];
      const loginRes = {
        user: loggedInUser,
        token: "abcdef",
      };
      await route.fulfill({ json: loginRes });
    } else if (method === "POST") {
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
      await route.fulfill({ json: loginRes });
    } else if (method === "DELETE") {
      await route.fulfill({ json: { message: "logout successful" } });
    } else {
      await route.fulfill({
        status: 405,
        json: { error: "Method Not Allowed" },
      });
    }
  });

  await page.route("*/**/api/order", async (route) => {
    const method = route.request().method();

    if (method === "GET") {
      const orderRes = {
        order: {
          dinerId: 18,
          orders: [],
          page: 1,
        },
      };
      await route.fulfill({ json: orderRes });
    } else {
      await route.fulfill({
        status: 405,
        json: { error: "Method Not Allowed" },
      });
    }
  });

  await page.route("*/**/api/user/3", async (route) => {
    const method = route.request().method();

    if (method === "PUT") {
      const orderReq = route.request().postDataJSON();
      orderReq.name = "pizza diner";
      const orderRes = {
        user: orderReq,
        token: "abcdef",
      };
      await route.fulfill({ json: orderRes });
    } else {
      await route.fulfill({
        status: 405,
        json: { error: "Method Not Allowed" },
      });
    }
  });

  await page.goto("/");
}

test("updateUser", async ({ page }) => {
  basicInit(page);
  //await page.goto("/");
  await page.getByRole("link", { name: "Register" }).click();
  await page.getByRole("textbox", { name: "Full name" }).fill("pizza diner");
  await page.getByRole("textbox", { name: "Email address" }).fill("d@jwt.com");
  await page.getByRole("textbox", { name: "Password" }).fill("diner");
  await page.getByRole("button", { name: "Register" }).click();

  await page.getByRole("link", { name: "pd" }).click();

  await expect(page.getByRole("main")).toContainText("pizza diner");

  await page.getByRole("button", { name: "Edit" }).click();
  await expect(page.locator("h3")).toContainText("Edit user");
  await page.getByRole("textbox").first().fill("pizza dinerx");
  await page.getByRole("button", { name: "Update" }).click();
  await page.waitForSelector('[role="dialog"].hidden', { state: "attached" });

  await expect(page.getByRole("main")).toContainText("pizza dinerx");

  await page.getByRole("link", { name: "Logout" }).click();
  await page.getByRole("link", { name: "Login" }).click();

  await page.getByRole("textbox", { name: "Email address" }).fill("d@jwt.com");
  await page.getByRole("textbox", { name: "Password" }).fill("diner");
  await page.getByRole("button", { name: "Login" }).click();

  await page.getByRole("link", { name: "pd" }).click();

  await expect(page.getByRole("main")).toContainText("pizza dinerx");
});

async function basicInit2(page: Page) {
  let loggedInUser: User | undefined;
  const validUsers3: Record<string, User> = {
    "a@jwt.com": {
      id: "3",
      name: "常用名字",
      email: "a@jwt.com",
      password: "admin",
      roles: [{ role: Role.Admin }],
    },
  };

  await page.route("*/**/api/auth", async (route) => {
    const method = route.request().method();

    if (method === "PUT") {
      const loginReq = route.request().postDataJSON();
      const user = validUsers3[loginReq.email];
      if (!user || user.password !== loginReq.password) {
        await route.fulfill({ status: 401, json: { error: "Unauthorized" } });
        return;
      }
      loggedInUser = validUsers3[loginReq.email];
      const loginRes = {
        user: loggedInUser,
        token: "abcdef",
      };
      await route.fulfill({ json: loginRes });
    }
  });

  await page.route(
    "*/**/api/franchise?page=0&limit=3&name=*",
    async (route) => {
      const method = route.request().method();
      if (method == "GET") {
        await route.fulfill({ json: { franchises: [], more: false } });
      }
    }
  );

  await page.route("*/**/api/user?page=0&limit=3&name=*", async (route) => {
    const method = route.request().method();
    if (method == "GET") {
      await route.fulfill({
        json: {
          users: [
            {
              id: 1,
              name: "pizza diner",
              email: "d@jwt.com",
              roles: [
                {
                  role: "diner",
                  objectId: 0,
                },
              ],
            },
          ],
          more: false,
        },
      });
    }
  });

  await page.goto("/");
}

test("getUsers", async ({ page }) => {
  basicInit2(page);
  await page.getByRole("link", { name: "Login" }).click();
  await page.getByRole("textbox", { name: "Email address" }).fill("a@jwt.com");
  await page.getByRole("textbox", { name: "Password" }).fill("admin");
  await page.getByRole("button", { name: "Login" }).click();
  await page.getByRole("link", { name: "Admin" }).click();
  await page.getByRole("button", { name: "View Users" }).click();
  await page
    .getByRole("row", { name: "pizza diner d@jwt.com diner" })
    .getByRole("button")
    .click({
      button: "right",
    });
  await expect(
    page
      .getByRole("row", { name: "pizza diner d@jwt.com diner" })
      .getByRole("button")
  ).toBeVisible();
  page.once("dialog", (dialog) => {
    console.log(`Dialog message: ${dialog.message()}`);
    dialog.dismiss().catch(() => {});
  });
  await page
    .getByRole("row", { name: "pizza diner d@jwt.com diner" })
    .getByRole("button")
    .click();
  await page.getByRole("button", { name: "Back to Franchises" }).click();
});
