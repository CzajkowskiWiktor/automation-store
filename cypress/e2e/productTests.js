/// <reference types="Cypress" />
import { onCategoryPage } from "../support/page_object/categoryPage";
import { onHomePage } from "../support/page_object/homePage";
import { onProductPage } from "../support/page_object/productPage";
import { onCartPage } from "../support/page_object/cartPage";
import { onLoginPage } from "../support/page_object/loginPage";
import { onAccountPage } from "../support/page_object/accountPage";
import { onWishList } from "../support/page_object/wishList";
import { onSearchField } from "../support/page_object/searchField";
import { onSpecialsPage } from "../support/page_object/specialsPage";
import { onCheckOrderPage } from "../support/page_object/checkOrderPage";
import { onOrderDetailsPage } from "../support/page_object/orderDetailsPage";

describe("Testing products functionality", () => {
  let globalData;

  var makeupObj = {
    title: "Hair Care",
    number: 52,
    subcategories: ["Conditioner", "Shampoo"],
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
    cy.wait(1000);
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

  it("add to wishlist product - user logged in", () => {
    //pre-conditions: item must be NOT added to wishlist before
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
    //pre-conditions: item must be NOT added to wishlist before
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

  it("check item reviews", () => {
    //item with reviews -> Gucci Guilty - fragrance category
    var fragrance = {
      title: "Fragrance",
      number: 49,
      subcategories: ["Men", "Women"],
    };
    const perfurm = {
      title: "Gucci Guilty",
      price: "$105.00",
      manufacturer: "Gucci",
      model: "PRF00269",
      reviewsQuantity: 1,
      size: "50ml $20.00",
    };
    const review = {
      author: "Mary",
      rating: 4,
      date: "01/16/2020",
      message: "This is more of a evening fragrance. I love it",
    };

    onHomePage.clickToCategoryPageByTitle(fragrance.title);
    onCategoryPage.checkUrlAndTitlePage(fragrance.title, fragrance.number);
    onCategoryPage.checkPathContentToCategory(fragrance.title);
    onCategoryPage.checkSelectedCategoryNameOnNav(fragrance.title);
    onCategoryPage.openProductPageByName(perfurm.title);
    onProductPage.checkPathContentToWishlist(perfurm.title);
    onProductPage.checkProductName(perfurm.title);
    onProductPage.checkProductPrice(perfurm.price);
    onProductPage.checkPossibilityToAddToCartProduct();
    onProductPage.checkModelOfProduct(perfurm.model);
    onProductPage.checkManufacturerOfProduct(perfurm.manufacturer);
    onProductPage.checkReviewsAmountOfProduct(perfurm.reviewsQuantity);
    onProductPage.changeSizeOfProduct(perfurm.size);
    onProductPage.checkProductRating(review.rating);
    //check review message details
    onProductPage.clickReviewsTab();
    onProductPage.checkReviewDetails(review);
  });

  it("fail to add a review to item", () => {
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
    onProductPage.fillTheReview(4, "Test", "Lorem Ipsum", "5deF3x");
    onProductPage.clickSubmitReviewBtn();
    onProductPage.verifyErrorMsgToAddingReview();
  });

  it("check related products", () => {
    var apparelAndAccessories = {
      title: "Apparel & accessories",
      subcategories: ["Shoes", "T-shirts"],
      number: 68,
    };
    const tshirt = {
      title: "Fruit of the Loom T-Shirts 5 Pack - Super Premium",
      price: "$9.99",
      reviewsQuantity: 1,
      size: "Large",
      availability: 1,
    };
    const review = {
      author: "F Buckley",
      rating: 5,
      date: "01/16/2020",
      message:
        "Good quality. Also good enough to wear out. Would order more in the future.",
    };

    const relatedProd = {
      name: "Casual 3/4 Sleeve Baseball T-Shirt",
      price: "$14.00",
      imgAlt: "blue cotton t-shirt",
    };

    onHomePage.clickToCategoryPageByTitle(apparelAndAccessories.title);
    onCategoryPage.checkUrlAndTitlePage(
      apparelAndAccessories.title,
      apparelAndAccessories.number
    );
    onCategoryPage.checkPathContentToCategory(apparelAndAccessories.title);
    onCategoryPage.checkSelectedCategoryNameOnNav(apparelAndAccessories.title);
    onCategoryPage.openProductPageByName(tshirt.title);
    onProductPage.checkPathContentToWishlist(tshirt.title);
    onProductPage.checkProductName(tshirt.title);
    onProductPage.checkProductPrice(tshirt.price);
    onProductPage.checkReviewsAmountOfProduct(tshirt.reviewsQuantity);
    onProductPage.changeSizeOfProduct(tshirt.size);
    onProductPage.checkProductRating(review.rating);
    onProductPage.clickRelatedProductsTab();
    onProductPage.checkRelatedProductItem(relatedProd);
  });

  it("find the product from search field - t-shirt", () => {
    const searchWord = "t-shirt";
    const productsNames = [
      "Jersey Cotton Striped Polo Shirt",
      "Fruit of the Loom T-Shirts 5 Pack - Super Premium",
      "Casual 3/4 Sleeve Baseball T-Shirt",
    ];
    onHomePage.clickSearchKeywordField();
    onHomePage.typeSearchKeywordWord(searchWord);
    onHomePage.clickGoSearchKieywordBtn();
    onSearchField.checkUrlAndTitlePage(searchWord);
    onSearchField.checkPathContentToSearch();
    onSearchField.verifySearchCirteriaField(searchWord);
    onSearchField.verifyAllFoundProducts(productsNames);
  });

  it("type in search field wrong keyword - no founds items matching to search criteria", () => {
    const searchWord = "tshirtyyy";
    onHomePage.clickSearchKeywordField();
    onHomePage.typeSearchKeywordWord(searchWord);
    onHomePage.clickGoSearchKieywordBtn();
    onSearchField.checkUrlAndTitlePage(searchWord);
    onSearchField.checkPathContentToSearch();
    onSearchField.verifySearchCirteriaField(searchWord);
    onSearchField.noFoundProductsMeetingCriteria();
  });

  it("click keyword field and choose the makeup tab from the list and type makeup product", () => {
    const searchWord = "spray";
    onHomePage.clickSearchKeywordField();
    onHomePage.checkActiveCategorySelected("All Categories");
    onHomePage.changeCategorySearchKeywordDropdown("Men");
    onHomePage.checkActiveCategorySelected("Men");
    onHomePage.typeSearchKeywordWord(searchWord);
    onHomePage.clickGoSearchKieywordBtn();
    onSearchField.checkUrlAndTitlePage(searchWord);
    onSearchField.checkPathContentToSearch();
    onSearchField.verifySearchCirteriaField(searchWord);
  });

  it("find all products related to the brand - click Gucci logo in Brand list on home page", () => {
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
    //click on specific Brand
    onHomePage.clickSpecificBrandScrollingName(brands.names[4]);
    onSearchField.verifySearchedBrandName(brands.names[4]);
    onSearchField.checkPathContentToBrand(brands.names[4]);
    //optional verifying field - not all products have brand name in title
    onSearchField.checkIfProductsHaveBrandNameInTitle(brands.names[4]);
  });

  it("check featured products", () => {
    const productNames = ["Skinsheen Bronzer Stick",
    "BeneFit Girl Meets Pearl", "Benefit Bella Bamba", "Tropiques Minerale Loose Bronzer"];
    onHomePage.checkFeaturedProductsTitle();
    onHomePage.checkFeaturedProductsLength();
    onHomePage.checkAllFeaturedProducts(productNames)
  });

  it("check latest products", () => {
    const productNames = ["Absolute Anti-Age Spot Replenishing Unifying TreatmentSPF 15",
    "Absolue Eye Precious Cells", "Total Moisture Facial Cream", "Flash Bronzer Body Gel"];
    onHomePage.checkLatestProductsTitle();
    onHomePage.checkLatestProductsLength();
    onHomePage.checkAllLatestsProducts(productNames)
  });

  it("check bestsellers products", () => {
    const productNames = ["Skinsheen Bronzer Stick",
    "Womens high heel point toe stiletto sandals ankle strap court shoes",
     "New Ladies High Wedge Heel Toe Thong Diamante Flip Flop Sandals", "Absolue Eye Precious Cells"];
    onHomePage.checkBestsellersTitle();
    onHomePage.checkBestsellersLength();
    onHomePage.checkAllBestsellersProducts(productNames);
  });

  it("check special products on home page", () => {
    const productNames = ["Absolue Eye Precious Cells",
    "Acqua Di Gio Pour Homme", "BeneFit Girl Meets Pearl", "Brunette expressions Conditioner"];
    onHomePage.checkSpecialsTitle();
    onHomePage.checkSpecialsLength();
    onHomePage.checkAllSpecialsProducts(productNames);
  });

  it("change sort by - price low to highest", () => {
    var apparelAndAccessories = {
      title: "Apparel & accessories",
      subcategories: ["Shoes", "T-shirts"],
      number: 68,
    };
    let price = [26.00, 26.00, 6.75, 21.00, 32.00, 9.99, 78.00, 110.00];
    let priceToSort = [26.00, 26.00, 6.75, 21.00, 32.00, 9.99, 78.00, 110.00];
    onHomePage.clickToCategoryPageByTitle(apparelAndAccessories.title);
    onCategoryPage.checkUrlAndTitlePage(
      apparelAndAccessories.title,
      apparelAndAccessories.number
    );
    onCategoryPage.checkPathContentToCategory(apparelAndAccessories.title);
    onCategoryPage.checkSelectedCategoryNameOnNav(apparelAndAccessories.title);
    //verify default prices
    onCategoryPage.verifyPrices(price);
    onCategoryPage.changeSortBy('p.price-DESC', 'Price High > Low');
    //verify sorted Prices by high to low
    onCategoryPage.verifySortedPricesDesc(priceToSort);
  });

  it("check the order details by finding by id and email", () => {
    //order id 24822
    //order email testLorem123@test.com
    const orderID = '24822'
    const email = 'testLorem123@test.com'
    //for order customer details
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
    let orderStatus = "Pending";
    let orderTotals = "24.99"
    let orderDateAdded = "08/16/2023";
    let productsQuantity = 1;
    let eachProductOrderedQuantity = 1;
    let productNames = "Skinsheen Bronzer Stick";
    let productPrice = "23.40";

    onHomePage.goToCheckOrderNavbar();
    onCheckOrderPage.checkUrlAndTitlePage();
    onCheckOrderPage.checkPathContentToSearch();
    onCheckOrderPage.fillOrderId(orderID);
    onCheckOrderPage.fillEmailInput(email);
    onCheckOrderPage.clickContinueBtn();
    onOrderDetailsPage.checkOrderDetails(
      `#${orderID}`,
      orderStatus,
      userWithHistory
    );
    onOrderDetailsPage.checkOrderHistoryDetails(
      orderDateAdded,
      orderStatus
    );
    onOrderDetailsPage.checkProductDetailsOnOrder(
      productNames,
      productsQuantity,
      productPrice,
      eachProductOrderedQuantity
    );
    onOrderDetailsPage.checkTotalWithTaxRatePrice(
      productPrice,
      orderTotals
    );
  });

  it("check special offer - verify all products", () => {
    onHomePage.goToSpecialsNavbar();
    onSpecialsPage.checkUrlAndTitlePage();
    onSpecialsPage.checkPathContentToSearch();
    onSpecialsPage.checkSpecialsProductsLength(8);
    //check sale tab on product div
    onSpecialsPage.checkSaleTabClassExistenceOnProduct();
    //check if each product has new and old price
    onSpecialsPage.checkIfProductsHaveOldAndNewPrices();
  });
});
