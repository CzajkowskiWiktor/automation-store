/// <reference types="Cypress" />

export class SuccessOrderPage{
    checkUrlAndTitlePage() {
        cy.verifyUrlAndTitlePage("success", "Your Order Has Been Processed!");
      }
    
      checkPathContentToSuccessOrder() {
        cy.get(".breadcrumb").find("li").should("contain", "Success");
      }

      clickContinueBtn(){
        cy.get('[title="Continue"]').click();
      }

    verifySuccessOrderMessage(){
        cy.get('.contentpanel section').should('contain', 'Thank you for shopping with us!')
    }
}

export const onSuccessOrderPage = new SuccessOrderPage();