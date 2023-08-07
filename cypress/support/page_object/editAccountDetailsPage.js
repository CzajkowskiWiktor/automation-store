/// <reference types="Cypress" />

export class EditAccountDetailsPage {
  checkUrlAndTitlePage() {
    cy.verifyUrlAndTitlePage("edit", "My Account Information");
  }

  checkPathContentToEditAccountDetails() {
    cy.get(".breadcrumb").find("li").should("contain", "Edit Information");
  }

  checkSelectedOptionInSidebarlist() {
    cy.get(".myaccountbox")
      .find("li.selected")
      .should("contain", "Edit account details");
  }

  clickContinueBtn() {
    cy.get('[title="Continue"]').click();
  }

  clickBackBtn() {
    cy.get('[title="Back"]').click();
  }

  checkUserPersonalInformation(userDetail) {
    //check user's login
    cy.get(".registerbox .input-group")
      .first()
      .should("contain", userDetail.login);
    //check first name
    cy.get("#AccountFrm_firstname").should("have.value", userDetail.firstname);
    //check last name
    cy.get("#AccountFrm_lastname").should("have.value", userDetail.lastname);
    //check email
    cy.get("#AccountFrm_email").should("have.value", userDetail.email);
    //check phone
    cy.get("#AccountFrm_telephone").should("have.value", userDetail.telephone);
    //check fax is empty
    cy.get("#AccountFrm_fax").should("be.empty");
  }

  editPhoneNumber(userDetail, phone) {
    //check phone number and clear
    cy.get("#AccountFrm_telephone")
      .should("have.value", userDetail.telephone)
      .clear();
    //type a new number
    cy.get("#AccountFrm_telephone").type(phone).should("have.value", phone);
  }
}

export const onEditAccountDetailsPage = new EditAccountDetailsPage();
