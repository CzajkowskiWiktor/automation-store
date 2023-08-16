/// <reference types="Cypress" />

export class CartPage {
  checkUrlAndTitlePage() {
    cy.verifyUrlAndTitlePage("cart", "Shopping Cart");
  }

  checkPathContentToCart() {
    cy.get(".breadcrumb").find("li").should("contain", "Basket");
  }

  checkTextOfEmptyCart(text) {
    cy.get(".contentpanel").should("contain", text);
  }

  checkNoExistingCartTable() {
    cy.get(".contentpanel").find("table").should("not.exist");
  }

  clickContinueBtn() {
    cy.get('[title="Continue"]').click();
  }

  checkShoppingCartDetails(productName, productQuantity, productPrice) {
    //get table rows length
    cy.get(".contentpanel table")
      .first()
      .find("tr:not(:first-child)")
      .then(($el) => {
        const rowCount = Cypress.$($el).length;
        if (rowCount !== 1) {
          cy.wrap($el).each(($element, index) => {
            let price = productPrice[index].split("$")[1];
            //claculate total price
            let totalPrice = productQuantity * Number(price);
            //check product name
            cy.wrap($element)
              .find("td")
              .eq(1)
              .should("contain", productName[index]);
            //check product quantity
            cy.wrap($element)
              .find("td")
              .eq(4)
              .find('input[type="text"]')
              .should("have.value", productQuantity);
            //check product price
            cy.wrap($element)
              .find("td")
              .eq(3)
              .should("contain", productPrice[index]);
            //check product total price
            cy.wrap($element).find("td").eq(5).should("contain", totalPrice);
          });
        } else {
          let price = productPrice.split("$")[1];
          let totalPrice = productQuantity * Number(price);
          cy.wrap($el).then(($row) => {
            //check product name
            cy.wrap($row).find("td").eq(1).should("contain", productName);
            //check product quantity
            cy.wrap($row)
              .find("td")
              .eq(4)
              .find('input[type="text"]')
              .should("have.value", productQuantity);
            //check product price
            cy.wrap($row).find("td").eq(3).should("contain", productPrice);
            //check product total price
            cy.wrap($row).find("td").eq(5).should("contain", totalPrice);
          });
        }
      });
  }

  deleteProductByName(itemName) {
    //get table rows length
    cy.get(".contentpanel table")
      .first()
      .find("tr:not(:first-child)")
      .then(($el) => {
        const rowCount = Cypress.$($el).length;
        if (rowCount !== 1) {
          cy.wrap($el).each(($element, index) => {
            //get product name
            const productName = $element.find("td").eq(1).find("a").text();
            //find proper item and remove it from cart
            if (productName === itemName) {
              //press remove btn
              cy.wrap($element)
                .find("td")
                .eq(6)
                .find("a.btn")
                .find("i")
                .should("have.class", "fa-trash-o")
                .click();
            }
          });
        } else {
          cy.wrap($el).then(($row) => {
            //press remove btn
            cy.wrap($row)
              .find("td")
              .eq(6)
              .find("a.btn")
              .find("i")
              .should("have.class", "fa-trash-o")
              .click();
          });
        }
      });
  }

  findProductNameInCartNotExists(itemName) {
    cy.get(".contentpanel table")
      .first()
      .find("tr:not(:first-child)")
      .then(($el) => {
        const rowCount = Cypress.$($el).length;
        if (rowCount !== 1) {
          cy.wrap($el).each(($element, index) => {
            ///get product name
            const productName = $element.find("td").eq(1).find("a").text();
            //find proper item and remove it from cart
            if (productName === itemName) {
              expect(productName).not.exist();
            } else {
              expect(productName).not.equal(itemName);
            }
          });
        } else {
          cy.wrap($el).then(($row) => {
            //get product name
            const productName = $row.find("td").eq(1).find("a").text();
            expect(productName).not.equal(itemName);
          });
        }
      });
  }

  checkNumberOfProductsInCartTopNavbar() {
    cy.get(".contentpanel").then(($content) => {
      const emptyCart = $content.text().trim().split("\n")[0];
      if (emptyCart.includes("Your shopping cart is empty!")) {
        cy.get(".headerdetails .topcart a span.label").then(($number) => {
          const numberProd = $number.text();
          expect(parseInt(numberProd)).to.be.equal(0);
        });
      } else {
        cy.get(".contentpanel table")
          .first()
          .find("tr:not(:first-child)")
          .then(($el) => {
            const rowCount = Cypress.$($el).length;
            cy.get(".headerdetails .topcart a span.label").then(($number) => {
              const numberProd = $number.text();
              expect(parseInt(numberProd)).to.be.equal(rowCount);
            });
          });
      }
    });
  }

  applyCouponCode(code) {
    //find apply coupon code table - verify the title of table
    cy.get(".contentpanel table")
      .eq(1)
      .find("th")
      .should("have.text", "Apply Coupon Code");
    //apply the code
    cy.get(".contentpanel table")
      .eq(1)
      .find("td")
      .then(($form) => {
        //check text
        const textForm = $form.find("p").text().trim();
        expect(textForm).to.be.equal(
          'Enter your code and click "Apply Coupon" and to see your discount instantly applied to your order.'
        );
        //enter the code
        cy.get("#coupon_coupon").type(code);
        cy.get("#apply_coupon_btn").click();
      });
  }

