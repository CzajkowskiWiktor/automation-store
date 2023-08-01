/// <reference types="Cypress" />

export class ChangePasswordPage{
    checkUrlAndTitlePage() {
        cy.verifyUrlAndTitlePage("password", "Change Password");
      }

      checkPathContentToChangePassword() {
        cy.get(".breadcrumb")
          .find("li")
          .should("contain", "Change Password")
          .and("have.length", 3);
      }

      fillCurrentPassword(password){
        cy.get('#PasswordFrm_current_password').type(password)
      }

      fillNewPassword(newPass){
        cy.get('#PasswordFrm_password').type(newPass)
      }

      fillNewPasswordConfirm(passConfirm){
        cy.get('#PasswordFrm_confirm').type(passConfirm)
      }

      fillTheCompleteForm(pass, newPass, passConfirm){
        this.fillCurrentPassword(pass)
        this.fillNewPassword(newPass)
        this.fillNewPasswordConfirm(passConfirm)
      }

      verifyErrorMessage(msg){
        cy.get(".alert-error").should("contain", msg);
      }

      clickContinueBtnToChangePassword() {
        cy.get(".contentpanel").find('[title="Continue"]').click();
      }
    
      clickBackBtn() {
        cy.get(".contentpanel").find('[title="Back"]').click();
      }

      checkCurrentPasswordError(msg) {
        cy.get(".has-error")
          .contains("Current Password:")
          .parents(".has-error")
          .find(".help-block")
          .should("have.text", msg);
      }

      checkNewPasswordError(msg) {
        cy.get(".has-error")
          .contains("New Password:")
          .parents(".has-error")
          .find(".help-block")
          .should("have.text", msg);
      }

      checkNewPasswordConfirmError(msg) {
        cy.get(".has-error")
          .contains("New Password Confirm:")
          .parents(".has-error")
          .find(".help-block")
          .should("have.text", msg);
      }

      checkAmountOfInputErrors(amount){
        cy.get(".has-error").should("have.length", amount);
      }
}

export const onChangePasswordPage = new ChangePasswordPage();