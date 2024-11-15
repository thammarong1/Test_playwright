import { test, expect, Page } from '@playwright/test';

export class HelperBase{
    readonly page: Page

    constructor(page: Page){
        this.page = page
    }
    // ฟังก์ชัน waitForSeconds สำหรับการรอเวลา
    async waitForSeconds(seconds: number) {
        await this.page.waitForTimeout(seconds * 1000);
    }
}