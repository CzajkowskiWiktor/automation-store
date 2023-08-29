/// <reference types="Cypress" />

function arrSort(arr) {
  arr.sort((a, b) => a - b);
  arr.reverse();
  return arr;
}

export class CategoryPage {
  checkUrlAndTitlePage(categoryTitle, numberPath) {
    cy.verifyUrlAndTitlePage("category&path=" + numberPath, categoryTitle);
  }

  checkPathContentToCategory(categoryTitle) {
    cy.get(".breadcrumb").find("li").should("contain", categoryTitle);
  }

  checkSelectedCategoryNameOnNav(categoryTitle) {
    cy.get(".categorymenu li.current")
      .children("a")
      .should("contain", categoryTitle);
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

  changeSortBy(sorter, value) {
    //check default sort
    cy.get("#sort")
      .find("option:selected")
      .should("have.text", "Date Old > New");
    //change sort by
    cy.get("#sort").select(sorter);
    //check changed selected option
    cy.get("#sort").find("option:selected").should("have.text", value);
  }

  verifySortedPricesDesc(priceArr) {
    let sortArr = arrSort(priceArr);
    cy.get(".thumbnail .oneprice")
      .filter(":visible")
      .each(($price, index) => {
        cy.wrap($price).then(($el) => {
          const priceText = $el.text().trim().split("$")[1];
          const priceFloat = parseFloat(priceText).toFixed(2);
          expect(priceFloat).to.equal(sortArr[index].toFixed(2));
        });
      });
  }

  verifyPrices(prices) {
    cy.get(".thumbnail .oneprice")
      .filter(":visible")
      .each(($price, index) => {
        cy.wrap($price).then(($el) => {
          const priceText = $el.text().trim().split("$")[1];
          const priceFloat = parseFloat(priceText).toFixed(2);
          expect(priceFloat).to.equal(prices[index].toFixed(2));
        });
      });
  }
}

export const onCategoryPage = new CategoryPage();
