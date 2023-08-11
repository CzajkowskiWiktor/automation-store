/// <reference types="Cypress" />

export class HomePage {
  loginOrRegister() {
    cy.get("#customer_menu_top").click();
  }

  goToSpecialsNavbar() {
    cy.get("#main_menu_top").find('[data-id="menu_specials"]').click();
  }

  goToCartNavbar() {
    cy.get("#main_menu_top").find('[data-id="menu_cart"]').click();
  }

  goToCheckoutNavbar() {
    cy.get("#main_menu_top").find('[data-id="menu_cart"]').click();
  }

  goToCheckOrderNavbar() {
    cy.get("#main_menu_top")
      .find('[data-id="menu_account"]')
      .find("a.top.menu_account")
      .trigger("mouseover");
    cy.get("li.open").find('[data-id="menu_order"]').click();
  }

  goToAccountLoginNavbar() {
    cy.get("#main_menu_top")
      .find('[data-id="menu_account"]')
      .find("a.top.menu_account")
      .trigger("mouseover");
    cy.get("li.open").find('[data-id="menu_login"]').click();
  }

  checkHomeSectionActiveSubnav() {
    cy.get(".categorymenu li a.active").should("have.text", "Home");
  }

  addItemToCartByProductName(itemName, itemPrice) {
    cy.get("a.prdocutname")
      .filter(':contains("' + itemName + '")')
      .then(($el) => {
        //get element length
        const elCount = Cypress.$($el).length;
        if (elCount > 1) {
          //check element title
          const firstElement = $el.first();
          expect(firstElement).to.have.text(itemName);
          //check price
          cy.wrap($el)
            .first()
            .closest(".fixed_wrapper")
            .parent("div")
            .find(".pricetag.jumbotron")
            .find(".price")
            .then(($price) => {
              //check if element has class .pricenew
              const priceDiv = $price.find("div");
              const priceClassDiv = Cypress.$(priceDiv).hasClass("pricenew");
              if (priceClassDiv) {
                const elementNewPrice = $price.find(".pricenew").text();
                expect(elementNewPrice).to.contain(itemPrice);
              } else {
                const elementPrice = $price.find(".oneprice").text();
                expect(elementPrice).to.contain(itemPrice);
              }
            });
          //add to cart
          cy.wrap($el)
            .first()
            .closest(".fixed_wrapper")
            .parent("div")
            .find(".pricetag.jumbotron")
            .find('[title="Add to Cart"]')
            .click();
          //if added then new icon added to cart exists, new class and background color of div element
          cy.wrap($el)
            .first()
            .closest(".fixed_wrapper")
            .parent("div")
            .find(".pricetag.jumbotron")
            .find('[title="Added to cart"]')
            .should("be.visible");
          cy.wrap($el)
            .first()
            .closest(".fixed_wrapper")
            .parent("div")
            .find(".pricetag.jumbotron")
            .should("have.class", "added_to_cart");
          cy.wrap($el)
            .first()
            .closest(".fixed_wrapper")
            .parent("div")
            .find(".added_to_cart")
            .should("have.css", "background-color", "rgb(223, 240, 216)");
          //delete from basket on element
          //.quick_basket .find('[title="Added to cart"]')
        } else {
          //check element title
          const firstElement = $el.first();
          expect(firstElement).to.have.text(itemName);
          //check price
          cy.wrap($el)
            .first()
            .closest(".fixed_wrapper")
            .parent("div")
            .find(".pricetag.jumbotron")
            .find(".price")
            .then(($price) => {
              //check if element has class pricenew
              const priceDiv = $price.find("div");
              const priceClassDiv = Cypress.$(priceDiv).hasClass("pricenew");
              if (priceClassDiv) {
                const elementNewPrice = $price.find(".pricenew").text();
                expect(elementNewPrice).to.contain(itemPrice);
              } else {
                const elementPrice = $price.find(".oneprice").text();
                expect(elementPrice).to.contain(itemPrice);
              }
            });
          //add to cart
          cy.wrap($el)
            .first()
            .closest(".fixed_wrapper")
            .parent("div")
            .find(".pricetag.jumbotron")
            .find('[title="Add to Cart"]')
            .click();
          //if added then new icon added to cart exists, new class and background color of div element
          cy.wrap($el)
            .first()
            .closest(".fixed_wrapper")
            .parent("div")
            .find(".pricetag.jumbotron")
            .find('[title="Added to cart"]')
            .should("be.visible");
          cy.wrap($el)
            .first()
            .closest(".fixed_wrapper")
            .parent("div")
            .find(".pricetag.jumbotron")
            .should("have.class", "added_to_cart");
          cy.wrap($el)
            .first()
            .closest(".fixed_wrapper")
            .parent("div")
            .find(".added_to_cart")
            .should("have.css", "background-color", "rgb(223, 240, 216)");
        }
      });
  }

  tryToAddProductOutOfStock(itemName, itemPrice) {
    cy.get("a.prdocutname")
      .filter(':contains("' + itemName + '")')
      .then(($el) => {
        //get element length
        const elCount = Cypress.$($el).length;
        if (elCount > 1) {
          //check element title
          const firstElement = $el.first();
          expect(firstElement).to.have.text(itemName);
          //check price
          cy.wrap($el)
            .first()
            .closest(".fixed_wrapper")
            .parent("div")
            .find(".pricetag.jumbotron")
            .find(".price")
            .then(($price) => {
              //check if element has class .pricenew
              const priceDiv = $price.find("div");
              const priceClassDiv = Cypress.$(priceDiv).hasClass("pricenew");
              if (priceClassDiv) {
                const elementNewPrice = $price.find(".pricenew").text();
                expect(elementNewPrice).to.contain(itemPrice);
              } else {
                const elementPrice = $price.find(".oneprice").text();
                expect(elementPrice).to.contain(itemPrice);
              }
            });
          //out of stock information
          cy.wrap($el)
            .first()
            .closest(".fixed_wrapper")
            .parent("div")
            .find(".pricetag.jumbotron")
            .find(".nostock")
            .should("have.text", "Out of Stock");
          //add to cart button should not exists
          cy.wrap($el)
            .first()
            .closest(".fixed_wrapper")
            .parent("div")
            .find(".pricetag.jumbotron")
            .find('[title="Add to Cart"]')
            .should("not.exist");
        } else {
          //check element title
          const firstElement = $el.first();
          expect(firstElement).to.have.text(itemName);
          //check price
          cy.wrap($el)
            .first()
            .closest(".fixed_wrapper")
            .parent("div")
            .find(".pricetag.jumbotron")
            .find(".price")
            .then(($price) => {
              //check if element has class pricenew
              const priceDiv = $price.find("div");
              const priceClassDiv = Cypress.$(priceDiv).hasClass("pricenew");
              if (priceClassDiv) {
                const elementNewPrice = $price.find(".pricenew").text();
                expect(elementNewPrice).to.contain(itemPrice);
              } else {
                const elementPrice = $price.find(".oneprice").text();
                expect(elementPrice).to.contain(itemPrice);
              }
            });
          //out of stock information
          cy.wrap($el)
            .first()
            .closest(".fixed_wrapper")
            .parent("div")
            .find(".pricetag.jumbotron")
            .find(".nostock")
            .should("have.text", "Out of Stock");
          //add to cart button should not exists
          cy.wrap($el)
            .first()
            .closest(".fixed_wrapper")
            .parent("div")
            .find(".pricetag.jumbotron")
            .find('[title="Add to Cart"]')
            .should("not.exist");
        }
      });
  }
}

export const onHomePage = new HomePage();
