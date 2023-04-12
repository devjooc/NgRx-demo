import {createFeatureSelector, createReducer, createSelector, on} from "@ngrx/store";
import {IProductState} from "./product-state";
// use import as
import * as ProductActions from './product-actions';

// initial state
const initialState: IProductState = {
  showProductCode: true,
  currentProduct: null,
  products: []
}

/* state selectors example */

// 1) create a selector for the whole feature  (with no export => so it can be used only by current reducer)
const getProductFeatureState = createFeatureSelector<IProductState>('products');
// 2) create a generic selector to access state properties (ex: showProductCode)
export const getShowProductCode = createSelector(
  getProductFeatureState,
  state => state.showProductCode
);
// 3) create selector for other properties
export const getCurrentProduct = createSelector(
  getProductFeatureState,
  state => state.currentProduct
);
export const getProducts = createSelector(
  getProductFeatureState,
  state => state.products
);

export const productReducer = createReducer<IProductState>(
  initialState,
  on(ProductActions.toggleProductCode, (state): IProductState => {
    return {
      ...state,
      showProductCode: !state.showProductCode
    }
  }),
  // example of action with associated data
  on(ProductActions.setCurrentProduct, (state, action): IProductState => {
    return {
      ...state,
      currentProduct: action.product
    }
  }),
  // other actions
  on(ProductActions.initializeCurrentProduct, (state): IProductState => {
    return {
      ...state,
      currentProduct: {
        id: 0,
        productName: '',
        productCode: 'New',
        description: '',
        starRating: 0,
      }
    }
  }),
  on(ProductActions.clearCurrentProduct, (state): IProductState => {
    return {
      ...state,
      currentProduct: null
    }
  })
);
