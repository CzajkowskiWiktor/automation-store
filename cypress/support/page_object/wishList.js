/// <reference types="Cypress" />

export class WishList {
  checkUrlAndTitlePage() {
    cy.verifyUrlAndTitlePage("wishlist", "My wish list");
  }

  checkSelectedOptionInSidebarlist() {
    cy.get(".myaccountbox")
      .find("li.selected")
      .should("contain", "My wish list");
  }

  checkPathContentToWishlist() {
    cy.get(".breadcrumb")
      .find("li")
      .should("contain", "My wish list")
      .and("have.length", 3);
  }

  checkItemsAmountInWishlistTable(amount) {
    cy.get(".contentpanel")
      .get("table")
      .find("tbody")
      .find("tr:not(:first-child):visible")
      .should("have.length", amount);
  }

  checkItemNames(names) {
    cy.get("table")
      .find("tbody")
      .find("tr:not(:first-child)")
      .each(($el, index) => {
        let itemName = $el.find("td").eq(1).text();
        expect(itemName).to.contain(names[index]);
      });
  }

  checkItemPrices(prices) {
    cy.get("table")
      .find("tbody")
      .find("tr:not(:first-child)")
      .each(($el, index) => {
        let itemPrices = $el.find("td").eq(3).text();
        // cy.wrap($el).find('td').eq(1)
        // cy.log(itemPrices)
        expect(itemPrices).to.contain(prices[index]);
      });
  }

  checkTotalPriceOfItems(price) {
    let totalPrice = 0;
    cy.get("table")
      .find("tbody")
      .find("tr:not(:first-child)")
      .each(($el, index) => {
        let itemPrices = $el.find("td").eq(3).text();
        let filteredPrices = itemPrices.split("$");
        let prices = parseFloat(filteredPrices[1]);
        totalPrice += prices;
      })
      .then(($el) => {
        cy.log(totalPrice);
        expect(totalPrice).to.be.equal(price);
      });
  }

  clickContinueShoppingBtn() {
    cy.get(".contentpanel")
      .find(".pull-right")
      .contains("a", "Continue Shopping")
      .click();
  }

  clickViewCartBtn() {
    cy.get(".contentpanel")
      .find(".pull-right")
      .contains("a", "View Cart")
      .click();
  }

  deleteARowWithSpecificItemName(itemName) {
    cy.get("table")
      .find("tbody")
      .contains("td", itemName)
      .parent()
      .then(($el) => {
        cy.wrap($el).find("td").last().find("a.btn-remove").click();
      });
  }

  addToCarARowWithSpecificItemName(itemName) {
    cy.get("table")
      .find("tbody")
      .contains("td", itemName)
      .parent()
      .then(($el) => {
        cy.wrap($el).find("td").last().find("a").not(".btn-remove").click();
      });
  }
}

export const onWishList = new WishList();
