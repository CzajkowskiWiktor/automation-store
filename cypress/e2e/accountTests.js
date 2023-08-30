/// <reference types="Cypress" />
import { onLoginPage } from "../support/page_object/loginPage";
import { onAccountPage } from "../support/page_object/accountPage";
import { onAddressPage } from "../support/page_object/addressPage";
import { onAddNewAddressPage } from "../support/page_object/addNewAddressPage";
import { onEditAddressPage } from "../support/page_object/editAddressPage";
import { onChangePasswordPage } from "../support/page_object/changePasswordPage";
import { onWishList } from "../support/page_object/wishList";
import { onProductPage } from "../support/page_object/productPage";
import { onOrderHistoryPage } from "../support/page_object/orderHistoryPage";
import { onOrderDetailsPage } from "../support/page_object/orderDetailsPage";
import { onTransactionHistoryPage } from "../support/page_object/transactionHistoryPage";
import { onDownloadPage } from "../support/page_object/downloadPage";
import { onNotificationsPage } from "../support/page_object/notificationsPage";
import { onEditAccountDetailsPage } from "../support/page_object/editAccountDetailsPage";
import { navigateTo } from "../support/page_object/navigationPage";

describe("Testing on user account page", () => {
  let globalData;

  const newAddressUser = {
    firstname: "Test",
    lastname: "Lorem",
    address1: "al. Niepodleglosci 12",
    city: "Poznan",
    postcode: "61-120",
    country: "Poland",
    zone: "Wielkopolskie",
  };

  const userWithHistory = {
    firstname: "Lorem",
    lastname: "Ipsum",
    address1: "ul. Hiacynta 1a",
    city: "Wrzesnia",
    postcode: "69-120",
    country: "Poland",
    zone: "Wielkopolskie",
    company: "Comapny 1",
    telephone: 245678901,
    login: "lorem1234",
    password: "test123",
    email: "testLorem123@test.com",
  };

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
    //add new address
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
    // //should be at least 2 to delete a non-default address
    // onAccountPage.getManageAddressBookAmount(2);
    // onAccountPage.goToAddressBookSidebar();
    // onAddressPage.checkUrlAndTitlePage();
    // onAddressPage.checkSelectedOptionInSidebarlist();
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
    onAddressPage.checkDefaultAddress(
      globalData.firstname,
      globalData.lastname
    );
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
    onChangePasswordPage.fillTheCompleteForm(
      globalData.password,
      "test1234",
      "test1234"
    );
    onChangePasswordPage.clickContinueBtnToChangePassword();
    onAccountPage.verifySuccessMessage(
      "Success: Your password has been successfully updated."
    );
  });

  it("Fail with changing password - incorrect current password", () => {
    navigateTo.loginOrRegister();
    onLoginPage.loginToAccount(globalData.login, globalData.password);
    onAccountPage.checkUrlAndTitlePage();
    onAccountPage.verifyCustomerNameOnPage(globalData.firstname);
    onAccountPage.checkPathContentToAccount();
    onAccountPage.goToPasswordChangeSidebar();
    onChangePasswordPage.checkUrlAndTitlePage();
    onChangePasswordPage.checkPathContentToChangePassword();
    onChangePasswordPage.fillTheCompleteForm("tesy123", "test1234", "test1234");
    onChangePasswordPage.clickContinueBtnToChangePassword();
    onChangePasswordPage.verifyErrorMessage(
      "Oops, there is an error with information provided!"
    );
    onChangePasswordPage.checkCurrentPasswordError(
      "Your current password is incorrect! Please try again."
    );
    onChangePasswordPage.checkAmountOfInputErrors(1);
  });

  it("Fail with changing password - incorrect new password", () => {
    navigateTo.loginOrRegister();
    onLoginPage.loginToAccount(globalData.login, globalData.password);
    onAccountPage.checkUrlAndTitlePage();
    onAccountPage.verifyCustomerNameOnPage(globalData.firstname);
    onAccountPage.checkPathContentToAccount();
    onAccountPage.goToPasswordChangeSidebar();
    onChangePasswordPage.checkUrlAndTitlePage();
    onChangePasswordPage.checkPathContentToChangePassword();
    onChangePasswordPage.fillTheCompleteForm("test123", "te", "test1234");
    onChangePasswordPage.clickContinueBtnToChangePassword();
    onChangePasswordPage.verifyErrorMessage(
      "Oops, there is an error with information provided!"
    );
    onChangePasswordPage.checkNewPasswordError(
      "Password must be between 4 and 20 characters!"
    );
    onChangePasswordPage.checkNewPasswordConfirmError(
      "Password confirmation does not match password!"
    );
    onChangePasswordPage.checkAmountOfInputErrors(2);
  });

  it("Fail with changing password - lack of new password confirm", () => {
    navigateTo.loginOrRegister();
    onLoginPage.loginToAccount(globalData.login, globalData.password);
    onAccountPage.checkUrlAndTitlePage();
    onAccountPage.verifyCustomerNameOnPage(globalData.firstname);
    onAccountPage.checkPathContentToAccount();
    onAccountPage.goToPasswordChangeSidebar();
    onChangePasswordPage.checkUrlAndTitlePage();
    onChangePasswordPage.checkPathContentToChangePassword();
    onChangePasswordPage.fillCurrentPassword("test123");
    onChangePasswordPage.fillNewPassword("test1234");
    onChangePasswordPage.clickContinueBtnToChangePassword();
    onChangePasswordPage.verifyErrorMessage(
      "Oops, there is an error with information provided!"
    );
    onChangePasswordPage.checkNewPasswordConfirmError(
      "Password confirmation does not match password!"
    );
    onChangePasswordPage.checkAmountOfInputErrors(1);
  });

  it("Fail with changing password - not providing any password", () => {
    navigateTo.loginOrRegister();
    onLoginPage.loginToAccount(globalData.login, globalData.password);
    onAccountPage.checkUrlAndTitlePage();
    onAccountPage.verifyCustomerNameOnPage(globalData.firstname);
    onAccountPage.checkPathContentToAccount();
    onAccountPage.goToPasswordChangeSidebar();
    onChangePasswordPage.checkUrlAndTitlePage();
    onChangePasswordPage.checkPathContentToChangePassword();
    onChangePasswordPage.clickContinueBtnToChangePassword();
    onChangePasswordPage.verifyErrorMessage(
      "Oops, there is an error with information provided!"
    );
    onChangePasswordPage.checkCurrentPasswordError(
      "Your current password is incorrect! Please try again."
    );
    onChangePasswordPage.checkNewPasswordError(
      "Password must be between 4 and 20 characters!"
    );
    onChangePasswordPage.checkAmountOfInputErrors(2);
  });

  it("check the user wishlist", () => {
    let wishlistAmount = 3;
    let totalPriceOfItems = 216;
    let itemPrices = ["$26.00", "$85.00", "$105.00"];
    let itemNames = [
      "New Ladies High Wedge Heel Toe Thong Diamante Flip Flop Sandals",
      "New French With Ease (1 book + 1 mp3 CD)",
      "Gucci Guilty",
    ];

    navigateTo.loginOrRegister();
    onLoginPage.loginToAccount(userWithHistory.login, userWithHistory.password);
    onAccountPage.checkUrlAndTitlePage();
    onAccountPage.verifyCustomerNameOnPage(userWithHistory.firstname);
    onAccountPage.checkPathContentToAccount();
    onAccountPage.checkWishlistIcon();
    onAccountPage.checkWishlistAmount(wishlistAmount);
    // onAccountPage.goToWishlistIcon();
    onAccountPage.goToWishlistNavbar();
    // onAccountPage.goToWishlistSidebar();
    onWishList.checkUrlAndTitlePage();
    onWishList.checkPathContentToWishlist();
    onWishList.checkSelectedOptionInSidebarlist();
    //check items quantity in table
    onWishList.checkItemsAmountInWishlistTable(wishlistAmount);
    //check item names
    onWishList.checkItemNames(itemNames);
    //check item prices
    onWishList.checkItemPrices(itemPrices);
    //check total items price
    onWishList.checkTotalPriceOfItems(totalPriceOfItems);
  });

  it("delete an item from wishlist", () => {
    let wishlistAmount = 3;
    let itemName = "New French With Ease (1 book + 1 mp3 CD)";

    navigateTo.loginOrRegister();
    onLoginPage.loginToAccount(userWithHistory.login, userWithHistory.password);
    onAccountPage.checkUrlAndTitlePage();
    onAccountPage.verifyCustomerNameOnPage(userWithHistory.firstname);
    onAccountPage.checkPathContentToAccount();
    onAccountPage.checkWishlistIcon();
    onAccountPage.checkWishlistAmount(wishlistAmount);
    // onAccountPage.goToWishlistIcon();
    onAccountPage.goToWishlistNavbar();
    // onAccountPage.goToWishlistSidebar();
    onWishList.checkUrlAndTitlePage();
    onWishList.checkPathContentToWishlist();
    onWishList.checkSelectedOptionInSidebarlist();
    //check items quantity in table
    onWishList.checkItemsAmountInWishlistTable(wishlistAmount);
    //delete an item with particular name
    onWishList.deleteARowWithSpecificItemName(itemName);
    //check updated list of wishlist items
    onWishList.checkItemsAmountInWishlistTable(2);
  });

  it("add to cart an item from wishlist", () => {
    let wishlistAmount = 3;
    let itemPrice = "$105.00";
    let itemName = "Gucci Guilty";

    navigateTo.loginOrRegister();
    onLoginPage.loginToAccount(userWithHistory.login, userWithHistory.password);
    onAccountPage.checkUrlAndTitlePage();
    onAccountPage.verifyCustomerNameOnPage(userWithHistory.firstname);
    onAccountPage.checkPathContentToAccount();
    onAccountPage.checkWishlistIcon();
    onAccountPage.checkWishlistAmount(wishlistAmount);
    onAccountPage.goToWishlistIcon();
    //   onAccountPage.goToWishlistNavbar();
    // onAccountPage.goToWishlistSidebar();
    onWishList.checkUrlAndTitlePage();
    onWishList.checkPathContentToWishlist();
    onWishList.checkSelectedOptionInSidebarlist();
    //check items quantity in table
    onWishList.checkItemsAmountInWishlistTable(wishlistAmount);
    //add to cart an item
    onWishList.addToCarARowWithSpecificItemName(itemName);
    onProductPage.checkUrl();
    onProductPage.checkProductName(itemName);
    onProductPage.checkProductPrice(itemPrice);
  });

  it("check user order history", () => {
    let orderQuantity = 5;
    let orderIds = ["#24111", "#24110", "#24109", "#24108", "#24107"];
    let orderStatus = ["Pending", "Pending", "Pending", "Pending", "Pending"];
    let orderTotals = ["44.00", "8.45", "208.35", "47.87", "60.53"];
    let orderDateAdded = "08/01/2023";
    let productsQuantity = [1, 1, 1, 1, 2];

    navigateTo.loginOrRegister();
    onLoginPage.loginToAccount(userWithHistory.login, userWithHistory.password);
    onAccountPage.checkUrlAndTitlePage();
    onAccountPage.verifyCustomerNameOnPage(userWithHistory.firstname);
    onAccountPage.checkPathContentToAccount();
    onAccountPage.checkOrderAmount(orderQuantity);
    onAccountPage.goToOrderHistorySidebar();
    onOrderHistoryPage.checkUrlAndTitlePage();
    onOrderHistoryPage.checkPathContentToOrderHistory();
    onOrderHistoryPage.checkSelectedOptionInSidebarlist();
    //check orders quantity on page
    onOrderHistoryPage.checkOrdersQuantity(orderQuantity);
    //check orders IDs
    onOrderHistoryPage.checkOrderID(orderIds);
    //check orders status
    onOrderHistoryPage.checkOrderStatus(orderStatus);
    //check orders customer name
    onOrderHistoryPage.checkOrderCustomerName(
      userWithHistory.firstname + " " + userWithHistory.lastname
    );
    //check orders total
    onOrderHistoryPage.checkOrderTotals(orderTotals);
    //check orders date added
    onOrderHistoryPage.checkOrderDateAdded(orderDateAdded);
    //check orders products quantity
    onOrderHistoryPage.checkOrderProductsQuantity(productsQuantity);
  });

  it("view order details history on specific orderID", () => {
    let orderQuantity = 5;
    let number = 4;
    let orderIds = ["#24111", "#24110", "#24109", "#24108", "#24107"];
    let orderStatus = ["Pending", "Pending", "Pending", "Pending", "Pending"];
    let orderTotals = ["44.00", "8.45", "208.35", "47.87", "60.53"];
    let orderDateAdded = "08/01/2023";
    let productsQuantity = [1, 1, 1, 1, 2];
    let eachProductOrderedQuantity = [1, 1, 1, 1, [1, 1]];
    let productNames = [
      "Absolute Anti-Age Spot Replenishing Unifying TreatmentSPF 15",
      "Viva Glam Lipstick",
      "Creme Precieuse Nuit 50ml",
      "Calvin Klein Obsession For Women EDP Spray",
      [
        "Waterproof Protective Undereye Concealer",
        "Designer Men Casual Formal Double Cuffs Grandad Band Collar Shirt Elegant Tie",
      ],
    ];
    let productPrice = ["42.00", "6.57", "206.47", "45.99", ["28.62", "30.03"]];

    navigateTo.loginOrRegister();
    onLoginPage.loginToAccount(userWithHistory.login, userWithHistory.password);
    onAccountPage.checkUrlAndTitlePage();
    onAccountPage.verifyCustomerNameOnPage(userWithHistory.firstname);
    onAccountPage.checkPathContentToAccount();
    onAccountPage.checkOrderAmount(orderQuantity);
    onAccountPage.goToOrderHistorySidebar();
    onOrderHistoryPage.checkUrlAndTitlePage();
    onOrderHistoryPage.checkPathContentToOrderHistory();
    onOrderHistoryPage.checkSelectedOptionInSidebarlist();
    //click on view order button
    onOrderHistoryPage.clickViewOrderOnSpecificOrderID(orderIds[number]);
    //verify order details on OrderDetails page
    onOrderDetailsPage.checkUrlAndTitlePage(orderIds[number]);
    onOrderDetailsPage.checkPathContentToOrderDetails();
    onOrderDetailsPage.checkNotSelectedOptionInSidebarlist();
    onOrderDetailsPage.checkOrderDetails(
      orderIds[number],
      orderStatus[number],
      userWithHistory
    );
    onOrderDetailsPage.checkOrderHistoryDetails(
      orderDateAdded,
      orderStatus[number]
    );
    onOrderDetailsPage.checkProductDetailsOnOrder(
      productNames[number],
      productsQuantity[number],
      productPrice[number],
      eachProductOrderedQuantity[number]
    );
    onOrderDetailsPage.checkTotalWithTaxRatePrice(
      productPrice[number],
      orderTotals[number]
    );
    //go back to order history
    // onOrderDetailsPage.clickContinueBtn()
  });

  it("Print the order invoice from order details", () => {
    let orderQuantity = 5;
    let number = 2;
    let orderIds = ["#24111", "#24110", "#24109", "#24108", "#24107"];
    let orderStatus = ["Pending", "Pending", "Pending", "Pending", "Pending"];
    let orderTotals = ["44.00", "8.45", "208.35", "47.87", "60.53"];
    let orderDateAdded = "08/01/2023";
    let productsQuantity = [1, 1, 1, 1, 2];
    let eachProductOrderedQuantity = [1, 1, 1, 1, [1, 1]];
    let productNames = [
      "Absolute Anti-Age Spot Replenishing Unifying TreatmentSPF 15",
      "Viva Glam Lipstick",
      "Creme Precieuse Nuit 50ml",
      "Calvin Klein Obsession For Women EDP Spray",
      [
        "Waterproof Protective Undereye Concealer",
        "Designer Men Casual Formal Double Cuffs Grandad Band Collar Shirt Elegant Tie",
      ],
    ];
    let productPrice = ["42.00", "6.57", "206.47", "45.99", ["28.62", "30.03"]];

    navigateTo.loginOrRegister();
    onLoginPage.loginToAccount(userWithHistory.login, userWithHistory.password);
    onAccountPage.checkUrlAndTitlePage();
    onAccountPage.verifyCustomerNameOnPage(userWithHistory.firstname);
    onAccountPage.checkPathContentToAccount();
    onAccountPage.checkOrderAmount(orderQuantity);
    onAccountPage.goToOrderHistorySidebar();
    onOrderHistoryPage.checkUrlAndTitlePage();
    onOrderHistoryPage.checkPathContentToOrderHistory();
    onOrderHistoryPage.checkSelectedOptionInSidebarlist();
    //click on view order button
    onOrderHistoryPage.clickViewOrderOnSpecificOrderID(orderIds[number]);
    //verify order details on OrderDetails page
    onOrderDetailsPage.checkUrlAndTitlePage(orderIds[number]);
    onOrderDetailsPage.checkPathContentToOrderDetails();
    onOrderDetailsPage.checkNotSelectedOptionInSidebarlist();
    onOrderDetailsPage.checkOrderDetails(
      orderIds[number],
      orderStatus[number],
      userWithHistory
    );
    onOrderDetailsPage.checkOrderHistoryDetails(
      orderDateAdded,
      orderStatus[number]
    );
    onOrderDetailsPage.checkProductDetailsOnOrder(
      productNames[number],
      productsQuantity[number],
      productPrice[number],
      eachProductOrderedQuantity[number]
    );
    onOrderDetailsPage.checkTotalWithTaxRatePrice(
      productPrice[number],
      orderTotals[number]
    );
    //print the order
    onOrderDetailsPage.clickPrintBtnAndVerify();
  });

  it("check user non transaction history", () => {
    let transAmount = "$0.00";
    navigateTo.loginOrRegister();
    onLoginPage.loginToAccount(userWithHistory.login, userWithHistory.password);
    onAccountPage.checkUrlAndTitlePage();
    onAccountPage.verifyCustomerNameOnPage(userWithHistory.firstname);
    onAccountPage.checkPathContentToAccount();
    onAccountPage.checkTransactionHistoryAmountIcon(transAmount);
    onAccountPage.checkTransactionHistoryAmountCard(transAmount);
    onAccountPage.goToTransactionHistoryNavbar();
    onTransactionHistoryPage.checkUrlAndTitlePage();
    onTransactionHistoryPage.checkPathContentToTransactionHistory();
    onTransactionHistoryPage.checkSelectedOptionInSidebarlist();
    onTransactionHistoryPage.verifyNoTransactionHistoryRecords();
  });

  it("check downloads page", () => {
    let downloadQuantity = 0;
    navigateTo.loginOrRegister();
    onLoginPage.loginToAccount(userWithHistory.login, userWithHistory.password);
    onAccountPage.checkUrlAndTitlePage();
    onAccountPage.verifyCustomerNameOnPage(userWithHistory.firstname);
    onAccountPage.checkPathContentToAccount();
    onAccountPage.getDownloadsAmount(downloadQuantity);
    onAccountPage.checkDownloadsAmountIcon(downloadQuantity);
    onAccountPage.goToDownloadIcon();
    onDownloadPage.checkUrlAndTitlePage();
    onDownloadPage.checkSelectedOptionInSidebarlist();
    onDownloadPage.checkPathContentToDownload();
    onDownloadPage.verifyNoDownloadsRecords();
  });

  it("verify checked notifications and newsletter - newsletter unchecked", () => {
    navigateTo.loginOrRegister();
    onLoginPage.loginToAccount(userWithHistory.login, userWithHistory.password);
    onAccountPage.checkUrlAndTitlePage();
    onAccountPage.verifyCustomerNameOnPage(userWithHistory.firstname);
    onAccountPage.checkPathContentToAccount();
    onAccountPage.goToNotificationsIcon();
    onNotificationsPage.checkUrlAndTitlePage();
    onNotificationsPage.checkPathContentToNotifications();
    onNotificationsPage.checkSelectedOptionInSidebarlist();
    onNotificationsPage.verifyStatusOfNotificationsCheckboxes();
  });

  it("check and save newsletter notification for user", () => {
    navigateTo.loginOrRegister();
    onLoginPage.loginToAccount(userWithHistory.login, userWithHistory.password);
    onAccountPage.checkUrlAndTitlePage();
    onAccountPage.verifyCustomerNameOnPage(userWithHistory.firstname);
    onAccountPage.checkPathContentToAccount();
    onAccountPage.goToNotificationsIcon();
    onNotificationsPage.checkUrlAndTitlePage();
    onNotificationsPage.checkPathContentToNotifications();
    onNotificationsPage.checkSelectedOptionInSidebarlist();
    onNotificationsPage.selectNewslettersCheckbox();
    onNotificationsPage.clickContinueBtn();
    onAccountPage.verifySuccessMessage(
      "Success: Your notification settings has been successfully updated!"
    );
  });

  it("uncheck and save newsletter notification for user", () => {
    navigateTo.loginOrRegister();
    onLoginPage.loginToAccount(userWithHistory.login, userWithHistory.password);
    onAccountPage.checkUrlAndTitlePage();
    onAccountPage.verifyCustomerNameOnPage(userWithHistory.firstname);
    onAccountPage.checkPathContentToAccount();
    onAccountPage.goToNotificationsIcon();
    onNotificationsPage.checkUrlAndTitlePage();
    onNotificationsPage.checkPathContentToNotifications();
    onNotificationsPage.checkSelectedOptionInSidebarlist();
    onNotificationsPage.unselectNewslettersCheckbox();
    onNotificationsPage.clickContinueBtn();
    onAccountPage.verifySuccessMessage(
      "Success: Your notification settings has been successfully updated!"
    );
  });

  it("check account details", () => {
    navigateTo.loginOrRegister();
    onLoginPage.loginToAccount(userWithHistory.login, userWithHistory.password);
    onAccountPage.checkUrlAndTitlePage();
    onAccountPage.verifyCustomerNameOnPage(userWithHistory.firstname);
    onAccountPage.checkPathContentToAccount();
    onAccountPage.goToEditAccountDetailsSidebar();
    onEditAccountDetailsPage.checkUrlAndTitlePage();
    onEditAccountDetailsPage.checkPathContentToEditAccountDetails();
    onEditAccountDetailsPage.checkSelectedOptionInSidebarlist();
    onEditAccountDetailsPage.checkUserPersonalInformation(userWithHistory);
  });

  it("edit account detail - phone number", () => {
    navigateTo.loginOrRegister();
    onLoginPage.loginToAccount(userWithHistory.login, userWithHistory.password);
    onAccountPage.checkUrlAndTitlePage();
    onAccountPage.verifyCustomerNameOnPage(userWithHistory.firstname);
    onAccountPage.checkPathContentToAccount();
    onAccountPage.goToEditAccountDetailsSidebar();
    onEditAccountDetailsPage.checkUrlAndTitlePage();
    onEditAccountDetailsPage.checkPathContentToEditAccountDetails();
    onEditAccountDetailsPage.checkSelectedOptionInSidebarlist();
    onEditAccountDetailsPage.editPhoneNumber(userWithHistory, 245678902);
    onEditAccountDetailsPage.clickContinueBtn();
    onAccountPage.verifySuccessMessage(
      "Success: Your account has been successfully updated."
    );
  });
});
