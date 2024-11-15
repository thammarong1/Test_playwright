import { test, expect } from '@playwright/test';
import { LoginPage } from "../pageObject/login/loginPage";
import { loginData } from "../data/login/login.json";
import dotenv from "dotenv";

dotenv.config({ path: `.env.${process.env.ENV || 'sit'}` });  // โหลด environment เริ่มต้น env.sit

test.describe('Login Page Tests', () => {
  let loginPage: LoginPage;
  let username: string;
  let password: string;

  test.beforeAll(() => {
    username = process.env.USERNAME || "";
    password = process.env.PASSWORD || "";
    console.log("Loaded USERNAME:", username);
    console.log("Loaded PASSWORD:", password);

    if (!username || !password) {
      throw new Error("USERNAME or PASSWORD is not defined in environment variables");
    }
  });

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.navigateToLoginPage();
  });


  test('I Validate valid login', async () => {
    await loginPage.typeUsername(username);
    await loginPage.typePassword(password);
    await loginPage.pressLoginButton();
    await loginPage.verifyHomepageDisplayed();
  });

  test('I Validate Invalid login', async () => {
    await loginPage.typeUsername(loginData.valid.username);
    await loginPage.typePassword(loginData.invalid.password);
    await loginPage.pressLoginButton();
    await loginPage.verifyTextDisplayed(loginData.invalid.expectedErrorMessage);
  });
});



