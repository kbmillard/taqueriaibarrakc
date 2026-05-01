# Taqueria Ibarra order page menu extraction

## Executive summary

- **Scrape status:** **Succeeded.** Playwright (Chrome channel) loaded `https://www.taqueriaibarrakc.com/order` and captured Menufy JSON from network responses.
- **Canonical snapshot:** `prompt/menufy-location-32419-categories-all.json` (same shape as `GET https://api.menufy.com/v1/locations/32419/categories/all?api_key=…` at capture time).
- **Categories (10):** Tacos, Burritos, Tortas, Quesadillas, Pizadilla, Combos, Platters, Sides, Postres (Desserts), Bebidas (Drinks). Menufy category IDs: `671236, 671237, 671238, 671239, 741960, 741961, 741959, 671240, 671241, 671242`.
- **Items:** **80** active rows → `lib/menu/local-menu.ts` and full mirror in `prompt/google-sheet-menu-template.csv` (regenerate via `node scripts/build-menu-from-menufy-snapshot.mjs`).
- **Prices:** Copied only from Menufy `itemPrice` (no invented amounts).
- **Images:** No public `imageLink` URLs on items in this payload — `imageUrl` left blank in Sheet/local menu.
- **Modifiers / optionGroups:**
  - **Combos #1–#4** include the phrase “Your choice of meat.” → one required `Choice of meat` group (`Asada (Steak)`, `Pastor (Marinated Pork)`, `Pollo (Chicken)`, `Chorizo`, `Birria (Stewed Beef)`) aligned with Menufy naming.
  - **Taco Platter (15)** description lists four meats → required group with exactly those four strings.
  - **PIZADILLA:** Menufy sets `itemPriceHasUpgrades: true` but **upgrade/modifier lists are not present** in `categories/all` — **no `optionGroups` added** (owner must map add-ons or a follow-up Menufy item-detail endpoint if available).
  - **Family Platter:** Description references **multiple** independent meat choices; not modeled as multiple required groups here — **TODO** for owner to confirm how to collect meats in Sheets/Clover.

Public embed `api_key` values in the raw log below are **redacted** (`REDACTED_PUBLIC_EMBED_KEY`); they are visible in browser devtools on any Menufy order page.

---

# Taqueria Ibarra order page scrape (automated)

- **URL:** https://www.taqueriaibarrakc.com/order
- **Time:** 2026-05-01T17:41:20.804Z
- **Engine:** Playwright + Chrome channel (system browser)

## Network JSON responses (Menufy-related)

