export class NavigationPage{

    loginOrRegister() {
        cy.get("#customer_menu_top").click();
      }
    
      goToSpecialsNavbar() {
        cy.get("#main_menu_top").find('[data-id="menu_specials"]').click();
      }
    
      goToCartNavbar() {
        cy.get("#main_menu_top").find('[data-id="menu_cart"]').click();
      }
    
      goToCheckoutNavbar() {
        cy.get("#main_menu_top").find('[data-id="menu_cart"]').click();
      }
    
      goToCheckOrderNavbar() {
        cy.get("#main_menu_top")
          .find('[data-id="menu_account"]')
          .find("a.top.menu_account")
          .trigger("mouseover");
        cy.get("li.open").find('[data-id="menu_order"]').click();
      }
    
      goToAccountLoginNavbar() {
        cy.get("#main_menu_top")
          .find('[data-id="menu_account"]')
          .find("a.top.menu_account")
          .trigger("mouseover");
        cy.get("li.open").find('[data-id="menu_login"]').click();
      }

}

export const navigateTo = new NavigationPage()