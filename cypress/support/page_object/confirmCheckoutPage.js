/// <reference types="Cypress" />

export class ConfirmCheckoutPage {
  checkUrlAndTitlePage() {
    cy.verifyUrlAndTitlePage("confirm", "Checkout Confirmation");
  }

  checkPathContentToConfrim() {
    cy.get(".breadcrumb").find("li").should("contain", "Confirm");
  }

  verifyTextOfAcceptInReturnPolicy() {
    cy.get(".contentpanel > p").then(($el) => {
      const textEl = $el.text().trim();
      expect(textEl).to.contain(
        "By clicking Confirm Order, you accept and agree to all terms of"
      );
    });
  }

  clickConfirmOrderBtn() {
    cy.get("#checkout_btn").click();
  }

  clickBackBtn() {
    cy.get('[title=""Back]').click();
  }

  verifyDataOnShippingTable(user) {
    cy.get(".confirm_shippment_options")
      .find("td")
      .then(($row) => {
        //check user full name and phone
        const namePhoneRow = $row
          .first()
          .text()
          .split("\t")
          .filter((el) => el);
        const fullName = namePhoneRow[0];
        const phoneNumber = namePhoneRow[1];
        expect(fullName).to.equal(user.firstname + " " + user.lastname);
        //check if user object has tele key
        if(user.hasOwnProperty("tele")){
            expect(phoneNumber).to.equal(user.tele);
        }

        //check address information
        const addressRow = $row
          .eq(1)
          .find("address")
          .text()
          .split("\n")
          .filter((el) => el);
        const address = addressRow[0].trim();
        const city = addressRow[1].trim().split(" ")[0];
        const zone = addressRow[1].trim().split(" ")[1];
        const postcode = addressRow[1].trim().split(" ")[2];
        const country = addressRow[2].trim();
        expect(address).to.equal(user.address1);
        expect(city).to.equal(user.city);
        expect(zone).to.equal(user.zone);
        expect(postcode).to.equal(user.postcode);
        expect(country).to.equal(user.country);

        //check rate configuration
        const rateRow = $row.eq(2).text().trim();
        expect(rateRow).to.equal("Flat Shipping Rate");
      });
  }

  verifyDataOnPaymentTable(user) {
    cy.get(".confirm_payment_options")
      .find("td")
      .then(($row) => {
        //check user full name and phone
        const namePhoneRow = $row
          .first()
          .text()
          .split("\t")
          .filter((el) => el);
        const fullName = namePhoneRow[0];
        const phoneNumber = namePhoneRow[1];
        expect(fullName).to.equal(user.firstname + " " + user.lastname);
        //check if user object has tele key
        if(user.hasOwnProperty("tele")){
            expect(phoneNumber).to.equal(user.tele);
        }

        //check address information
        const addressRow = $row
          .eq(1)
          .find("address")
          .text()
          .split("\n")
          .filter((el) => el);
        const address = addressRow[0].trim();
        const city = addressRow[1].trim().split(" ")[0];
        const zone = addressRow[1].trim().split(" ")[1];
        const postcode = addressRow[1].trim().split(" ")[2];
        const country = addressRow[2].trim();
        expect(address).to.equal(user.address1);
        expect(city).to.equal(user.city);
        expect(zone).to.equal(user.zone);
        expect(postcode).to.equal(user.postcode);
        expect(country).to.equal(user.country);

        //check cash payment configuration
        const cashRow = $row.eq(2).text().trim();
        expect(cashRow).to.equal("Cash On Delivery");
      });
  }