```json
[
  {
    "url": "https://api.menufy.com/frontend/v1/locations/32419/coupons?api_key=REDACTED_PUBLIC_EMBED_KEY",
    "keys": []
  },
  {
    "url": "https://api.menufy.com/v1/locations/32419/categories/all?api_key=REDACTED_PUBLIC_EMBED_KEY",
    "keys": [
      "categories"
    ],
    "sample": "{\"categories\":[{\"id\":671236,\"isDeliveryAvailable\":true,\"isCarryoutAvailable\":true,\"isDineInAvailable\":true,\"name\":\"TACOS\",\"isActive\":true,\"isDeleted\":false,\"description\":\"Made with cilantro and onions.\",\"sort\":1,\"imageId\":null,\"imageLink\":null,\"isUnavailable\":false,\"categoryType\":0,\"hoursToPrepare\":0,\"hours\":{},\"items\":[{\"id\":7255491,\"name\":\"Asada (Steak)\",\"description\":null,\"sort\":1,\"isActive\":true,\"isDeleted\":false,\"imageId\":null,\"imageLink\":\"\",\"itemPrice\":3.25,\"itemPriceHasUpgrades\":false,\"itemQuantityAvailable\":null,\"isItemCategoryOpen\":false,\"categoryId\":0,\"tags\":null,\"tagTypes\":[]},{\"id\":7255492,\"name\":\"Pastor (Marinated Pork)\",\"description\":null,\"sort\":2,\"isActive\":true,\"isDeleted\":false,\"imageId\":null,\"imageLink\":\"\",\"itemPrice\":3.25,\"itemPriceHasUpgrades\":false,\"itemQuantityAvailable\":null,\"isItemCategoryOpen\":false,\"categoryId\":0,\"tags\":null,\"tagTypes\":[]},{\"id\":7255493,\"name\":\"Birria (Stewed Beef)\",\"description\":\"Brisket.\",\"sort\":7,\"isActive\":true,\"isDeleted\":false,\"imageId\":null,\"imageLink\":\"\",\"itemPrice\":3.49,\"itemPriceHasUpgrades\":false,\"itemQuantityAvailable\":null,\"isItemCategoryOpen\":false,\"categoryId\":0,\"tags\":null,\"tagTypes\":[]},{\"id\":7255494,\"name\":\"Pollo (Chicken)\",\"description\":null,\"sort\":3,\"isActive\":true,\"isDeleted\":false,\"imageId\":null,\"imageLink\":\"\",\"itemPrice\":3.25,\"itemPriceHasUpgrades\":false,\"itemQuantityAvailable\":null,\"isItemCategoryOpen\":false,\"categoryId\":0,\"tags\":null,\"tagTypes\":[]},{\"id\":7255495,\"name\":\"Quesabirria\",\"description\":\"Brisket & cheese.\",\"sort\":6,\"isActive\":true,\"isDeleted\":false,\"imageId\":null,\"imageLink\":\"\",\"itemPrice\":3.49,\"itemPriceHasUpgrades\":false,\"itemQuantityAvailable\":null,\"isItemCategoryOpen\":false,\"categoryId\":0,\"tags\":null,\"tagTypes\":[]},{\"id\":8041768,\"name\":\"Chorizo\",\"description\":null,\"sort\":4,\"isActive\":true,\"isDeleted\":false,\"imageId\":null,\"imageLink\":\"\",\"itemPrice\":3.25,\"itemPriceHasUpgrades\":false,\"itemQuantityAvailable\":null,\"isItemCategoryOpen\":false,\"categoryId\":0,\"tags\":null,\"tagTypes\":[]},{\"id\":8041769,\"name\":\"Cactus (Nopal)\",\"description\":null,\"sort\":5,\"isActive\":true,\"isDeleted\":false,\"imageId\":null,\"imageLink\":\"\",\"itemPrice\":3.49,\"itemPriceHasUpgrades\":false,\"itemQuantityAvailable\":null,\"isItemCategoryOpen\":false,\"categoryId\":0,\"tags\":null,\"tagTypes\":[]},{\"id\":12772871,\"name\":\"Tripe\",\"description\":null,\"sort\":8,\"isActive\":true,\"isDeleted\":false,\"imageId\":null,\"imageLink\":\"\",\"itemPrice\":3.49,\"itemPriceHasUpgrades\":false,\"itemQuantityAvailable\":null,\"isItemCategoryOpen\":false,\"categoryId\":0,\"tags\":null,\"tagTypes\":[]},{\"id\":12772872,\"name\":\"Tongue\",\"description\":null,\"sort\":9,\"isActive\":true,\"isDeleted\":false,\"imageId\":null,\"imageLink\":\"\",\"itemPrice\":3.49,\"itemPriceHasUpgrades\":false,\"itemQuantityAvailable\":null,\"isItemCategoryOpen\":false,\"categoryId\":0,\"tags\":null,\"tagTypes\":[]},{\"id\":12772873,\"name\":\"Campechano\",\"description\":null,\"sort\":10,\"isActive\":true,\"isDeleted\":false,\"imageId\":null,\"imageLink\":\"\",\"itemPrice\":3.49,\"itemPriceHasUpgrades\":false,\"itemQuantityAvailable\":null,\"isItemCategoryOpen\":false,\"categoryId\":0,\"tags\":null,\"tagTypes\":[]}]},{\"id\":671237,\"isDeliveryAvailable\":true,\"isCarryoutAvailable\":true,\"isDineInAvailable\":true,\"name\":\"BURRITOS\",\"isActive\":true,\"isDeleted\":false,\"description\":\"Sour cream, lettuce, beans and pico de gallo.\",\"sort\":2,\"imageId\":null,\"imageLink\":null,\"isUnavailable\":false,\"categoryType\":0,\"hoursToPrepare\":0,\"hours\":{},\"items\":[{\"id\":7255496,\"name\":\"Asada (Steak)\",\"description\":null,\"sort\":1,\"isActive\":true,\"isDeleted\":false,\"imageId\":null,\"imageLink\":\"\",\"itemPrice\":10.99,\"itemPriceHasUpgrades\":false,\"itemQuantityAvailable\":null,\"isItemCategoryOpen\":false,\"categoryId\":0,\"tags\":null,\"tagTypes\":[]},{\"id\":7255497,\"name\":\"Pastor (Marinated Pork)\",\"description\":null,\"sort\":4,\"isActive\":true,\"isDeleted\":false,\"imageId\":null,\"imageLink\":\"\",\"itemPrice\":10.99,\"itemPriceHasUpgrades\":false,\"itemQuantityAvailable\":null,\"isItemCategoryOpen\":false,\"categoryId\":0,\"tags\":null,\"tagTypes\":[]},{\"id\":8041841,\"name\":\"Pollo (Chicken)\",\"description\":null,\"sort\":2,\"isActive\":true,\"isDeleted\":false,\"imageId\":null,\"imageLink\":\"\",\"itemPrice\":10.99,\"itemPriceHasUpgrades\":false,\"itemQuantityAvailable\":null,\"isItemCategoryOpen\":false,\"categoryId\":0,\"tags\":null,\"tagTypes\":[]},{\"id\":8041842,\"name\":\"Chorizo\",\"description\":null,\"sort\":3,\"isActive\":true,\"isDeleted\":false,\"imageId\":null,\"imageLink\":\"\",\"itemPrice\":10.99,\"itemPriceHasUpgrades\":false,\"itemQuantityAvailable\":null,\"isItemCategoryOpen\":false,\"categoryId\":0,\"tags\":null,\"tagTypes\":[]},{\"id\":8041843,\"name\":\"Birria Burrito\",\"description\":null,\"sort\":5,\"isActive\":true,\"isDeleted\":false,\"imageId\":null,\"imageLink\":\"\",\"itemPrice\":11.49,\"itemPriceHasUpgrades\":false,\"itemQuantityAvailable\":null,\"isItemCategoryOpen\":false,\"categoryId\":0,\"tags\":null,\"tagTypes\":[]},{\"id\":11272021,\"name\":\"Nopal (Cactus)\",\"description\":null,\"sort\":6,\"isActive\":true,\"isDeleted\":false,\"imageId\":null,\"imageLink\":\"\",\"itemPrice\":11.49,\"itemPriceHasUpgrades\":false,\"itemQuantityAvailable\":null,\"isItemCategoryOpen\":false,\"categoryId\":0,\"tags\":null,\"tagTypes\":[]},{\"id\":11272022,\"name\":\"Mamalon\",\"description\":null,\"sort\":7,\"isActive\":true,\"isDeleted\":false,\"imageId\":null,\"imageLink\":\"\",\"itemPrice\":13.25,\"itemPriceHasUpgrades\":false,\"itemQuantityAvailable\":null,\"isItemCategoryOpen\":false,\"categoryId\":0,\"tags\":null,\"tagTypes\":[]}]},{\"id\":671238,\"isDeliveryAvailable\":true,\"isCarryoutAvailable\":true,\"isDineInAvailable\":true,\"name\":\"TORTAS\",\"isActive\":true,\"isDeleted\":false,\"description\":\"Lettuce and tomato.\",\"sort\":3,\"imageId\":null,\"imageLink\":null,\"isUnavailable\":false,\"categoryType\":0,\"hoursToPrepare\":0,\"hours\":{},\"items\":[{\"id\":7255499,\"name\":\"Asada (Steak)\",\"description\":null,\"sort\":1,\"isActive\":true,\"isDeleted\":false,\"imageId\":null,\"imageLink\":\"\",\"itemPrice\":10.99,\"itemPriceHasUpgrades\":false,\"itemQuantityAvailable\":null,\"isItemCategoryOpen\":false,\"categoryId\":0,\"tags\":null,\"tagTypes\":[]},{\"id\":7255500,\"name\":\"Pastor (Marinated Pork)\",\"description\":null,\"sort\":3,\"isActive\":true,\"isDeleted\":false,\"imageId\":null,\"imageLink\":\"\",\"itemPrice\":10.99,\"itemPriceHasUpgrades\":false,\"itemQuantityAvailable\":null,\"isItemCategoryOpen\":false,\"categoryId\":0,\"tags\":null,\"tagTypes\":[]},{\"id\":7255501,\"name\":\"Cubana Jamon\",\"description\":null,\"sort\":3,\"isActive\":true,\"isDeleted\":false,\"imageId\":null,\"imageLink\":\"\",\"itemPrice\":11.5,\"itemPriceHasUpgrades\":false,\"itemQuantityAvailable\":null,\"isItemCategoryOpen\":false,\"categoryId\":0,\"tags\":null,\"tagTypes\":[]},{\"id\":8042238,\"name\":\"Pollo (Chicken)\",\"description\":null,\"sort\":2,\"isActive\":true,\"isDeleted\":false,\"imageId\":null,\"imageLink\":\"\",\"itemPrice\":10.99,\"itemPriceHasUpgrades\":false,\"itemQuantityAvailable\":null,\"isItemCategoryOpen\":false,\"categoryId\":0,\"tags\":null,\"tagTypes\":[]},{\"id\":8042242,\"name\":\"Cubana Torta\",\"description\":null,\"sort\":4,\"isActive\":true,\"isDeleted\":false,\"imageId\":null,\"imageLink\":\"\",\"itemPrice\":11.49,\"itemPriceHasUpgrades\":false,\"itemQuantityAvailable\":null,\"isItemCategoryOpen\":false,\"categoryId\":0,\"tags\":null,\"tagTypes\":[]},{\"id\":8042243,\"name\":\"Megladon Torta\",\"description\":null,\"sort\":5,\"isActive\":true,\"isDeleted\":false,\"imageId\":null,\"imageLink\":\"\",\"itemPrice\":13.25,\"itemPriceHasUpgrades\":false,\"itemQuantityAvailable\":null,\"isItemCategoryOpen\":false,\"categoryId\":0,\"tags\":null,\"tagTypes\":[]},{\"id\":12772876,\"name\":\"Chorizo\",\"description\":null,\"sort\":6,\"isActive\":true,\"isDeleted\":false,\"imageId\":null,\"imageLink\":\"\",\"itemPrice\":10.99,\"itemPriceHasUpgrades\":false,\"itemQuantityAvailable\":null,\"isItemCategoryOpen\":false,\"categoryId\":0,\"tags\":null,\"tagTypes\":[]},{\"id\":12772877,\"name\":\"Ham\",\"description\":null,\"sort\":7,\"isActive\":true,\"isDeleted\":false,\"imageId\":null,\"imageLink\":\"\",\"itemPrice\":11.5,\"itemPriceHasUpgrades\":false,\"itemQuantityAvailable\":null,\"isItemCategoryOpen\":false,\"categoryId\":0,\"tags\":null,\"tagTypes\":[]}]},{\"id\":671239,\"isDeliveryAvailable\":true,\"isCarryoutAvailable\":true,\"isDineInAvailable\":true,\"name\":\"QUESADILLAS\",\"isActive\":true,\"isDeleted\":false,\"description\":\"Made with cilantro and onions.\",\"sort\":4,\"imageId\":null,\"imageLink\":null,\"isUnavailable\":false,\"categoryType\":0,\"hoursToPrepare\":0,\"hours\":{},\"items\":[{\"id\":7255502,\"name\":\"Asada (Steak)\",\"description\":null,\"sort\":1,\"isActive\":true,\"isDeleted\":false,\"imageId\":null,\"imageLink\":\"\",\"itemPrice\":9.99,\"itemPriceHasUpgrades\":false,\"itemQuantityAvailable\":null,\"isItemCategoryOpen\":false,\"categoryId\":0,\"tags\":null,\"tagTypes\":[]},{\"id\":7255503,\"name\":\"Queso\",\"description\":null,\"sort\":2,\"isActive\":true,\"isDeleted\":false,\"imageId\":null,\"imageLink\":\"\",\"itemPrice\":7.5,\"itemPriceHasUpgrades\":false,\"itemQuantityAvailable\":null,\"isItemCategoryOpen\":false,\"categoryId\":0,\"tags\":null,\"tagTypes\":[]},{\"id\":7255504,\"name\":\"Sincronisadas\",\"description\":null,\"sort\":3,\"isActive\":true,\"isDeleted\":false,\"imageId\":null,\"imageLink\":\"\",\"itemPrice\":10.5,\"itemPriceHasUpgrades\":false,\"itemQuantityAvailable\":null,\"isItemCategoryOpen\":false,\"categoryId\":0,\"tags\":null,\"tagTypes\":[]},{\"id\":7255505,\"name\":\"Nopal (Corn Tortilla)\",\"description\":null,\"sort\":5,\"isActive\":true,\"isDeleted\":false,\"imageId\":null,\"imageLink\":\"\",\"itemPrice\":9.99,\"itemPriceHasUpgrades\":false,\"itemQuantityAvailable\":null,\"isItemCategoryOpen\":false,\"categoryId\":0,\"tags\":null,\"tagTypes\":[]},{\"id\":8042058,\"name\":\"Pollo (Chicken)\",\"description\":null,\"sort\":2,\"isActive\":true,\"isDeleted\":false,\"imageId\":null,\"imageLink\":\"\",\"itemPrice\":9.99,\"itemPriceHasUpgrades\":false,\"itemQuantityAvailable\":null,\"isItemCategoryOpen\":false,\"categoryId\":0,\"tags\":null,\"tagTypes\":[]},{\"id\":8042059,\"name\":\"Pork (Pastor)\",\"description\":null,\"sort\":3,\"isActive\":true,\"isDeleted\":false,\"imageId\":null,\"imageLink\":\"\",\"itemPrice\":9.99,\"itemPriceHasUpgrades\":false,\"itemQuantityAvailable\":null,\"isItemCategoryOpen\":false,\"categoryId\":0,\"tags\":null,\"tagTypes\":[]},{\"id\":8042060,\"name\":\"Chorizo\",\"description\":null,\"sort\":4,\"isActive\":true,\"isDeleted\":false,\"imageId\":null,\"imageLink\":\"\",\"itemPrice\":9.99,\"itemPriceHasUpgrades\":false,\"itemQuantityAvailable\":null,\"isItemCategoryOpen\":false,\"categoryId\":0,\"tags\":null,\"tagTypes\":[]},{\"id\":8042061,\"name\":\"Ham (Jamon)\",\"description\":null,\"sort\":6,\"isActive\":true,\"isDeleted\":false,\"imageId\":null,\"imageLink\":\"\",\"itemPrice\":10.5,\"itemPriceHasUpgrades\":false,\"itemQuantityAvailable\":null,\"isItemCategoryOpen\":false,\"categoryId\":0,\"tags\":null,\"tagTypes\":[]},{\"id\":11272024,\"name\":\"Calabaza\",\"description\":null,\"sort\":7,\"isActive\":true,\"isDeleted\":false,\"imageId\":null,\"imageLink\":\"\",\"itemPrice\":11.99,\"itemPriceHasUpgrades\":false,\"itemQuantityAvailable\":null,\"isItemCategoryOpen\":false,\"categoryId\":0,\"tags\":null,\"tagTypes\":[]},{\"id\":11272025,\"name\":\"Huitlacoche\",\"description\":null,\"sort\":8,\"isActive\":true,\"isDeleted\":false,\"imageId\":null,\"imageLink\":\"\",\"itemPrice\":11.99,\"itemPriceHasUpgrades\":false,\"itemQuantityAvailable\":null,\"isItemCategoryOpen\":false,\"categoryId\":0,\"tags\":null,\"tagTypes\":[]},{\"id\":12772874,\"name\":\"Squash Blossom\",\"description\":null,\"sort\":10,\"isActive\":true,\"isDeleted\":false,\"imageId\":null,\"imageLink\":\"\",\"itemPrice\":11.99,\"itemPriceHasUpgrades\":false,\"itemQuantityAvailable\":null,\"isItemCategoryOpen\":false,\"categoryId\":0,\"tags\":null,\"tagTypes\":[]},{\"id\":12772875,\"name\":\"Cactus\",\"description\":null,\"sort\":9,\"isActive\":true,\"isDeleted\":false,\"imageId\":null,\"imageLink\":\"\",\"itemPrice\":11.99,\"itemPriceHasUpgrades\":false,\"itemQuantityAvailable\":null,\"isItemCategoryOpen\":false,\"categoryId\":0,\"tags\":null,\"tagTypes\":[]}]},{\"id\":741960,\"isDeliveryAvailable\":true,\"isCarryoutAvailable\":true,\"isDineInAvailable\":true,\"name\":\"PIZADILLA\",\"isActive\":true,\"isDeleted\":false,\"description\":null,\"sort\":5,\"imageId\":null,\"imageLink\":null,\"isUnavailable\":false,\"categoryType\":0,\"hoursToPrepare\":0,\"hours\":{},\"items\":[{\"id\":8042253,\"name\":\"Asada (Steak)\",\"description\":null,\"sort\":1,\"isActive\":true,\"isDeleted\":false,\"imageId\":null,\"imageLink\":\"\",\"itemPrice\":14.99,\"itemPriceHasUpgrades\":true,\"itemQuantityAvailable\":null,\"isItemCategoryOpen\":false,\"categoryId\":0,\"tags\":null,\"tagTypes\":[]},{\"id\":8042254,\"name\":\"Pollo (Chicken)\",\"description\":nul"
  },
  {
    "url": "https://api.menufy.com/v1/locations/32419/quickdeals?api_key=REDACTED_PUBLIC_EMBED_KEY",
    "keys": []
  },
  {
    "url": "https://api.menufy.com/v1/sitesettings/locations/32419?api_key=REDACTED_PUBLIC_EMBED_KEY",
    "keys": [
      "useOrderOnlineLink",
      "websiteNavType",
      "navLogoImageUrl",
      "heroImageUrl",
      "heroImageCaption",
      "portalLogoImageUrl",
      "showDropShadowOnNav",
      "dropshadowColor",
      "showSignupForDealsOnOrderOnline",
      "showAddressOnOrderOnline",
      "showPhoneNumberOnOrderOnline",
      "showPhoneIconOnFooter",
      "showReviewsOnOrderOnline",
      "showGroupOrder",
      "showDeals",
      "showRewards",
      "tastyRewardName",
      "logoPaddingStyle",
      "isHomePage",
      "useTransparentNav",
      "hideLogoInNav"
    ]
  },
  {
    "url": "https://api.menufy.com/v1/locations/32419?expand=4&api_key=REDACTED_PUBLIC_EMBED_KEY",
    "keys": [
      "id",
      "logoUrl",
      "heroUrl",
      "name",
      "description",
      "domain",
      "domainUrl",
      "isAcceptingCarryout",
      "isAcceptingDelivery",
      "isAcceptingCurbsidePickup",
      "showNoContactDelivery",
      "isRewardsEnabled",
      "cuisines",
      "atmospheres",
      "foodTypes",
      "services",
      "acceptedPaymentTypes",
      "address",
      "deliveryFees",
      "minOrderAmountDelivery",
      "withinDelivery",
      "isOpen",
      "isOpenForAdvancedOrders",
      "advancedOrderMaxDays",
      "currentCarryoutMinWait",
      "currentCarryoutMaxWait",
      "currentDeliveryMinWait",
      "currentDeliveryMaxWait",
      "nextOpen",
      "rating",
      "totalVotes",
      "googlePlaceId",
      "googleReviewsCount",
      "googleReviewsRating",
      "hasCoupons",
      "hasQuickDeals",
      "isSpecialInstructionsEnabled",
      "specialInstructionsPlaceholder",
      "phone",
      "votesUpPercentage"
    ],
    "sample": "{\"id\":32419,\"logoUrl\":\"https://static.hungerrush.com/menufy/width=1920,height=1080,fit=scale-down,format=auto/637800383277098455+709037.png\",\"heroUrl\":\"https://static.hungerrush.com/menufy/width=1000,height=300,fit=crop,format=auto/637800382809801417+709034.png\",\"name\":\"Taqueria Ibarra Food Truck\",\"description\":\"Welcome to Taqueria Ibarra Food Truck. Our menu features Asada, Pastor, Sincronisadas, and more! Don't forget to try our Nopal and the Queso! Find us along Northeast Vivion Road. Order online for carryout or delivery!\",\"domain\":\"TaqueriaIbarraKC.com\",\"domainUrl\":\"https://www.TaqueriaIbarraKC.com/order\",\"isAcceptingCarryout\":true,\"isAcceptingDelivery\":true,\"isAcceptingCurbsidePickup\":false,\"showNoContactDelivery\":false,\"isRewardsEnabled\":false,\"cuisines\":[\"Mexican\"],\"atmospheres\":[],\"foodTypes\":[],\"services\":[],\"acceptedPaymentTypes\":[\"Credit\",\"Cash\",\"ApplePay\",\"PayPal\",\"Venmo\"],\"address\":{\"id\":null,\"address1\":\"5005 North Brighton Avenue\",\"apartment\":null,\"address2\":null,\"city\":\"Kansas City\",\"country\":\"US\",\"state\":\"MO\",\"zipCode\":\"64117\",\"lat\":39.1847063,\"lon\":-94.5206701,\"googleMapsDirectionsUrl\":\"https://maps.google.com/?daddr=39.1847063,-94.5206701\"},\"deliveryFees\":{\"minimum\":4.99,\"maximum\":4.99,\"feeType\":\"USD\"},\"minOrderAmountDelivery\":20,\"withinDelivery\":false,\"isOpen\":true,\"isOpenForAdvancedOrders\":true,\"advancedOrderMaxDays\":3,\"currentCarryoutMinWait\":15,\"currentCarryoutMaxWait\":20,\"currentDeliveryMinWait\":15,\"currentDeliveryMaxWait\":20,\"nextOpen\":null,\"rating\":94,\"totalVotes\":411,\"googlePlaceId\":\"ChIJTVtKKwX3wIcRwkFV4YUQvsw\",\"googleReviewsCount\":530,\"googleReviewsRating\":4.7,\"hasCoupons\":false,\"hasQuickDeals\":false,\"isSpecialInstructionsEnabled\":true,\"specialInstructionsPlaceholder\":null,\"phone\":\"(816) 585-2257\",\"votesUpPercentage\":94,\"announcement\":null,\"isClover\":false,\"distance\":null,\"showCarryoutHours\":true,\"showDeliveryHours\":true,\"storeName\":\"\",\"hours\":{\"Business Hours\":[{\"day\":0,\"openDateTime\":null,\"closeDateTime\":null,\"dayOfWeek\":\"Monday\",\"openTime\":\"11:00 AM\",\"closeTime\":\"9:00 PM\",\"isOpen24Hours\":false,\"openTimeText\":\"11:00 AM\",\"closeTimeText\":\"9:00 PM\",\"dayShutOff\":false},{\"day\":0,\"openDateTime\":null,\"closeDateTime\":null,\"dayOfWeek\":\"Tuesday - Saturday\",\"openTime\":\"11:00 AM\",\"closeTime\":\"9:30 PM\",\"isOpen24Hours\":false,\"openTimeText\":\"11:00 AM\",\"closeTimeText\":\"9:30 PM\",\"dayShutOff\":false},{\"day\":0,\"openDateTime\":null,\"closeDateTime\":null,\"dayOfWeek\":\"Sunday\",\"openTime\":null,\"closeTime\":null,\"isOpen24Hours\":false,\"openTimeText\":null,\"closeTimeText\":null,\"dayShutOff\":false}],\"Carryout Hours\":[{\"day\":0,\"openDateTime\":null,\"closeDateTime\":null,\"dayOfWeek\":\"Monday\",\"openTime\":\"11:00 AM\",\"closeTime\":\"9:00 PM\",\"isOpen24Hours\":false,\"openTimeText\":\"11:00 AM\",\"closeTimeText\":\"9:00 PM\",\"dayShutOff\":false},{\"day\":0,\"openDateTime\":null,\"closeDateTime\":null,\"dayOfWeek\":\"Tuesday - Saturday\",\"openTime\":\"11:00 AM\",\"closeTime\":\"9:30 PM\",\"isOpen24Hours\":false,\"openTimeText\":\"11:00 AM\",\"closeTimeText\":\"9:30 PM\",\"dayShutOff\":false},{\"day\":0,\"openDateTime\":null,\"closeDateTime\":null,\"dayOfWeek\":\"Sunday\",\"openTime\":null,\"closeTime\":null,\"isOpen24Hours\":false,\"openTimeText\":null,\"closeTimeText\":null,\"dayShutOff\":false}],\"Delivery Hours\":[{\"day\":0,\"openDateTime\":null,\"closeDateTime\":null,\"dayOfWeek\":\"Monday\",\"openTime\":null,\"closeTime\":null,\"isOpen24Hours\":false,\"openTimeText\":null,\"closeTimeText\":null,\"dayShutOff\":false},{\"day\":0,\"openDateTime\":null,\"closeDateTime\":null,\"dayOfWeek\":\"Tuesday - Saturday\",\"openTime\":\"11:00 AM\",\"closeTime\":\"9:30 PM\",\"isOpen24Hours\":false,\"openTimeText\":\"11:00 AM\",\"closeTimeText\":\"9:30 PM\",\"dayShutOff\":false},{\"day\":0,\"openDateTime\":null,\"closeDateTime\":null,\"dayOfWeek\":\"Sunday\",\"openTime\":null,\"closeTime\":null,\"isOpen24Hours\":false,\"openTimeText\":null,\"closeTimeText\":null,\"dayShutOff\":false}]},\"socialLinks\":[{\"socialLinkType\":\"Facebook\",\"sort\":0,\"url\":\"https://www.facebook.com/Taqueria-Ibarra-111127284016385/?ref=page_internal\"},{\"socialLinkType\":\"Yelp\",\"sort\":1,\"url\":\"https://www.yelp.com/biz/tacqueria-ibarra-riverside\"}],\"navigationLinks\":[{\"locationId\":32419,\"name\":\"Home\",\"websitePageId\":20328,\"websitePageSectionId\":null,\"navigationType\":0,\"url\":null,\"sort\":0},{\"locationId\":32419,\"name\":\"Gallery\",\"websitePageId\":20331,\"websitePageSectionId\":null,\"navigationType\":0,\"url\":null,\"sort\":1},{\"locationId\":32419,\"name\":\"Catering\",\"websitePageId\":20329,\"websitePageSectionId\":null,\"navigationType\":0,\"url\":null,\"sort\":2},{\"locationId\":32419,\"name\":\"Contact\",\"websitePageId\":20330,\"websitePageSectionId\":null,\"navigationType\":0,\"url\":null,\"sort\":3}],\"footerLinks\":[],\"pages\":[{\"id\":20328,\"isHomePage\":true,\"title\":\"Home\",\"path\":\"\",\"keywords\":null,\"description\":null},{\"id\":20329,\"isHomePage\":false,\"title\":\"Catering\",\"path\":\"Catering\",\"keywords\":null,\"description\":null},{\"id\":20330,\"isHomePage\":false,\"title\":\"Contact\",\"path\":\"Contact\",\"keywords\":null,\"description\":null},{\"id\":20331,\"isHomePage\":false,\"title\":\"Gallery\",\"path\":\"Gallery\",\"keywords\":null,\"description\":null}],\"holidayShutOffs\":[],\"deliveryShutOffs\":[{\"startTime\":\"2026-04-30T00:00:00\",\"stopTime\":\"2026-04-30T23:59:00\"},{\"startTime\":\"2026-05-01T00:00:00\",\"stopTime\":\"2026-05-01T23:59:00\"}],\"carryoutWaitTimes\":[{\"dayOfWeek\":0,\"dayOfWeekString\":\"Sunday\",\"minWaitMinutes\":15,\"maxWaitMinutes\":20},{\"dayOfWeek\":1,\"dayOfWeekString\":\"Monday\",\"minWaitMinutes\":15,\"maxWaitMinutes\":20},{\"dayOfWeek\":2,\"dayOfWeekString\":\"Tuesday\",\"minWaitMinutes\":15,\"maxWaitMinutes\":20},{\"dayOfWeek\":3,\"dayOfWeekString\":\"Wednesday\",\"minWaitMinutes\":15,\"maxWaitMinutes\":20},{\"dayOfWeek\":4,\"dayOfWeekString\":\"Thursday\",\"minWaitMinutes\":15,\"maxWaitMinutes\":20},{\"dayOfWeek\":5,\"dayOfWeekString\":\"Friday\",\"minWaitMinutes\":15,\"maxWaitMinutes\":20},{\"dayOfWeek\":6,\"dayOfWeekString\":\"Saturday\",\"minWaitMinutes\":15,\"maxWaitMinutes\":20}],\"deliveryWaitTimes\":[{\"dayOfWeek\":0,\"dayOfWeekString\":\"Sunday\",\"minWaitMinutes\":30,\"maxWaitMinutes\":45},{\"dayOfWeek\":1,\"dayOfWeekString\":\"Monday\",\"minWaitMinutes\":15,\"maxWaitMinutes\":20},{\"dayOfWeek\":2,\"dayOfWeekString\":\"Tuesday\",\"minWaitMinutes\":15,\"maxWaitMinutes\":20},{\"dayOfWeek\":3,\"dayOfWeekString\":\"Wednesday\",\"minWaitMinutes\":15,\"maxWaitMinutes\":20},{\"dayOfWeek\":4,\"dayOfWeekString\":\"Thursday\",\"minWaitMinutes\":15,\"maxWaitMinutes\":20},{\"dayOfWeek\":5,\"dayOfWeekString\":\"Friday\",\"minWaitMinutes\":15,\"maxWaitMinutes\":20},{\"dayOfWeek\":6,\"dayOfWeekString\":\"Saturday\",\"minWaitMinutes\":15,\"maxWaitMinutes\":20}],\"isPortal\":false,\"hasParentPortal\":false,\"portalUrl\":\"\",\"timeZone\":\"Central Standard Time\",\"utcOffsetHours\":-6,\"utcOffsetMinutes\":0,\"isDst\":true,\"advancedOrdering\":1,\"listAllCategories\":false,\"fullHours\":[{\"categoryId\":null,\"hourType\":0,\"isOpen24Hours\":false,\"dayOfWeek\":2,\"openTime\":\"1900-01-01T11:00:00\",\"closeTime\":\"1900-01-01T21:30:00\",\"openTimeText\":\"11:00 AM\",\"closeTimeText\":\"9:30 PM\"},{\"categoryId\":null,\"hourType\":0,\"isOpen24Hours\":false,\"dayOfWeek\":3,\"openTime\":\"1900-01-01T11:00:00\",\"closeTime\":\"1900-01-01T21:30:00\",\"openTimeText\":\"11:00 AM\",\"closeTimeText\":\"9:30 PM\"},{\"categoryId\":null,\"hourType\":0,\"isOpen24Hours\":false,\"dayOfWeek\":4,\"openTime\":\"1900-01-01T11:00:00\",\"closeTime\":\"1900-01-01T21:30:00\",\"openTimeText\":\"11:00 AM\",\"closeTimeText\":\"9:30 PM\"},{\"categoryId\":null,\"hourType\":0,\"isOpen24Hours\":false,\"dayOfWeek\":5,\"openTime\":\"1900-01-01T11:00:00\",\"closeTime\":\"1900-01-01T21:30:00\",\"openTimeText\":\"11:00 AM\",\"closeTimeText\":\"9:30 PM\"},{\"categoryId\":null,\"hourType\":0,\"isOpen24Hours\":false,\"dayOfWeek\":6,\"openTime\":\"1900-01-01T11:00:00\",\"closeTime\":\"1900-01-01T21:30:00\",\"openTimeText\":\"11:00 AM\",\"closeTimeText\":\"9:30 PM\"},{\"categoryId\":null,\"hourType\":1,\"isOpen24Hours\":false,\"dayOfWeek\":2,\"openTime\":\"1900-01-01T11:00:00\",\"closeTime\":\"1900-01-01T21:30:00\",\"openTimeText\":\"11:00 AM\",\"closeTimeText\":\"9:30 PM\"},{\"categoryId\":null,\"hourType\":1,\"isOpen24Hours\":false,\"dayOfWeek\":3,\"openTime\":\"1900-01-01T11:00:00\",\"closeTime\":\"1900-01-01T21:30:00\",\"openTimeText\":\"11:00 AM\",\"closeTimeText\":\"9:30 PM\"},{\"categoryId\":null,\"hourType\":1,\"isOpen24Hours\":false,\"dayOfWeek\":4,\"openTime\":\"1900-01-01T11:00:00\",\"closeTime\":\"1900-01-01T21:30:00\",\"openTimeText\":\"11:00 AM\",\"closeTimeText\":\"9:30 PM\"},{\"categoryId\":null,\"hourType\":1,\"isOpen24Hours\":false,\"dayOfWeek\":5,\"openTime\":\"1900-01-01T11:00:00\",\"closeTime\":\"1900-01-01T21:30:00\",\"openTimeText\":\"11:00 AM\",\"closeTimeText\":\"9:30 PM\"},{\"categoryId\
```

