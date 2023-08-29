/// <reference types="Cypress" />

export class SpecialsPage {
    checkUrlAndTitlePage() {
        cy.verifyUrlAndTitlePage("special", "Special Offers");
    }
    
      checkPathContentToSearch() {
        cy.get(".breadcrumb").find("li").should("contain", "Special Offers");
    }

    checkSpecialsProductsLength(length){
        cy.get('.contentpanel').find('.thumbnails > div').find('.fixed > .prdocutname').should('have.length', length);
    }

    checkSaleTabClassExistenceOnProduct(){
        cy.get('.contentpanel').find('.thumbnails > div').find('.thumbnail > span').each($el => {
            cy.wrap($el).should('have.class', 'sale');
        })
    }

    checkIfProductsHaveOldAndNewPrices(){
        cy.get('.thumbnails').find('.thumbnail').filter(':visible').find('.price').each($prod => {
            //each product item should have old and new price
            cy.wrap($prod).find('div').should('have.class', 'pricenew')
            cy.wrap($prod).find('div').should('have.class', 'priceold')
        })
    }
}

export const onSpecialsPage = new SpecialsPage();