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

test("Footer working", async ({ page }) => {
  await basicInit(page);
  await expect(
    page.getByText("The web's best pizza", { exact: true })
  ).toBeVisible();
  await page
    .getByRole("contentinfo")
    .getByRole("link", { name: "Franchise" })
    .click();
  await expect(page.getByText("So you want a piece of the")).toBeVisible();
  await expect(
    page.getByRole("heading", { name: "Unleash Your Potential" })
  ).toBeVisible();
  await page.getByRole("link", { name: "About" }).click();
  await expect(page.getByText("The secret sauce")).toBeVisible();
  await expect(
    page.getByRole("heading", { name: "Our employees" })
  ).toBeVisible();
  await page.getByRole("link", { name: "History" }).click();
  await expect(page.getByText("Mama Rucci, my my")).toBeVisible();
  await expect(page.getByRole("main").getByRole("img")).toBeVisible();
});