  verifyItemsInCart(itemName, itemQuantity, itemPrice) {
    //to do - check for more than 1 product
    cy.get(".confirm_products")
      .find("tr")
      .then(($row) => {
        const rowCount = Cypress.$($row).length;
        if (rowCount !== 1) {
            cy.wrap($row).each(($element, index) => {
                const itemNameCart = $element.find('td').eq(1).text().trim();
                expect(itemNameCart).to.equal(itemName[index]);
                //verify product price and quantity
                const itemPriceCart = $element.find('td').eq(2).text().trim();
                const itemQuantityCart = $element.find('td').eq(3).text().trim();
                const totalPriceCart = $element.find('td').eq(4).text().split("$")[1].trim();
                const calculatedTotalPrice =
                parseFloat(itemPriceCart.split("$")[1].trim()) * parseInt(itemQuantityCart);
                expect(itemPriceCart).to.equal(itemPrice[index]);
                //check if itemQuantity is an array
                if(Array.isArray(itemQuantity)){
                    expect(parseInt(itemQuantityCart)).to.equal(itemQuantity[index]);
                } else {
                    expect(parseInt(itemQuantityCart)).to.equal(itemQuantity);
                } 
                expect(totalPriceCart).to.equal(calculatedTotalPrice.toFixed(2));
              });
          } else {
            //verify product name
            const itemNameCart = $row.find('td').eq(1).text().trim();
            expect(itemNameCart).to.equal(itemName);
            //verify product price and quantity
            const itemPriceCart = $row.find('td').eq(2).text().trim();
            const itemQuantityCart = $row.find('td').eq(3).text().trim();
            const totalPriceCart = $row.find('td').eq(4).text().split("$")[1].trim();
            const calculatedTotalPrice =
            parseFloat(itemPriceCart.split("$")[1].trim()) * parseInt(itemQuantityCart);
            expect(itemPriceCart).to.equal(itemPrice);
            expect(parseInt(itemQuantityCart)).to.equal(itemQuantity);
            expect(totalPriceCart).to.equal(calculatedTotalPrice.toFixed(2));
          }
      });
  }

  verifyPaymentCashAmountTotal() {
    //check subtotal value
    cy.get(".confirm_products")
      .find('tr')
      .then(($el) => {
        const rowCount = Cypress.$($el).length;
        cy.log(rowCount + " total row/s")
        if (rowCount !== 1) {
            let totalValue=0;
            cy.wrap($el).each(($element, index, array) => {
                const totalPriceCart = $element.find('td').eq(4).text().split('$')[1].trim();
                totalValue += parseFloat(totalPriceCart)
                //on last iteration verify total value
                if(index === array.length - 1){
                    cy.log(totalValue.toFixed(2))
                    cy.get(".contentpanel table")
                        .eq(3)
                        .find("tr")
                        .first()
                        .find("td")
                        .eq(1)
                        .find("span.bold")
                        .should('contain', totalValue.toFixed(2))
                }
            })
        } else {
          cy.wrap($el).then(($row) => {
            //get total price value from cart table
            const totalPriceCart = $row.find('td').eq(4).text().trim();
            //check subtotal value in table
            cy.get(".contentpanel table")
                .eq(3)
                .find("tr")
                .first()
                .find("td")
                .eq(1)
                .find("span.bold")
                .should('have.text', totalPriceCart)
          });
        }
      });

    //check shipping rate
    cy.get(".contentpanel table")
      .eq(3)
      .find("tr")
      .eq(1)
      .find("td")
      .eq(1)
      .find("span.bold")
      .then(($el) => {
        let ratePrice = $el.text();
        if (ratePrice.includes("$")) {
          ratePrice = ratePrice.split("$")[1].trim();
          expect(parseFloat(ratePrice)).to.equal(2.0);
        } else if (ratePrice.includes("€")) {
          ratePrice = ratePrice.split("€")[0].trim();
          expect(parseFloat(ratePrice).toFixed(2)).to.equal(1.88);
        } else if (ratePrice.includes("£")) {
          ratePrice = ratePrice.split("£")[1].trim();
          expect(parseFloat(ratePrice).toFixed(2)).to.equal(1.59);
        }
      });

    //check total amount value
    cy.get(".contentpanel table")
      .eq(3)
      .find("tr")
      .then(($el) => {
        const subTotal = $el
          .first()
          .find("td")
          .eq(1)
          .find("span.bold")
          .text()
          .split("$")[1]
          .trim();
        const shipRate = $el
          .eq(1)
          .find("td")
          .eq(1)
          .find("span.bold")
          .text()
          .split("$")[1]
          .trim();
        const totalValue = $el
          .eq(2)
          .find("td")
          .eq(1)
          .find("span.totalamout")
          .text()
          .split("$")[1]
          .trim();
        //add subtotal and ship rate
        const addedSubAndRateValue =
          parseFloat(subTotal) + parseFloat(shipRate);
        //compare totals
        expect(totalValue).to.equal(addedSubAndRateValue.toFixed(2));
      });
  }

