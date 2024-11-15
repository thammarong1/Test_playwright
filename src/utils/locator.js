"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ACCOUNT_SEARCH_LOCATOR = exports.HOME_LOCATOR = exports.LOGIN_LOCATORS = void 0;
exports.LOGIN_LOCATORS = {
    fldUsername: 'Username', // username
    fldPassword: 'Password', // password
    btnLogin: { role: 'button', name: 'LOGIN' } // button login
};
exports.HOME_LOCATOR = {
    lnkAccount: { role: 'link', name: 'Account' }, //getByRole('link', { name: 'Account' })      Menu Account
    lnkSearch: { role: 'link', name: 'Search' } //getByRole('link', { name: 'Search' })         Search Account
};
exports.ACCOUNT_SEARCH_LOCATOR = {
    drpSearchType: '#ddUseAdvanceSearch', //locator('#ddUseAdvanceSearch') , value="quicksearch","cardsearch","accsearch"          searchType
    fldPhoneNumber: 'Phone Number', //getByPlaceholder('Phone Number')      เบอร์โทร
    fldFirstName: 'First name', //getByPlaceholder('First name')        firstname
    fldLastName: 'Last name', //getByPlaceholder('Last name')         lastname
    fldCardNumber: 'Card Number', //getByPlaceholder('Card Number')       card no
    fldLoginName: 'Login name', //getByPlaceholder('Login name')        login  name
    btnSearch: { role: 'button', name: 'Search' } //button#btSearch                        button search
};
