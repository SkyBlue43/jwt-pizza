import { Page } from "@playwright/test";
import { test, expect } from "playwright-test-coverage";
import { Role, User } from "../src/service/pizzaService";

test("Home page loads", async ({ page }) => {
  await page.goto("http://localhost:5173/");

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle("JWT Pizza");
});

async function basicInit(page: Page) {
  let registeredUser: User | undefined;
  const validUsers: Record<string, User> = {
    "d@jwt.com": {
      id: "3",
      name: "Kai Chen",
      email: "d@jwt.com",
      password: "a",
      roles: [{ role: Role.Diner }],
    },
  };

  await page.route("*/**/api/auth", async (route) => {
    const method = route.request().method();

    if (method === "POST") {
      // Registration
      const registerReq = route.request().postDataJSON();
      const { email, password, name } = registerReq;

      if (validUsers[email]) {
        await route.fulfill({
          status: 400,
          json: { error: "User already exists" },
        });
        return;
      }

      const newUser: User = {
        id: String(Object.keys(validUsers).length + 1),
        name,
        email,
        password,
        roles: [{ role: Role.Diner }],
      };

      validUsers[email] = newUser;
      registeredUser = newUser;

      const registerRes = {
        user: newUser,
        token: "abcdef",
      };

      await route.fulfill({ status: 200, json: registerRes });
      return;
    }

    if (method === "DELETE") {
      // Logout
      if (registeredUser) {
        registeredUser = undefined;
        await route.fulfill({
          status: 200,
          json: { message: "logout successful" },
        });
      } else {
        await route.fulfill({ status: 400 });
      }
      return;
    }

    await route.fulfill({ status: 405, json: { error: "Method not allowed" } });
  });

  await page.goto("/");
}

test("register and logout", async ({ page }) => {
  await basicInit(page);
  await page.getByRole("link", { name: "Register" }).click();
  await expect(page.getByText("Welcome to the party")).toBeVisible();
  await page.getByRole("textbox", { name: "Full name" }).fill("s");
  await page.getByRole("textbox", { name: "Email address" }).fill("s@jwt.com");
  await page.getByRole("textbox", { name: "Password" }).fill("s");

  await page.getByRole("button", { name: "Register" }).click();
  await page.getByRole("link", { name: "Logout" }).click();
  await expect(
    page.getByText("The web's best pizza", { exact: true })
  ).toBeVisible();
  await expect(
    page.getByRole("link", { name: "Login", exact: true })
  ).toBeVisible();
});