  verifyOrderSummary(){
    //get order summary table and verify all data
    cy.get('.heading2').should('have.text', 'Order Summary').closest('div').then($form => {
        //item name and price
        cy.wrap($form).find('table').first().find('tr').then($row => {
            const rowCount = Cypress.$($row).length;
            if (rowCount !== 1) {
                //to do for more than 1 product in cart
                cy.wrap($row).each((el, index) => {
                    const productName = el.find('td').first().text().split('x')[1].trim()
                    const productQuantity = el.find('td').first().text().split('x')[0].trim()
                    const productPrice = el.find('td').eq(1).text().trim();
                    //check and verify each of product info from order summary comparing to a cart information
                    cy.get(".confirm_products")
                        .find('tr')
                        .then($element => {
                            cy.wrap($element).each(($cartRow, index) => {
                                const cartItemName = $cartRow.find('td').eq(1).text().trim();
                                if(cartItemName === productName){
                                    expect(cartItemName).to.equal(productName);
                                    const cartItemQuantity = $cartRow.find('td').eq(3).text().trim();
                                    expect(cartItemQuantity).to.equal(productQuantity);
                                    const cartItemPrice = $cartRow.find('td').eq(2).text().trim();
                                    expect(cartItemPrice).to.equal(productPrice);
                                }
                            })
                    })
                })
            } else {
                const productName = $row.find('td').first().text().split('x')[1].trim()
                const productQuantity = $row.find('td').first().text().split('x')[0].trim()
                const productPrice = $row.find('td').eq(1).text().trim();
                this.verifyItemsInCart(productName, parseInt(productQuantity), productPrice)
            }
        })

        //subtotals and total value
        cy.wrap($form).find('table').eq(1).find('tr').then($tableRow => {
            //subtotal
            const subTotalValue = $tableRow.first().find('td').eq(1).text().trim()
            //get value from order summary - get data from table total payment value
            cy.get(".contentpanel table")
                .eq(3)
                .find("tr")
                .first()
                .find("td")
                .eq(1)
                .find("span.bold")
                .should('have.text', subTotalValue);
            //shipping rate
            const shippingRate = $tableRow.eq(1).find('td').eq(1).text().trim()
            cy.get(".contentpanel table")
                .eq(3)
                .find("tr")
                .eq(1)
                .find("td")
                .eq(1)
                .find("span.bold")
                .then(($el) => {
                    let ratePrice = $el.text();
                    expect(ratePrice).to.equal(shippingRate);
            });
            //total value - get data from table total payment value
            const totalValue =  $tableRow.eq(2).find('td').eq(1).text().trim()
            cy.get(".contentpanel table")
                .eq(3)
                .find("tr")
                .eq(2)
                .find("td")
                .eq(1)
                .find("span.totalamout")
                .should('have.text', totalValue);
        })
    })
  }

  clickEditShippingBtn(){
    cy.get('.confirm_shippment_options').find('a.btn').click();
  }

  clickEditPaymentBtn(){
    cy.get('.confirm_payment_options').contains('a','Edit Payment').click();
  }

  clickEditCouponBtn(){
    cy.get('.confirm_payment_options').contains('a','Edit Coupon').click();
  }

  clickEditCartBtn(){
    cy.get('.heading4').contains('a','Edit Cart').click();
  }

  checkCommentFormExistence(){
    cy.contains('h4', 'Your Comments').should('exist');
  }

  checkCommentFormNonExistence(){
    cy.contains('h4', 'Your Comments').should('not.exist');
  }

  checkCommentText(text){
    cy.contains('h4', 'Your Comments').next().should('have.text', text);
  }
}

export const onConfirmCheckoutPage = new ConfirmCheckoutPage();
