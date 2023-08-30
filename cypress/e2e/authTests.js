/// <reference types="Cypress" />
import { onRegisterPage } from "../support/page_object/registerPage";
import { onLoginPage } from "../support/page_object/loginPage";
import { onAccountPage } from "../support/page_object/accountPage";
import { onForgotPassPage } from "../support/page_object/forgotPassPage";
import { onForgotLoginPage } from "../support/page_object/forgotLoginPage";
import { onLogoutPage } from "../support/page_object/logoutPage";
import { navigateTo } from "../support/page_object/navigationPage";

describe("Authorization - login and register tests", () => {
  let globalData;

  beforeEach("open a website", () => {
    //open home page
    cy.openHomePage();
    //assign global data
    cy.fixture("example.json").then(function (data) {
      globalData = data;
    });
  });

  it("Create successfully an new account", () => {
    const registerForm = {
      firstname: "David",
      lastname: "Johnson",
      // email: "davidjohnson1111111112222@example.com",
      tele: "123456789",
      address1: "ul. Testowa 123/1",
      city: "Warszawa",
      country: "Poland",
      postcode: "01-123",
      zone: "Mazowieckie",
      // login: "johytest1234567",
      password: "test123",
      passwordConfirm: "test123",
      newsletter: 1,
      agreePolicy: 1,
    };
    navigateTo.loginOrRegister();
    onLoginPage.verifyLoginPageTitle();
    onLoginPage.getAndClickToRegisterForm();
    onRegisterPage.verifyRegisterPageTitle();
    onRegisterPage.fillRegisterForm(
      registerForm.firstname,
      registerForm.lastname,
      registerForm.email,
      registerForm.tele,
      registerForm.address1,
      registerForm.city,
      registerForm.country,
      registerForm.postcode,
      registerForm.zone,
      registerForm.login,
      registerForm.password,
      registerForm.passwordConfirm,
      registerForm.newsletter,
      registerForm.agreePolicy
    );
    onRegisterPage.clickContinueBtn();
    onRegisterPage.verifySuccessRegisterMessage();
    onRegisterPage.clickContinueBtn();
    onAccountPage.verifyNewAccountInformation();
  });

  it("Failing registration due to invalid username", () => {
    const registerForm = {
      firstname: "David",
      lastname: "Johnson",
      email: "davidjohnson111111111@example.com",
      tele: "123456789",
      address1: "ul. Testowa 123/1",
      city: "Warszawa",
      country: "Poland",
      postcode: "01-123",
      zone: "Mazowieckie",
      login: "joh",
      password: "test123",
      passwordConfirm: "test123",
      newsletter: 1,
      agreePolicy: 1,
    };
    navigateTo.loginOrRegister();
    onLoginPage.verifyLoginPageTitle();
    onLoginPage.getAndClickToRegisterForm();
    onRegisterPage.verifyRegisterPageTitle();
    onRegisterPage.fillRegisterForm(
      registerForm.firstname,
      registerForm.lastname,
      registerForm.email,
      registerForm.tele,
      registerForm.address1,
      registerForm.city,
      registerForm.country,
      registerForm.postcode,
      registerForm.zone,
      registerForm.login,
      registerForm.password,
      registerForm.passwordConfirm,
      registerForm.newsletter,
      registerForm.agreePolicy
    );
    onRegisterPage.clickContinueBtn();
    onRegisterPage.verifyErrorRegisterMessage(
      "Login name must be alphanumeric only and between 5 and 64 characters!"
    );
    onRegisterPage.getErrorInputMsg(
      "Login name must be alphanumeric only and between 5 and 64 characters!"
    );
  });

  it("Failing registration due to invalid password confirmation", () => {
    const registerForm = {
      firstname: "David",
      lastname: "Johnson",
      email: "davidjohnson111111111@example.com",
      tele: "123456789",
      address1: "ul. Testowa 123/1",
      city: "Warszawa",
      country: "Poland",
      postcode: "01-123",
      zone: "Mazowieckie",
      login: "johydavid091",
      password: "test123",
      passwordConfirm: "test12",
      newsletter: 1,
      agreePolicy: 1,
    };
    navigateTo.loginOrRegister();
    onLoginPage.verifyLoginPageTitle();
    onLoginPage.getAndClickToRegisterForm();
    onRegisterPage.verifyRegisterPageTitle();
    onRegisterPage.fillRegisterForm(
      registerForm.firstname,
      registerForm.lastname,
      registerForm.email,
      registerForm.tele,
      registerForm.address1,
      registerForm.city,
      registerForm.country,
      registerForm.postcode,
      registerForm.zone,
      registerForm.login,
      registerForm.password,
      registerForm.passwordConfirm,
      registerForm.newsletter,
      registerForm.agreePolicy
    );
    onRegisterPage.clickContinueBtn();
    onRegisterPage.verifyErrorRegisterMessage(
      "Password confirmation does not match password!"
    );
    onRegisterPage.getErrorInputMsg(
      "Password confirmation does not match password!"
    );
  });

  it("Failing registration due to invalid email", () => {
    const registerForm = {
      firstname: "David",
      lastname: "Johnson",
      email: "davidjohnso12@example.com1",
      tele: "123456789",
      address1: "ul. Testowa 123/1",
      city: "Warszawa",
      country: "Poland",
      postcode: "01-123",
      zone: "Mazowieckie",
      login: "johydavid091",
      password: "test123",
      passwordConfirm: "test123",
      newsletter: 1,
      agreePolicy: 1,
    };
    navigateTo.loginOrRegister();
    onLoginPage.verifyLoginPageTitle();
    onLoginPage.getAndClickToRegisterForm();
    onRegisterPage.verifyRegisterPageTitle();
    onRegisterPage.fillRegisterForm(
      registerForm.firstname,
      registerForm.lastname,
      registerForm.email,
      registerForm.tele,
      registerForm.address1,
      registerForm.city,
      registerForm.country,
      registerForm.postcode,
      registerForm.zone,
      registerForm.login,
      registerForm.password,
      registerForm.passwordConfirm,
      registerForm.newsletter,
      registerForm.agreePolicy
    );
    onRegisterPage.clickContinueBtn();
    onRegisterPage.verifyErrorRegisterMessage(
      "Email Address does not appear to be valid!"
    );
    onRegisterPage.getErrorInputMsg(
      "Email Address does not appear to be valid!"
    );
  });

  it("Failing registration due to not providing all required data - city and zipcode", () => {
    const registerForm = {
      firstname: "David",
      lastname: "Johnson",
      // email: "davidjohnso12@example.com",
      tele: "123456789",
      address1: "ul. Testowa 123/1",
      city: "{backspace}",
      country: "Poland",
      postcode: "{backspace}",
      zone: "Mazowieckie",
      // login: "johydavid091",
      password: "test123",
      passwordConfirm: "test123",
      newsletter: 1,
      agreePolicy: 1,
    };
    navigateTo.loginOrRegister();
    onLoginPage.verifyLoginPageTitle();
    onLoginPage.getAndClickToRegisterForm();
    onRegisterPage.verifyRegisterPageTitle();
    onRegisterPage.fillRegisterForm(
      registerForm.firstname,
      registerForm.lastname,
      registerForm.email,
      registerForm.tele,
      registerForm.address1,
      registerForm.city,
      registerForm.country,
      registerForm.postcode,
      registerForm.zone,
      registerForm.login,
      registerForm.password,
      registerForm.passwordConfirm,
      registerForm.newsletter,
      registerForm.agreePolicy
    );
    onRegisterPage.clickContinueBtn();
    onRegisterPage.verifyErrorRegisterMessage([
      "City must be between 3 and 128 characters!",
      "Zip/postal code must be between 3 and 10 characters!",
    ]);
    onRegisterPage.getErrorInputMsg([
      "City must be between 3 and 128 characters!",
      "Zip/postal code must be between 3 and 10 characters!",
    ]);
  });

  it("Failing registration due to not accepting policy terms", () => {
    const registerForm = {
      firstname: "David",
      lastname: "Johnson",
      email: "davidjohnso12@example.com1",
      tele: "123456789",
      address1: "ul. Testowa 123/1",
      city: "Warszawa",
      country: "Poland",
      postcode: "01-123",
      zone: "Mazowieckie",
      login: "johydavid091",
      password: "test123",
      passwordConfirm: "test123",
      newsletter: 1,
      agreePolicy: 0,
    };
    navigateTo.loginOrRegister();
    onLoginPage.verifyLoginPageTitle();
    onLoginPage.getAndClickToRegisterForm();
    onRegisterPage.verifyRegisterPageTitle();
    onRegisterPage.fillRegisterForm(
      registerForm.firstname,
      registerForm.lastname,
      registerForm.email,
      registerForm.tele,
      registerForm.address1,
      registerForm.city,
      registerForm.country,
      registerForm.postcode,
      registerForm.zone,
      registerForm.login,
      registerForm.password,
      registerForm.passwordConfirm,
      registerForm.newsletter,
      registerForm.agreePolicy
    );
    onRegisterPage.clickContinueBtn();
    onRegisterPage.verifyErrorRegisterMessage(
      "Error: You must agree to the Privacy Policy!"
    );
  });

  it("successful login", () => {
    navigateTo.loginOrRegister();
    onLoginPage.checkLoginFormTitleAndText();
    onLoginPage.loginToAccount(globalData.login, globalData.password);
    onAccountPage.checkUrlAndTitlePage();
    onAccountPage.verifyCustomerNameOnPage(globalData.firstname);
  });

  it("forgot your password", () => {
    navigateTo.loginOrRegister();
    onLoginPage.verifyLoginPageTitle();
    onLoginPage.checkLoginFormTitleAndText();
    onLoginPage.clickForgotPasswordLink();
    onForgotPassPage.verifyUrlAndPageTitle();
    onForgotPassPage.fillForgotPassForm(globalData.login, globalData.email);
    onForgotPassPage.clickContinueBtn();
    onLoginPage.verifyLoginPageTitle();
    onLoginPage.successMessageOfResetingAccData(
      "Success: Password reset link has been sent to your e-mail address."
    );
  });

  it("Fail forgot your password sending due to wrong email", () => {
    const email = "test@example.com";
    navigateTo.loginOrRegister();
    onLoginPage.verifyLoginPageTitle();
    onLoginPage.checkLoginFormTitleAndText();
    onLoginPage.clickForgotPasswordLink();
    onForgotPassPage.verifyUrlAndPageTitle();
    onForgotPassPage.fillForgotPassForm(globalData.login, email);
    onForgotPassPage.clickContinueBtn();
    onForgotPassPage.verifyErrorMessage();
  });

  it("Fail forgot your password sending due to wrong login name", () => {
    const login = "john123";
    navigateTo.loginOrRegister();
    onLoginPage.verifyLoginPageTitle();
    onLoginPage.checkLoginFormTitleAndText();
    onLoginPage.clickForgotPasswordLink();
    onForgotPassPage.verifyUrlAndPageTitle();
    onForgotPassPage.fillForgotPassForm(login, globalData.email);
    onForgotPassPage.clickContinueBtn();
    onForgotPassPage.verifyErrorMessage();
  });

  it("Fail forgot your password sending due to wrong email and then provide correct data", () => {
    const email = "test@example.com";
    navigateTo.loginOrRegister();
    onLoginPage.verifyLoginPageTitle();
    onLoginPage.checkLoginFormTitleAndText();
    onLoginPage.clickForgotPasswordLink();
    onForgotPassPage.verifyUrlAndPageTitle();
    onForgotPassPage.fillForgotPassForm(globalData.login, email);
    onForgotPassPage.clickContinueBtn();
    onForgotPassPage.verifyErrorMessage();
    onForgotPassPage.clickCloseErrorMessageBtn();
    onForgotPassPage.clearForgotPassFormInputs();
    onForgotPassPage.fillForgotPassForm(globalData.login, globalData.email);
    onForgotPassPage.clickContinueBtn();
    onLoginPage.verifyLoginPageTitle();
    onLoginPage.successMessageOfResetingAccData("Success: Password reset link has been sent to your e-mail address.");
  });

  it("Login to account going back from forgot password", () => {
    navigateTo.loginOrRegister();
    onLoginPage.verifyLoginPageTitle();
    onLoginPage.checkLoginFormTitleAndText();
    onLoginPage.clickForgotPasswordLink();
    onForgotPassPage.verifyUrlAndPageTitle();
    onForgotPassPage.clickBackBtn();
    onLoginPage.checkLoginFormTitleAndText();
    onLoginPage.loginToAccount(globalData.login, globalData.password);
    onAccountPage.checkUrlAndTitlePage();
  });

  it("forgot your login", () => {
    navigateTo.loginOrRegister();
    onLoginPage.verifyLoginPageTitle();
    onLoginPage.checkLoginFormTitleAndText();
    onLoginPage.clickForgotLoginLink();
    onForgotLoginPage.verifyUrlAndPageTitle();
    onForgotLoginPage.fillForgotLoginForm(
      globalData.lastname,
      globalData.email
    );
    onForgotLoginPage.clickContinueBtn();
    onLoginPage.verifyLoginPageTitle();
    onLoginPage.successMessageOfResetingAccData(
      "Success: Your login name reminder has been sent to your e-mail address."
    );
  });

  it("providng wrong password to sign in", () => {
    const wrongPass = "testy";
    navigateTo.loginOrRegister();
    onLoginPage.verifyLoginPageTitle();
    onLoginPage.checkLoginFormTitleAndText();
    onLoginPage.loginToAccount(globalData.login, wrongPass);
    onLoginPage.verifyErrorLoginMessage();
    onLoginPage.checkLoginNameInputEmptyValue(globalData.login);
    onLoginPage.checkPasswordInputEmptyValue();
  });

  it("providing wrong login to sign in", () => {
    const wrongLogin = "johny12";
    navigateTo.loginOrRegister();
    onLoginPage.verifyLoginPageTitle();
    onLoginPage.checkLoginFormTitleAndText();
    onLoginPage.loginToAccount(wrongLogin, globalData.login);
    onLoginPage.verifyErrorLoginMessage();
    onLoginPage.checkLoginNameInputEmptyValue(wrongLogin);
    onLoginPage.checkPasswordInputEmptyValue();
  });

  it("providing wrong login to sign in and then sign in successfully", () => {
    const wrongLogin = "johny12";
    navigateTo.loginOrRegister();
    onLoginPage.verifyLoginPageTitle();
    onLoginPage.checkLoginFormTitleAndText();
    onLoginPage.loginToAccount(wrongLogin, globalData.login);
    onLoginPage.verifyErrorLoginMessage();
    onLoginPage.checkLoginNameInputEmptyValue(wrongLogin);
    onLoginPage.checkPasswordInputEmptyValue();
    onLoginPage.clickCloseErrorMessageBtn();
    onLoginPage.clearLoginInputs();
    onLoginPage.loginToAccount(globalData.login, globalData.password);
    onAccountPage.checkUrlAndTitlePage();
  });

  it("sign in to account through register page", () => {
    navigateTo.loginOrRegister();
    onLoginPage.verifyLoginPageTitle();
    onLoginPage.getAndClickToRegisterForm();
    onRegisterPage.verifyRegisterPageTitle();
    onRegisterPage.getToLoginPage();
    onLoginPage.verifyLoginPageTitle();
    onLoginPage.checkLoginFormTitleAndText();
    onLoginPage.loginToAccount(globalData.login, globalData.password);
    onAccountPage.checkUrlAndTitlePage();
    onAccountPage.verifyCustomerNameOnPage(globalData.firstname);
  });

  it("sign in to an account and then logout", () => {
    navigateTo.loginOrRegister();
    onLoginPage.checkLoginFormTitleAndText();
    onLoginPage.loginToAccount(globalData.login, globalData.password);
    onAccountPage.checkUrlAndTitlePage();
    onAccountPage.verifyCustomerNameOnPage(globalData.firstname);
    //4 options for logout
    // onAccountPage.logoutFromAccountNavbar()
    // onAccountPage.logoutFromAccountSidebar();
    // onAccountPage.logoutFromAccountFooter();
    onAccountPage.logoutFromCustomerNameOptions();
    onLogoutPage.verifyLogoutPageTitle();
    onLogoutPage.verifyContentText();
    onLogoutPage.verifyUserLogoutStatusInNavbar();
  });
});
