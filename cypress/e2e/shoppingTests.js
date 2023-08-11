/// <reference types="Cypress" />
import { navigateTo } from "../support/page_object/navigationPage";
import { onHomePage } from "../support/page_object/homePage";
import { onCartPage } from "../support/page_object/cartPage";

describe("Testing shopping funcionality", () => {
  let globalData;

  beforeEach("open a website and login to account", () => {
    //assign global data
    cy.fixture("example.json").then(function (data) {
      globalData = data;
    });
    //open home page nad sign in
    cy.openHomePage();
  });

  it("add article from homePage to a cart", () => {
    onHomePage.checkHomeSectionActiveSubnav();
    //check if cart is empty
    onHomePage.goToCartNavbar();
    onCartPage.checkUrlAndTitlePage();
    onCartPage.checkPathContentToDownload();
    onCartPage.checkTextOfEmptyCart("Your shopping cart is empty!");
    onCartPage.checkNoExistingCartTable();
    onCartPage.clickContinueBtn();
    //find and add item to cart
    onHomePage.addItemToCartByProductName("Skinsheen Bronzer Stick", "$29.50");
    //check item in cart
    onHomePage.goToCartNavbar();
    onCartPage.checkNumberOfProductsInCartTopNavbar();
    onCartPage.checkShoppingCartDetails("Skinsheen Bronzer Stick", 1, "$29.50");
  });

  it("check cart with few articles", () => {
    onHomePage.checkHomeSectionActiveSubnav();
    //check if cart is empty
    onHomePage.goToCartNavbar();
    onCartPage.checkUrlAndTitlePage();
    onCartPage.checkPathContentToDownload();
    onCartPage.checkTextOfEmptyCart("Your shopping cart is empty!");
    onCartPage.checkNoExistingCartTable();
    onCartPage.clickContinueBtn();
    //find and add items to cart
    onHomePage.addItemToCartByProductName("Skinsheen Bronzer Stick", "$29.50");
    onHomePage.addItemToCartByProductName(
      "Absolute Anti-Age Spot Replenishing Unifying TreatmentSPF 15",
      "$42.00"
    );
    //check items in cart
    onHomePage.goToCartNavbar();
    onCartPage.checkNumberOfProductsInCartTopNavbar();
    onCartPage.checkShoppingCartDetails(
      [
        "Skinsheen Bronzer Stick",
        "Absolute Anti-Age Spot Replenishing Unifying TreatmentSPF 15",
      ],
      1,
      ["$29.50", "$42.00"]
    );
  });

  it("add items to cart and then delete one", () => {
    onHomePage.checkHomeSectionActiveSubnav();
    //check if cart is empty
    onHomePage.goToCartNavbar();
    onCartPage.checkUrlAndTitlePage();
    onCartPage.checkPathContentToDownload();
    onCartPage.checkTextOfEmptyCart("Your shopping cart is empty!");
    onCartPage.checkNumberOfProductsInCartTopNavbar();
    onCartPage.checkNoExistingCartTable();
    onCartPage.clickContinueBtn();
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
    //check items in cart
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
    //delete the product from cart by name
    onCartPage.deleteProductByName(
      "Absolute Anti-Age Spot Replenishing Unifying TreatmentSPF 15"
    );
    //verify if the cart has only other product/s and there is no product with that product name and check products quantity in cart
    onCartPage.checkShoppingCartDetails(
      ["Skinsheen Bronzer Stick", "Absolue Eye Precious Cells"],
      1,
      ["$29.50", "$89.00"]
    );
    onCartPage.findProductNameInCartNotExists(
      "Absolute Anti-Age Spot Replenishing Unifying TreatmentSPF 15"
    );
    onCartPage.checkNumberOfProductsInCartTopNavbar();
  });

  it("add item to cart and then delete it", () => {
    onHomePage.checkHomeSectionActiveSubnav();
    //check if cart is empty
    onHomePage.goToCartNavbar();
    onCartPage.checkUrlAndTitlePage();
    onCartPage.checkPathContentToDownload();
    onCartPage.checkTextOfEmptyCart("Your shopping cart is empty!");
    onCartPage.checkNumberOfProductsInCartTopNavbar();
    onCartPage.checkNoExistingCartTable();
    onCartPage.clickContinueBtn();
    //find and add item to cart
    onHomePage.addItemToCartByProductName("Skinsheen Bronzer Stick", "$29.50");
    //check item in cart
    onHomePage.goToCartNavbar();
    onCartPage.checkNumberOfProductsInCartTopNavbar();
    onCartPage.checkShoppingCartDetails("Skinsheen Bronzer Stick", 1, "$29.50");
    //delete the product
    onCartPage.deleteProductByName("Skinsheen Bronzer Stick");
    //verify if the product has been deleted
    onCartPage.checkTextOfEmptyCart("Your shopping cart is empty!");
    onCartPage.checkNumberOfProductsInCartTopNavbar();
    onCartPage.checkNoExistingCartTable();
  });

  it("check cart even if it is empty", () => {
    onHomePage.checkHomeSectionActiveSubnav();
    //check if cart is empty
    onHomePage.goToCartNavbar();
    onCartPage.checkUrlAndTitlePage();
    onCartPage.checkPathContentToDownload();
    onCartPage.checkTextOfEmptyCart("Your shopping cart is empty!");
    onCartPage.checkNoExistingCartTable();
  });

  it("try to add an article which is out of stock to a cart from home page", () => {
    onHomePage.checkHomeSectionActiveSubnav();
    //check if cart is empty
    onHomePage.goToCartNavbar();
    onCartPage.checkUrlAndTitlePage();
    onCartPage.checkPathContentToDownload();
    onCartPage.checkTextOfEmptyCart("Your shopping cart is empty!");
    onCartPage.checkNoExistingCartTable();
    onCartPage.clickContinueBtn();
    //find and add item to cart which is out of stock
    onHomePage.tryToAddProductOutOfStock("BeneFit Girl Meets Pearl", "$19.00");
  });

  it("apply the wrong coupon to the cart", () => {
    onHomePage.checkHomeSectionActiveSubnav();
    //check if cart is empty
    onHomePage.goToCartNavbar();
    onCartPage.checkUrlAndTitlePage();
    onCartPage.checkPathContentToDownload();
    onCartPage.checkTextOfEmptyCart("Your shopping cart is empty!");
    onCartPage.checkNumberOfProductsInCartTopNavbar();
    onCartPage.checkNoExistingCartTable();
    onCartPage.clickContinueBtn();
    //find and add item to cart
    onHomePage.addItemToCartByProductName("Skinsheen Bronzer Stick", "$29.50");
    //check item in cart
    onHomePage.goToCartNavbar();
    onCartPage.checkNumberOfProductsInCartTopNavbar();
    onCartPage.checkShoppingCartDetails("Skinsheen Bronzer Stick", 1, "$29.50");
    //apply the coupon
    onCartPage.applyCouponCode("test123");
    //error message - wrong coupon code
    onCartPage.verifyErrorCouponMsg();
  });

  it("add item to cart and update the quantity of product", () => {
    onHomePage.checkHomeSectionActiveSubnav();
    //check if cart is empty
    onHomePage.goToCartNavbar();
    onCartPage.checkUrlAndTitlePage();
    onCartPage.checkPathContentToDownload();
    onCartPage.checkTextOfEmptyCart("Your shopping cart is empty!");
    onCartPage.checkNumberOfProductsInCartTopNavbar();
    onCartPage.checkNoExistingCartTable();
    onCartPage.clickContinueBtn();
    //find and add item to cart
    onHomePage.addItemToCartByProductName("Skinsheen Bronzer Stick", "$29.50");
    //check item in cart
    onHomePage.goToCartNavbar();
    onCartPage.checkNumberOfProductsInCartTopNavbar();
    onCartPage.checkShoppingCartDetails("Skinsheen Bronzer Stick", 1, "$29.50");
    //change quantity of product in cart and update cart
    onCartPage.changeQuantityOfProduct('Skinsheen Bronzer Stick',4);
    onCartPage.clickCartUpdateBtn();
    //verify if the total amount has been changed
    onCartPage.checkTotalPriceOfItem('Skinsheen Bronzer Stick', '$118.00')
  });

  it("add few items to cart and update the quantity of one specific product", () => {
    onHomePage.checkHomeSectionActiveSubnav();
    //check if cart is empty
    onHomePage.goToCartNavbar();
    onCartPage.checkUrlAndTitlePage();
    onCartPage.checkPathContentToDownload();
    onCartPage.checkTextOfEmptyCart("Your shopping cart is empty!");
    onCartPage.checkNumberOfProductsInCartTopNavbar();
    onCartPage.checkNoExistingCartTable();
    onCartPage.clickContinueBtn();
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
    //check items in cart
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
    //change quantity of product in cart
    onCartPage.changeQuantityOfProduct('Absolue Eye Precious Cells',4);
    onCartPage.clickCartUpdateBtn();
    //verify if the total amount has been changed
    onCartPage.checkTotalPriceOfItem('Absolue Eye Precious Cells', '$356.00')
  });

  it("add item to cart and update the quantity of product - enter wrong value - a symbol instead of number -> item is deleted", () => {
    onHomePage.checkHomeSectionActiveSubnav();
    //check if cart is empty
    onHomePage.goToCartNavbar();
    onCartPage.checkUrlAndTitlePage();
    onCartPage.checkPathContentToDownload();
    onCartPage.checkTextOfEmptyCart("Your shopping cart is empty!");
    onCartPage.checkNumberOfProductsInCartTopNavbar();
    onCartPage.checkNoExistingCartTable();
    onCartPage.clickContinueBtn();
    //find and add item to cart
    onHomePage.addItemToCartByProductName("Skinsheen Bronzer Stick", "$29.50");
    //check item in cart
    onHomePage.goToCartNavbar();
    onCartPage.checkNumberOfProductsInCartTopNavbar();
    onCartPage.checkShoppingCartDetails("Skinsheen Bronzer Stick", 1, "$29.50");
    //change quantity of product in cart
    onCartPage.changeQuantityOfProduct('Skinsheen Bronzer Stick','test');
    onCartPage.clickCartUpdateBtn();
    //item should be deleted
    onCartPage.checkNumberOfProductsInCartTopNavbar();
    onCartPage.checkNoExistingCartTable();
    onCartPage.checkTextOfEmptyCart("Your shopping cart is empty!");
  });

  it.only("add few items to cart and update the quantity of one product - enter wrong value - a symbol instead of number -> item is deleted", () => {
    onHomePage.checkHomeSectionActiveSubnav();
    //check if cart is empty
    onHomePage.goToCartNavbar();
    onCartPage.checkUrlAndTitlePage();
    onCartPage.checkPathContentToDownload();
    onCartPage.checkTextOfEmptyCart("Your shopping cart is empty!");
    onCartPage.checkNumberOfProductsInCartTopNavbar();
    onCartPage.checkNoExistingCartTable();
    onCartPage.clickContinueBtn();
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
    //check items in cart
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
    //change quantity of product in cart
    onCartPage.changeQuantityOfProduct('Skinsheen Bronzer Stick','test');
    onCartPage.clickCartUpdateBtn();
    //item should be deleted
    onCartPage.checkNumberOfProductsInCartTopNavbar();
    onCartPage.checkShoppingCartDetails(
        [
          "Absolute Anti-Age Spot Replenishing Unifying TreatmentSPF 15",
          "Absolue Eye Precious Cells",
        ],
        1,
        ["$42.00", "$89.00"]
      );
    //
    onCartPage.findProductNameInCartNotExists('Skinsheen Bronzer Stick')
  });

  it("add item to cart and estimate shipping and taxes", () => {});

  it("add item to cart and continue the shopping", () => {});

  it("change currency and check prices of products", () => {});

  it("make an order for a product - add to cart from home page, open a cart and finish transaction -login user", () => {});

  it("make an order for a product - add to cart from home page, open a cart and finish transaction - guest user", () => {});

  it("make an order for a product - add to cart from home page, open a cart and finish transaction - register a user", () => {});

  it("make an order for a product - update the quantity and checkout", () => {});

  it("add few products and finish the transaction", () => {});

  it("add item to cart, change currency and finish transaction", () => {});

  //product tests
  it("change quantity and add item to cart", () => {});

  it("add item to wishlist", () => {});

  it("remove item from wishlist", () => {});

  it("print the item details", () => {});

  it("check item details", () => {});

  it("check item reviews", () => {});

  it("check related products", () => {});

  it("check special offer - verify all products", () => {});

  it("find the product from search field", () => {});

  it("find all products related to the brand - click Gucci logo in Brand list on home page", () => {});

  it("check featured products", () => {});

  it("check latest products", () => {});

  it("check bestsellers products", () => {});

  it("check special products on home page", () => {});

  it("change sort by - highest rating", () => {});

  it("search the item - find no items matching to search criteria", () => {});

  it("check the order details by finding by id and email", () => {});
  //for home page test
  it("check text on home page", () => {});

  it("check about us footer", () => {});

  it("check contac us footer", () => {});

  it("check testimonials footer", () => {});

  it("sign up for newsletter group", () => {});

  it("check brand scrolling list", () => {});
});
