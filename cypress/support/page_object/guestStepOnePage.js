/// <reference types="Cypress" />

function checkErrorMessages(className, msg) {
    const errorMessages = Array.isArray(msg);
    if (errorMessages) {
      cy.get(className).each(($el, index) => {
        cy.wrap($el).should("contain", msg[index]);
      });
    } else {
      cy.get(className).should("contain", msg);
    }
  }

export class GuestStepOnePage {
  checkUrlAndTitlePage() {
    cy.verifyUrlAndTitlePage("guest_step_1", "Guest Checkout - Step 1");
  }

  checkPathContentToPaymentEdit() {
    cy.get(".breadcrumb")
      .find("li")
      .should("contain", "Guest Checkout - Step 1");
  }

  fillPersonalDetails(userDetails) {
    cy.get("#guestFrm_firstname").type(userDetails.firstname);
    cy.get("#guestFrm_lastname").type(userDetails.lastname);
    cy.get("#guestFrm_email").type(userDetails.email);
    if(userDetails.hasOwnProperty("tele")){
        cy.get("#guestFrm_telephone").type(userDetails.tele);
    }
    if(userDetails.hasOwnProperty("fax")){
        cy.get("#guestFrm_fax").type(userDetails.fax);
    }
    if(userDetails.hasOwnProperty("company")){
        cy.get("#guestFrm_company").type(userDetails.company);
    }
    cy.get("#guestFrm_address_1").type(userDetails.address1);
    if(userDetails.hasOwnProperty("address2")){
        cy.get("#guestFrm_address_2").type(userDetails.address2);
    }
    cy.get("#guestFrm_city").type(userDetails.city);
    cy.get("#guestFrm_postcode").type(userDetails.postcode);
    cy.get("#guestFrm_country_id").select(userDetails.country);
    cy.get("#guestFrm_zone_id").select(userDetails.zone);
  }

  checkSeperateShippingAddress(){
    cy.get('#guestFrm_shipping_indicator').check({force: true}).should('be.checked');
  }

  clickContinueBtn(){
    cy.get('[title="Continue"]').click();
  }

  fillShippingSeperateDetails(userDetails){
    cy.get("#guestFrm_shipping_firstname").type(userDetails.firstname);
    cy.get("#guestFrm_shipping_lastname").type(userDetails.lastname);
    if(userDetails.hasOwnProperty("company")){
        cy.get("#guestFrm_shipping_company").type(userDetails.company);
    }
    cy.get("#guestFrm_shipping_address_1").type(userDetails.address1);
    if(userDetails.hasOwnProperty("address2")){
        cy.get("#guestFrm_shipping_address_2").type(userDetails.address2);
    }
    cy.get("#guestFrm_shipping_city").type(userDetails.city);
    cy.get("#guestFrm_shipping_postcode").type(userDetails.postcode);
    cy.get("#guestFrm_shipping_country_id").select(userDetails.country);
    cy.get("#guestFrm_shipping_zone_id").select(userDetails.zone);
  }

  getErrorInputMsg(msg) {
    checkErrorMessages(".has-error", msg);
  }
}

export const onGuestStepOnePage = new GuestStepOnePage();
