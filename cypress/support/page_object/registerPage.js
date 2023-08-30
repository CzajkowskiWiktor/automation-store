/// <reference types="Cypress" />
function verifyUrlAndTitle(url, title) {
  //verify if the page title is correct
  cy.url().should("include", "/" + url);
  cy.get("h1.heading1").should("contain", title);
}

function checkErrorMessages(className, msg) {
  const errorMessages = Array.isArray(msg);
  if (errorMessages) {
    cy.get(className).each(($el, index) => {
      cy.wrap($el).should("contain", msg[index]);
    });
  } else {
    cy.get(className).should("contain", msg);
  }
}

function getRandomEmail(domain,length)
{
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for( var i=0; i < length; i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text + domain;
}

function getRandomLogin(length)
{
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for( var i=0; i < length; i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}

export class RegisterPage {
  verifyRegisterPageTitle() {
    //check create an account site
    // cy.url().should("include", "/create");
    // cy.get("h1.heading1").should("contain", "Create Account");
    verifyUrlAndTitle("create", "Create Account");
  }

  fillRegisterForm(
    firstname,
    lastname,
    email="",
    telephone,
    address1,
    city,
    country,
    postcode,
    zone,
    login="",
    password,
    passwordConfirm,
    newsletter,
    agreePolicy
  ) {
    //get and fill account form
    cy.get("#AccountFrm").then((form) => {
      cy.wrap(form).find("#AccountFrm_firstname").type(firstname);
      cy.wrap(form).find("#AccountFrm_lastname").type(lastname);
      if(email !== ""){
        cy.wrap(form).find("#AccountFrm_email").type(email);
      } else {
        cy.wrap(form).find("#AccountFrm_email").type(getRandomEmail("@example.com",15));
      }
      cy.wrap(form).find("#AccountFrm_telephone").type(telephone);
      cy.wrap(form).find("#AccountFrm_address_1").type(address1);
      cy.wrap(form).find("#AccountFrm_city").type(city);
      cy.wrap(form).find("#AccountFrm_country_id").select(country);
      //   .should("have.value", "170");
      cy.wrap(form).find("#AccountFrm_postcode").type(postcode);
      cy.wrap(form).find("#AccountFrm_zone_id").select(zone);
      //login details
      cy.wrap(form).find(".heading4").should("contain", "Login Details");
      if(login !== ""){
        cy.wrap(form).find("#AccountFrm_loginname").type(login);
      } else {
        cy.wrap(form).find("#AccountFrm_loginname").type(getRandomLogin(10));
      }
      cy.wrap(form).find("#AccountFrm_password").type(password);
      cy.wrap(form).find("#AccountFrm_confirm").type(passwordConfirm);
      //subscribe to newsletter
      if (newsletter === 1) {
        cy.wrap(form)
          .find("#AccountFrm_newsletter1")
          .check()
          .should("be.checked");
      } else {
        cy.wrap(form)
          .find("#AccountFrm_newsletter0")
          .check()
          .should("be.checked");
      }
    });

    if (agreePolicy === 1) {
      //agree to privacy policy
      cy.get("#AccountFrm_agree").click();
    }

    //get btn
    //   cy.get('[title="Continue"]').click();
  }

  verifySuccessRegisterMessage() {
    //success page
    // cy.url().should("include", "/success");
    // cy.get("h1.heading1").should("contain", "Your Account Has Been Created!");
    verifyUrlAndTitle("success", "Your Account Has Been Created!");
    //verify message in content
    cy.get(".contentpanel").should(
      "contain",
      "Congratulations! Your new account has been successfully created!"
    );
  }

  clickContinueBtn() {
    cy.get('[title="Continue"]').click();
  }

  verifyErrorRegisterMessage(msg) {
    // const errorMessages = Array.isArray(msg)
    // if(errorMessages){
    //     cy.get('.alert-error').each(($el, index) =>
    //     {
    //         cy.wrap($el).should('contain', msg[index])
    //     })
    // } else {
    //     cy.get('.alert-error').should('contain', msg)
    // }
    checkErrorMessages(".alert-error", msg);
  }

  getErrorInputMsg(msg) {
    // const errorMessages = Array.isArray(msg)
    // if(errorMessages){
    //     cy.get('.has-error').each(($el,index) =>
    //     {
    //         cy.wrap($el).should('contain', msg[index])
    //     })
    // } else {
    //     cy.get('.has-error').should('contain', msg)
    // }
    checkErrorMessages(".has-error", msg);
  }

  getToLoginPage() {
    cy.get("#AccountFrm").contains("a", "login page").click();
  }
}

export const onRegisterPage = new RegisterPage();
