import { test, expect } from "@playwright/test";
import { AccountSearchPage } from "../pageObject/account/accountSearchPage";
import { LoginPage } from "../pageObject/login/loginPage";
import { HelperBase } from "../pageObject/helperBase";
import accountSearchData from '../data/login/accountSearch.json';
import { AccountSearchDataType } from '../type/accountSearch';
import dotenv from 'dotenv';

dotenv.config({ path: `.env.${process.env.ENV || 'sit'}` });

test.describe('Feature: Account Search', () => {
    let accountSearch: AccountSearchPage;
    let loginPage: LoginPage;
    let helperBase: HelperBase;
    let currentExpectedResult: string;

    const dataAccountSearch: AccountSearchDataType[] = accountSearchData;

    test.beforeEach(async ({ page }) => {
        console.log(`Running in environment: ${process.env.ENV || 'sit'}`);
        loginPage = new LoginPage(page);
        accountSearch = new AccountSearchPage(page);
        helperBase = new HelperBase(page);

        await loginPage.loginBase();
    });

    test.describe('Validate account search cases', () => {
        dataAccountSearch.forEach((record, index) => {
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

    test.afterEach(async () => {
        console.log(`Expected Result: ${currentExpectedResult}`);
    });
});
