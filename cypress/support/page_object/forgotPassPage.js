/// <reference types="Cypress" />

export class ForgotPassPage {
  verifyUrlAndPageTitle() {
    cy.verifyUrlAndTitlePage("forgotten/password", "Forgot Your Password?");
  }

  clickBackBtn() {
    cy.get('a[title="Back"]').click();
  }

  clickContinueBtn() {
    cy.get('button[title="Continue"]').click();
  }

  fillForgotPassForm(login, email) {
    cy.get("#forgottenFrm_loginname").type(login);
    cy.get("#forgottenFrm_email").type(email);
    //check inputs
    cy.get("#forgottenFrm_loginname").should("have.value", login);
    cy.get("#forgottenFrm_email").should("have.value", email);
  }

  clearForgotPassFormInputs() {
    cy.get("#forgottenFrm_loginname").clear();
    cy.get("#forgottenFrm_email").clear();
    //check inputs
    cy.get("#forgottenFrm_loginname").should("have.value", "");
    cy.get("#forgottenFrm_email").should("have.value", "");
  }

  verifyErrorMessage() {
    cy.get(".alert-error").should(
      "contain",
      "Error: No records found matching information your provided, please check your information and try again!"
    );
  }

  clickCloseErrorMessageBtn() {
    cy.get(".alert-error").find("button").click();
  }
}

export const onForgotPassPage = new ForgotPassPage();
