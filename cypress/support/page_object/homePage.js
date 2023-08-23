/// <reference types="Cypress" />

export class HomePage {
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

  checkHomeSectionActiveSubnav() {
    cy.get(".categorymenu li a.active").should("have.text", "Home");
  }

  addItemToCartByProductName(itemName, itemPrice) {
    cy.get("a.prdocutname")
      .filter(':contains("' + itemName + '")')
      .then(($el) => {
        //get element length
        const elCount = Cypress.$($el).length;
        if (elCount > 1) {
          //check element title
          const firstElement = $el.first();
          expect(firstElement).to.have.text(itemName);
          //check price
          cy.wrap($el)
            .first()
            .closest(".fixed_wrapper")
            .parent("div")
            .find(".pricetag.jumbotron")
            .find(".price")
            .then(($price) => {
              //check if element has class .pricenew
              const priceDiv = $price.find("div");
              const priceClassDiv = Cypress.$(priceDiv).hasClass("pricenew");
              if (priceClassDiv) {
                const elementNewPrice = $price.find(".pricenew").text();
                expect(elementNewPrice).to.contain(itemPrice);
              } else {
                const elementPrice = $price.find(".oneprice").text();
                expect(elementPrice).to.contain(itemPrice);
              }
            });
          //add to cart
          cy.wrap($el)
            .first()
            .closest(".fixed_wrapper")
            .parent("div")
            .find(".pricetag.jumbotron")
            .find('[title="Add to Cart"]')
            .click();
          //if added then new icon added to cart exists, new class and background color of div element
          cy.wrap($el)
            .first()
            .closest(".fixed_wrapper")
            .parent("div")
            .find(".pricetag.jumbotron")
            .find('[title="Added to cart"]')
            .should("be.visible");
          cy.wrap($el)
            .first()
            .closest(".fixed_wrapper")
            .parent("div")
            .find(".pricetag.jumbotron")
            .should("have.class", "added_to_cart");
          cy.wrap($el)
            .first()
            .closest(".fixed_wrapper")
            .parent("div")
            .find(".added_to_cart")
            .should("have.css", "background-color", "rgb(223, 240, 216)");
          //delete from basket on element
          //.quick_basket .find('[title="Added to cart"]')
        } else {
          //check element title
          const firstElement = $el.first();
          expect(firstElement).to.have.text(itemName);
          //check price
          cy.wrap($el)
            .first()
            .closest(".fixed_wrapper")
            .parent("div")
            .find(".pricetag.jumbotron")
            .find(".price")
            .then(($price) => {
              //check if element has class pricenew
              const priceDiv = $price.find("div");
              const priceClassDiv = Cypress.$(priceDiv).hasClass("pricenew");
              if (priceClassDiv) {
                const elementNewPrice = $price.find(".pricenew").text();
                expect(elementNewPrice).to.contain(itemPrice);
              } else {
                const elementPrice = $price.find(".oneprice").text();
                expect(elementPrice).to.contain(itemPrice);
              }
            });
          //add to cart
          cy.wrap($el)
            .first()
            .closest(".fixed_wrapper")
            .parent("div")
            .find(".pricetag.jumbotron")
            .find('[title="Add to Cart"]')
            .click();
          //if added then new icon added to cart exists, new class and background color of div element
          cy.wrap($el)
            .first()
            .closest(".fixed_wrapper")
            .parent("div")
            .find(".pricetag.jumbotron")
            .find('[title="Added to cart"]')
            .should("be.visible");
          cy.wrap($el)
            .first()
            .closest(".fixed_wrapper")
            .parent("div")
            .find(".pricetag.jumbotron")
            .should("have.class", "added_to_cart");
          cy.wrap($el)
            .first()
            .closest(".fixed_wrapper")
            .parent("div")
            .find(".added_to_cart")
            .should("have.css", "background-color", "rgb(223, 240, 216)");
        }
      });
  }