  verifyErrorCouponMsg() {
    //verify text
    cy.get(".alert-error")
      .find("strong")
      .should(
        "have.text",
        "Error: Coupon is either invalid, expired or reached it's usage limit!"
      );
    //verify background color
    cy.get(".alert-danger").should(
      "have.css",
      "background-color",
      "rgb(242, 222, 222)"
    );
  }

  changeQuantityOfProduct(itemName, newQuantity) {
    cy.get(".contentpanel table")
      .first()
      .find("tr:not(:first-child)")
      .then(($el) => {
        const rowCount = Cypress.$($el).length;
        if (rowCount !== 1) {
          cy.wrap($el).each(($element, index) => {
            //get product name
            const productName = $element.find("td").eq(1).find("a").text();
            //find proper item and remove it from cart
            if (productName === itemName) {
              //change quantity of product
              cy.wrap($element)
                .find("td")
                .eq(4)
                .find('input[type="text"]')
                .should("have.value", 1)
                .clear()
                .type(newQuantity)
                .should("have.value", newQuantity);
            }
          });
        } else {
          cy.wrap($el).then(($row) => {
            //change quantity of product
            cy.wrap($row)
              .find("td")
              .eq(4)
              .find('input[type="text"]')
              .should("have.value", 1)
              .clear()
              .type(newQuantity)
              .should("have.value", newQuantity);
          });
        }
      });
  }

  clickCartUpdateBtn() {
    cy.get("#cart_update").click();
  }

  clickCartCheckoutBtn() {
    cy.get("#cart_checkout1").click();
  }

  clickTotalCheckoutBtn() {
    cy.get("#cart_checkout2").click();
  }

  checkTotalPriceOfItem(itemName, totalPrice) {
    cy.get(".contentpanel table")
      .first()
      .find("tr:not(:first-child)")
      .then(($el) => {
        const rowCount = Cypress.$($el).length;
        if (rowCount !== 1) {
          cy.wrap($el).each(($element, index) => {
            //get product name
            const productName = $element.find("td").eq(1).find("a").text();
            //find proper item and remove it from cart
            if (productName === itemName) {
              //change quantity of product
              cy.wrap($element)
                .find("td")
                .eq(5)
                .should("have.text", totalPrice);
            }
          });
        } else {
          cy.wrap($el).then(($row) => {
            //change quantity of product
            cy.wrap($row).find("td").eq(5).should("have.text", totalPrice);
          });
        }
      });
  }

  fillFormToEstimateShippingAndTaxes(country, state, postcode) {
    //select a country
    cy.get("#estimate_country").select(country);
    //selcet zone
    cy.get("#estimate_country_zones").select(state);
    //enter the postcode
    cy.get("#estimate_postcode").type(postcode);
    //shipments rate default
    cy.get("#shippings").should("contain", "Flat Shipping Rate");
    //press estimate button
    cy.get('button[title="Estimate"]').click();
  }

  checkSubTotalValueInSummary() {
    //verify subtotal value if it is correct like in the cart details
    cy.get(".contentpanel table")
      .first()
      .find("tr:not(:first-child)")
      .then(($el) => {
        const rowCount = Cypress.$($el).length;
        if (rowCount !== 1) {
          //to do for more than 1 product in cart
        } else {
          cy.wrap($el).then(($row) => {
            const totalPrice = $row.find("td").eq(5).text();
            cy.get(".contentpanel table")
              .eq(3)
              .find("tr")
              .first()
              .find("td")
              .eq(1)
              .find("span.bold")
              .should("have.text", totalPrice);
          });
        }
      });
  }

  checkShipmentRateInSummary() {
    //get shipment cost from estimation of shipping and compare with value in summary
    cy.get("#shippings").then(($el) => {
      const shipmentRate = $el.text().split("-")[1].trim();
      cy.get(".contentpanel table")
        .eq(3)
        .find("tr")
        .eq(1)
        .find("td")
        .eq(1)
        .find("span.bold")
        .should("have.text", shipmentRate);
    });
  }

  checkFinalTotalValueInSummary() {
    cy.get(".contentpanel table")
      .eq(3)
      .find("tr")
      .then(($el) => {
        const subTotal = $el.first().find("td").eq(1).find("span.bold").text().split('$')[1].trim();
        const shipRate = $el.eq(1).find("td").eq(1).find("span.bold").text().split('$')[1].trim();
        const totalValue = $el.eq(2).find("td").eq(1).find("span.totalamout").text().split('$')[1].trim();

        //add subtotal and ship rate
        const addedSubAndRateValue = parseFloat(subTotal)+parseFloat(shipRate);
        //compare totals
        expect(totalValue).to.equal(addedSubAndRateValue.toFixed(2));
      });
  }

  clickContinueShoppingBtn(){
    cy.get(".cart_total").find('a[href="https://automationteststore.com/"]').click()
  }
}

export const onCartPage = new CartPage();
