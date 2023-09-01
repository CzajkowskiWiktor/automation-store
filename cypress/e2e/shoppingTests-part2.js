/// <reference types="Cypress" />
import { onHomePage } from "../support/page_object/homePage";
import { onCartPage } from "../support/page_object/cartPage";
import { onLoginPage } from "../support/page_object/loginPage";
import { onConfirmCheckoutPage } from "../support/page_object/confirmCheckoutPage";
import { onSuccessOrderPage } from "../support/page_object/successOrderPage";
import { onShippingEditPage } from "../support/page_object/shippingEditPage";
import { onShippingAddAddressPage } from "../support/page_object/shippingAddAddressPage";
import { onPaymentEditPage } from "../support/page_object/paymentEditPage";
import { onPaymentAddAddressPage } from "../support/page_object/paymentAddAddressPage";
import { onAccountPage } from "../support/page_object/accountPage";
import { onGuestStepOnePage } from "../support/page_object/guestStepOnePage";
import { onRegisterPage } from "../support/page_object/registerPage";

describe("Testing shopping funcionality", () => {
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

  beforeEach("open a website and login to account", () => {
    //assign global data
    cy.fixture("shoppingAcc.json").then(function (data) {
      globalData = data;
    });
    //open home page nad sign in
    cy.openHomePage();

    //check if HomePage Section is Active
    onHomePage.checkHomeSectionActiveSubnav();
    //check if cart is empty before testing and return home
    onHomePage.goToCartNavbar();
    onCartPage.checkUrlAndTitlePage();
    onCartPage.checkPathContentToCart();
    onCartPage.checkTextOfEmptyCart("Your shopping cart is empty!");
    onCartPage.checkNumberOfProductsInCartTopNavbar();
    onCartPage.checkNoExistingCartTable();
    onCartPage.clickContinueBtn();
  });

  // it("add article from homePage to a cart", () => {
  //   //find and add item to cart
  //   onHomePage.addItemToCartByProductName("Skinsheen Bronzer Stick", "$29.50");
  //   //check item in cart
  //   onHomePage.goToCartNavbar();
  //   onCartPage.checkNumberOfProductsInCartTopNavbar();
  //   onCartPage.checkShoppingCartDetails("Skinsheen Bronzer Stick", 1, "$29.50");
  // });

  // it("check cart with few articles", () => {
  //   //find and add items to cart
  //   onHomePage.addItemToCartByProductName("Skinsheen Bronzer Stick", "$29.50");
  //   onHomePage.addItemToCartByProductName(
  //     "Absolute Anti-Age Spot Replenishing Unifying TreatmentSPF 15",
  //     "$42.00"
  //   );
  //   //check items in cart
  //   onHomePage.goToCartNavbar();
  //   onCartPage.checkNumberOfProductsInCartTopNavbar();
  //   onCartPage.checkShoppingCartDetails(
  //     [
  //       "Skinsheen Bronzer Stick",
  //       "Absolute Anti-Age Spot Replenishing Unifying TreatmentSPF 15",
  //     ],
  //     1,
  //     ["$29.50", "$42.00"]
  //   );
  // });

  // it("add items to cart and then delete one", () => {
  //   //find and add items to cart
  //   onHomePage.addItemToCartByProductName("Skinsheen Bronzer Stick", "$29.50");
  //   onHomePage.addItemToCartByProductName(
  //     "Absolute Anti-Age Spot Replenishing Unifying TreatmentSPF 15",
  //     "$42.00"
  //   );
  //   onHomePage.addItemToCartByProductName(
  //     "Absolue Eye Precious Cells",
  //     "$89.00"
  //   );
  //   //check items in cart
  //   onHomePage.goToCartNavbar();
  //   onCartPage.checkNumberOfProductsInCartTopNavbar();
  //   onCartPage.checkShoppingCartDetails(
  //     [
  //       "Skinsheen Bronzer Stick",
  //       "Absolute Anti-Age Spot Replenishing Unifying TreatmentSPF 15",
  //       "Absolue Eye Precious Cells",
  //     ],
  //     1,
  //     ["$29.50", "$42.00", "$89.00"]
  //   );
  //   //delete the product from cart by name
  //   onCartPage.deleteProductByName(
  //     "Absolute Anti-Age Spot Replenishing Unifying TreatmentSPF 15"
  //   );
  //   //verify if the cart has only other product/s and there is no product with that product name and check products quantity in cart
  //   onCartPage.checkShoppingCartDetails(
  //     ["Skinsheen Bronzer Stick", "Absolue Eye Precious Cells"],
  //     1,
  //     ["$29.50", "$89.00"]
  //   );
  //   onCartPage.findProductNameInCartNotExists(
  //     "Absolute Anti-Age Spot Replenishing Unifying TreatmentSPF 15"
  //   );
  //   onCartPage.checkNumberOfProductsInCartTopNavbar();
  // });

  // it("add item to cart and then delete it", () => {
  //   //find and add item to cart
  //   onHomePage.addItemToCartByProductName("Skinsheen Bronzer Stick", "$29.50");
  //   //check item in cart
  //   onHomePage.goToCartNavbar();
  //   onCartPage.checkNumberOfProductsInCartTopNavbar();
  //   onCartPage.checkShoppingCartDetails("Skinsheen Bronzer Stick", 1, "$29.50");
  //   //delete the product
  //   onCartPage.deleteProductByName("Skinsheen Bronzer Stick");
  //   //verify if the product has been deleted
  //   onCartPage.checkTextOfEmptyCart("Your shopping cart is empty!");
  //   onCartPage.checkNumberOfProductsInCartTopNavbar();
  //   onCartPage.checkNoExistingCartTable();
  // });

  // it("check cart even if it is empty", () => {
  //   onHomePage.checkHomeSectionActiveSubnav();
  //   //check if cart is empty
  //   onHomePage.goToCartNavbar();
  //   onCartPage.checkUrlAndTitlePage();
  //   onCartPage.checkPathContentToCart();
  //   onCartPage.checkTextOfEmptyCart("Your shopping cart is empty!");
  //   onCartPage.checkNoExistingCartTable();
  // });

  // it("try to add an article which is out of stock to a cart from home page", () => {
  //   //find and add item to cart which is out of stock
  //   onHomePage.tryToAddProductOutOfStock("BeneFit Girl Meets Pearl", "$19.00");
  // });

  // it("apply the wrong coupon to the cart", () => {
  //   //find and add item to cart
  //   onHomePage.addItemToCartByProductName("Skinsheen Bronzer Stick", "$29.50");
  //   //check item in cart
  //   onHomePage.goToCartNavbar();
  //   onCartPage.checkNumberOfProductsInCartTopNavbar();
  //   onCartPage.checkShoppingCartDetails("Skinsheen Bronzer Stick", 1, "$29.50");
  //   //apply the coupon
  //   onCartPage.applyCouponCode("test123");
  //   //error message - wrong coupon code
  //   onCartPage.verifyErrorCouponMsg();
  // });

  // it("add item to cart and update the quantity of product", () => {
  //   //find and add item to cart
  //   onHomePage.addItemToCartByProductName("Skinsheen Bronzer Stick", "$29.50");
  //   //check item in cart
  //   onHomePage.goToCartNavbar();
  //   onCartPage.checkNumberOfProductsInCartTopNavbar();
  //   onCartPage.checkShoppingCartDetails("Skinsheen Bronzer Stick", 1, "$29.50");
  //   //change quantity of product in cart and update cart
  //   onCartPage.changeQuantityOfProduct("Skinsheen Bronzer Stick", 4);
  //   onCartPage.clickCartUpdateBtn();
  //   //verify if the total amount has been changed
  //   onCartPage.checkTotalPriceOfItem("Skinsheen Bronzer Stick", "$118.00");
  // });

  // it("add few items to cart and update the quantity of one specific product", () => {
  //   //find and add items to cart
  //   onHomePage.addItemToCartByProductName("Skinsheen Bronzer Stick", "$29.50");
  //   onHomePage.addItemToCartByProductName(
  //     "Absolute Anti-Age Spot Replenishing Unifying TreatmentSPF 15",
  //     "$42.00"
  //   );
  //   onHomePage.addItemToCartByProductName(
  //     "Absolue Eye Precious Cells",
  //     "$89.00"
  //   );
  //   //check items in cart
  //   onHomePage.goToCartNavbar();
  //   onCartPage.checkNumberOfProductsInCartTopNavbar();
  //   onCartPage.checkShoppingCartDetails(
  //     [
  //       "Skinsheen Bronzer Stick",
  //       "Absolute Anti-Age Spot Replenishing Unifying TreatmentSPF 15",
  //       "Absolue Eye Precious Cells",
  //     ],
  //     1,
  //     ["$29.50", "$42.00", "$89.00"]
  //   );
  //   //change quantity of product in cart
  //   onCartPage.changeQuantityOfProduct("Absolue Eye Precious Cells", 4);
  //   onCartPage.clickCartUpdateBtn();
  //   //verify if the total amount has been changed
  //   onCartPage.checkTotalPriceOfItem("Absolue Eye Precious Cells", "$356.00");
  // });

  // it("add item to cart and update the quantity of product - enter wrong value - a symbol instead of number -> item is deleted", () => {
  //   //find and add item to cart
  //   onHomePage.addItemToCartByProductName("Skinsheen Bronzer Stick", "$29.50");
  //   //check item in cart
  //   onHomePage.goToCartNavbar();
  //   onCartPage.checkNumberOfProductsInCartTopNavbar();
  //   onCartPage.checkShoppingCartDetails("Skinsheen Bronzer Stick", 1, "$29.50");
  //   //change quantity of product in cart
  //   onCartPage.changeQuantityOfProduct("Skinsheen Bronzer Stick", "test");
  //   onCartPage.clickCartUpdateBtn();
  //   //item should be deleted
  //   onCartPage.checkNumberOfProductsInCartTopNavbar();
  //   onCartPage.checkNoExistingCartTable();
  //   onCartPage.checkTextOfEmptyCart("Your shopping cart is empty!");
  // });

  // it("add few items to cart and update the quantity of one product - enter wrong value - a symbol instead of number -> item is deleted", () => {
  //   //find and add items to cart
  //   onHomePage.addItemToCartByProductName("Skinsheen Bronzer Stick", "$29.50");
  //   onHomePage.addItemToCartByProductName(
  //     "Absolute Anti-Age Spot Replenishing Unifying TreatmentSPF 15",
  //     "$42.00"
  //   );
  //   onHomePage.addItemToCartByProductName(
  //     "Absolue Eye Precious Cells",
  //     "$89.00"
  //   );
  //   //check items in cart
  //   onHomePage.goToCartNavbar();
  //   onCartPage.checkNumberOfProductsInCartTopNavbar();
  //   onCartPage.checkShoppingCartDetails(
  //     [
  //       "Skinsheen Bronzer Stick",
  //       "Absolute Anti-Age Spot Replenishing Unifying TreatmentSPF 15",
  //       "Absolue Eye Precious Cells",
  //     ],
  //     1,
  //     ["$29.50", "$42.00", "$89.00"]
  //   );
  //   //change quantity of product in cart
  //   onCartPage.changeQuantityOfProduct("Skinsheen Bronzer Stick", "test");
  //   onCartPage.clickCartUpdateBtn();
  //   //item should be deleted
  //   onCartPage.checkNumberOfProductsInCartTopNavbar();
  //   onCartPage.checkShoppingCartDetails(
  //     [
  //       "Absolute Anti-Age Spot Replenishing Unifying TreatmentSPF 15",
  //       "Absolue Eye Precious Cells",
  //     ],
  //     1,
  //     ["$42.00", "$89.00"]
  //   );
  //   //
  //   onCartPage.findProductNameInCartNotExists("Skinsheen Bronzer Stick");
  // });

  // it("add item to cart and estimate shipping and taxes", () => {
  //   //find and add items to cart
  //   onHomePage.addItemToCartByProductName("Skinsheen Bronzer Stick", "$29.50");
  //   //check item in cart
  //   onHomePage.goToCartNavbar();
  //   onCartPage.checkNumberOfProductsInCartTopNavbar();
  //   onCartPage.checkShoppingCartDetails("Skinsheen Bronzer Stick", 1, "$29.50");
  //   //estimate shipping and taxes
  //   onCartPage.fillFormToEstimateShippingAndTaxes(
  //     globalData.country,
  //     globalData.zone,
  //     globalData.postcode
  //   );
  //   //check total values in summary
  //   onCartPage.checkSubTotalValueInSummary();
  //   onCartPage.checkShipmentRateInSummary();
  //   onCartPage.checkFinalTotalValueInSummary();
  // });

  // it("add item to cart and continue the shopping", () => {
  //   //find and add items to cart
  //   onHomePage.addItemToCartByProductName("Skinsheen Bronzer Stick", "$29.50");
  //   //check item in cart
  //   onHomePage.goToCartNavbar();
  //   onCartPage.checkNumberOfProductsInCartTopNavbar();
  //   onCartPage.checkShoppingCartDetails("Skinsheen Bronzer Stick", 1, "$29.50");
  //   //click continue shopping button and check if the home page will appear
  //   onCartPage.clickContinueShoppingBtn();
  //   onHomePage.checkHomeSectionActiveSubnav();
  // });

  // it("make an order for a product - add to cart from home page, open a cart and finish transaction - login user", () => {
  //   //find and add item to cart
  //   onHomePage.addItemToCartByProductName("Skinsheen Bronzer Stick", "$29.50");
  //   //check item in cart
  //   onHomePage.goToCartNavbar();
  //   onCartPage.checkNumberOfProductsInCartTopNavbar();
  //   onCartPage.checkShoppingCartDetails("Skinsheen Bronzer Stick", 1, "$29.50");
  //   //click checkout btn
  //   onCartPage.clickTotalCheckoutBtn();
  //   onLoginPage.checkLoginFormTitleAndText();
  //   onLoginPage.loginToAccount(globalData.login, globalData.password);
  //   //confirm order/checkout information
  //   onConfirmCheckoutPage.checkUrlAndTitlePage();
  //   onConfirmCheckoutPage.checkPathContentToConfrim();
  //   onConfirmCheckoutPage.verifyTextOfAcceptInReturnPolicy();
  //   onConfirmCheckoutPage.verifyDataOnShippingTable(globalData);
  //   onConfirmCheckoutPage.verifyDataOnPaymentTable(globalData);
  //   onConfirmCheckoutPage.verifyItemsInCart(
  //     "Skinsheen Bronzer Stick",
  //     1,
  //     "$29.50"
  //   );
  //   onConfirmCheckoutPage.verifyPaymentCashAmountTotal();
  //   onConfirmCheckoutPage.verifyOrderSummary();
  //   onConfirmCheckoutPage.clickConfirmOrderBtn();
  //   //on success order page
  //   onSuccessOrderPage.checkUrlAndTitlePage();
  //   onSuccessOrderPage.checkPathContentToSuccessOrder();
  //   onSuccessOrderPage.verifySuccessOrderMessage();
  // });

  // it("make an order for a product - add to cart from home page, open a cart and finish transaction - guest user", () => {
  //   const guestUser = {
  //     firstname: "David",
  //     lastname: "Johnson",
  //     email: "davidjohnson111111111222266@example.com",
  //     tele: "123456789",
  //     company: "Auto-Test Przykoni",
  //     address1: "ul. Testowa 123/1",
  //     city: "Warszawa",
  //     country: "Poland",
  //     postcode: "01-123",
  //     zone: "Mazowieckie",
  //   };
  //   //find and add item to cart
  //   onHomePage.addItemToCartByProductName("Skinsheen Bronzer Stick", "$29.50");
  //   //check item in cart
  //   onHomePage.goToCartNavbar();
  //   onCartPage.checkNumberOfProductsInCartTopNavbar();
  //   onCartPage.checkShoppingCartDetails("Skinsheen Bronzer Stick", 1, "$29.50");
  //   //click checkout btn
  //   onCartPage.clickTotalCheckoutBtn();
  //   onLoginPage.verifyLoginPageTitle();
  //   onLoginPage.checkGuestCheckoutOption();
  //   onLoginPage.clickContinueBtn();
  //   //fill the guest form and finish transaction after checking the details
  //   onGuestStepOnePage.checkUrlAndTitlePage();
  //   onGuestStepOnePage.checkPathContentToPaymentEdit();
  //   onGuestStepOnePage.fillPersonalDetails(guestUser);
  //   onGuestStepOnePage.clickContinueBtn();
  //   onConfirmCheckoutPage.verifyDataOnShippingTable(guestUser);
  //   onConfirmCheckoutPage.verifyDataOnPaymentTable(guestUser);
  //   onConfirmCheckoutPage.verifyItemsInCart(
  //     "Skinsheen Bronzer Stick",
  //     1,
  //     "$29.50"
  //   );
  //   onConfirmCheckoutPage.verifyPaymentCashAmountTotal();
  //   onConfirmCheckoutPage.verifyOrderSummary();
  //   onConfirmCheckoutPage.clickConfirmOrderBtn();
  //   //on success order page
  //   onSuccessOrderPage.checkUrlAndTitlePage();
  //   onSuccessOrderPage.checkPathContentToSuccessOrder();
  //   onSuccessOrderPage.verifySuccessOrderMessage();
  // });

  it("make an order for a product - add to cart from home page, open a cart and finish transaction - guest user with seperate address shipping", () => {
    const guestUser = {
      firstname: "David",
      lastname: "Johnson",
      email: "davidjohnson111111111222266@example.com",
      tele: "123456789",
      company: "Auto-Test Przykoni",
      address1: "ul. Testowa 123/1",
      city: "Warszawa",
      country: "Poland",
      postcode: "01-123",
      zone: "Mazowieckie",
    };

    const shippingAddress = {
      firstname: "Test",
      lastname: "Johnteson",
      email: "testy12323543134@example.com",
      address1: "ul. Udemy 123/1",
      city: "Wroclaw",
      country: "Poland",
      postcode: "31-123",
      zone: "Dolnoslaskie",
    };
    //find and add item to cart
    onHomePage.addItemToCartByProductName("Skinsheen Bronzer Stick", "$29.50");
    //check item in cart
    onHomePage.goToCartNavbar();
    onCartPage.checkNumberOfProductsInCartTopNavbar();
    onCartPage.checkShoppingCartDetails("Skinsheen Bronzer Stick", 1, "$29.50");
    //click checkout btn
    onCartPage.clickTotalCheckoutBtn();
    onLoginPage.verifyLoginPageTitle();
    onLoginPage.checkGuestCheckoutOption();
    onLoginPage.clickContinueBtn();
    //fill the guest form and finish transaction after checking the details
    onGuestStepOnePage.checkUrlAndTitlePage();
    onGuestStepOnePage.checkPathContentToPaymentEdit();
    onGuestStepOnePage.fillPersonalDetails(guestUser);
    onGuestStepOnePage.checkSeperateShippingAddress();
    onGuestStepOnePage.fillShippingSeperateDetails(shippingAddress);
    onGuestStepOnePage.clickContinueBtn();
    onConfirmCheckoutPage.verifyDataOnShippingTable(shippingAddress);
    onConfirmCheckoutPage.verifyDataOnPaymentTable(guestUser);
    onConfirmCheckoutPage.verifyItemsInCart(
      "Skinsheen Bronzer Stick",
      1,
      "$29.50"
    );
    onConfirmCheckoutPage.verifyPaymentCashAmountTotal();
    onConfirmCheckoutPage.verifyOrderSummary();
    onConfirmCheckoutPage.clickConfirmOrderBtn();
    //on success order page
    onSuccessOrderPage.checkUrlAndTitlePage();
    onSuccessOrderPage.checkPathContentToSuccessOrder();
    onSuccessOrderPage.verifySuccessOrderMessage();
  });

  it("fail to make an order for a product with guest user - not fill all mandatory fields -> email and address1", () => {
    const guestUser = {
      firstname: "David",
      lastname: "Johnson",
      email: "{backspace}",
      tele: "123456789",
      company: "Auto-Test Przykoni",
      address1: "{backspace}",
      city: "Warszawa",
      country: "Poland",
      postcode: "01-123",
      zone: "Mazowieckie",
    };
    //find and add item to cart
    onHomePage.addItemToCartByProductName("Skinsheen Bronzer Stick", "$29.50");
    //check item in cart
    onHomePage.goToCartNavbar();
    onCartPage.checkNumberOfProductsInCartTopNavbar();
    onCartPage.checkShoppingCartDetails("Skinsheen Bronzer Stick", 1, "$29.50");
    //click checkout btn
    onCartPage.clickTotalCheckoutBtn();
    onLoginPage.verifyLoginPageTitle();
    onLoginPage.checkGuestCheckoutOption();
    onLoginPage.clickContinueBtn();
    //fill the guest form and finish transaction after checking the details
    onGuestStepOnePage.checkUrlAndTitlePage();
    onGuestStepOnePage.checkPathContentToPaymentEdit();
    onGuestStepOnePage.fillPersonalDetails(guestUser);
    onGuestStepOnePage.clickContinueBtn();
    onGuestStepOnePage.getErrorInputMsg([
      "E-Mail Address does not appear to be valid!",
      "Address 1 must be greater than 3 and less than 128 characters!",
    ]);
  });

  it("make an order for a product - add to cart from home page, open a cart and finish transaction - register a user", () => {
    //email and login are generated randomly on backend
    const registerForm = {
      firstname: "Daviden",
      lastname: "Johnsony",
      // email: "johnyTony111123@example.com",
      tele: "123456789",
      address1: "ul. Testowa 123/1",
      city: "Warszawa",
      country: "Poland",
      postcode: "01-123",
      zone: "Mazowieckie",
      // login: "tonyjohny1232",
      password: "test123",
      passwordConfirm: "test123",
      newsletter: 1,
      agreePolicy: 1,
    };
    //find and add item to cart
    onHomePage.addItemToCartByProductName("Skinsheen Bronzer Stick", "$29.50");
    //check item in cart
    onHomePage.goToCartNavbar();
    onCartPage.checkNumberOfProductsInCartTopNavbar();
    onCartPage.checkShoppingCartDetails("Skinsheen Bronzer Stick", 1, "$29.50");
    //click checkout btn
    onCartPage.clickTotalCheckoutBtn();
    onLoginPage.verifyLoginPageTitle();
    onLoginPage.getAndClickToRegisterForm();
    onRegisterPage.verifyRegisterPageTitle();
    onRegisterPage.fillRegisterForm(
      registerForm.firstname,
      registerForm.lastname,
      registerForm.email,
      registerForm.tele,
      registerForm.address1,
      registerForm.city,
      registerForm.country,
      registerForm.postcode,
      registerForm.zone,
      registerForm.login,
      registerForm.password,
      registerForm.passwordConfirm,
      registerForm.newsletter,
      registerForm.agreePolicy
    );
    onRegisterPage.clickContinueBtn();
    onConfirmCheckoutPage.checkUrlAndTitlePage();
    onConfirmCheckoutPage.checkPathContentToConfrim();
    onConfirmCheckoutPage.verifyTextOfAcceptInReturnPolicy();
    onConfirmCheckoutPage.verifyDataOnShippingTable(registerForm);
    onConfirmCheckoutPage.verifyDataOnPaymentTable(registerForm);
    onConfirmCheckoutPage.verifyItemsInCart(
      "Skinsheen Bronzer Stick",
      1,
      "$29.50"
    );
    onConfirmCheckoutPage.verifyPaymentCashAmountTotal();
    onConfirmCheckoutPage.verifyOrderSummary();
    onConfirmCheckoutPage.clickConfirmOrderBtn();
    //on success order page
    onSuccessOrderPage.checkUrlAndTitlePage();
    onSuccessOrderPage.checkPathContentToSuccessOrder();
    onSuccessOrderPage.verifySuccessOrderMessage();
  });

  it("make an order for a product - update the quantity and checkout", () => {
    //find and add item to cart
    onHomePage.addItemToCartByProductName("Skinsheen Bronzer Stick", "$29.50");
    //check item in cart
    onHomePage.goToCartNavbar();
    onCartPage.checkNumberOfProductsInCartTopNavbar();
    onCartPage.checkShoppingCartDetails("Skinsheen Bronzer Stick", 1, "$29.50");
    onCartPage.changeQuantityOfProduct("Skinsheen Bronzer Stick", 10);
    onCartPage.clickCartUpdateBtn();
    //check details after the update of product's quantity and finish transaction
    onCartPage.checkShoppingCartDetails(
      "Skinsheen Bronzer Stick",
      10,
      "$29.50"
    );
    onCartPage.clickTotalCheckoutBtn();
    onLoginPage.checkLoginFormTitleAndText();
    onLoginPage.loginToAccount(globalData.login, globalData.password);
    //confirm order/checkout information
    onConfirmCheckoutPage.checkUrlAndTitlePage();
    onConfirmCheckoutPage.checkPathContentToConfrim();
    onConfirmCheckoutPage.verifyTextOfAcceptInReturnPolicy();
    onConfirmCheckoutPage.verifyDataOnShippingTable(globalData);
    onConfirmCheckoutPage.verifyDataOnPaymentTable(globalData);
    onConfirmCheckoutPage.verifyItemsInCart(
      "Skinsheen Bronzer Stick",
      10,
      "$29.50"
    );
    onConfirmCheckoutPage.verifyPaymentCashAmountTotal();
    onConfirmCheckoutPage.verifyOrderSummary();
    onConfirmCheckoutPage.clickConfirmOrderBtn();
    //on success order page
    onSuccessOrderPage.checkUrlAndTitlePage();
    onSuccessOrderPage.checkPathContentToSuccessOrder();
    onSuccessOrderPage.verifySuccessOrderMessage();
  });

  it("add few products and finish the transaction", () => {
    const guestUser = {
      firstname: "David",
      lastname: "Johnson",
      email: "davidjohnson111111111222266@example.com",
      tele: "123456789",
      company: "Auto-Test Przykoni",
      address1: "ul. Testowa 123/1",
      city: "Warszawa",
      country: "Poland",
      postcode: "01-123",
      zone: "Mazowieckie",
    };
    //find and add items to cart
    onHomePage.addItemToCartByProductName("Skinsheen Bronzer Stick", "$29.50");
    onHomePage.addItemToCartByProductName(
      "Absolute Anti-Age Spot Replenishing Unifying TreatmentSPF 15",
      "$42.00"
    );
    onHomePage.addItemToCartByProductName(
      "Absolue Eye Precious Cells",
      "$89.00"
    );
    //check items details in cart - summary and payment totals
    onHomePage.goToCartNavbar();
    onCartPage.checkNumberOfProductsInCartTopNavbar();
    onCartPage.checkShoppingCartDetails(
      [
        "Skinsheen Bronzer Stick",
        "Absolute Anti-Age Spot Replenishing Unifying TreatmentSPF 15",
        "Absolue Eye Precious Cells",
      ],
      1,
      ["$29.50", "$42.00", "$89.00"]
    );
    onCartPage.checkSubTotalValueInSummary();
    onCartPage.checkShipmentRateInSummary();
    onCartPage.checkFinalTotalValueInSummary();
    onCartPage.clickTotalCheckoutBtn();
    onLoginPage.verifyLoginPageTitle();
    onLoginPage.checkGuestCheckoutOption();
    onLoginPage.clickContinueBtn();
    //fill the guest form and finish transaction after checking the details
    onGuestStepOnePage.checkUrlAndTitlePage();
    onGuestStepOnePage.checkPathContentToPaymentEdit();
    onGuestStepOnePage.fillPersonalDetails(guestUser);
    onGuestStepOnePage.clickContinueBtn();
    onConfirmCheckoutPage.verifyDataOnShippingTable(guestUser);
    onConfirmCheckoutPage.verifyDataOnPaymentTable(guestUser);
    onConfirmCheckoutPage.verifyItemsInCart(
      [
        "Skinsheen Bronzer Stick",
        "Absolute Anti-Age Spot Replenishing Unifying TreatmentSPF 15",
        "Absolue Eye Precious Cells",
      ],
      1,
      ["$29.50", "$42.00", "$89.00"]
    );
    onConfirmCheckoutPage.verifyPaymentCashAmountTotal();
    onConfirmCheckoutPage.verifyOrderSummary();
    onConfirmCheckoutPage.clickConfirmOrderBtn();
    //on success order page
    onSuccessOrderPage.checkUrlAndTitlePage();
    onSuccessOrderPage.checkPathContentToSuccessOrder();
    onSuccessOrderPage.verifySuccessOrderMessage();
  });

  it("add few products, change quantity of one product and finish the transaction", () => {
    const guestUser = {
      firstname: "David",
      lastname: "Johnson",
      email: "davidjohnson111111111222266@example.com",
      tele: "123456789",
      company: "Auto-Test Przykoni",
      address1: "ul. Testowa 123/1",
      city: "Warszawa",
      country: "Poland",
      postcode: "01-123",
      zone: "Mazowieckie",
    };
    //find and add items to cart
    onHomePage.addItemToCartByProductName("Skinsheen Bronzer Stick", "$29.50");
    onHomePage.addItemToCartByProductName(
      "Absolute Anti-Age Spot Replenishing Unifying TreatmentSPF 15",
      "$42.00"
    );
    onHomePage.addItemToCartByProductName(
      "Absolue Eye Precious Cells",
      "$89.00"
    );
    //check items details in cart - summary and payment totals
    onHomePage.goToCartNavbar();
    onCartPage.checkNumberOfProductsInCartTopNavbar();
    onCartPage.checkShoppingCartDetails(
      [
        "Skinsheen Bronzer Stick",
        "Absolute Anti-Age Spot Replenishing Unifying TreatmentSPF 15",
        "Absolue Eye Precious Cells",
      ],
      1,
      ["$29.50", "$42.00", "$89.00"]
    );
    onCartPage.checkSubTotalValueInSummary();
    onCartPage.checkShipmentRateInSummary();
    onCartPage.checkFinalTotalValueInSummary();
    //change quantity of product and verify again all data in cart
    onCartPage.changeQuantityOfProduct("Absolue Eye Precious Cells", 3);
    onCartPage.clickCartUpdateBtn();
    onCartPage.checkShoppingCartDetails(
      [
        "Skinsheen Bronzer Stick",
        "Absolute Anti-Age Spot Replenishing Unifying TreatmentSPF 15",
        "Absolue Eye Precious Cells",
      ],
      [1, 1, 3],
      ["$29.50", "$42.00", "$89.00"]
    );
    onCartPage.checkSubTotalValueInSummary();
    onCartPage.checkFinalTotalValueInSummary();
    onCartPage.clickTotalCheckoutBtn();
    onLoginPage.verifyLoginPageTitle();
    onLoginPage.checkGuestCheckoutOption();
    onLoginPage.clickContinueBtn();
    //fill the guest form and finish transaction after checking the details
    onGuestStepOnePage.checkUrlAndTitlePage();
    onGuestStepOnePage.checkPathContentToPaymentEdit();
    onGuestStepOnePage.fillPersonalDetails(guestUser);
    onGuestStepOnePage.clickContinueBtn();
    onConfirmCheckoutPage.verifyDataOnShippingTable(guestUser);
    onConfirmCheckoutPage.verifyDataOnPaymentTable(guestUser);
    onConfirmCheckoutPage.verifyItemsInCart(
        [
          "Skinsheen Bronzer Stick",
          "Absolute Anti-Age Spot Replenishing Unifying TreatmentSPF 15",
          "Absolue Eye Precious Cells",
        ],
        [1,1,3],
        ["$29.50", "$42.00", "$89.00"]
      );
      onConfirmCheckoutPage.verifyPaymentCashAmountTotal();
      onConfirmCheckoutPage.verifyOrderSummary();
      onConfirmCheckoutPage.clickConfirmOrderBtn();
      //on success order page
      onSuccessOrderPage.checkUrlAndTitlePage();
      onSuccessOrderPage.checkPathContentToSuccessOrder();
      onSuccessOrderPage.verifySuccessOrderMessage();
  });

  // it("add item to cart, change currency to /£/ and finish transaction", () => {
  //   //test case not finished
  //   //there is a need to change codes to split price by chosen currency - now it is fixed to only $ 
  //   //find and add item to cart
  //   onHomePage.addItemToCartByProductName("Skinsheen Bronzer Stick", "$29.50");
  //   //check item in cart
  //   onHomePage.goToCartNavbar();
  //   onCartPage.checkNumberOfProductsInCartTopNavbar();
  //   onCartPage.checkShoppingCartDetails("Skinsheen Bronzer Stick", 1, "$29.50");
  //   onCartPage.changeCurrencyTo('£');
  //   onCartPage.checkShoppingCartDetails("Skinsheen Bronzer Stick", 1, "£23.40");
  // });

  // it("sign in and then add product to cart and finish transaction - a cart must be empty on start", () => {
  //   onHomePage.loginOrRegister();
  //   onLoginPage.checkLoginFormTitleAndText();
  //   onLoginPage.loginToAccount(globalData.login, globalData.password);
  //   onAccountPage.checkUrlAndTitlePage();
  //   onAccountPage.goToHomePage();
  //   onHomePage.goToCartNavbar();
  //   onCartPage.emptyCartList();
  //   onCartPage.goToHomePage();
  //   onHomePage.checkHomeSectionActiveSubnav();
  //   onHomePage.addItemToCartByProductName("Skinsheen Bronzer Stick", "$29.50");
  //   // check item in cart
  //   onHomePage.goToCartNavbar();
  //   onCartPage.checkNumberOfProductsInCartTopNavbar();
  //   onCartPage.checkShoppingCartDetails("Skinsheen Bronzer Stick", 1, "$29.50");
  //   //click checkout btn
  //   onCartPage.clickTotalCheckoutBtn();
  //   onConfirmCheckoutPage.checkUrlAndTitlePage();
  //   onConfirmCheckoutPage.checkPathContentToConfrim();
  //   onConfirmCheckoutPage.verifyTextOfAcceptInReturnPolicy();
  //   onConfirmCheckoutPage.verifyDataOnShippingTable(globalData);
  //   onConfirmCheckoutPage.verifyDataOnPaymentTable(globalData);
  //   onConfirmCheckoutPage.verifyItemsInCart(
  //     "Skinsheen Bronzer Stick",
  //     1,
  //     "$29.50"
  //   );
  //   onConfirmCheckoutPage.verifyPaymentCashAmountTotal();
  //   onConfirmCheckoutPage.verifyOrderSummary();
  //   onConfirmCheckoutPage.clickConfirmOrderBtn();
  //   //on success order page
  //   onSuccessOrderPage.checkUrlAndTitlePage();
  //   onSuccessOrderPage.checkPathContentToSuccessOrder();
  //   onSuccessOrderPage.verifySuccessOrderMessage();
  // });

  // it("After successful order processed, check if cart is empty", () => {
  //   //find and add item to cart
  //   onHomePage.addItemToCartByProductName("Skinsheen Bronzer Stick", "$29.50");
  //   //check item in cart
  //   onHomePage.goToCartNavbar();
  //   onCartPage.checkNumberOfProductsInCartTopNavbar();
  //   onCartPage.checkShoppingCartDetails("Skinsheen Bronzer Stick", 1, "$29.50");
  //   //click checkout btn
  //   onCartPage.clickTotalCheckoutBtn();
  //   onLoginPage.checkLoginFormTitleAndText();
  //   onLoginPage.loginToAccount(globalData.login, globalData.password);
  //   //confirm order/checkout information
  //   onConfirmCheckoutPage.checkUrlAndTitlePage();
  //   onConfirmCheckoutPage.checkPathContentToConfrim();
  //   onConfirmCheckoutPage.verifyTextOfAcceptInReturnPolicy();
  //   onConfirmCheckoutPage.verifyDataOnShippingTable(globalData);
  //   onConfirmCheckoutPage.verifyDataOnPaymentTable(globalData);
  //   onConfirmCheckoutPage.verifyItemsInCart(
  //     "Skinsheen Bronzer Stick",
  //     1,
  //     "$29.50"
  //   );
  //   onConfirmCheckoutPage.verifyPaymentCashAmountTotal();
  //   onConfirmCheckoutPage.verifyOrderSummary();
  //   onConfirmCheckoutPage.clickConfirmOrderBtn();
  //   //on success order page
  //   onSuccessOrderPage.checkUrlAndTitlePage();
  //   onSuccessOrderPage.checkPathContentToSuccessOrder();
  //   onSuccessOrderPage.verifySuccessOrderMessage();
  //   onSuccessOrderPage.clickContinueBtn();
  //   //go to cart and check if cart is empty
  //   onHomePage.goToCartNavbar();
  //   onCartPage.checkUrlAndTitlePage();
  //   onCartPage.checkTextOfEmptyCart("Your shopping cart is empty!");
  //   onCartPage.checkNumberOfProductsInCartTopNavbar();
  // });

  // it("checkout the product and change edit shipping on checkout confirmation page - another existing address", () => {
  //   //find and add item to cart
  //   onHomePage.addItemToCartByProductName("Skinsheen Bronzer Stick", "$29.50");
  //   //check item in cart
  //   onHomePage.goToCartNavbar();
  //   onCartPage.checkNumberOfProductsInCartTopNavbar();
  //   onCartPage.checkShoppingCartDetails("Skinsheen Bronzer Stick", 1, "$29.50");
  //   //click checkout btn
  //   onCartPage.clickTotalCheckoutBtn();
  //   onLoginPage.checkLoginFormTitleAndText();
  //   onLoginPage.loginToAccount(globalData.login, globalData.password);
  //   //confirm order/checkout information
  //   onConfirmCheckoutPage.checkUrlAndTitlePage();
  //   onConfirmCheckoutPage.checkPathContentToConfrim();
  //   onConfirmCheckoutPage.verifyTextOfAcceptInReturnPolicy();
  //   onConfirmCheckoutPage.verifyDataOnShippingTable(globalData);
  //   onConfirmCheckoutPage.verifyDataOnPaymentTable(globalData);
  //   onConfirmCheckoutPage.verifyItemsInCart(
  //     "Skinsheen Bronzer Stick",
  //     1,
  //     "$29.50"
  //   );
  //   onConfirmCheckoutPage.verifyPaymentCashAmountTotal();
  //   onConfirmCheckoutPage.verifyOrderSummary();
  //   onConfirmCheckoutPage.clickEditShippingBtn();
  //   //edit shipping information
  //   onShippingEditPage.checkUrlAndTitlePage();
  //   onShippingEditPage.checkPathContentToShippingEdit();
  //   onShippingEditPage.clickChangeAddressBtn();
  //   //change to other existing address
  //   onShippingAddAddressPage.checkUrlAndTitlePage();
  //   onShippingAddAddressPage.changeAddressCheckboxToAnotherByDetails(
  //     newAddressUser
  //   );
  //   onShippingAddAddressPage.clickContinueBtnToChangeAddress();
  //   //verify if the changes have been applied on confirm page
  //   onConfirmCheckoutPage.verifyDataOnShippingTable(newAddressUser);
  // });

  // it("checkout the product and change edit shipping on checkout confirmation page - new address", () => {
  //   //add item to cart
  //   onHomePage.addItemToCartByProductName("Skinsheen Bronzer Stick", "$29.50");
  //   //check item in cart
  //   onHomePage.goToCartNavbar();
  //   onCartPage.checkNumberOfProductsInCartTopNavbar();
  //   onCartPage.checkShoppingCartDetails("Skinsheen Bronzer Stick", 1, "$29.50");
  //   //click checkout btn
  //   onCartPage.clickTotalCheckoutBtn();
  //   onLoginPage.checkLoginFormTitleAndText();
  //   onLoginPage.loginToAccount(globalData.login, globalData.password);
  //   //confirm order/checkout information
  //   onConfirmCheckoutPage.checkUrlAndTitlePage();
  //   onConfirmCheckoutPage.checkPathContentToConfrim();
  //   onConfirmCheckoutPage.verifyTextOfAcceptInReturnPolicy();
  //   onConfirmCheckoutPage.verifyDataOnShippingTable(globalData);
  //   onConfirmCheckoutPage.verifyDataOnPaymentTable(globalData);
  //   onConfirmCheckoutPage.verifyItemsInCart(
  //     "Skinsheen Bronzer Stick",
  //     1,
  //     "$29.50"
  //   );
  //   onConfirmCheckoutPage.verifyPaymentCashAmountTotal();
  //   onConfirmCheckoutPage.verifyOrderSummary();
  //   onConfirmCheckoutPage.clickEditShippingBtn();
  //   //edit shipping information
  //   onShippingEditPage.checkUrlAndTitlePage();
  //   onShippingEditPage.checkPathContentToShippingEdit();
  //   onShippingEditPage.clickChangeAddressBtn();
  //   onShippingAddAddressPage.checkUrlAndTitlePage();
  //   onShippingAddAddressPage.addNewAddress(newAddressUser);
  //   onShippingAddAddressPage.clickContinueBtnToAddAddress();
  //   //verify if the changes have been applied on confirm page
  //   onConfirmCheckoutPage.verifyDataOnShippingTable(newAddressUser);
  // });

  // it("checkout the product and change edit payment on checkout confirmation page", () => {
  //   //add item to cart
  //   onHomePage.addItemToCartByProductName("Skinsheen Bronzer Stick", "$29.50");
  //   //check item in cart
  //   onHomePage.goToCartNavbar();
  //   onCartPage.checkNumberOfProductsInCartTopNavbar();
  //   onCartPage.checkShoppingCartDetails("Skinsheen Bronzer Stick", 1, "$29.50");
  //   //click checkout btn
  //   onCartPage.clickTotalCheckoutBtn();
  //   onLoginPage.checkLoginFormTitleAndText();
  //   onLoginPage.loginToAccount(globalData.login, globalData.password);
  //   //confirm order/checkout information
  //   onConfirmCheckoutPage.checkUrlAndTitlePage();
  //   onConfirmCheckoutPage.checkPathContentToConfrim();
  //   onConfirmCheckoutPage.verifyTextOfAcceptInReturnPolicy();
  //   onConfirmCheckoutPage.verifyDataOnShippingTable(globalData);
  //   onConfirmCheckoutPage.verifyDataOnPaymentTable(globalData);
  //   onConfirmCheckoutPage.verifyItemsInCart(
  //     "Skinsheen Bronzer Stick",
  //     1,
  //     "$29.50"
  //   );
  //   onConfirmCheckoutPage.verifyPaymentCashAmountTotal();
  //   onConfirmCheckoutPage.verifyOrderSummary();
  //   onConfirmCheckoutPage.clickEditPaymentBtn();
  //   //edit payment information
  //   onPaymentEditPage.checkUrlAndTitlePage();
  //   onPaymentEditPage.clickChangeAddressBtn();
  //   onPaymentAddAddressPage.checkUrlAndTitlePage();
  //   onPaymentAddAddressPage.changeAddressCheckboxToAnotherByDetails(
  //     newAddressUser
  //   );
  //   onPaymentAddAddressPage.clickContinueBtnToChangeAddress();
  //   //verify if the changes have been applied on confirm page
  //   onConfirmCheckoutPage.verifyDataOnPaymentTable(newAddressUser);
  // });

  // it("checkout the product and on checkout confirmation page change edit coupon - apply the wrong one", () => {
  //   //add item to cart
  //   onHomePage.addItemToCartByProductName("Skinsheen Bronzer Stick", "$29.50");
  //   //check item in cart
  //   onHomePage.goToCartNavbar();
  //   onCartPage.checkNumberOfProductsInCartTopNavbar();
  //   onCartPage.checkShoppingCartDetails("Skinsheen Bronzer Stick", 1, "$29.50");
  //   //click checkout btn
  //   onCartPage.clickTotalCheckoutBtn();
  //   onLoginPage.checkLoginFormTitleAndText();
  //   onLoginPage.loginToAccount(globalData.login, globalData.password);
  //   //confirm order/checkout information
  //   onConfirmCheckoutPage.checkUrlAndTitlePage();
  //   onConfirmCheckoutPage.checkPathContentToConfrim();
  //   onConfirmCheckoutPage.verifyTextOfAcceptInReturnPolicy();
  //   onConfirmCheckoutPage.verifyDataOnShippingTable(globalData);
  //   onConfirmCheckoutPage.verifyDataOnPaymentTable(globalData);
  //   onConfirmCheckoutPage.verifyItemsInCart(
  //     "Skinsheen Bronzer Stick",
  //     1,
  //     "$29.50"
  //   );
  //   onConfirmCheckoutPage.verifyPaymentCashAmountTotal();
  //   onConfirmCheckoutPage.verifyOrderSummary();
  //   onConfirmCheckoutPage.clickEditCouponBtn();
  //   //apply wrong coupon
  //   onPaymentEditPage.checkUrlAndTitlePage();
  //   onPaymentEditPage.applyCouponCode("coupon");
  //   onPaymentEditPage.clickApplyCouponBtn();
  //   onPaymentEditPage.verifyErrorMessage();
  //   onPaymentEditPage.verifyErrorCouponRemoveBtnExists();
  // });

  // it("checkout the product and on checkout confirmation page change edit cart - edit the quantites ", () => {
  //   //add item to cart
  //   onHomePage.addItemToCartByProductName("Skinsheen Bronzer Stick", "$29.50");
  //   //check item in cart
  //   onHomePage.goToCartNavbar();
  //   onCartPage.checkNumberOfProductsInCartTopNavbar();
  //   onCartPage.checkShoppingCartDetails("Skinsheen Bronzer Stick", 1, "$29.50");
  //   //click checkout btn
  //   onCartPage.clickTotalCheckoutBtn();
  //   onLoginPage.checkLoginFormTitleAndText();
  //   onLoginPage.loginToAccount(globalData.login, globalData.password);
  //   //confirm order/checkout information
  //   onConfirmCheckoutPage.checkUrlAndTitlePage();
  //   onConfirmCheckoutPage.checkPathContentToConfrim();
  //   onConfirmCheckoutPage.verifyTextOfAcceptInReturnPolicy();
  //   onConfirmCheckoutPage.verifyDataOnShippingTable(globalData);
  //   onConfirmCheckoutPage.verifyDataOnPaymentTable(globalData);
  //   onConfirmCheckoutPage.verifyItemsInCart(
  //     "Skinsheen Bronzer Stick",
  //     1,
  //     "$29.50"
  //   );
  //   onConfirmCheckoutPage.verifyPaymentCashAmountTotal();
  //   onConfirmCheckoutPage.verifyOrderSummary();
  //   onConfirmCheckoutPage.clickEditCartBtn();
  //   //edit the cart - change quantity of product
  //   onCartPage.checkUrlAndTitlePage();
  //   onCartPage.changeQuantityOfProduct("Skinsheen Bronzer Stick", 3);
  //   onCartPage.clickCartCheckoutBtn();
  //   //verify if the chechout information has been updated
  //   onConfirmCheckoutPage.checkUrlAndTitlePage();
  //   onConfirmCheckoutPage.verifyDataOnShippingTable(globalData);
  //   onConfirmCheckoutPage.verifyDataOnPaymentTable(globalData);
  //   onConfirmCheckoutPage.verifyItemsInCart(
  //     "Skinsheen Bronzer Stick",
  //     3,
  //     "$29.50"
  //   );
  //   onConfirmCheckoutPage.verifyPaymentCashAmountTotal();
  //   onConfirmCheckoutPage.verifyOrderSummary();
  // });

  // it("checkout the product and on checkout add comment to an order", () => {
  //   //add item to cart
  //   onHomePage.addItemToCartByProductName("Skinsheen Bronzer Stick", "$29.50");
  //   //check item in cart
  //   onHomePage.goToCartNavbar();
  //   onCartPage.checkNumberOfProductsInCartTopNavbar();
  //   onCartPage.checkShoppingCartDetails("Skinsheen Bronzer Stick", 1, "$29.50");
  //   //click checkout btn
  //   onCartPage.clickTotalCheckoutBtn();
  //   onLoginPage.checkLoginFormTitleAndText();
  //   onLoginPage.loginToAccount(globalData.login, globalData.password);
  //   //confirm order/checkout information
  //   onConfirmCheckoutPage.checkUrlAndTitlePage();
  //   onConfirmCheckoutPage.checkPathContentToConfrim();
  //   onConfirmCheckoutPage.verifyTextOfAcceptInReturnPolicy();
  //   onConfirmCheckoutPage.verifyDataOnShippingTable(globalData);
  //   onConfirmCheckoutPage.verifyDataOnPaymentTable(globalData);
  //   onConfirmCheckoutPage.verifyItemsInCart(
  //     "Skinsheen Bronzer Stick",
  //     1,
  //     "$29.50"
  //   );
  //   onConfirmCheckoutPage.verifyPaymentCashAmountTotal();
  //   onConfirmCheckoutPage.verifyOrderSummary();
  //   //check if comment exists before adding it
  //   onConfirmCheckoutPage.checkCommentFormNonExistence();
  //   //add comment to an order - through shipping or payment edit page
  //   onConfirmCheckoutPage.clickEditPaymentBtn();
  //   onPaymentEditPage.addCommentToOrder("This is a test comment");
  //   onPaymentEditPage.agreeCheckboxToReturnPolicy();
  //   onPaymentEditPage.clickContinueBtn();
  //   onConfirmCheckoutPage.checkCommentFormExistence();
  //   onConfirmCheckoutPage.checkCommentText("This is a test comment");
  // });

  // it("fail adding comment to payment on checkout page - not agreed to return policy", () => {
  //   //add item to cart
  //   onHomePage.addItemToCartByProductName("Skinsheen Bronzer Stick", "$29.50");
  //   //check item in cart
  //   onHomePage.goToCartNavbar();
  //   onCartPage.checkNumberOfProductsInCartTopNavbar();
  //   onCartPage.checkShoppingCartDetails("Skinsheen Bronzer Stick", 1, "$29.50");
  //   //click checkout btn
  //   onCartPage.clickTotalCheckoutBtn();
  //   onLoginPage.checkLoginFormTitleAndText();
  //   onLoginPage.loginToAccount(globalData.login, globalData.password);
  //   //confirm order/checkout information
  //   onConfirmCheckoutPage.checkUrlAndTitlePage();
  //   onConfirmCheckoutPage.checkPathContentToConfrim();
  //   onConfirmCheckoutPage.verifyTextOfAcceptInReturnPolicy();
  //   onConfirmCheckoutPage.verifyDataOnShippingTable(globalData);
  //   onConfirmCheckoutPage.verifyDataOnPaymentTable(globalData);
  //   onConfirmCheckoutPage.verifyItemsInCart(
  //     "Skinsheen Bronzer Stick",
  //     1,
  //     "$29.50"
  //   );
  //   onConfirmCheckoutPage.verifyPaymentCashAmountTotal();
  //   onConfirmCheckoutPage.verifyOrderSummary();
  //   //check if comment exists before adding it
  //   onConfirmCheckoutPage.checkCommentFormNonExistence();
  //   //add comment to an order - through shipping or payment edit page
  //   onConfirmCheckoutPage.clickEditPaymentBtn();
  //   onPaymentEditPage.addCommentToOrder("This is a test comment");
  //   onPaymentEditPage.clickContinueBtn();
  //   //verify error message
  //   onPaymentEditPage.verifyErrorMessageNotCheckReturnPolicy();
  // });

  // it("add comment to checkout page but firstly make an error not checking return policy", () => {
  //   //add item to cart
  //   onHomePage.addItemToCartByProductName("Skinsheen Bronzer Stick", "$29.50");
  //   //check item in cart
  //   onHomePage.goToCartNavbar();
  //   onCartPage.checkNumberOfProductsInCartTopNavbar();
  //   onCartPage.checkShoppingCartDetails("Skinsheen Bronzer Stick", 1, "$29.50");
  //   //click checkout btn
  //   onCartPage.clickTotalCheckoutBtn();
  //   onLoginPage.checkLoginFormTitleAndText();
  //   onLoginPage.loginToAccount(globalData.login, globalData.password);
  //   //confirm order/checkout information
  //   onConfirmCheckoutPage.checkUrlAndTitlePage();
  //   onConfirmCheckoutPage.checkPathContentToConfrim();
  //   onConfirmCheckoutPage.verifyTextOfAcceptInReturnPolicy();
  //   onConfirmCheckoutPage.verifyDataOnShippingTable(globalData);
  //   onConfirmCheckoutPage.verifyDataOnPaymentTable(globalData);
  //   onConfirmCheckoutPage.verifyItemsInCart(
  //     "Skinsheen Bronzer Stick",
  //     1,
  //     "$29.50"
  //   );
  //   onConfirmCheckoutPage.verifyPaymentCashAmountTotal();
  //   onConfirmCheckoutPage.verifyOrderSummary();
  //   //check if comment exists before adding it
  //   onConfirmCheckoutPage.checkCommentFormNonExistence();
  //   //add comment to an order - through shipping or payment edit page
  //   onConfirmCheckoutPage.clickEditPaymentBtn();
  //   onPaymentEditPage.addCommentToOrder("This is a test comment");
  //   onPaymentEditPage.clickContinueBtn();
  //   //verify error message
  //   onPaymentEditPage.verifyErrorMessageNotCheckReturnPolicy();
  //   //close error message and add properly the comment msg
  //   onPaymentEditPage.closeErrorMessageBtn();
  //   onPaymentEditPage.addCommentToOrder("This is a test comment");
  //   onPaymentEditPage.agreeCheckboxToReturnPolicy();
  //   onPaymentEditPage.clickContinueBtn();
  //   onConfirmCheckoutPage.checkCommentFormExistence();
  //   onConfirmCheckoutPage.checkCommentText("This is a test comment");
  // });
});
