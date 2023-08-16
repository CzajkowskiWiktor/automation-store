/// <reference types="Cypress" />

export class PaymentEditPage {
  checkUrlAndTitlePage() {
    cy.verifyUrlAndTitlePage("payment&mode=edit", "Payment Information");
  }

  checkPathContentToPaymentEdit() {
    cy.get(".breadcrumb").find("li").should("contain", "Payment");
  }

  clickChangeAddressBtn() {
    cy.get('[title="Change Address"]').click();
  }

  applyCouponCode(code) {
    cy.get("#coupon_coupon").type(code);
  }

  clickApplyCouponBtn() {
    cy.get("#apply_coupon_btn").click();
  }

  verifyErrorMessage() {
    cy.get(".alert-error").then(($el) => {
      const errroMsg = $el.text().trim();
      expect(errroMsg).to.contain(
        "Error: Coupon is either invalid, expired or reached it's usage limit!"
      );
    });
  }

  verifyErrorCouponRemoveBtnExists() {
    cy.get("#remove_coupon_btn").should("exist");
  }

  addCommentToOrder(text) {
    cy.get("#payment_comment").clear().type(text);
  }

  agreeCheckboxToReturnPolicy() {
    cy.get("#payment_agree").check({ force: true }).should("be.checked");
  }

  clickContinueBtn() {
    cy.get('[title="Continue"]').click();
  }

  verifyErrorMessageNotCheckReturnPolicy() {
    cy.get(".alert-error").then(($el) => {
      const errroMsg = $el.text().trim();
      expect(errroMsg).to.contain(
        "Error: You must agree to the Return Policy!"
      );
    });

    cy.get(".alert-danger").should("have.css", "color", "rgb(169, 68, 66)");
  }

  closeErrorMessageBtn() {
    cy.get(".alert-error").find('button[data-dismiss="alert"]').click();
  }
}

export const onPaymentEditPage = new PaymentEditPage();
