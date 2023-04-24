import {createAction, props} from "@ngrx/store";
import {Product} from "../product";

export const toggleProductCode = createAction(
  '[Product] Toggle Product Code'
);

export const setCurrentProduct = createAction(
  '[Product] Set current product',
  props<{ product: Product }>() // to specify any associated data with the action => use props
);

export const clearCurrentProduct = createAction(
  '[Product] Clear current product'
);

export const initializeCurrentProduct = createAction(
  '[Product] Initialize current product'
);

/* example of defining action from complex operation => here is loading products list form http
* we define 3 actions for complex operation, one to retrieve data, one for success and one for failure
*  */
export const loadProducts = createAction(
  '[Product] load'
);

export const loadProductsSuccess = createAction(
  '[Product] Load products success',
  props<{ products: Product[] }>()
);

export const loadProductsFailure = createAction(
  '[Product] load products failure',
  props<{ error: string }>()
)



