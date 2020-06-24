// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

/**
 * Options available for possiblie categories.  Update this enum for additional Options if your APIs have additonal categories.
 */
export enum CategoriesOptions {
    Electronics = "Electronics",
    Home = "Home",
    Outdoor_Living = "Outdoor Living",
    Tools_Hardware = "Tools_Hardware"
}

/**
 * API URI for item recommendations.
 * @param {string} product_id - ID of product for the API to reference. (required)
 */
export const GET_ITEM_RECOMMENDATIONS = "https://retail-ai-api.azure-api.net/v3/get_item_recommendations?subscription-key=[ENTER_SUBSCRIPTION_ID]&product_id=";

/**
 * API URI for user's recommendations.
 * @param {string} user_id - Active User's ID already in system (required)
 */
export const GET_USER_RECOMMENDATIONS = "https://retail-ai-api.azure-api.net/v3/get_shopper_recommendations?subscription-key=[ENTER_SUBSCRIPTION_ID]&user_id=";

/**
 * API URI for full product details.
 * @param {string} product_id - ID of product for the API to reference. (required)
 */
export const GET_PRODUCT_DETAILS = "https://contosoretail.azurefd.net/product/ContosoRetail/Products/";

/**
 * API URI for full product details.
 * @param {CategoriesOptions} category_name - Category Name being referenced. (required, use enum CategoriesOptions)
 */
export const GET_PRODUCTS_BY_CATEGORY = "https://contosoretail.azurefd.net/product/ContosoRetail/Products/GetProductsByCategory?CategoryName=";