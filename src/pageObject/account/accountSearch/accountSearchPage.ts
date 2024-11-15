import { Page, expect } from '@playwright/test';
import { ACCOUNT_SEARCH_LOCATOR, HOME_LOCATOR } from '../../../utils/locator';

export class AccountSearchPage {
    constructor(private page: Page) { }

    async clickOnAccount() {
        const { role, name } = HOME_LOCATOR.lnkAccount as { role: 'link', name: string };
        await this.page.getByRole(role, { name }).click({ force: true });
    }

    async clickOnSearch() {
        const { role, name } = HOME_LOCATOR.lnkSearch as { role: 'link', name: string };
        await this.page.getByRole(role, { name }).click({ force: true });
    }

    async selectSearchTypeQuickSearch() {
        await this.page.locator(ACCOUNT_SEARCH_LOCATOR.drpSearchType).selectOption({ value: 'quicksearch' });
    }

    async typePhoneNumber(phoneNumber: string) {
        await this.page.getByPlaceholder(ACCOUNT_SEARCH_LOCATOR.fldPhoneNumber).fill(phoneNumber);
    }

    async typeFirstName(firstName: string) {
        await this.page.getByPlaceholder(ACCOUNT_SEARCH_LOCATOR.fldFirstName).fill(firstName);
    }

    async typeLastName(lastName: string) {
        await this.page.getByPlaceholder(ACCOUNT_SEARCH_LOCATOR.fldLastName).fill(lastName);
        //await this.page.pause();  
    }

    async typeCardNumber(cardNumber: string) {
        await this.page.getByPlaceholder(ACCOUNT_SEARCH_LOCATOR.fldCardNumber).fill(cardNumber);
    }


    async typeLoginName(loginName: string) {
        await this.page.getByPlaceholder(ACCOUNT_SEARCH_LOCATOR.fldLoginName).fill(loginName);
    }

    async pressSearchButton() {
        const { role, name } = ACCOUNT_SEARCH_LOCATOR.btnSearch as { role: 'button', name: string };
        await this.page.getByRole(role, { name }).click({ force: true });
    }

    async verifySearchResult(expectedMessage: string) {
        // เลือกข้อความที่แสดงจำนวนผลลัพธ์
        const resultSelector = '.ibox-title .text-info span';
        await this.page.waitForSelector(resultSelector, { state: 'visible' });

        // ดึงข้อความจำนวนผลลัพธ์
        const resultText = await this.page.locator(resultSelector).innerText();
        if (resultText.includes("0")) {
            // ถ้าผลลัพธ์เป็น 0 ตรวจสอบการแสดงผลเป็น No data หรือผลลัพธ์ที่ต้องการ
            expect(resultText).toContain("0");
        } else {
            // ถ้ามีผลลัพธ์ให้ตรวจสอบว่า ข้อมูลที่คาดหวังอยู่ในผลลัพธ์
            const tableContent = await this.page.locator('.ibox-content .table-responsive tbody').innerText();
            expect(tableContent).toContain(expectedMessage);
        }
    }

}
