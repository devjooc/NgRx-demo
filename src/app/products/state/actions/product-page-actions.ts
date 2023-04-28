import {createAction, props} from "@ngrx/store";
import {Product} from "../../product";

/**
 * this file has all action that are dispatched on a page level (only used in a component)
 */

export const toggleProductCode = createAction(
  '[Product Page] Toggle Product Code'
);

export const setCurrentProduct = createAction(
  '[Product Page] Set current product',
  props<{ currentProductId: number | null }>() // to specify any associated data with the action => use props
  // props<{ product: Product }>() // to specify any associated data with the action => use props
);

export const clearCurrentProduct = createAction(
  '[Product Page] Clear current product'
);

export const initializeCurrentProduct = createAction(
  '[Product Page] Initialize current product'
);

/* example of defining action from complex operation => here is loading products list form http
* we define 3 actions for complex operation, one to define action, (one for success and one for failure => in separate file)
* - All actions that interact with Api => should be in the related "api.actions" file
*  */
export const loadProducts = createAction(
  '[Product Page] load'
);

/* define action for update product => 3 action needed */
export const updateProduct = createAction(
  '[Product Page] Update product',
  props<{ product: Product }>()
);

/* define action for new product */
export const createProduct = createAction(
  '[Product Page] Create Product',
  props<{ product: Product }>()
);

export const deleteProduct = createAction(
  '[Product Page] Delete Product',
  props<{ productId: number }>()
);
