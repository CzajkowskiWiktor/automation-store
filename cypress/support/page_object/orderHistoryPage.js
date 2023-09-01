/// <reference types="Cypress" />

export class OrderHistoryPage {
  checkUrlAndTitlePage() {
    cy.verifyUrlAndTitlePage("history", "My Order History");
  }

  checkPathContentToOrderHistory() {
    cy.get(".breadcrumb").find("li").last().should("contain", "Order History");
  }

  checkSelectedOptionInSidebarlist() {
    cy.get(".myaccountbox")
      .find("li.selected")
      .should("contain", "Order history");
  }

  checkOrdersQuantity(quantity) {
    cy.get(".contentpanel .content").should("have.length", quantity);
    cy.get("#limit")
      .closest("form")
      .then(($el) => {
        //get the last element of array of the bottom elements in DOM
        const orderQuantityText = $el.text().split("\n").slice(-1).toString();
        //get the number of the text
        const formattedQuantity = Number(orderQuantityText.split("of")[1]);
        expect(formattedQuantity).to.equal(quantity);
      });
  }

  checkOrderID(orderID) {
    cy.get(".contentpanel .content")
      .closest(".container-fluid")
      .each(($el, index) => {
        cy.wrap($el)
          .contains("div", "Order")
          .then(($orderId) => {
            //get order ID number with format -> #number
            const orderIdNumber = $orderId.text().split(":")[1].trim();
            expect(orderIdNumber).to.equal(orderID[index]);
          });
      });
  }

  checkOrderStatus(ordersStatus) {
    cy.get(".contentpanel .content")
      .closest(".container-fluid")
      .each(($el, index) => {
        cy.wrap($el)
          .contains("div", "Status")
          .then(($status) => {
            //get order status
            const orderStatus = $status.text().split(":")[1].trim();
            expect(orderStatus).to.equal(ordersStatus[index]);
          });
      });
  }

  checkOrderCustomerName(customerName) {
    cy.get(".contentpanel .content").each(($el) => {
      cy.wrap($el)
        .find("table tr")
        .eq(0)
        .contains("td", "Customer:")
        .then(($name) => {
          const customerNameText = $name.text();
          expect(customerNameText).to.contain(customerName);
        });
    });
  }

  checkOrderTotals(orderTotals) {
    cy.get(".contentpanel .content").each(($el, index) => {
      cy.wrap($el)
        .find("table tr")
        .eq(1)
        .contains("td", "Total:")
        .then(($total) => {
          const totalText = $total.text().split(":")[1].trim();
          expect(totalText).to.contain(orderTotals[index]);
        });
    });
  }

  checkOrderDateAdded(orderDates) {
    cy.get(".contentpanel .content").each(($el, index) => {
      cy.wrap($el)
        .find("table tr")
        .eq(0)
        .contains("td", "Date Added:")
        .then(($date) => {
          const dateText = $date.text().split(":")[1].trim();
          expect(dateText).to.include(orderDates[index]);
        });
    });
  }

  checkOrderProductsQuantity(productQuantity) {
    cy.get(".contentpanel .content").each(($el, index) => {
      cy.wrap($el)
        .find("table tr")
        .eq(1)
        .contains("td", "Products:")
        .then(($products) => {
          const productText = $products.text().split(":")[1].trim();
          expect(parseInt(productText)).to.equal(productQuantity[index]);
        });
    });
  }

  clickViewOrderOnSpecificOrderID(orderId) {
    cy.get(".contentpanel .content")
      .closest(".container-fluid")
      .filter(":contains(" + orderId + ")")
      .then(($el) => {
        //check order ID number
        cy.wrap($el)
          .contains("div", "Order")
          .then(($orderId) => {
            //get order ID number with format -> #number
            const orderIdNumber = $orderId.text().split(":")[1].trim();
            expect(orderIdNumber).to.equal(orderId);
          });

        //click view button
        cy.wrap($el).find("#button_edit").click();
      });
  }
}

export const onOrderHistoryPage = new OrderHistoryPage();
