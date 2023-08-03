/// <reference types="Cypress" />

export class ProductPage {
  checkPathContentToWishlist(itemName) {
    cy.get(".breadcrumb")
      .find("li")
      .should("contain", itemName)
      .and("have.length", 2);
  }

  checkUrl() {
    cy.url().should("include", "/product&product_id=");
  }

  checkProductName(name) {
    cy.get("h1.productname").should("contain", name);
  }

  checkProductPrice(price){
    cy.get('.productfilneprice').should('contain', price)
  }
}

export const onProductPage = new ProductPage();
