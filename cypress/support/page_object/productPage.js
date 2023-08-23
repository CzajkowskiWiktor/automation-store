/// <reference types="Cypress" />

function goToThroughNavbar(name) {
  cy.get("#customernav").trigger("mouseover");
  cy.get("li.open").find(".dropdown-menu").contains("a", name).click();
}

export class ProductPage {
  checkPathContentToWishlist(itemName) {
    cy.get(".breadcrumb")
      .find("li")
      .should("contain", itemName);
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

  checkPossibilityToAddToCartProduct(){
    cy.get('.productpagecart .cart').then($btn => {
      //check btn text
      const btnText = $btn.text().trim();
      expect(btnText).to.equal("Add to Cart");
      //check btn icon cart
      cy.wrap($btn).find('i').should('have.class', 'fa-cart-plus');
    })
  }

  checkProductDescription(description){
    cy.get('#description').find('p').then($text =>{
      const productDesc = $text.text().trim();
      expect(productDesc).to.equal(description);
    })
  }

  checkAvailabilityOfProduct(availability){
    if(availability === 1){
      cy.get('#description').find('ul.productinfo').find('li').first().then($el => {
        const availableText = $el.text().trim();
        expect(availableText).to.contains("In Stock")
      })
    } else {
      cy.get('#description').find('ul.productinfo').find('li').first().then($el => {
        const availableText = $el.text().trim();
        expect(availableText).to.contains("Out of Stock")
      })
    }

  }

  checkModelOfProduct(model){
    cy.get('#description').find('ul.productinfo').find('li').eq(1).then($el => {
      const modelText = $el.text().trim();
      expect(modelText).to.contains(model)
    })
  }

  checkManufacturerOfProduct(manufacturer){
    cy.get('#description').find('ul.productinfo').find('li').eq(2).then($el => {
      cy.wrap($el).find('img').invoke('attr', 'title').should('contain', manufacturer)
    })
  }

  checkReviewsAmountOfProduct(reviewsQuantity){
    cy.get('#myTab').find('a[href="#review"]').should('contain', reviewsQuantity);
  }

  changeColorOfProduct(color){
    if(color !== 0){
      cy.get('#product select').select(color, { force: true }).should('contain', color)
    }
  }

  changeQuantityOfProduct(quantity){
    cy.get("#product").find('#product_quantity').clear().type(quantity);
  }

  checkTotalPriceOfProduct(){
    cy.get('.productfilneprice').then($price => {
      const priceProduct = $price.text().split('$')[1];
      cy.get('#product').then($el => {
        cy.get('#product_quantity').invoke('val').then(val => {
          const quantity = val;
          cy.wait(1000);
          const totalPrice = $el.find('.total-price').text().split('$')[1];
          const calculatedPrice = parseFloat(priceProduct)*parseInt(quantity);
          //check if total price displayed is equal to calculated one from data
          expect(totalPrice).to.equal(calculatedPrice.toFixed(2))
        })
      })
    })
  }

  clickAddToCartBtn(){
    cy.get('.productpagecart .cart').click();
  }

  addToWishlistBtnNotVisible(){
    cy.get('a.wishlist_add').should('not.exist');
  }

  addToWishlistBtn(){
    cy.get('a.wishlist_add').click();
  }

  checkIfItemIsAddedToWishlist(){
    cy.get('a.wishlist_remove').should('be.visible');
    cy.get('a.wishlist_add').should('not.be.visible');
  }

  goToWishlist(){
    goToThroughNavbar('My wish list');
  } 

  deleteFromWishlist(){
    cy.get('a.wishlist_remove').click();
  }

  checkIfItemIsDeletedFromWishlist(){
    cy.get('a.wishlist_remove').should('not.be.visible');
    cy.get('a.wishlist_add').should('be.visible');
  }

  clickPrintItem(){
    cy.window().then(w => {
      cy.stub(w, 'print').as('print')
    })
    cy.get('a.productprint').click();
    cy.get('@print').should('be.calledOnce')
  }

  clickReviewsTab(){
    cy.get('#myTab').find('a[href="#review"]').click();
  }

  fillTheReview(rate, name, review, code){
    //check review title
    cy.get('#review').find('#review_title').should('have.text', 'Write Review');
    //click proper rating
    cy.get('#review').find('.content').find(`#rating${rate}`).click();
    //provide the name
    cy.get('#review').find('.content').find('#name').type(name);
    //provide the review
    cy.get('#review').find('.content').find('#text').type(review);
    //provide the code
    cy.get('#review').find('.content').find('#captcha').type(code);
  }

  clickSubmitReviewBtn(){
    cy.get('#review_submit').click();
  }

  verifyErrorMsgToAddingReview(){
    cy.get('#review').find('.alert-error').should('contain', 'Human verification has failed! Please try again.')
  }
}

export const onProductPage = new ProductPage();
