import { Page } from "@playwright/test";
import { test, expect } from "playwright-test-coverage";
import { Role, User } from "../src/service/pizzaService";

test("Home page loads", async ({ page }) => {
  await page.goto("http://localhost:5173/");

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle("JWT Pizza");
});

async function basicInit(page: Page) {
  await page.goto("/");
}

test("Admin login", async () => {});