  tryToAddProductOutOfStock(itemName, itemPrice) {
    cy.get("a.prdocutname")
      .filter(':contains("' + itemName + '")')
      .then(($el) => {
        //get element length
        const elCount = Cypress.$($el).length;
        if (elCount > 1) {
          //check element title
          const firstElement = $el.first();
          expect(firstElement).to.have.text(itemName);
          //check price
          cy.wrap($el)
            .first()
            .closest(".fixed_wrapper")
            .parent("div")
            .find(".pricetag.jumbotron")
            .find(".price")
            .then(($price) => {
              //check if element has class .pricenew
              const priceDiv = $price.find("div");
              const priceClassDiv = Cypress.$(priceDiv).hasClass("pricenew");
              if (priceClassDiv) {
                const elementNewPrice = $price.find(".pricenew").text();
                expect(elementNewPrice).to.contain(itemPrice);
              } else {
                const elementPrice = $price.find(".oneprice").text();
                expect(elementPrice).to.contain(itemPrice);
              }
            });
          //out of stock information
          cy.wrap($el)
            .first()
            .closest(".fixed_wrapper")
            .parent("div")
            .find(".pricetag.jumbotron")
            .find(".nostock")
            .should("have.text", "Out of Stock");
          //add to cart button should not exists
          cy.wrap($el)
            .first()
            .closest(".fixed_wrapper")
            .parent("div")
            .find(".pricetag.jumbotron")
            .find('[title="Add to Cart"]')
            .should("not.exist");
        } else {
          //check element title
          const firstElement = $el.first();
          expect(firstElement).to.have.text(itemName);
          //check price
          cy.wrap($el)
            .first()
            .closest(".fixed_wrapper")
            .parent("div")
            .find(".pricetag.jumbotron")
            .find(".price")
            .then(($price) => {
              //check if element has class pricenew
              const priceDiv = $price.find("div");
              const priceClassDiv = Cypress.$(priceDiv).hasClass("pricenew");
              if (priceClassDiv) {
                const elementNewPrice = $price.find(".pricenew").text();
                expect(elementNewPrice).to.contain(itemPrice);
              } else {
                const elementPrice = $price.find(".oneprice").text();
                expect(elementPrice).to.contain(itemPrice);
              }
            });
          //out of stock information
          cy.wrap($el)
            .first()
            .closest(".fixed_wrapper")
            .parent("div")
            .find(".pricetag.jumbotron")
            .find(".nostock")
            .should("have.text", "Out of Stock");
          //add to cart button should not exists
          cy.wrap($el)
            .first()
            .closest(".fixed_wrapper")
            .parent("div")
            .find(".pricetag.jumbotron")
            .find('[title="Add to Cart"]')
            .should("not.exist");
        }
      });
  }

  checkHomePageText(textMsg) {
    cy.get(".welcome_msg")
      .find("h4")
      .then(($text) => {
        const text = $text.text().replaceAll("\n", "");
        expect(text).to.equal(textMsg);
      });
  }

  verifyExistenceOfPromoInformationSection() {
    cy.get("section.promo_section").should("be.visible");
  }

  verifyIconAndTextOfPromoSectionElement() {
    const classArr = ["fa-truck", "fa-money", "fa-clock-o", "fa-tags"];
    const textArr = [
      "Fast shipping",
      "Easy Payments",
      "Shipping Options",
      "Large Variety",
    ];
    cy.get("section.promo_section").children("div").should("have.length", 4);
    cy.get("section.promo_section")
      .children("div")
      .each(($el, index) => {
        //check icon
        cy.wrap($el)
          .find(".promo_icon")
          .find("i")
          .should("have.class", classArr[index]);
        //check text
        const promoText = $el.find(".promo_text").find("h2").text().trim();
        expect(promoText).to.equal(textArr[index]);
      });
  }

  checkAboutUsFooterHeader(text) {
    cy.get("#block_frame_html_block_1775").find("h2").should("have.text", text);
  }

  checkAboutUsFooterText(text) {
    cy.get("#block_frame_html_block_1775")
      .find("p")
      .then(($text) => {
        const textFooter = $text.text().trim();
        expect(textFooter).to.equal(text);
      });
  }

  checkContactUsFooterHeader(text) {
    cy.get("#block_frame_html_block_1776").find("h2").should("have.text", text);
  }

