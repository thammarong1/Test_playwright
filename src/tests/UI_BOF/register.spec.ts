import { test,expect } from "@playwright/test";
import { Login } from '../../pageObject/login/UI_BOF/register'; // นำเข้า class Login

test.describe('Login Page', () => {

    test ('Navigate to Login Page', async ({page})=>{
        const login = new Login(page);  // สร้าง instance ของ Login class
        await login.navigateToLoginPage(); 
        await login.verifyThatHomePage();
        await login.clickLinkSignupAndLogin();
        await login.verifyTextNewUserSignUp();
        await login.inputName();
        await login.inputEmailAdress();
        await login.clickSignUpButton();
        await login.verifyTextEnterAccountInformation();
        await login.selectTitleName();
        await login.inputName_AccountInformation();
        await login.inputPassword_AccountInformation();
    });
});




