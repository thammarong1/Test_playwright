"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginPage = void 0;
const test_1 = require("@playwright/test");
const locator_1 = require("../../utils/locator");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config({ path: `.env.${process.env.ENV || 'sit'}` }); // โหลด environment เริ่มต้น env.sit
class LoginPage {
    page;
    constructor(page) {
        this.page = page;
    }
    async navigateToLoginPage() {
        const baseUrl = process.env.BASE_URL || "";
        if (!baseUrl) {
            throw new Error("URL is not defined in environment variables.");
        }
        await this.page.goto(baseUrl);
        await this.page.waitForLoadState('load');
        //await this.page.goto('https://sit-crm.deepblok.io/backoffice/login');
    }
    async typeUsername(username) {
        await this.page.getByPlaceholder(locator_1.LOGIN_LOCATORS.fldUsername).fill(username);
    }
    async typePassword(password) {
        await this.page.getByPlaceholder(locator_1.LOGIN_LOCATORS.fldPassword).fill(password);
    }
    async pressLoginButton() {
        const { role, name } = locator_1.LOGIN_LOCATORS.btnLogin;
        const loginButton = await this.page.getByRole(role, { name });
        await loginButton.hover();
        await loginButton.click({ force: true });
    }
    async verifyHomepageDisplayed() {
        await this.page.waitForSelector('iframe', { state: 'attached', timeout: 10000 });
        const iframe = await this.page.frameLocator('iframe');
        const txtElement = iframe.getByText('Total Member');
        await (0, test_1.expect)(txtElement).toBeVisible({ timeout: 20000 });
    }
    async verifyTextDisplayed(expectedMessage) {
        // รอให้ alert แสดงขึ้น
        await this.page.waitForSelector(".alert-danger", { state: "visible", timeout: 10000 });
        // ดึงข้อความจาก alert
        const errorMessage = await this.page.locator(".alert-danger").innerText();
        // ตรวจสอบว่าข้อความที่พบตรงกับข้อความที่คาดหวัง
        (0, test_1.expect)(errorMessage).toContain(expectedMessage);
    }
    //ฟังก์ชัน login
    async loginBase() {
        await this.navigateToLoginPage();
        const username = process.env.USERNAME || "";
        const password = process.env.PASSWORD || "";
        if (!username || !password) {
            throw new Error("USERNAME or PASSWORD is not defined in environment variables.");
        }
        await this.typeUsername(username);
        await this.typePassword(password);
        await this.pressLoginButton();
        // ตรวจสอบว่าล็อกอินเข้าสู่ homepage สำเร็จ
        await this.verifyHomepageDisplayed();
    }
}
exports.LoginPage = LoginPage;
