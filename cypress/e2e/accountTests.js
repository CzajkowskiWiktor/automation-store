/// <reference types="Cypress" />
import { onLoginPage } from "../support/page_object/loginPage";
import { onAccountPage } from "../support/page_object/accountPage";
import { onAddressPage } from "../support/page_object/addressPage";
import { onAddNewAddressPage } from "../support/page_object/addNewAddressPage";
import { navigateTo } from "../support/page_object/navigationPage";

describe("Testing on user account page", () => {
  let globalData;

  beforeEach("open a website and login to account", () => {
    //assign global data
    cy.fixture("example.json").then(function (data) {
      globalData = data;
    });
    //open home page nad sign in
    cy.openHomePage();
  });

  it("Verify address book details of user", () => {
    navigateTo.loginOrRegister();
    onLoginPage.loginToAccount(globalData.login, globalData.password);
    onAccountPage.checkUrlAndTitlePage();
    onAccountPage.verifyCustomerNameOnPage(globalData.firstname);
    onAccountPage.checkPathContentToAccount();
    onAccountPage.getManageAddressBookAmount(1);
    onAccountPage.goToAddressBookSidebar();
    onAddressPage.checkUrlAndTitlePage();
    onAddressPage.checkSelectedOptionInSidebarlist();
    onAddressPage.checkPathContentToAddressBook();
    onAddressPage.verifyAddressInformation(
      globalData.firstname,
      globalData.lastname,
      globalData.address1,
      globalData.city,
      globalData.postcode,
      globalData.zone,
      globalData.country
    );
  });

  it("add another address to account", () => {
    const newAddressUser = {
      firstname: "Test",
      lastname: "Lorem",
      address1: "al. Niepodleglosci 12",
      city: "Poznan",
      postcode: "61-120",
      country: "Poland",
      zone: "Wielkopolskie",
    };
    navigateTo.loginOrRegister();
    onLoginPage.loginToAccount(globalData.login, globalData.password);
    onAccountPage.checkUrlAndTitlePage();
    onAccountPage.verifyCustomerNameOnPage(globalData.firstname);
    onAccountPage.checkPathContentToAccount();
    onAccountPage.getManageAddressBookAmount(1);
    onAccountPage.goToAddressBookSidebar();
    onAddressPage.checkUrlAndTitlePage();
    onAddressPage.checkSelectedOptionInSidebarlist();
    onAddressPage.checkPathContentToAddressBook();
    onAddressPage.verifyAddressInformation(
      globalData.firstname,
      globalData.lastname,
      globalData.address1,
      globalData.city,
      globalData.postcode,
      globalData.zone,
      globalData.country
    );
    onAddressPage.clickAddNewAddressBtn();
    onAddNewAddressPage.checkUrlAndTitlePage();
    onAddNewAddressPage.checkPathContentToAddressBook();
    //add new address to user account
    onAddNewAddressPage.addNewAddress(newAddressUser);
    onAddNewAddressPage.clickContinueBtnToAddNewAddress();
    onAddressPage.verifySuccessMessage(
      "Your address has been successfully inserted"
    );
  });

  it("Delete a non default address", () => {
    const newAddressUser = {
      firstname: "Test",
      lastname: "Lorem",
      address1: "al. Niepodleglosci 12",
      city: "Poznan",
      postcode: "61-120",
      country: "Poland",
      zone: "Wielkopolskie",
    };
    navigateTo.loginOrRegister();
    onLoginPage.loginToAccount(globalData.login, globalData.password);
    onAccountPage.checkUrlAndTitlePage();
    onAccountPage.verifyCustomerNameOnPage(globalData.firstname);
    onAccountPage.checkPathContentToAccount();
    //should be at least 2 to delete a non-default address
    onAccountPage.getManageAddressBookAmount(2);
    onAccountPage.goToAddressBookSidebar();
    onAddressPage.checkUrlAndTitlePage();
    onAddressPage.checkSelectedOptionInSidebarlist();
    //verify default address
    onAddressPage.verifyAddressInformation(
      globalData.firstname,
      globalData.lastname,
      globalData.address1,
      globalData.city,
      globalData.postcode,
      globalData.zone,
      globalData.country
    );
    //verify new address
    onAddressPage.verifyNewAddressInformation(newAddressUser);
    //delete a new address
    onAddressPage.deleteNewAddressBtn();
    onAddressPage.verifySuccessMessage('Your address has been successfully deleted');
  });

  it.only("edit a new added another address", () => {
    const newAddressUser = {
        firstname: "Test",
        lastname: "Lorem",
        address1: "al. Niepodleglosci 12",
        city: "Poznan",
        postcode: "61-120",
        country: "Poland",
        zone: "Wielkopolskie",
      };
      navigateTo.loginOrRegister();
      onLoginPage.loginToAccount(globalData.login, globalData.password);
      onAccountPage.checkUrlAndTitlePage();
      onAccountPage.verifyCustomerNameOnPage(globalData.firstname);
      onAccountPage.checkPathContentToAccount();
      //should be at least 2 to delete a non-default address
      onAccountPage.getManageAddressBookAmount(2);
      onAccountPage.goToAddressBookSidebar();
      onAddressPage.checkUrlAndTitlePage();
      onAddressPage.checkSelectedOptionInSidebarlist();
      //verify new address
      onAddressPage.verifyNewAddressInformation(newAddressUser);
      onAddressPage.clickEditAddressBookData(1);
    
  });

  it("failed adding another address due to missing required inputs - last name and city", () => {});

  it("edit existing address", () => {});

  it("change users password", () => {});

  it("check the user wish list", () => {});

  it("check user order history", () => {});

  it("edit account details", () => {});

  it("check user transaction history", () => {});

  it("check downloads page", () => {});

  it("verify checked notifications and newsletter", () => {});

  it("uncheck newsletter notification for user", () => {});

  it("buy a product and check order and transaction history", () => {});
});
