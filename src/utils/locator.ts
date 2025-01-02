export const Login_LOCATORS = {
  fldUsername: 'Username',                    // username
  fldPassword: 'Password',                    // password
  btnLogin: { role: 'button', name: 'LOGIN' } // button login
};

export const HomePage_LOCATOR = {
  linkMenuHome: { role: 'link', name: 'Home' } as const,       //menu Home   //getByRole('link', { name: 'Home' })     menu Home
  linkMenuSigupLogin: { role: 'link', name: 'Signup / Login' } as const,     //menu SignUp/Login //getByRole('link', { name: 'Signup / Login' })
};

export const LoginSignUp_LOCATOR = {
  txtUserSigUp: { role: 'heading', name: 'New User Signup!' } as const,      // text New User Signup  //getByRole('heading', { name: 'New User Signup!' })
  fldinputName: ('Name'),                                                    //Input Name ///getByPlaceholder('Name')
  formSignupEmail: {                                                         //locator('form').filter({ hasText: 'Signup' }).getByPlaceholder('Email Address')
    form: 'form',
    text: 'Signup',
    placeholder: 'Email Address'
  }, 
  btnSignUp: { role: 'button', name: 'Signup' } as const,                     //getByRole('button', { name: 'Signup' })
};
export const InformationPage_LOCATOR = {
  txtAccountInformation: 'text = Enter Account Information',
  selectTitleName:('Mr.'),                                                //getByLabel('Mr.') 
  fldName:'#name',                                                       
  fldPassword:'#password',                                                   


};
