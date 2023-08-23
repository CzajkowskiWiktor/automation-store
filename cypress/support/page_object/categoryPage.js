/// <reference types="Cypress" />

export class CategoryPage {
    checkUrlAndTitlePage(categoryTitle, numberPath) {
        cy.verifyUrlAndTitlePage("category&path="+numberPath, categoryTitle);
      }
    
      checkPathContentToCategory(categoryTitle) {
        cy.get(".breadcrumb")
          .find("li")
          .should("contain", categoryTitle);
      }

      checkSelectedCategoryNameOnNav(categoryTitle){
        cy.get(".categorymenu li.current").children('a').should("contain", categoryTitle);
      }

      openProductPageByName(itemName) {
        cy.get(".fixed > a.prdocutname")
          .filter(':contains("' + itemName + '")')
          .then(($el) => {
            //get element length
            const elCount = Cypress.$($el).length;
            if (elCount > 1) {
              //check element title
              const firstElement = $el.first();
              expect(firstElement).to.have.text(itemName);
            } else {
              //check element title
              const firstElement = $el.first();
              expect(firstElement).to.have.text(itemName);
            //open a product page
            cy.wrap($el).click();
            }
          });
      }
}

export const onCategoryPage = new CategoryPage();