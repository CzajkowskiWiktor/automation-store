export class NavigationPage{

    loginOrRegister(){
        cy.get('#customer_menu_top').click()
    }

}

export const navigateTo = new NavigationPage()