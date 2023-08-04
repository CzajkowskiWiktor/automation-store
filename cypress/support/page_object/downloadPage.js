/// <reference types="Cypress" />

export class DownloadPage {
  checkUrlAndTitlePage() {
    cy.verifyUrlAndTitlePage("download", "Account Downloads");
  }

  checkPathContentToDownload() {
    cy.get(".breadcrumb").find("li").should("contain", "Downloads");
  }

  checkSelectedOptionInSidebarlist() {
    cy.get(".myaccountbox").find("li.selected").should("contain", "Downloads");
  }

  verifyNoDownloadsRecords() {
    //no downloads records text
    cy.get(".contentpanel").should(
      "contain",
      "You have not made any previous downloadable orders!"
    );
  }

  clickContinueBtn() {
    cy.get('[title="Continue"]').click();
  }
}

export const onDownloadPage = new DownloadPage();
