import { test, expect } from "@playwright/test";
import { AccountSearchPage } from "../pageObject/account/accountSearch/accountSearchPage";
import { LoginPage } from "../pageObject/login/loginPage";
import { HelperBase } from "../pageObject/helperBase";
import { AccountSearchRecord } from '../pageObject/account/accountSearch/interfaceAccountSearch';
import dotenv from 'dotenv';
import path from 'path'; 

dotenv.config({ path: `.env.${process.env.ENV || 'sit'}` });
// โหลดข้อมูลจาก JSON
const environment = process.env.ENV || 'sit';
const dataPath = path.join(__dirname,`../data/accountSearch/accountSearch.${environment}.json`);
const accountSearchData: AccountSearchRecord[] = require(dataPath);


test.describe('Feature: Account Search', () => {
    let accountSearch: AccountSearchPage;
    let loginPage: LoginPage;
    let helperBase: HelperBase;
    let currentExpectedResult: string;

    test.beforeAll(async () => {
        console.log("\nExecuting test suite...");
        console.log(`Running in environment: ${process.env.ENV || 'sit'}`);
        console.log("Base URL:", process.env.BASE_URL);
    });
    // ก่อนทำการทดสอบทุกครั้ง
    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        accountSearch = new AccountSearchPage(page);
        helperBase = new HelperBase(page);

        await loginPage.loginBase();
    });
    test.afterEach(async () => {
        console.log(`Expected Result: ${currentExpectedResult}\n`);
    });
    test.afterAll(async () => {
        console.log('Finished running all tests...\n')
    });

    test.describe('Validate account search cases', () => {
        accountSearchData.forEach((record, index) => {
            test(`Test ${index + 1}: Card Number ${record.expectedCardNumber}`, async ({ page }) => {
                console.log(`Running test case [${index + 1}]:`, {
                    phoneNumber: record.phoneNumber,
                    firstName: record.firstName,
                    lastName: record.lastName,
                    cardNo: record.cardNo,
                    loginName: record.loginName
                });

                currentExpectedResult = record.expectedCardNumber;

                await accountSearch.clickOnAccount();
                await helperBase.waitForSeconds(1);
                await accountSearch.clickOnSearch();
                await helperBase.waitForSeconds(1);
                await accountSearch.selectSearchTypeQuickSearch();
                await accountSearch.typePhoneNumber(record.phoneNumber);
                await accountSearch.typeFirstName(record.firstName);
                await accountSearch.typeLastName(record.lastName);
                await accountSearch.typeCardNumber(record.cardNo);
                await accountSearch.typeLoginName(record.loginName);
                await accountSearch.pressSearchButton();
                await helperBase.waitForSeconds(1);
                await accountSearch.verifySearchResult(currentExpectedResult);
            });
        });
    });
});
