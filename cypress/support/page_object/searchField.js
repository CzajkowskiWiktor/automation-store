/// <reference types="Cypress" />

export class SearchField {
  checkUrlAndTitlePage(productName) {
    cy.verifyUrlAndTitlePage("search&keyword=" + productName, "Search");
  }

  checkPathContentToSearch() {
    cy.get(".breadcrumb").find("li").should("contain", "Search");
  }

  verifySearchCirteriaField(productName) {
    cy.get("#keyword").should("have.value", productName);
  }

  verifyAllFoundProducts(products) {
    cy.get(".fixed > .prdocutname").each(($el, index) => {
      cy.wrap($el).should("have.text", products[index]);
    });
  }

  noFoundProductsMeetingCriteria() {
    cy.get(".contentpanel").should(
      "contain",
      "There is no product that matches the search criteria."
    );
  }

  verifySearchedBrandName(brand) {
    cy.get(".heading1").find(".maintext").should("have.text", brand);
  }

  checkPathContentToBrand(brand) {
    cy.get(".breadcrumb").find("li").should("contain", brand);
  }

  checkIfProductsHaveBrandNameInTitle(brandName){
    cy.get(".fixed > .prdocutname").each(($el, index) => {
        cy.wrap($el).should("contain", brandName);
      });
  }
}

export const onSearchField = new SearchField();
