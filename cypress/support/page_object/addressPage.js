/// <reference types="Cypress" />

export class AddressPage {
  checkUrlAndTitlePage() {
    cy.verifyUrlAndTitlePage("address", "Address Book");
  }

  checkSelectedOptionInSidebarlist() {
    cy.get(".myaccountbox")
      .find("li.selected")
      .should("contain", "Manage Address Book");
  }

  checkPathContentToAddressBook() {
    cy.get(".breadcrumb")
      .find("li")
      .should("contain", "Address Book")
      .and("have.length", 3);
  }

  verifyAddressInformation(
    firstname,
    lastname,
    address,
    city,
    postcode,
    zone,
    country
  ) {
    cy.get(".contentpanel")
      .find(".genericbox")
      .first()
      .find("table")
      .find("tr")
      .find("td")
      .not(".pull-right")
      .should("contain", firstname + " " + lastname)
      .and("contain", address)
      .and("contain", city + " " + postcode)
      .and("contain", zone)
      .and("contain", country);
  }

  clickBackBtn() {
    cy.get(".container-fluid").find('[title="Back"]').click();
  }

  clickAddNewAddressBtn() {
    cy.get(".container-fluid").find('[title="New Address"]').click();
  }

  clickEditAddressBookData(number) {
    cy.get(".genericbox").eq(number).find('[title="Edit"]').click();
  }

  verifySuccessMessage(msg) {
    cy.get(".alert-success").should("contain", msg);
  }

  closeSuccessMessageBtn() {
    cy.get(".alert-success").find("button").click();
  }

  verifyNewAddressInformation(newAddressUser) {
    cy.get(".contentpanel")
      .find(".genericbox")
      .contains("table", "Delete")
      .find("td")
      .not(".pull-right")
      .should(
        "contain",
        newAddressUser.firstname + " " + newAddressUser.lastname
      )
      .and("contain", newAddressUser.address1)
      .and("contain", newAddressUser.city + " " + newAddressUser.postcode)
      .and("contain", newAddressUser.zone)
      .and("contain", newAddressUser.country);
  }

  deleteNewAddressBtn() {
    cy.get(".contentpanel")
      .find(".genericbox")
      .contains("table", "Delete")
      .find('[title="Delete"]')
      .click();
  }
}

export const onAddressPage = new AddressPage();
