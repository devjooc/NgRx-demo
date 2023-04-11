import {createAction, createFeatureSelector, createReducer, createSelector, on} from "@ngrx/store";
import {IProductState} from "./product-state";

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
  on(createAction('[Product] Toggle Product Code'), (state): IProductState => {
    return {
      ...state,
      showProductCode: !state.showProductCode
    }
  })
);
