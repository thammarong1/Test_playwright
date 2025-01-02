import { Page, expect } from "@playwright/test";
import { faker } from '@faker-js/faker';
import * as locator from '../../../utils/locator';
import dotenv from "dotenv";

dotenv.config({ path: `.env.${process.env.ENV || 'sit'}` }); // โหลด environment เริ่มต้น env.sit

//  interface locatorName {
//     role: 'button' | 'link' | 'textbox' | 'alert' | 'combobox';
//     name: string;
//  }

const random_FristName = faker.person.firstName();
const random_EmailAddress = faker.internet.email();
const random_FullName = faker.person.fullName();

export class Login {
    constructor(private page : Page) {}

    async navigateToLoginPage () {
        const pathURL = process.env.BASE_URL || 'sit';
        const url = pathURL;
        await this.page.goto(url);
        //await this.page.waitForTimeout(60000); // รอ 60 วินาที
    }

    async verifyThatHomePage() {
        const linkMenuHomeLocator = locator.HomePage_LOCATOR.linkMenuHome;
        await expect(
            this.page.getByRole(linkMenuHomeLocator.role, { name: linkMenuHomeLocator.name })
        ).toBeVisible();
              //await this.page.waitForTimeout(60000); // รอ 60 วินาที
    }
    async clickLinkSignupAndLogin(){
        const linkMenuSignUpAndLoginLocator = locator.HomePage_LOCATOR.linkMenuSigupLogin;
        await this.page.getByRole(linkMenuSignUpAndLoginLocator.role, {name: linkMenuSignUpAndLoginLocator.name }).click();

        //await this.page.waitForTimeout(60000); // รอ 60 วินาที
    }
    async verifyTextNewUserSignUp(){
        const txtNewUserSignUp  = locator.LoginSignUp_LOCATOR.txtUserSigUp;
        await expect(this.page.getByRole(txtNewUserSignUp.role, {name: txtNewUserSignUp.name})).toBeVisible();
        //await this.page.waitForTimeout(20000); // รอ 60 วินาที
    }
    async inputName(){
        //getByPlaceholder('Name')
        await this.page.getByPlaceholder(locator.LoginSignUp_LOCATOR.fldinputName).fill(random_FristName);
        //await this.page.waitForTimeout(60000); // รอ 60 วินาที
    }
    async inputEmailAdress(){
        const { form, text, placeholder } = locator.LoginSignUp_LOCATOR.formSignupEmail;
        await this.page.locator(`${form}:has-text('${text}') input[placeholder="${placeholder}"]`).fill(random_EmailAddress);

    }
    async clickSignUpButton(){
        const {role, name} = locator.LoginSignUp_LOCATOR.btnSignUp;
        await this.page.getByRole(role,{name}).click({force: true})
        //await this.page.waitForTimeout(60000); // รอ 60 วินาที
    }
    async verifyTextEnterAccountInformation(){
         const displayTextAccountInformation = locator.InformationPage_LOCATOR.txtAccountInformation;
        // const accountInfoLocator = this.page.getByText(textAccountInformation); // สร้าง Locator สำหรับข้อความนี้
        // await expect(accountInfoLocator).toBeVisible(); // ตรวจสอบว่า Locator นี้ปรากฏ
        await expect(this.page.locator(displayTextAccountInformation)).toBeVisible();
        //await this.page.waitForTimeout(60000); // รอ 60 วินาที

    }
    async selectTitleName(){
        await this.page.getByLabel(locator.InformationPage_LOCATOR.selectTitleName).check();
        //await this.page.waitForTimeout(60000); // รอ 60 วินาที
    }
    async inputName_AccountInformation(){
        await this.page.locator(locator.InformationPage_LOCATOR.fldName).fill(random_FullName);
        //await this.page.waitForTimeout(60000); // รอ 60 วินาที
    }
    async inputPassword_AccountInformation(){
        await this.page.locator(locator.InformationPage_LOCATOR.fldPassword).fill('123456');
        //await this.page.waitForTimeout(60000); // รอ 60 วินาที
    }
}



