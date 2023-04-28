import {createFeatureSelector, createSelector} from "@ngrx/store";
import {IProductState} from "./product-state";

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
