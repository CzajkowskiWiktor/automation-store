/// <reference types="Cypress" />

export class PaymentAddAddressPage {
    checkUrlAndTitlePage() {
      cy.verifyUrlAndTitlePage("address/payment", "Payment Address");
    }
  
    checkPathContentToPaymentAddAddress() {
      cy.get(".breadcrumb").find("li").should("contain", "Address");
    }
  
    clickContinueBtnToChangeAddress() {
      cy.get("#address_1").find('[title="Continue"]').click();
    }
  
    clickContinueBtnToAddAddress() {
      cy.get("#Address2Frm").find('[title="Continue"]').click();
    }
  
    changeAddressCheckboxToAnotherByDetails(user) {
      cy.get("#address_1")
        .find("table")
        .find("tr")
        .then(($row) => {
          const rowCount = Cypress.$($row).length;
          if (rowCount !== 1) {
            cy.wrap($row).each((el, index) => {
              let addressDetails = el.find("td").eq(1).text();
              if (
                addressDetails.includes(user.firstname) &&
                addressDetails.includes(user.address1) &&
                addressDetails.includes(user.country)
              ) {
                cy.wrap(el)
                  .closest("tr")
                  .find('input[name="address_id"]')
                  .check({ force: true })
                  .should("be.checked");
              }
            });
          }
        });
    }
  
    addNewAddress(userDetails){
      cy.get('#Address2Frm_firstname').type(userDetails.firstname);
      cy.get('#Address2Frm_lastname').type(userDetails.lastname);
      cy.get('#Address2Frm_address_1').type(userDetails.address1);
      cy.get('#Address2Frm_city').type(userDetails.city);
      cy.get('#Address2Frm_postcode').type(userDetails.postcode);
      cy.get('#Address2Frm_country_id').select(userDetails.country);
      cy.get('#Address2Frm_zone_id').select(userDetails.zone);
    }
  }
  
  export const onPaymentAddAddressPage = new PaymentAddAddressPage();