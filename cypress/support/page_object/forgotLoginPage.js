/// <reference types="Cypress" />

export class ForgotLoginPage {
  verifyUrlAndPageTitle() {
    cy.verifyUrlAndTitlePage("forgotten/loginname", "Forgot Your Login Name?");
  }

  clickBackBtn() {
    cy.get('a[title="Back"]').click();
  }

  clickContinueBtn() {
    cy.get('button[title="Continue"]').click();
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

  fillForgotLoginForm(lastname, email) {
    cy.get("#forgottenFrm_lastname").type(lastname);
    cy.get("#forgottenFrm_email").type(email);
    //check inputs
    cy.get("#forgottenFrm_lastname").should("have.value", lastname);
    cy.get("#forgottenFrm_email").should("have.value", email);
  }

  clearForgotLoginFormInputs() {
    cy.get("#forgottenFrm_lastname").clear();
    cy.get("#forgottenFrm_email").clear();
    //check inputs
    cy.get("#forgottenFrm_lastname").should("have.value", "");
    cy.get("#forgottenFrm_email").should("have.value", "");
  }
}

export const onForgotLoginPage = new ForgotLoginPage();
