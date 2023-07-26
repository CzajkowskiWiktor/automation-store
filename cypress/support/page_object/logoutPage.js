/// <reference types="Cypress" />

export class LogoutPage {
  verifyLogoutPageTitle() {
    cy.verifyUrlAndTitlePage("logout", "Account Logout");
  }

  verifyContentText() {
    cy.get(".contentpanel")
      .find("p")
      .should(
        "contain",
        "You have been logged off your account. It is now safe to leave the computer."
      );
  }

  verifyUserLogoutStatusInNavbar() {
    cy.get("#customer_menu_top").should("contain", "Login or register");
  }
}

export const onLogoutPage = new LogoutPage();
