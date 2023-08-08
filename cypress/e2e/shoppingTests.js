/// <reference types="Cypress" />
import { navigateTo } from "../support/page_object/navigationPage";

describe('Testing shopping funcionality', () => {
    let globalData;

    beforeEach("open a website and login to account", () => {
        //assign global data
        cy.fixture("example.json").then(function (data) {
          globalData = data;
        });
        //open home page nad sign in
        cy.openHomePage();
      });

      it('add article to cart', () => {
        
      });

      it('check checkout with few articles', () => {
        
      });

      it('check checkout even if it is empty', () => {
        
      });

      it('check special offer - verify all products', () => {
        
      });

      it('change currency and check prices of products', () => {
        
      });

      it('add article from home page to a cart', () => {
        
      });

      it('try to add an article which is out of stock to a cart from home page', () => {
        
      });

      it('make an order for a product - add to cart from home page, open a cart and finish transaction -login user', () => {
        
      });

      it('make an order for a product - add to cart from home page, open a cart and finish transaction - guest user', () => {
        
      });

      it('make an order for a product - add to cart from home page, open a cart and finish transaction - register a user', () => {
        
      });

      it('add item to cart and update the quantity of product', () => {
        
      });

      it('add item to cart and delete it', () => {
        
      });

      it('apply the wrong coupon to the cart', () => {
        
      });

      it('make an order for a product - update the quantity and checkout', () => {
        
      });

      it('add item to cart and estimate shipping and taxes', () => {
        
      });

      it('add item to cart and continue the shopping', () => {
        
      });

      it('add few products and finish the transaction', () => {
        
      });

      it('add item to cart, change currency and finish transaction', () => {
        
      });

      //product tests
      it('change quantity and add item to cart', () => {
        
      });

      it('add item to wishlist', () => {
        
      });

      it('remove item from wishlist', () => {
        
      });

      it('print the item details', () => {
        
      });

      it('check item details', () => {
        
      });

      it('check item reviews', () => {
        
      });

      it('check related products', () => {
        
      });

      it('find the product from search field', () => {
        
      });

      it('find all products related to the brand - click Gucci logo in Brand list on home page', () => {
        
      });

      it('check featured products', () => {
        
      });

      it('check latest products', () => {
        
      });

      it('check bestsellers products', () => {
        
      });

      it('check special products on home page', () => {
        
      });

      it('change sort by - highest rating', () => {
        
      });

      it('search the item - find no items matching to search criteria', () => {
        
      });
      //for home page test
      it('check text on home page', () => {
        
      });

      it('check about us footer', () => {
        
      });

      it('check contac us footer', () => {
        
      });

      it('check testimonials footer', () => {
        
      });

      it('sign up for newsletter group', () => {
        
      });

      it('check brand scrolling list', () => {
        
      });

  
});