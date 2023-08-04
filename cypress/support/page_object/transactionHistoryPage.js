/// <reference types="Cypress" />

export class TransactionHistoryPage{
    checkUrlAndTitlePage() {
        cy.verifyUrlAndTitlePage("transactions", "My Transactions");
      }

      checkPathContentToTransactionHistory() {
        cy.get(".breadcrumb")
          .find("li")
          .should("contain", "Transactions History")
      }
    
      checkSelectedOptionInSidebarlist() {
        cy.get(".myaccountbox")
          .find("li.selected")
          .should("contain", "Transaction history");
      }

      verifyNoTransactionHistoryRecords(){
        //no transaction records tex
        cy.get('.contentpanel div').eq(0).should('have.text', 'You have no transactions recorded on your account!')
        //no records in table
        cy.get('.contentpanel >table>thead>tr').should('have.length', 1)
    }
}

export const onTransactionHistoryPage = new TransactionHistoryPage()