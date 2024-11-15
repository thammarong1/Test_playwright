"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const test_1 = require("@playwright/test");
const accountSearchPage_1 = require("../pageObject/account/accountSearchPage");
const loginPage_1 = require("../pageObject/login/loginPage");
const accountSearch_json_1 = require("../data/login/accountSearch.json");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config({ path: `.env.${process.env.ENV || 'sit'}` });
test_1.test.describe('Search Account Type Quick Search', () => {
    let accountSearch;
    let loginPage;
    let helperBase;
    let currentExpectedResult; // ประกาศตัวแปรสำหรับผลลัพธ์ที่คาดหวัง
    const dataAccountSearch = accountSearch_json_1.AccountSearchData;
    test_1.test.beforeEach(async ({ page }) => {
        console.log(`Running in environment: ${process.env.ENV || 'sit'}`);
        // สร้าง instance ของ LoginPage และ AccountSearchPage
        loginPage = new loginPage_1.LoginPage(page);
        accountSearch = new accountSearchPage_1.AccountSearchPage(page);
        // login ก่อนทดสอบทุกคร้ง
        await loginPage.loginBase();
        //await page.goto(process.env.BASE_URL || '');
    });
    // const accountData = [
    //     { phoneNumber: '0619462551', firstName: '', lastName: '', cardNo: '', loginName: '', expectedCardNumber: '1004870000000364' },
    //     { phoneNumber: '0619462551', firstName: 'NO', lastName: '', cardNo: '', loginName: '', expectedCardNumber: 'No data.' },
    //     { phoneNumber: '', firstName: 'มกราคม', lastName: '', cardNo: '', loginName: '', expectedCardNumber: '1004870000000364' },
    //     { phoneNumber: '', firstName: '', lastName: 'กุมภาพันธ์', cardNo: '', loginName: '', expectedCardNumber: '1004870000000364' },
    //     { phoneNumber: '', firstName: '', lastName: '', cardNo: '1004870000000364', loginName: '', expectedCardNumber: '1004870000000364' }
    // ];
    dataAccountSearch.forEach((data, index) => {
        (0, test_1.test)(`Validate account search [Test ${index + 1}] with card number ${data.expectedCardNumber}`, async () => {
            // แสดง log ชื่อเคสทดสอบและข้อมูลที่ใช้ในการทดสอบ
            console.log(`Running test case [${index + 1}]:`, {
                phoneNumber: data.phoneNumber,
                firstName: data.firstName,
                lastName: data.lastName,
                cardNo: data.cardNo,
                loginName: data.loginName
            });
            currentExpectedResult = data.expectedCardNumber;
            await accountSearch.clickOnAccount();
            await helperBase.waitForSeconds(1);
            await accountSearch.clickOnSearch();
            await helperBase.waitForSeconds(1);
            await accountSearch.selectSearchTypeQuickSearch();
            await accountSearch.typePhoneNumber(data.phoneNumber);
            await accountSearch.typeFirstName(data.firstName);
            await accountSearch.typeLastName(data.lastName);
            await accountSearch.typeCardNumber(data.cardNo);
            await accountSearch.typeLoginName(data.loginName);
            await accountSearch.pressSearchButton();
            await helperBase.waitForSeconds(1);
            await accountSearch.verifySearchResult(currentExpectedResult);
        });
    });
    test_1.test.afterEach(async () => {
        console.log(`Expected Result: ${currentExpectedResult}`);
    });
});
