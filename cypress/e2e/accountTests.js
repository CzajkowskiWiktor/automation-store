/// <reference types="Cypress" />
import { onLoginPage } from "../support/page_object/loginPage";
import { onAccountPage } from "../support/page_object/accountPage";
import { onAddressPage } from "../support/page_object/addressPage";
import { onAddNewAddressPage } from "../support/page_object/addNewAddressPage";
import { onEditAddressPage } from "../support/page_object/editAddressPage";
import { onChangePasswordPage } from "../support/page_object/changePasswordPage";
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
    onAddressPage.verifySuccessMessage(
      "Your address has been successfully deleted"
    );
  });

  it("edit a new added another address", () => {
    const newAddressUser = {
      firstname: "Test",
      lastname: "Lorem",
      address1: "al. Niepodleglosci 12",
      city: "Poznan",
      postcode: "61-120",
      country: "Poland",
      zone: "Wielkopolskie",
    };
    const editedAddressUser = {
      firstname: "Test",
      lastname: "Lorem",
      address1: "ul. Szarych szeregow 14",
      city: "Warszawa",
      postcode: "01-123",
      country: "Poland",
      zone: "Mazowieckie",
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
    //edit address - city and address1
    onEditAddressPage.checkUrlAndTitlePage();
    onEditAddressPage.clearAddress1();
    onEditAddressPage.clearCity();
    onEditAddressPage.clearPostcode();
    onEditAddressPage.fillAddress1(editedAddressUser.address1);
    onEditAddressPage.fillCity(editedAddressUser.city);
    onEditAddressPage.fillPostcode(editedAddressUser.postcode);
    onEditAddressPage.fillZone(editedAddressUser.zone);
    //   onEditAddressPage.clickBackBtn();
    onEditAddressPage.clickContinueBtnToEditAddress();
    onAddressPage.verifySuccessMessage(
      "Your address has been successfully updated"
    );
    //check updated address details on page - bug with switching edited address to default one even if it is clicked NO option
    //   onAddressPage.verifyNewAddressInformation(editedAddressUser)
  });

  it("failed adding another address due to missing required inputs - last name and city", () => {
    const newAddressUser = {
      firstname: "Test",
      // lastname: "Lorem",
      address1: "al. Niepodleglosci 12",
      // city: "Poznan",
      postcode: "61-120",
      country: "Poland",
      zone: "Wielkopolskie",
    };
    navigateTo.loginOrRegister();
    onLoginPage.loginToAccount(globalData.login, globalData.password);
    onAccountPage.checkUrlAndTitlePage();
    onAccountPage.verifyCustomerNameOnPage(globalData.firstname);
    onAccountPage.checkPathContentToAccount();
    onAccountPage.goToAddressBookIcon();
    onAddressPage.checkUrlAndTitlePage();
    onAddressPage.clickAddNewAddressBtn();
    onAddNewAddressPage.checkUrlAndTitlePage();
    //fill the incomplete details
    onAddNewAddressPage.fillFirstName(newAddressUser.firstname);
    onAddNewAddressPage.fillAddress1(newAddressUser.address1);
    onAddNewAddressPage.fillPostcode(newAddressUser.postcode);
    onAddNewAddressPage.fillCountry(newAddressUser.country);
    onAddNewAddressPage.fillZone(newAddressUser.zone);
    onAddNewAddressPage.clickContinueBtnToAddNewAddress();
    onAddNewAddressPage.verifyErrorMessageTitle(
      "Oops, there is an error with information provided!"
    );
    onAddNewAddressPage.verifyErrorInputFields([
      ["Last Name", "Last Name must be between 1 and 32 characters!"],
      ["City", "City must be between 3 and 128 characters!"],
    ]);
  });

  it("change new added address to deafult one", () => {
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
    onAccountPage.goToAddressBookIcon();
    onAddressPage.checkUrlAndTitlePage();
    onAddressPage.clickAddNewAddressBtn();
    onAddNewAddressPage.checkUrlAndTitlePage();
      onAddNewAddressPage.addNewAddress(newAddressUser);
      onAddNewAddressPage.changeAddressToDefault();
      onAddNewAddressPage.clickContinueBtnToAddNewAddress();
      onAddressPage.verifySuccessMessage(
        "Your address has been successfully inserted"
      );
      //check if previous address changed to non default
      onAddressPage.checkDefaultAddress(globalData.firstname, globalData.lastname)
    
  });

  it("change user password", () => {
    navigateTo.loginOrRegister();
    onLoginPage.loginToAccount(globalData.login, globalData.password);
    onAccountPage.checkUrlAndTitlePage();
    onAccountPage.verifyCustomerNameOnPage(globalData.firstname);
    onAccountPage.checkPathContentToAccount();
    onAccountPage.goToPasswordChangeSidebar();
    onChangePasswordPage.checkUrlAndTitlePage();
    onChangePasswordPage.checkPathContentToChangePassword();
    onChangePasswordPage.fillTheCompleteForm(globalData.password, 'test1234', 'test1234')
    onChangePasswordPage.clickContinueBtnToChangePassword();
    onAccountPage.verifySuccessMessage('Success: Your password has been successfully updated.')
  });

  it('Fail with changing password - incorrect current password', () => {
    navigateTo.loginOrRegister();
    onLoginPage.loginToAccount(globalData.login, globalData.password);
    onAccountPage.checkUrlAndTitlePage();
    onAccountPage.verifyCustomerNameOnPage(globalData.firstname);
    onAccountPage.checkPathContentToAccount();
    onAccountPage.goToPasswordChangeSidebar();
    onChangePasswordPage.checkUrlAndTitlePage();
    onChangePasswordPage.checkPathContentToChangePassword();
    onChangePasswordPage.fillTheCompleteForm('tesy123', 'test1234', 'test1234')
    onChangePasswordPage.clickContinueBtnToChangePassword();
    onChangePasswordPage.verifyErrorMessage('Oops, there is an error with information provided!')
    onChangePasswordPage.checkCurrentPasswordError('Your current password is incorrect! Please try again.')
    onChangePasswordPage.checkAmountOfInputErrors(1)
  });

  it('Fail with changing password - incorrect new password', () => {
    navigateTo.loginOrRegister();
    onLoginPage.loginToAccount(globalData.login, globalData.password);
    onAccountPage.checkUrlAndTitlePage();
    onAccountPage.verifyCustomerNameOnPage(globalData.firstname);
    onAccountPage.checkPathContentToAccount();
    onAccountPage.goToPasswordChangeSidebar();
    onChangePasswordPage.checkUrlAndTitlePage();
    onChangePasswordPage.checkPathContentToChangePassword();
    onChangePasswordPage.fillTheCompleteForm('test123', 'te', 'test1234')
    onChangePasswordPage.clickContinueBtnToChangePassword();
    onChangePasswordPage.verifyErrorMessage('Oops, there is an error with information provided!')
    onChangePasswordPage.checkNewPasswordError('Password must be between 4 and 20 characters!')
    onChangePasswordPage.checkNewPasswordConfirmError('Password confirmation does not match password!')
    onChangePasswordPage.checkAmountOfInputErrors(2)
  });

  it('Fail with changing password - lack of new password confirm', () => {
    navigateTo.loginOrRegister();
    onLoginPage.loginToAccount(globalData.login, globalData.password);
    onAccountPage.checkUrlAndTitlePage();
    onAccountPage.verifyCustomerNameOnPage(globalData.firstname);
    onAccountPage.checkPathContentToAccount();
    onAccountPage.goToPasswordChangeSidebar();
    onChangePasswordPage.checkUrlAndTitlePage();
    onChangePasswordPage.checkPathContentToChangePassword();
    onChangePasswordPage.fillCurrentPassword('test123')
    onChangePasswordPage.fillNewPassword('test1234')
    onChangePasswordPage.clickContinueBtnToChangePassword();
    onChangePasswordPage.verifyErrorMessage('Oops, there is an error with information provided!')
    onChangePasswordPage.checkNewPasswordConfirmError('Password confirmation does not match password!')
    onChangePasswordPage.checkAmountOfInputErrors(1)
  });

  it('Fail with changing password - not providing any password', () => {
    navigateTo.loginOrRegister();
    onLoginPage.loginToAccount(globalData.login, globalData.password);
    onAccountPage.checkUrlAndTitlePage();
    onAccountPage.verifyCustomerNameOnPage(globalData.firstname);
    onAccountPage.checkPathContentToAccount();
    onAccountPage.goToPasswordChangeSidebar();
    onChangePasswordPage.checkUrlAndTitlePage();
    onChangePasswordPage.checkPathContentToChangePassword();
    onChangePasswordPage.clickContinueBtnToChangePassword();
    onChangePasswordPage.verifyErrorMessage('Oops, there is an error with information provided!')
    onChangePasswordPage.checkCurrentPasswordError('Your current password is incorrect! Please try again.')
    onChangePasswordPage.checkNewPasswordError('Password must be between 4 and 20 characters!')
    onChangePasswordPage.checkAmountOfInputErrors(2)
  });

  it.only("check the user wish list", () => {
    navigateTo.loginOrRegister();
    onLoginPage.loginToAccount(globalData.login, globalData.password);
    onAccountPage.checkUrlAndTitlePage();
    onAccountPage.verifyCustomerNameOnPage(globalData.firstname);
    onAccountPage.checkPathContentToAccount();
  });

  it("check user order history", () => {});

  it("edit account details", () => {});

  it("check user transaction history", () => {});

  it("check downloads page", () => {});

  it("verify checked notifications and newsletter", () => {});

  it("uncheck newsletter notification for user", () => {});

  it("buy a product and check order and transaction history", () => {});
});