## Category anchor IDs present in final HTML

- Expected: 671236, 671237, 671238, 671239, 741960, 741961, 741959, 671240, 671241, 671242
- Found in DOM HTML: 671236, 671237, 671238, 671239, 741960, 741961, 741959, 671240, 671241, 671242

## Locator allTextContents for categoryHeading*

```
[]
```

## DOM sample (evaluated)

```json
[
  {
    "tag": "DIV",
    "id": "menu-category-anchor",
    "text": "TACOS Made with cilantro and onions."
  },
  {
    "tag": "H2",
    "id": "cat-name",
    "text": "TACOS"
  },
  {
    "tag": "DIV",
    "id": "menu-category-description",
    "text": "Made with cilantro and onions."
  },
  {
    "tag": "H3",
    "id": "",
    "text": "Asada (Steak)"
  },
  {
    "tag": "H3",
    "id": "",
    "text": "Pastor (Marinated Pork)"
  },
  {
    "tag": "H3",
    "id": "",
    "text": "Pollo (Chicken)"
  },
  {
    "tag": "H3",
    "id": "",
    "text": "Chorizo"
  },
  {
    "tag": "H3",
    "id": "",
    "text": "Cactus (Nopal)"
  },
  {
    "tag": "H3",
    "id": "",
    "text": "Quesabirria"
  },
  {
    "tag": "H3",
    "id": "",
    "text": "Birria (Stewed Beef)"
  },
  {
    "tag": "H3",
    "id": "",
    "text": "Tripe"
  },
  {
    "tag": "H3",
    "id": "",
    "text": "Tongue"
  },
  {
    "tag": "H3",
    "id": "",
    "text": "Campechano"
  },
  {
    "tag": "DIV",
    "id": "menu-category-anchor",
    "text": "BURRITOS Sour cream, lettuce, beans and pico de gallo."
  },
  {
    "tag": "H2",
    "id": "cat-name",
    "text": "BURRITOS"
  },
  {
    "tag": "DIV",
    "id": "menu-category-description",
    "text": "Sour cream, lettuce, beans and pico de gallo."
  },
  {
    "tag": "DIV",
    "id": "menufy-items-container",
    "text": "Asada (Steak) $10.99 Pollo (Chicken) $10.99 Chorizo $10.99 Pastor (Marinated Pork) $10.99 Birria Burrito $11.49 Nopal (Cactus) $11.49 Mamalon $13.25"
  },
  {
    "tag": "H3",
    "id": "",
    "text": "Asada (Steak)"
  },
  {
    "tag": "H3",
    "id": "",
    "text": "Pollo (Chicken)"
  },
  {
    "tag": "H3",
    "id": "",
    "text": "Chorizo"
  },
  {
    "tag": "H3",
    "id": "",
    "text": "Pastor (Marinated Pork)"
  },
  {
    "tag": "H3",
    "id": "",
    "text": "Birria Burrito"
  },
  {
    "tag": "H3",
    "id": "",
    "text": "Nopal (Cactus)"
  },
  {
    "tag": "H3",
    "id": "",
    "text": "Mamalon"
  },
  {
    "tag": "DIV",
    "id": "menu-category-anchor",
    "text": "TORTAS Lettuce and tomato."
  },
  {
    "tag": "H2",
    "id": "cat-name",
    "text": "TORTAS"
  },
  {
    "tag": "DIV",
    "id": "menu-category-description",
    "text": "Lettuce and tomato."
  },
  {
    "tag": "DIV",
    "id": "menufy-items-container",
    "text": "Asada (Steak) $10.99 Pollo (Chicken) $10.99 Cubana Jamon $11.50 Pastor (Marinated Pork) $10.99 Cubana Torta $11.49 Megladon Torta $13.25 Chorizo $10.99 Ham $11."
  },
  {
    "tag": "H3",
    "id": "",
    "text": "Asada (Steak)"
  },
  {
    "tag": "H3",
    "id": "",
    "text": "Pollo (Chicken)"
  },
  {
    "tag": "H3",
    "id": "",
    "text": "Cubana Jamon"
  },
  {
    "tag": "H3",
    "id": "",
    "text": "Pastor (Marinated Pork)"
  },
  {
    "tag": "H3",
    "id": "",
    "text": "Cubana Torta"
  },
  {
    "tag": "H3",
    "id": "",
    "text": "Megladon Torta"
  },
  {
    "tag": "H3",
    "id": "",
    "text": "Chorizo"
  },
  {
    "tag": "H3",
    "id": "",
    "text": "Ham"
  },
  {
    "tag": "DIV",
    "id": "menu-category-anchor",
    "text": "QUESADILLAS Made with cilantro and onions."
  },
  {
    "tag": "H2",
    "id": "cat-name",
    "text": "QUESADILLAS"
  },
  {
    "tag": "DIV",
    "id": "menu-category-description",
    "text": "Made with cilantro and onions."
  },
  {
    "tag": "H3",
    "id": "",
    "text": "Asada (Steak)"
  },
  {
    "tag": "H3",
    "id": "",
    "text": "Pollo (Chicken)"
  },
  {
    "tag": "H3",
    "id": "",
    "text": "Queso"
  },
  {
    "tag": "H3",
    "id": "",
    "text": "Pork (Pastor)"
  },
  {
    "tag": "H3",
    "id": "",
    "text": "Sincronisadas"
  },
  {
    "tag": "H3",
    "id": "",
    "text": "Chorizo"
  },
  {
    "tag": "H3",
    "id": "",
    "text": "Nopal (Corn Tortilla)"
  },
  {
    "tag": "H3",
    "id": "",
    "text": "Ham (Jamon)"
  },
  {
    "tag": "H3",
    "id": "",
    "text": "Calabaza"
  },
  {
    "tag": "H3",
    "id": "",
    "text": "Huitlacoche"
  },
  {
    "tag": "H3",
    "id": "",
    "text": "Cactus"
  },
  {
    "tag": "H3",
    "id": "",
    "text": "Squash Blossom"
  },
  {
    "tag": "DIV",
    "id": "menu-category-anchor",
    "text": "PIZADILLA"
  },
  {
    "tag": "H2",
    "id": "cat-name",
    "text": "PIZADILLA"
  },
  {
    "tag": "DIV",
    "id": "menufy-items-container",
    "text": "Asada (Steak) $14.99+ Pollo (Chicken) $14.99+ Pork (Pastor) $14.99+ Chorizo $14.99+ Vegetales (Vegetarian) $14.99+ Birria $14.99+ Brisket $15.98+"
  },
  {
    "tag": "H3",
    "id": "",
    "text": "Asada (Steak)"
  },
  {
    "tag": "H3",
    "id": "",
    "text": "Pollo (Chicken)"
  },
  {
    "tag": "H3",
    "id": "",
    "text": "Pork (Pastor)"
  },
  {
    "tag": "H3",
    "id": "",
    "text": "Chorizo"
  },
  {
    "tag": "H3",
    "id": "",
    "text": "Vegetales (Vegetarian)"
  },
  {
    "tag": "H3",
    "id": "",
    "text": "Birria"
  },
  {
    "tag": "H3",
    "id": "",
    "text": "Brisket"
  },
  {
    "tag": "DIV",
    "id": "menu-category-anchor",
    "text": "COMBOS"
  },
  {
    "tag": "H2",
    "id": "cat-name",
    "text": "COMBOS"
  },
  {
    "tag": "H3",
    "id": "",
    "text": "#1. Burrito & 2 Tacos"
  },
  {
    "tag": "H3",
    "id": "",
    "text": "#2. Quesadilla & 2 Tacos"
  },
  {
    "tag": "H3",
    "id": "",
    "text": "#3. Torta & 2 Tacos"
  },
  {
    "tag": "H3",
    "id": "",
    "text": "#4. 3 Quesabirrias & 2 Tacos"
  },
  {
    "tag": "H3",
    "id": "",
    "text": "#5. 5 Quesabirrias with 1 Consomé"
  },
  {
    "tag": "H3",
    "id": "",
    "text": "#6. 5 Tacos"
  },
  {
    "tag": "H3",
    "id": "",
    "text": "#7. Quesadilla Flor de Calabaza"
  },
  {
    "tag": "H3",
    "id": "",
    "text": "#8. 3 Quesabirrias, Arroz, Frijol, Consome"
  },
  {
    "tag": "H3",
    "id": "",
    "text": "#9. Burrito Bowl"
  },
  {
    "tag": "H3",
    "id": "",
    "text": "#10. Pizadilla"
  },
  {
    "tag": "H3",
    "id": "",
    "text": "#11. 3 Tacos, Arroz, Frijol"
  },
  {
    "tag": "H3",
    "id": "",
    "text": "#12. 5 Tacos Jaliscos"
  },
  {
    "tag": "H3",
    "id": "",
    "text": "#13. 5 Tacos Mixtos"
  },
  {
    "tag": "H3",
    "id": "",
    "text": "#14 Carne Asada Platter"
  },
  {
    "tag": "DIV",
    "id": "menu-category-anchor",
    "text": "PLATTERS"
  },
  {
    "tag": "H2",
    "id": "cat-name",
    "text": "PLATTERS"
  },
  {
    "tag": "H3",
    "id": "",
    "text": "Family Platter"
  },
  {
    "tag": "H3",
    "id": "",
    "text": "Quesabirrias (15)"
  },
  {
    "tag": "H3",
    "id": "",
    "text": "Taco Platter (15)"
  },
  {
    "tag": "DIV",
    "id": "menu-category-anchor",
    "text": "SIDES"
  },
  {
    "tag": "H2",
    "id": "cat-name",
    "text": "SIDES"
  },
  {
    "tag": "DIV",
    "id": "menufy-items-container",
    "text": "Aguacate $2.99 Arroz $2.99 Frijoles $2.99 Sour Cream $2.00 Toreados $2.99 Pico De Gallo $2.00 Extra Consome $1.99 Extra Lime $2.49 Extra Salsa $1.99"
  },
  {
    "tag": "H3",
    "id": "",
    "text": "Aguacate"
  },
  {
    "tag": "H3",
    "id": "",
    "text": "Arroz"
  },
  {
    "tag": "H3",
    "id": "",
    "text": "Frijoles"
  },
  {
    "tag": "H3",
    "id": "",
    "text": "Sour Cream"
  },
  {
    "tag": "H3",
    "id": "",
    "text": "Toreados"
  },
  {
    "tag": "H3",
    "id": "",
    "text": "Pico De Gallo"
  },
  {
    "tag": "H3",
    "id": "",
    "text": "Extra Consome"
  },
  {
    "tag": "H3",
    "id": "",
    "text": "Extra Lime"
  },
  {
    "tag": "H3",
    "id": "",
    "text": "Extra Salsa"
  },
  {
    "tag": "DIV",
    "id": "menu-category-anchor",
    "text": "POSTRES (DESSERTS)"
  },
  {
    "tag": "H2",
    "id": "cat-name",
    "text": "POSTRES (DESSERTS)"
  },
  {
    "tag": "DIV",
    "id": "menufy-items-container",
    "text": "Triple Chocolate Cake $4.25 3 Leches Cake $4.25 Strawberry Cheesecake $4.25"
  },
  {
    "tag": "H3",
    "id": "",
    "text": "Triple Chocolate Cake"
  },
  {
    "tag": "H3",
    "id": "",
    "text": "3 Leches Cake"
  },
  {
    "tag": "H3",
    "id": "",
    "text": "Strawberry Cheesecake"
  },
  {
    "tag": "DIV",
    "id": "menu-category-anchor",
    "text": "BEBIDAS (DRINKS)"
  },
  {
    "tag": "H2",
    "id": "cat-name",
    "text": "BEBIDAS (DRINKS)"
  },
  {
    "tag": "DIV",
    "id": "menufy-items-container",
    "text": "Mexican Coke $3.99 Manzanita $2.50 Sangria $2.99 Fanta $3.50 Sidral $2.99 Water $1.50 Jarritos $2.99"
  },
  {
    "tag": "H3",
    "id": "",
    "text": "Mexican Coke"
  },
  {
    "tag": "H3",
    "id": "",
    "text": "Manzanita"
  },
  {
    "tag": "H3",
    "id": "",
    "text": "Sangria"
  },
  {
    "tag": "H3",
    "id": "",
    "text": "Fanta"
  },
  {
    "tag": "H3",
    "id": "",
    "text": "Sidral"
  },
  {
    "tag": "H3",
    "id": "",
    "text": "Water"
  },
  {
    "tag": "H3",
    "id": "",
    "text": "Jarritos"
  }
]
```
