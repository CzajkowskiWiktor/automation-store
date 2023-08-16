/// <reference types="Cypress" />

export class ShippingEditPage{
    checkUrlAndTitlePage() {
        cy.verifyUrlAndTitlePage("shipping&mode=edit", "Delivery Information");
      }
    
      checkPathContentToShippingEdit() {
        cy.get(".breadcrumb").find("li").should("contain", "Shipping");
      }

    clickChangeAddressBtn(){
        cy.get('[title="Change Address"]').click();
    }
}

export const onShippingEditPage = new ShippingEditPage();