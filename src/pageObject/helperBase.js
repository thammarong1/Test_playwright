"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HelperBase = void 0;
class HelperBase {
    page;
    constructor(page) {
        this.page = page;
    }
    // ฟังก์ชัน waitForSeconds สำหรับการรอเวลา
    async waitForSeconds(seconds) {
        await this.page.waitForTimeout(seconds * 1000);
    }
}
exports.HelperBase = HelperBase;
