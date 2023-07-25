describe('Authorization - login and reguster tests', () => {
    beforeEach('open a website', () =>
    {
        cy.visit('/')
    })
    it('Create a new account', () => {
        cy.get('#customer_menu_top').click()
    });
});