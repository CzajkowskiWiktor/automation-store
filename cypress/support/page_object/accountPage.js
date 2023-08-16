/// <reference types="Cypress" />

function goToThroughIcon(name) {
  cy.get(".nav-dash")
    .find('[data-original-title="' + name + '"]')
    .click();
}

function goToThroughSidebar(name) {
  cy.get(".side_account_list").contains("a", name).click();
}

function goToThroughNavbar(name) {
  cy.get("#customernav").trigger("mouseover");
  cy.get("li.open").find(".dropdown-menu").contains("a", name).click();
}

function checkQuantityOfElementsIcon(elementName, amount) {
  cy.get(".nav-dash")
    .find('[data-original-title="' + elementName + '"]')
    .find(".badge-success")
    .should("have.text", amount);
}

export class AccountPage {
  checkUrlAndTitlePage() {
    cy.verifyUrlAndTitlePage("account", "My Account");
  }

  verifyNewAccountInformation() {
    this.checkUrlAndTitlePage();
    this.checkTransactionHistoryAmountCard("0.00");
    this.getDownloadsAmount("0");
    this.getOrderHistoryAmount("0");
    this.getManageAddressBookAmount("1");
  }

  checkTransactionHistoryAmountCard(amount) {
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

  //address book
  goToAddressBookSidebar() {
    cy.get(".dash-tile-ocean").find(".dash-tile-header").find(".btn").click();
  }

  goToAddressBookNavbar() {
    goToThroughNavbar("Manage Address Book");
  }

  goToAddressBookIcon() {
    goToThroughIcon("Manage Address Book");
  }

  goToPasswordChangeSidebar() {
    goToThroughSidebar("Change password");
  }

  goToPasswordChangeNavbar() {
    goToThroughNavbar("Change password");
  }

  goToPasswordChangeIcon() {
    goToThroughIcon("Change password");
  }

  //path content breadcrumb
  checkPathContentToAccount() {
    cy.get(".breadcrumb")
      .find("li")
      .should("contain", "Account")
      .and("have.length", 2);
  }

  //success msg
  verifySuccessMessage(msg) {
    cy.get(".alert-success").should("contain", msg);
  }

  //wish list
  checkWishlistIcon() {
    cy.get(".nav-dash")
      .find('[data-original-title="My wish list"]')
      .as("wishlistbadge");
    cy.get("@wishlistbadge").find("i").should("have.class", "fa-star");
  }

  checkWishlistAmount(amount) {
    cy.get(".nav-dash")
      .find('[data-original-title="My wish list"]')
      .as("wishlistbadge");
    cy.get("@wishlistbadge").find(".badge-success").should("have.text", amount);
  }

  goToWishlistSidebar() {
    goToThroughSidebar("My wish list");
  }

  goToWishlistNavbar() {
    goToThroughNavbar("My wish list");
  }

  goToWishlistIcon() {
    goToThroughIcon("My wish list");
  }

  //order history
  goToOrderHistorySidebar() {
    goToThroughSidebar("Order history");
  }

  goToOrderHistoryNavbar() {
    goToThroughNavbar("Order history");
  }

  goToOrderHistoryIcon() {
    goToThroughIcon("Order history");
  }

  checkOrderAmount(amount) {
    checkQuantityOfElementsIcon("Order history", amount);
  }

  //transactions history
  goToTransactionHistorySidebar() {
    goToThroughSidebar("Transaction history");
  }

  goToTransactionHistoryNavbar() {
    goToThroughNavbar("Transaction history");
  }

  goToTransactionHistoryIcon() {
    goToThroughIcon("Transaction history");
  }

  checkTransactionHistoryAmountIcon(amount) {
    checkQuantityOfElementsIcon("Transaction history", amount);
  }

  //downloads
  goToDownloadSidebar() {
    goToThroughSidebar("Downloads");
  }

  goToDownloadNavbar() {
    goToThroughNavbar("Downloads");
  }

  goToDownloadIcon() {
    goToThroughIcon("Downloads");
  }

  checkDownloadsAmountIcon(amount) {
    checkQuantityOfElementsIcon("Downloads", amount);
  }

  //notifications
  goToNotificationsSidebar() {
    goToThroughSidebar("Notifications");
  }

  goToNotificationsNavbar() {
    goToThroughNavbar("Notifications");
  }

  goToNotificationsIcon() {
    goToThroughIcon("Notifications");
  }

  //edit account
  goToEditAccountDetailsSidebar() {
    goToThroughSidebar("Edit account details");
  }

  goToEditAccountDetailsNavbar() {
    goToThroughNavbar("Edit account details");
  }

  goToEditAccountDetailsIcon() {
    goToThroughIcon("Edit account details");
  }

  goToHomePage(){
    cy.get('#categorymenu').contains('a', 'Home').click();
  }
}

export const onAccountPage = new AccountPage();
