import {Product} from "../product";
import * as App from "../../state/app-state"; // import as App => to extend AppState

/* because Products module is lazy loading => we must extend AppState interface

 */
export interface AppState extends App.AppState {
  products: IProductState;
}

export interface IProductState {
  showProductCode: boolean;
  currentProduct: Product | null;
  products: Product[];
  error: string
}
