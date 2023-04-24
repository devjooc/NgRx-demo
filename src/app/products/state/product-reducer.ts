import {createFeatureSelector, createReducer, createSelector, on} from "@ngrx/store";
import {IProductState} from "./product-state";
// use import as
import * as ProductActions from './product-actions';

// initial state
const initialState: IProductState = {
  showProductCode: true,
  currentProductId: null,
  products: [],
  error: ""
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
export const getCurrentProductId = createSelector(
  getProductFeatureState,
  state => state.currentProductId
);
export const getCurrentProduct = createSelector(
  getProductFeatureState,
  getCurrentProductId,
  (state, currentProductId) => {
    if (currentProductId === 0) {
      return {
        id: 0,
        productName: '',
        productCode: 'New',
        description: '',
        starRating: 0
      }
    } else {
      return currentProductId ? state.products.find(p => p.id === currentProductId) : null;
    }
  }
)

export const getProducts = createSelector(
  getProductFeatureState,
  state => state.products
);

export const getError = createSelector(
  getProductFeatureState,
  state => state.error
)

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
      currentProductId: action.currentProductId
    }
  }),
  // other actions
  on(ProductActions.initializeCurrentProduct, (state): IProductState => {
    return {
      ...state,
      currentProductId: 0
    }
  }),
  on(ProductActions.clearCurrentProduct, (state): IProductState => {
    return {
      ...state,
      currentProductId: null
    }
  }),
  // complex action that get data from server
  on(ProductActions.loadProductsSuccess, (state, action): IProductState => {
    return {
      ...state,
      products: action.products,
      error: ''
    }
  }),
  on(ProductActions.loadProductsFailure, (state, action): IProductState => {
    return {
      ...state,
      products: [],
      error: action.error
    }
  }),
  // actions for update product
  on(ProductActions.updateProductSuccess, (state, action): IProductState => {
    // always be sure to create a new array & not mutate the existing one
    const updatedProducts = state.products.map(item => action.product.id === item.id ? action.product : item);
    return {
      ...state,
      products: updatedProducts,
      currentProductId: action.product.id,
      error: ''
    }
  }),
  on(ProductActions.updateProductFailure, (state, action): IProductState => {
    return {
      ...state,
      error: action.error
    }
  })
);
