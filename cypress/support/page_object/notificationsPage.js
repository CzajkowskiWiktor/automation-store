/// <reference types="Cypress" />

export class NotificationsPage {
  checkUrlAndTitlePage() {
    cy.verifyUrlAndTitlePage("notification", "Notifications and Newsletter");
  }

  checkPathContentToNotifications() {
    cy.get(".breadcrumb").find("li").should("contain", "Notifications");
  }

  checkSelectedOptionInSidebarlist() {
    cy.get(".myaccountbox")
      .find("li.selected")
      .should("contain", "Notifications");
  }

  clickContinueBtn() {
    cy.get('[title="Continue"]').click();
  }

  clickBackBtn() {
    cy.get('[title="Back"]').click();
  }

  verifyStatusOfNotificationsCheckboxes() {
    cy.get(".contentpanel >table>tbody>tr>td:nth-child(2)").each(
      ($el, index) => {
        if (index === 0) {
          cy.wrap($el)
            .find("input")
            .should("not.be.checked")
            .and("not.have.attr", "disabled");
        } else {
          cy.wrap($el)
            .find("input")
            .should("be.checked")
            .and("have.attr", "disabled");
        }
      }
    );
  }

  checkNewslettersHeader(){
    cy.get(".contentpanel >table>tbody>tr>td:nth-child(1)")
      .eq(0)
      .should('contain', 'Newsletters')
  }

  selectNewslettersCheckbox() {
    this.checkNewslettersHeader();
    cy.get(".contentpanel >table>tbody>tr>td:nth-child(2)")
      .eq(0)
      .find("input")
      .should('not.be.checked')
      .check({force: true});
  }

  unselectNewslettersCheckbox(){
    this.checkNewslettersHeader();
    cy.get(".contentpanel >table>tbody>tr>td:nth-child(2)")
      .eq(0)
      .find("input")
      .should('be.checked')
      .uncheck({force: true})
  }

  //Success: Your notification settings has been successfully updated!
}

export const onNotificationsPage = new NotificationsPage();
