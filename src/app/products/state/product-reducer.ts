import {createReducer, on} from "@ngrx/store";
import {IProductState} from "./product-state";
// import product action using its barrel file
import {ProductApiActions, ProductPageActions} from './actions';

// initial state
const initialState: IProductState = {
  showProductCode: true,
  currentProductId: null,
  products: [],
  error: ""
}

export const productReducer = createReducer<IProductState>(
  initialState,
  on(ProductPageActions.toggleProductCode, (state): IProductState => {
    return {
      ...state,
      showProductCode: !state.showProductCode
    }
  }),
  // example of action with associated data
  on(ProductPageActions.setCurrentProduct, (state, action): IProductState => {
    return {
      ...state,
      currentProductId: action.currentProductId
    }
  }),
  // other actions
  on(ProductPageActions.initializeCurrentProduct, (state): IProductState => {
    return {
      ...state,
      currentProductId: 0
    }
  }),
  on(ProductPageActions.clearCurrentProduct, (state): IProductState => {
    return {
      ...state,
      currentProductId: null
    }
  }),
  // complex action that get data from server
  on(ProductApiActions.loadProductsSuccess, (state, action): IProductState => {
    return {
      ...state,
      products: action.products,
      error: ''
    }
  }),
  on(ProductApiActions.loadProductsFailure, (state, action): IProductState => {
    return {
      ...state,
      products: [],
      error: action.error
    }
  }),
  // actions for update product
  on(ProductApiActions.updateProductSuccess, (state, action): IProductState => {
    // always be sure to create a new array & not mutate the existing one
    const updatedProducts = state.products.map(item => action.product.id === item.id ? action.product : item);
    return {
      ...state,
      products: updatedProducts,
      currentProductId: action.product.id,
      error: ''
    }
  }),
  on(ProductApiActions.updateProductFailure, (state, action): IProductState => {
    return {
      ...state,
      error: action.error
    }
  }),
  // actions for create new product
  on(ProductApiActions.createProductSuccess, (state, action): IProductState => {
    // always be sure to create a new array & not mutate the existing one
    // add the new product to the store
    const updatedProducts = [...state.products, action.product]
    return {
      ...state,
      products: updatedProducts,
      currentProductId: action.product.id,
      error: ''
    }
  }),
  on(ProductApiActions.createProductFailure, (state, action): IProductState => {
    return {
      ...state,
      error: action.error
    }
  }),
  // actions for delete product
  on(ProductApiActions.deleteProductSuccess, (state, action): IProductState => {
    // remove deleted product from store
    const updateProducts = state.products.filter(item => item.id !== action.deleteProductId);
    return {
      ...state,
      products: updateProducts,
      currentProductId: 0,
      error: ''
    }
  }),
  on(ProductApiActions.deleteProductFailure, (state, action): IProductState => {
    return {
      ...state,
      error: action.error
    }
  }),
);
