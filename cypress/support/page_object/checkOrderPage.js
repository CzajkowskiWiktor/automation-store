/// <reference types="Cypress" />

export class CheckOrderPage {
  checkUrlAndTitlePage() {
    cy.verifyUrlAndTitlePage("invoice", "Order Details");
  }

  checkPathContentToSearch() {
    cy.get(".breadcrumb").find("li").should("contain", "Order Details");
  }

  fillOrderId(orderId){
    cy.get('#CheckOrderFrm_order_id').type(orderId).should('have.value', orderId);
  }

  fillEmailInput(email){
    cy.get('#CheckOrderFrm_email').type(email).should('have.value', email)
  }

  clickContinueBtn(){
    cy.get('button[title="Continue"]').click();
  }
}

export const onCheckOrderPage = new CheckOrderPage();
