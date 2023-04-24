import {Component, OnInit, OnDestroy} from '@angular/core';

import {Observable, Subscription} from 'rxjs';

import {Product} from '../product';
import {ProductService} from '../product.service';
import {Store} from "@ngrx/store";
import {AppState} from "../state/product-state"; // import AppState from Products folder
import {getCurrentProduct, getError, getProducts, getShowProductCode} from "../state/product-reducer";
// use import as for actions
import * as ProductActions from '../state/product-actions';

@Component({
  selector: 'pm-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit, OnDestroy {
  pageTitle: string = 'Products';
  errorMessage!: string;
  displayCode!: boolean;

  products!: Product[];

  // Used to highlight the selected product in the list
  selectedProduct!: Product | null;
  sub!: Subscription;

  // observables
  products$!: Observable<Product[]>;
  selectedProduct$!: Observable<Product | null>;
  displayCode$!: Observable<boolean>;
  errorMessage$!: Observable<string>;

  constructor(private productService: ProductService, private store: Store<AppState>) {
  }

  ngOnInit(): void {
    // old standard implementation
    // this.sub = this.productService.selectedProductChanges$.subscribe(
    //   currentProduct => this.selectedProduct = currentProduct
    // );

    // before effects
    // this.store.select(getCurrentProduct).subscribe(
    //   currentProduct => this.selectedProduct = currentProduct
    // );

    // old implementation before effects
    // this.productService.getProducts().subscribe({
    //   next: (products: Product[]) => this.products = products,
    //   error: err => this.errorMessage = err
    // });

    // with effects
    this.products$ = this.store.select(getProducts);
    this.store.dispatch(ProductActions.loadProducts());
    this.selectedProduct$ = this.store.select(getCurrentProduct);
    this.displayCode$ = this.store.select(getShowProductCode);

    this.errorMessage$ = this.store.select(getError);

    // subscribe to store using a selector (before using effects)
    // this.store.select(getShowProductCode).subscribe(
    //   (showProductCode: boolean) => this.displayCode = showProductCode
    // )

    // subscribe to ngRx store (select slice 'products') to receive state changes (no selector here)
    // this.store.select('products').subscribe(
    //   products => this.displayCode = products.showProductCode
    // );
  }

  ngOnDestroy(): void {
    // this.sub.unsubscribe();
  }

  checkChanged(): void {
    this.store.dispatch(ProductActions.toggleProductCode());

    // example of dispatching action without typed action
    // this.store.dispatch({
    //   type: '[Product] Toggle Product Code'
    // });
  }

  newProduct(): void {
    // this.productService.changeSelectedProduct(this.productService.newProduct());
    this.store.dispatch(ProductActions.initializeCurrentProduct());
  }

  productSelected(product: Product): void {
    // this.productService.changeSelectedProduct(product);
    this.store.dispatch(ProductActions.setCurrentProduct({product}));
  }

}