  checkContactUsFooterText(text) {
    cy.get("#block_frame_html_block_1776")
      .find("ul")
      .then(($list) => {
        cy.wrap($list)
          .find("li")
          .each(($el, index) => {
            const textFooter = $el.text().trim();
            expect(textFooter).to.equal(text[index]);
          });
      });
  }

  checkTestimonialsFooterHeader(text) {
    cy.get("#block_frame_html_block_1777").find("h2").should("have.text", text);
  }

  checkTestimonialsSidebar(text) {
    cy.get("#testimonialsidebar")
      .children("ol")
      .find("li")
      .then(($button) => {
        cy.wrap($button).each(($btn, index) => {
          //click each btn to slide new text
          cy.wrap($btn)
            .contains("a", index + 1)
            .click();
          //verify text on slides
          cy.get("#testimonialsidebar")
            .find("ul.slides")
            .find("li.flex-active-slide")
            .then(($text) => {
              const slideText = $text.text().trim().replace("\n", "");
              expect(slideText).to.contain(text[index]);
            });
        });
      });
  }

  checkNewsletterFooterHeader(text) {
    cy.get("#newslettersignup").find("h2").should("have.text", text);
  }

  checkNewsletterFooterText(text) {
    cy.get("#newslettersignup").find(".newsletter").should("have.text", text);
  }

  signUpForNewsletterFooterInput(email) {
    //check placeholder in input and then provide email
    cy.get("#subscribeFrm")
      .find('[name="email"]')
      .invoke("attr", "placeholder")
      .should("contain", "Subscribe to Newsletter");
    cy.get("#subscribeFrm").find('[name="email"]').type(email);
    //click btn
    cy.get("#subscribeFrm").find('[type="submit"]').click();
  }

  checkBrandscrollingListLength() {
    cy.get("#block_frame_listing_block_1774")
      .find(".maintext")
      .should("have.text", "Brands Scrolling List");
    cy.get("#block_frame_listing_block_1774")
      .find("#brandcarousal > li")
      .should("have.length", 10);
  }

  checkBrandscrollingListBrandsNames(brands) {
    cy.get("#block_frame_listing_block_1774")
      .find("#brandcarousal > li")
      .find("div.image")
      .find("img")
      .each(($element, index) => {
        cy.wrap($element)
          .should("have.attr", "alt")
          .then(($brandName) => {
            cy.wrap($brandName).should("be.equal", brands.names[index]);
          });
      });
  }

  checkIfUserisNotLoggedIn(){
    cy.get("#customer_menu_top > li").should('have.text', 'Login or register');
    //dropdown should not exists
    cy.get("#customer_menu_top").find('li.dropdown').should('not.exist');
  }

  checkIfCartIsEqualToZeroByDefault(){
    //check if there is 0 value in cart topnavbar
    cy.get('.topcart span.label').should('have.text', '0');
    //check if there is empty cart in dropdown list cart
    cy.get('.topcart .topcartopen #top_cart_product_list > div').should('have.class', 'empty_cart')
  }

  checkAllCategoryAndSubcategoryOptions(categoryObj){
    cy.get("ul.categorymenu > li").each(($listEl, index) => {
      const categoryTitle = $listEl.children('a').text().trim();
      //check category titles
      expect(categoryTitle).to.equal(categoryObj[index].title);
      //check subcategories - for Home there is a different path
      if(categoryTitle === "Home"){
        cy.wrap($listEl).find('#main_menu > li > a').each(($subCat, index2) =>{
          let subCategories = $subCat.find('span.menu_text').text().trim();
          expect(subCategories).to.equal(categoryObj[index].subcategories[index2])
        })
      } else {
        cy.wrap($listEl).find('.subcategories').find('a').each(($subCat, index2) => {
          let subCategories = $subCat.text().trim();
          expect(subCategories).to.equal(categoryObj[index].subcategories[index2])
        })
      }
    })
  }

  clickToCategoryPageByTitle(title){
    cy.get("ul.categorymenu > li").contains('a', title).click();
  }
}

export const onHomePage = new HomePage();
