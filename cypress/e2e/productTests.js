/// <reference types="Cypress" />
import { onCategoryPage } from "../support/page_object/categoryPage";
import { onHomePage } from "../support/page_object/homePage";
import { onProductPage } from "../support/page_object/productPage";
import { onCartPage } from "../support/page_object/cartPage";
import { onLoginPage } from "../support/page_object/loginPage";
import { onAccountPage } from "../support/page_object/accountPage";
import { onWishList } from "../support/page_object/wishList";

describe("Testing products functionality", () => {
  let globalData;

  var makeupObj = {
    title: "Hair Care",
    number: 52,
    subcategories: ["Conditioner", "Shampoo"]
  };
  const product = {
    title: "Eau Parfumee au The Vert Shampoo",
    price: "$31.00",
    manufacturer: "Bvlgari",
    model: "522823",
    availability: 1,
    reviewsQuantity: 0,
    color: 0,
    description:
      "Structured around the refreshing vitality and purtiy of green tea, Bvlgari Eau the Vert Shampoo is an expression of elegance and personal indulgence. Delicately perfumed Eau Parfumée au thé vert shampoo gentle cleansing action makes it perfect for daily use.",
  };

  beforeEach("open a website and login to account", () => {
    //assign global data
    cy.fixture("example.json").then(function (data) {
      globalData = data;
    });
    //open home page and check if section home is active
    cy.openHomePage();
    onHomePage.checkHomeSectionActiveSubnav();
  });

  it("go to makeup products, open a product, check details, change quantity and add item to cart", () => {
    var makeupObj = {
      title: "Makeup",
      number: 36,
      subcategories: ["Cheeks", "Eyes", "Face", "Lips", "Nails", "Value Sets"],
    };
    const product = {
      title: "Viva Glam Lipstick",
      price: "$5.00",
      manufacturer: "M·A·C",
      model: "14.50",
      availability: 1,
      reviewsQuantity: 0,
      color: "Viva Glam II",
      description:
        "Time to wham up the GLAM in VIVA GLAM! It's a gaga-glamorous look at our abiding passion: The M·A·C AIDS Fund and the VIVA GLAM program are the heart and soul of M·A·C Cosmetics. Ladies and gentlemen, we give you the sensational Cyndi Lauper and the electric Lady Gaga",
    };
    onHomePage.clickToCategoryPageByTitle(makeupObj.title);
    onCategoryPage.checkUrlAndTitlePage(makeupObj.title, makeupObj.number);
    onCategoryPage.checkPathContentToCategory(makeupObj.title);
    onCategoryPage.checkSelectedCategoryNameOnNav(makeupObj.title);
    onCategoryPage.openProductPageByName(product.title);
    onProductPage.checkPathContentToWishlist(product.title);
    onProductPage.checkProductName(product.title);
    onProductPage.checkProductPrice(product.price);
    onProductPage.checkPossibilityToAddToCartProduct();
    onProductPage.checkProductDescription(product.description);
    onProductPage.checkAvailabilityOfProduct(product.availability);
    onProductPage.checkModelOfProduct(product.model);
    onProductPage.checkManufacturerOfProduct(product.manufacturer);
    onProductPage.checkReviewsAmountOfProduct(product.reviewsQuantity);
    onProductPage.changeColorOfProduct(product.color);
    onProductPage.checkTotalPriceOfProduct();
    onProductPage.changeQuantityOfProduct(3);
    onProductPage.checkTotalPriceOfProduct();
    onProductPage.clickAddToCartBtn();
    //check if product is correctly added to cart
    onCartPage.checkShoppingCartDetails(product.title, 3, product.price);
  });

  it("check all category and subcategory options of products", () => {
    var categories = [
      {
        title: "Home",
        subcategories: ["Specials", "Account", "Cart", "Checkout"],
      },
      {
        title: "Apparel & accessories",
        subcategories: ["Shoes", "T-shirts"],
      },
      {
        title: "Makeup",
        subcategories: [
          "Cheeks",
          "Eyes",
          "Face",
          "Lips",
          "Nails",
          "Value Sets",
        ],
      },
      {
        title: "Skincare",
        subcategories: [
          "Eyes",
          "Face",
          "Gift Ideas & Sets",
          "Hands & Nails",
          "Sun",
        ],
      },
      {
        title: "Fragrance",
        subcategories: ["Men", "Women"],
      },
      {
        title: "Men",
        subcategories: [
          "Body & Shower",
          "Fragrance Sets",
          "Pre-Shave & Shaving",
          "Skincare",
        ],
      },
      {
        title: "Hair Care",
        subcategories: ["Conditioner", "Shampoo"],
      },
      {
        title: "Books",
        subcategories: ["Audio CD", "Paperback"],
      },
    ];
    onHomePage.checkAllCategoryAndSubcategoryOptions(categories);
  });

  it("not possible to add random item to wishlist from hair care tab if user is not logged in", () => {
    onHomePage.clickToCategoryPageByTitle(makeupObj.title);
    onCategoryPage.checkUrlAndTitlePage(makeupObj.title, makeupObj.number);
    onCategoryPage.checkPathContentToCategory(makeupObj.title);
    onCategoryPage.checkSelectedCategoryNameOnNav(makeupObj.title);
    onCategoryPage.openProductPageByName(product.title);
    onProductPage.checkPathContentToWishlist(product.title);
    onProductPage.checkProductName(product.title);
    onProductPage.checkProductPrice(product.price);
    onProductPage.checkPossibilityToAddToCartProduct();
    onProductPage.checkProductDescription(product.description);
    onProductPage.checkAvailabilityOfProduct(product.availability);
    onProductPage.checkModelOfProduct(product.model);
    onProductPage.checkManufacturerOfProduct(product.manufacturer);
    onProductPage.checkReviewsAmountOfProduct(product.reviewsQuantity);
    //check if add to wishlist btn is not exists
    onProductPage.addToWishlistBtnNotVisible();
  });

  it('add to wishlist product - user logged in', () => {
    //login to page
    onHomePage.loginOrRegister();
    onLoginPage.checkLoginFormTitleAndText();
    onLoginPage.loginToAccount(globalData.login, globalData.password);
    onAccountPage.checkUrlAndTitlePage();
    onAccountPage.goToHomePage();
    onHomePage.checkHomeSectionActiveSubnav();
    //choose the item and verify data
    onHomePage.clickToCategoryPageByTitle(makeupObj.title);
    onCategoryPage.checkUrlAndTitlePage(makeupObj.title, makeupObj.number);
    onCategoryPage.checkPathContentToCategory(makeupObj.title);
    onCategoryPage.checkSelectedCategoryNameOnNav(makeupObj.title);
    onCategoryPage.openProductPageByName(product.title);
    onProductPage.checkPathContentToWishlist(product.title);
    onProductPage.checkProductName(product.title);
    onProductPage.checkProductPrice(product.price);
    onProductPage.checkPossibilityToAddToCartProduct();
    onProductPage.checkProductDescription(product.description);
    onProductPage.checkAvailabilityOfProduct(product.availability);
    onProductPage.checkModelOfProduct(product.model);
    onProductPage.checkManufacturerOfProduct(product.manufacturer);
    onProductPage.checkReviewsAmountOfProduct(product.reviewsQuantity);
    //add to wishlist and verify it
    onProductPage.addToWishlistBtn();
    onProductPage.checkIfItemIsAddedToWishlist();
    onProductPage.goToWishlist();
    onWishList.checkItemNames(product.title);
  });

  it("add to wishlist and then remove item from wishlist - logged in user", () => {
    //login to page
    onHomePage.loginOrRegister();
    onLoginPage.checkLoginFormTitleAndText();
    onLoginPage.loginToAccount(globalData.login, globalData.password);
    onAccountPage.checkUrlAndTitlePage();
    onAccountPage.goToHomePage();
    onHomePage.checkHomeSectionActiveSubnav();
    //choose the item and verify data
    onHomePage.clickToCategoryPageByTitle(makeupObj.title);
    onCategoryPage.checkUrlAndTitlePage(makeupObj.title, makeupObj.number);
    onCategoryPage.checkPathContentToCategory(makeupObj.title);
    onCategoryPage.checkSelectedCategoryNameOnNav(makeupObj.title);
    onCategoryPage.openProductPageByName(product.title);
    onProductPage.checkPathContentToWishlist(product.title);
    onProductPage.checkProductName(product.title);
    onProductPage.checkProductPrice(product.price);
    onProductPage.checkPossibilityToAddToCartProduct();
    onProductPage.checkProductDescription(product.description);
    onProductPage.checkAvailabilityOfProduct(product.availability);
    onProductPage.checkModelOfProduct(product.model);
    onProductPage.checkManufacturerOfProduct(product.manufacturer);
    onProductPage.checkReviewsAmountOfProduct(product.reviewsQuantity);
    //add to wishlist and verify it
    onProductPage.addToWishlistBtn();
    onProductPage.checkIfItemIsAddedToWishlist();
    //delete from wishlist
    onProductPage.deleteFromWishlist();
    onProductPage.checkIfItemIsDeletedFromWishlist();
  });

  it("print the item details - random item", () => {
    //choose the item and verify data
    onHomePage.clickToCategoryPageByTitle(makeupObj.title);
    onCategoryPage.checkUrlAndTitlePage(makeupObj.title, makeupObj.number);
    onCategoryPage.checkPathContentToCategory(makeupObj.title);
    onCategoryPage.checkSelectedCategoryNameOnNav(makeupObj.title);
    onCategoryPage.openProductPageByName(product.title);
    onProductPage.checkPathContentToWishlist(product.title);
    onProductPage.checkProductName(product.title);
    onProductPage.checkProductPrice(product.price);
    onProductPage.checkPossibilityToAddToCartProduct();
    onProductPage.checkProductDescription(product.description);
    onProductPage.checkAvailabilityOfProduct(product.availability);
    onProductPage.checkModelOfProduct(product.model);
    onProductPage.checkManufacturerOfProduct(product.manufacturer);
    onProductPage.checkReviewsAmountOfProduct(product.reviewsQuantity);
    //click print item btn and check if modal window is displayed
    onProductPage.clickPrintItem();
  });

  it("check item details - random item", () => {
    //choose the item and verify data
    onHomePage.clickToCategoryPageByTitle(makeupObj.title);
    onCategoryPage.checkUrlAndTitlePage(makeupObj.title, makeupObj.number);
    onCategoryPage.checkPathContentToCategory(makeupObj.title);
    onCategoryPage.checkSelectedCategoryNameOnNav(makeupObj.title);
    onCategoryPage.openProductPageByName(product.title);
    onProductPage.checkPathContentToWishlist(product.title);
    onProductPage.checkProductName(product.title);
    onProductPage.checkProductPrice(product.price);
    onProductPage.checkPossibilityToAddToCartProduct();
    onProductPage.checkProductDescription(product.description);
    onProductPage.checkAvailabilityOfProduct(product.availability);
    onProductPage.checkModelOfProduct(product.model);
    onProductPage.checkManufacturerOfProduct(product.manufacturer);
    onProductPage.checkReviewsAmountOfProduct(product.reviewsQuantity);
  });

  it.only("check item reviews", () => {
    //item with reviews -> Waterproof Protective Undereye Concealer - makeup category
  });

  it('fail to add a review to item', () => {
    onHomePage.clickToCategoryPageByTitle(makeupObj.title);
    onCategoryPage.checkUrlAndTitlePage(makeupObj.title, makeupObj.number);
    onCategoryPage.checkPathContentToCategory(makeupObj.title);
    onCategoryPage.checkSelectedCategoryNameOnNav(makeupObj.title);
    onCategoryPage.openProductPageByName(product.title);
    onProductPage.checkPathContentToWishlist(product.title);
    onProductPage.checkProductName(product.title);
    onProductPage.checkProductPrice(product.price);
    onProductPage.checkPossibilityToAddToCartProduct();
    onProductPage.checkProductDescription(product.description);
    onProductPage.checkAvailabilityOfProduct(product.availability);
    onProductPage.checkModelOfProduct(product.model);
    onProductPage.checkManufacturerOfProduct(product.manufacturer);
    onProductPage.checkReviewsAmountOfProduct(product.reviewsQuantity);
    //add review to product
    onProductPage.clickReviewsTab();
    onProductPage.fillTheReview(4,"Test", "Lorem Ipsum", '5deF3x');
    onProductPage.clickSubmitReviewBtn();
    onProductPage.verifyErrorMsgToAddingReview();
  });

  it("check related products", () => {});

  it("change currency and check prices of products", () => {});

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
});
