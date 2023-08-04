/// <reference types="Cypress" />

export class OrderDetailsPage {
  checkUrlAndTitlePage(orderId) {
    const orderID = orderId.split("#");
    cy.verifyUrlAndTitlePage("invoice&order_id=" + orderID[1], "Order Details");
  }

  checkPathContentToOrderDetails() {
    cy.get(".breadcrumb")
      .find("li")
      .should("contain", "Order History")
      .should("contain", "Invoice");
  }

  checkNotSelectedOptionInSidebarlist() {
    cy.get(".myaccountbox")
      .find("li")
      .contains("a", "history")
      .closest("li")
      .should("not.have.class", ".selected");
  }

  checkOrderDetails(orderId, status, user) {
    cy.get(".contentpanel > .table-responsive > table td").each(
      ($el, index) => {
        //check order and customer details to order
        if (index === 0) {
          cy.wrap($el)
            .should("contain", orderId)
            .and("contain", status)
            .and("contain", user.email)
            .and("contain", user.telephone);
        }
        //check shipping address
        if (index === 1) {
          const header = $el.find("b").text();
          expect(header).to.include("Shipping Address");
          cy.wrap($el)
            .should("contain", user.firstname + " " + user.lastname)
            .and("contain", user.company)
            .and("contain", user.address1)
            .and("contain", user.postcode)
            .and("contain", user.city)
            .and("contain", user.zone)
            .and("contain", user.country);
        }
        //check payment address
        if (index === 2) {
          const header = $el.find("b").text();
          expect(header).to.include("Payment Address");
          cy.wrap($el)
            .should("contain", user.firstname + " " + user.lastname)
            .and("contain", user.company)
            .and("contain", user.address1)
            .and("contain", user.postcode)
            .and("contain", user.city)
            .and("contain", user.zone)
            .and("contain", user.country);
        }
      }
    );
  }

  checkOrderHistoryDetails(orderDate, status) {
    cy.get("h4.heading4")
      .should("have.text", "Order History")
      .next()
      .then(($table) => {
        cy.wrap($table)
          .find("tr")
          .eq(1)
          .find("td")
          .eq(0)
          .should("contain", orderDate);
        cy.wrap($table)
          .find("tr")
          .eq(1)
          .find("td")
          .eq(1)
          .should("contain", status);
      });
  }

  clickContinueBtn() {
    cy.get('[title="Continue"]').click();
  }

  clickPrintBtnAndVerify() {
    cy.window().then(w => {
        cy.stub(w, 'print').as('print')
    })
    cy.get('[title="Print"]').click();
    cy.get('@print').should('be.calledOnce')
  }

  checkProductDetailsOnOrder(
    productName,
    productQuantity,
    productPrice,
    eachProductOrderedQuantity
  ) {
    if (productQuantity !== 1) {
      cy.get(".contentpanel table")
        .filter(".invoice_products")
        .find("tr:not(:first-child)")
        .each(($el, index) => {
          //claculate total price
          let totalPrice =
            eachProductOrderedQuantity[index] * Number(productPrice[index]);
          //check product name
          cy.wrap($el).find("td").eq(1).should("contain", productName[index]);
          //check product quantity
          cy.wrap($el)
            .find("td")
            .eq(3)
            .should("contain", eachProductOrderedQuantity[index]);
          //check product price
          cy.wrap($el).find("td").eq(4).should("contain", productPrice[index]);
          //check product total price
          cy.wrap($el).find("td").eq(5).should("contain", totalPrice);
        });
    } else {
      let totalPrice = productQuantity * Number(productPrice);
      cy.get(".contentpanel table")
        .filter(".invoice_products")
        .then(($table) => {
          //check product name
          cy.wrap($table)
            .find("tr")
            .eq(1)
            .find("td")
            .eq(1)
            .should("contain", productName);
          //check product quantity
          cy.wrap($table)
            .find("tr")
            .eq(1)
            .find("td")
            .eq(3)
            .should("contain", productQuantity);
          //check product price
          cy.wrap($table)
            .find("tr")
            .eq(1)
            .find("td")
            .eq(4)
            .should("contain", productPrice);
          //check product total price
          cy.wrap($table)
            .find("tr")
            .eq(1)
            .find("td")
            .eq(5)
            .should("contain", totalPrice);
        });
    }
  }

  checkTotalWithTaxRatePrice(itemPrice, orderTotal) {
    //if itemPrice is array it means that there are more than 1 product
    if (Array.isArray(itemPrice)) {
      itemPrice = itemPrice.map(Number);
      let totalItemsPrice = itemPrice.reduce((a, b) => a + b, 0).toFixed(2);
      //calculate taxRate
      const taxRate = Number(orderTotal) - Number(totalItemsPrice);
      cy.get(".contentpanel table")
        .eq(2)
        .find("tr")
        .each(($el, index) => {
          if (index === 0) {
            cy.wrap($el).find("td").eq(1).should("contain", totalItemsPrice);
          }
          if (index === 1) {
            cy.wrap($el).find("td").eq(1).should("contain", taxRate.toFixed(2));
          }
          if (index === 2) {
            cy.wrap($el).find("td").eq(1).should("contain", orderTotal);
          }
        });
    } else {
      //calculate taxRate
      const taxRate = Number(orderTotal) - Number(itemPrice);
      cy.get(".contentpanel table")
        .eq(2)
        .find("tr")
        .each(($el, index) => {
          if (index === 0) {
            cy.wrap($el).find("td").eq(1).should("contain", itemPrice);
          }
          if (index === 1) {
            cy.wrap($el).find("td").eq(1).should("contain", taxRate.toFixed(2));
          }
          if (index === 2) {
            cy.wrap($el).find("td").eq(1).should("contain", orderTotal);
          }
        });
    }
  }
}

export const onOrderDetailsPage = new OrderDetailsPage();
