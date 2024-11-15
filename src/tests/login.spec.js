"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const test_1 = require("@playwright/test");
const loginPage_1 = require("../pageObject/login/loginPage");
const login_json_1 = require("../data/login/login.json");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config({ path: `.env.${process.env.ENV || 'sit'}` }); // โหลด environment เริ่มต้น env.sit
test_1.test.describe('Login Page Tests', () => {
    let loginPage;
    let username;
    let password;
    test_1.test.beforeAll(() => {
        username = process.env.USERNAME || "";
        password = process.env.PASSWORD || "";
        console.log("Loaded USERNAME:", username);
        console.log("Loaded PASSWORD:", password);
        if (!username || !password) {
            throw new Error("USERNAME or PASSWORD is not defined in environment variables");
        }
    });
    test_1.test.beforeEach(async ({ page }) => {
        loginPage = new loginPage_1.LoginPage(page);
        await loginPage.navigateToLoginPage();
    });
    (0, test_1.test)('I Validate valid login', async () => {
        await loginPage.typeUsername(username);
        await loginPage.typePassword(password);
        await loginPage.pressLoginButton();
        await loginPage.verifyHomepageDisplayed();
    });
    (0, test_1.test)('I Validate Invalid login', async () => {
        await loginPage.typeUsername(login_json_1.loginData.valid.username);
        await loginPage.typePassword(login_json_1.loginData.invalid.password);
        await loginPage.pressLoginButton();
        await loginPage.verifyTextDisplayed(login_json_1.loginData.invalid.expectedErrorMessage);
    });
});
