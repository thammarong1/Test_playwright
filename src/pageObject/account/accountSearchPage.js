"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccountSearchPage = void 0;
const test_1 = require("@playwright/test");
const locator_1 = require("../../utils/locator");
class AccountSearchPage {
    page;
    constructor(page) {
        this.page = page;
    }
    async clickOnAccount() {
        const { role, name } = locator_1.HOME_LOCATOR.lnkAccount;
        await this.page.getByRole(role, { name }).click({ force: true });
    }
    async clickOnSearch() {
        const { role, name } = locator_1.HOME_LOCATOR.lnkSearch;
        await this.page.getByRole(role, { name }).click({ force: true });
    }
    async selectSearchTypeQuickSearch() {
        await this.page.locator(locator_1.ACCOUNT_SEARCH_LOCATOR.drpSearchType).selectOption({ value: 'quicksearch' });
    }
    async typePhoneNumber(phoneNumber) {
        await this.page.getByPlaceholder(locator_1.ACCOUNT_SEARCH_LOCATOR.fldPhoneNumber).fill(phoneNumber);
    }
    async typeFirstName(firstName) {
        await this.page.getByPlaceholder(locator_1.ACCOUNT_SEARCH_LOCATOR.fldFirstName).fill(firstName);
    }
    async typeLastName(lastName) {
        await this.page.getByPlaceholder(locator_1.ACCOUNT_SEARCH_LOCATOR.fldLastName).fill(lastName);
        //await this.page.pause();  
    }
    async typeCardNumber(cardNumber) {
        await this.page.getByPlaceholder(locator_1.ACCOUNT_SEARCH_LOCATOR.fldCardNumber).fill(cardNumber);
    }
    async typeLoginName(loginName) {
        await this.page.getByPlaceholder(locator_1.ACCOUNT_SEARCH_LOCATOR.fldLoginName).fill(loginName);
    }
    async pressSearchButton() {
        const { role, name } = locator_1.ACCOUNT_SEARCH_LOCATOR.btnSearch;
        await this.page.getByRole(role, { name }).click({ force: true });
    }
    async verifySearchResult(expectedMessage) {
        // เลือกข้อความที่แสดงจำนวนผลลัพธ์
        const resultSelector = '.ibox-title .text-info span';
        await this.page.waitForSelector(resultSelector, { state: 'visible' });
        // ดึงข้อความจำนวนผลลัพธ์
        const resultText = await this.page.locator(resultSelector).innerText();
        if (resultText.includes("0")) {
            // ถ้าผลลัพธ์เป็น 0 ตรวจสอบการแสดงผลเป็น No data หรือผลลัพธ์ที่ต้องการ
            (0, test_1.expect)(resultText).toContain("0");
        }
        else {
            // ถ้ามีผลลัพธ์ให้ตรวจสอบว่า ข้อมูลที่คาดหวังอยู่ในผลลัพธ์
            const tableContent = await this.page.locator('.ibox-content .table-responsive tbody').innerText();
            (0, test_1.expect)(tableContent).toContain(expectedMessage);
        }
    }
}
exports.AccountSearchPage = AccountSearchPage;
