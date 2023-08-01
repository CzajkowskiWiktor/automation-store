/// <reference types="Cypress" />

export class AccountPage {
  checkUrlAndTitlePage() {
    cy.verifyUrlAndTitlePage("account", "My Account");
  }

  verifyNewAccountInformation() {
    //on account page
    // cy.url().should("include", "/account");
    // cy.get("h1.heading1").should("contain", "My Account");
    // cy.verifyUrlAndTitlePage("account", "My Account");
    //transaction history be equal to 0$
    // cy.get(".dash-tile-balloon")
    //   .find(".dash-tile-header")
    //   .should("contain", "Transaction history")
    //   .parents(".dash-tile-balloon")
    //   .find(".dash-tile-text")
    //   .should("contain", "0.00");
    this.checkUrlAndTitlePage();
    this.getTransactionHistoryAmount("0.00");
    this.getDownloadsAmount("0");
    this.getOrderHistoryAmount("0");
    this.getManageAddressBookAmount("1");
  }

  getTransactionHistoryAmount(amount) {
    cy.get(".dash-tile-balloon")
      .find(".dash-tile-header")
      .should("contain", "Transaction history")
      .parents(".dash-tile-balloon")
      .find(".dash-tile-text")
      .should("contain", amount);
  }

  getDownloadsAmount(amount) {
    cy.get(".dash-tile-oil")
      .find(".dash-tile-header")
      .should("contain", "Downloads")
      .parents(".dash-tile-oil")
      .find(".dash-tile-text")
      .should("contain", amount);
  }

  getOrderHistoryAmount(amount) {
    cy.get(".dash-tile-flower")
      .find(".dash-tile-header")
      .should("contain", "Order history")
      .parents(".dash-tile-flower")
      .find(".dash-tile-text")
      .should("contain", amount);
  }

  getManageAddressBookAmount(amount) {
    cy.get(".dash-tile-ocean")
      .find(".dash-tile-header")
      .should("contain", "Manage Address Book")
      .parents(".dash-tile-ocean")
      .find(".dash-tile-text")
      .should("contain", amount);
  }

  verifyCustomerNameOnPage(firstname) {
    cy.get("#customernav")
      .find("a.menu_account")
      .should("contain", "Welcome back " + firstname);
    cy.get(".heading1").find(".subtext").should("have.text", firstname);
  }

  logoutFromAccountNavbar() {
    //hover an account option in navbar
    cy.get("#topnav")
      .find('[data-id="menu_account"]')
      .find("a.top.menu_account")
      .trigger("mouseover");
    cy.get("li.open").find(".dropdown-menu").find("a.menu_logout").click();
  }

  logoutFromAccountSidebar() {
    cy.get("ul.side_account_list").contains("a", "Logoff").click();
  }

  logoutFromAccountFooter() {
    cy.get("ul.info_links_footer").contains("a", "Logoff").click();
  }

  logoutFromCustomerNameOptions() {
    cy.get("#customernav").trigger("mouseover");
    cy.get("li.open").find(".dropdown-menu").contains("a", "Logoff").click();
  }

  goToAddressBookSidebar() {
    cy.get(".dash-tile-ocean").find(".dash-tile-header").find(".btn").click();
  }

  goToAddressBookNavbar() {
    cy.get("#customernav").trigger("mouseover");
    cy.get("li.open")
      .find(".dropdown-menu")
      .contains("a", "Manage Address Book")
      .click();
  }

  goToAddressBookIcon() {
    cy.get(".nav-dash")
      .find('[data-original-title="Manage Address Book"]')
      .click();
  }

  goToPasswordChangeSidebar() {
    cy.get(".side_account_list").contains("a", "Change password").click();
  }

  goToPasswordChangeNavbar() {
    cy.get("#customernav").trigger("mouseover");
    cy.get("li.open")
      .find(".dropdown-menu")
      .contains("a", "Change password")
      .click();
  }

  goToPasswordChangeIcon() {
    cy.get(".nav-dash").find('[data-original-title="Change password"]').click();
  }

  checkPathContentToAccount() {
    cy.get(".breadcrumb")
      .find("li")
      .should("contain", "Account")
      .and("have.length", 2);
  }

  verifySuccessMessage(msg) {
    cy.get(".alert-success").should("contain", msg);
  }
}

export const onAccountPage = new AccountPage();
