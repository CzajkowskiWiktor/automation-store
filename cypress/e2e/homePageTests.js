/// <reference types="Cypress" />

import { onHomePage } from "../support/page_object/homePage";

describe("Home Page basic Testing", () => {
  beforeEach("open a website and login to account", () => {
    //open home page and check if section home is active
    cy.openHomePage();
    onHomePage.checkHomeSectionActiveSubnav();
  });

  it("check welcome message on home page", () => {
    const textMsg =
      "Welcome to the Automation Test Store! This is not a real store. No orders are actually placed or any payments taken. It is recommended you use test data when practicing using this site. This site is to be used for educational purposes only. Enjoy!";
    onHomePage.checkHomePageText(textMsg);
  });

  it("check existence of promo information section", () => {
    //check if section exists and then verify the icons and texts of these elements
    onHomePage.verifyExistenceOfPromoInformationSection();
    onHomePage.verifyIconAndTextOfPromoSectionElement();
  });

  it("check about us footer details", () => {
    onHomePage.checkAboutUsFooterHeader("About Us");
    onHomePage.checkAboutUsFooterText(
      "This store has been created to enable students to practice their automation testing skills. This is not a real store, no orders are actually placed or payments taken. This store is to be used for educational purposes only."
    );
  });

  it("check contact us footer details", () => {
    onHomePage.checkContactUsFooterHeader("Contact Us");
    onHomePage.checkContactUsFooterText([
      "+123 456 7890",
      "admin@automationteststore.com",
    ]);
  });

  it("check testimonials footer", () => {
    onHomePage.checkTestimonialsFooterHeader("Testimonials");
    onHomePage.checkTestimonialsSidebar([
      '"Really great products and professional service!"',
      '"I found this store to be very reasonably priced and the service was superb. Highly recommended "',
      '"Returns were easy and my replacement item arrived very quickly. Really great service. Thanks and will be buying again."',
      '"Regular customer and products at great prices. Thanks again."',
    ]);
  });

  it("sign up for newsletter group", () => {
    onHomePage.checkNewsletterFooterHeader("Newsletter Signup");
    onHomePage.checkNewsletterFooterText(
      "Sign up to Our Newsletter & get attractive Offers by subscribing to our newsletters."
    );
    onHomePage.signUpForNewsletterFooterInput("test@test.com");
  });

  it("check brand scrolling list details", () => {
    const brands = {
      names: [
        "Benefit",
        "Pantene",
        "M·A·C",
        "Lancôme",
        "Gucci",
        "Giorgio Armani",
        "Dove",
        "Calvin Klein",
        "Bvlgari",
        "Sephora",
      ],
    };
    onHomePage.checkBrandscrollingListLength();
    onHomePage.checkBrandscrollingListBrandsNames(brands);
  });

  it("check if by default the user is not logged in", () => {
    onHomePage.checkIfUserisNotLoggedIn();
  });

  it("check cart number in homePage if it is 0 by default", () => {
    onHomePage.checkIfCartIsEqualToZeroByDefault();
  });
});
