/// <reference types="Cypress" />
// function verifyUrlAndTitle(url, title){
//     //verify if the page title is correct
//     cy.url().should("include", "/"+url);
//     cy.get("h1.heading1").should("contain", title);
// }

export class LoginPage {
  verifyLoginPageTitle() {
    //verify if the page title is correct
    // cy.url().should("include", "/login");
    // cy.get("h1.heading1").should("contain", "Account Login");
    cy.verifyUrlAndTitlePage("login", "Account Login");
  }

  getAndClickToRegisterForm() {
    //get the register form
    cy.get(".newcustomer").then((form) => {
      //verify the heading of register form
      cy.wrap(form).find(".heading2").should("contain", "I am a new customer");
      //checkout register option checked
      cy.wrap(form).find("#accountFrm_accountregister").should("be.checked");
      //click continue button
      cy.wrap(form).find('[title="Continue"]').click();
    });
  }

  checkGuestCheckoutOption() {
    //get the guest checkout form
    cy.get("#accountFrm_accountguest").check({force: true}).should("be.checked");
  }

  loginToAccount(login, password) {
    cy.get(".returncustomer").then((form) => {
      cy.wrap(form).find("#loginFrm_loginname").type(login);
      cy.wrap(form).find("#loginFrm_password").type(password);
      //check if inputs are not empty
      cy.wrap(form).find("#loginFrm_loginname").should("have.value", login);
      cy.wrap(form).find("#loginFrm_password").should("have.value", password);
      //click login btn
      cy.wrap(form).find('[type="submit"]').click();
    });
  }

  checkLoginFormTitleAndText() {
    cy.get(".returncustomer").then((form) => {
      cy.wrap(form).find(".heading2").should("contain", "Returning Customer");
      cy.wrap(form)
        .find(".heading4")
        .should("contain", "I am a returning customer");
    });
  }

  clickForgotPasswordLink() {
    cy.get(".returncustomer").contains("a", "Forgot your password?").click();
  }

  clickForgotLoginLink() {
    cy.get(".returncustomer").contains("a", "Forgot your login?").click();
  }

  successMessageOfResetingAccData(msg) {
    cy.get("div.alert-success").should("contain", msg);
  }

  clearLoginInputs() {
    cy.get(".returncustomer").then((form) => {
      cy.wrap(form).find("#loginFrm_loginname").clear();
      cy.wrap(form).find("#loginFrm_password").clear();
    });
  }

  verifyErrorLoginMessage() {
    cy.get("div.alert-error").should(
      "contain",
      "Error: Incorrect login or password provided."
    );
  }

  checkLoginNameInputEmptyValue(login) {
    cy.get(".returncustomer")
      .find("#loginFrm_loginname")
      .should("not.have.value", "")
      .and("have.value", login);
  }

  checkPasswordInputEmptyValue() {
    cy.get(".returncustomer").find("#loginFrm_password").should("be.empty");
  }

  clickCloseErrorMessageBtn() {
    cy.get(".alert-error").find("button").click();
  }

  clickContinueBtn(){
    cy.get('[title="Continue"]').click();
  }
}

export const onLoginPage = new LoginPage();
