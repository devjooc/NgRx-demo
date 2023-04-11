import {Component, OnInit, OnDestroy} from '@angular/core';

import {Subscription} from 'rxjs';

import {Product} from '../product';
import {ProductService} from '../product.service';
import {Store} from "@ngrx/store";
import {AppState} from "../state/product-state"; // import AppState from Products folder
import {getShowProductCode} from "../state/product-reducer";

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

  constructor(private productService: ProductService, private store: Store<AppState>) {
  }

  ngOnInit(): void {
    this.sub = this.productService.selectedProductChanges$.subscribe(
      currentProduct => this.selectedProduct = currentProduct
    );

    this.productService.getProducts().subscribe({
      next: (products: Product[]) => this.products = products,
      error: err => this.errorMessage = err
    });

    // subscribe to store using a selector
    this.store.select(getShowProductCode).subscribe(
      (showProductCode: boolean) => this.displayCode = showProductCode
    )

    // subscribe to ngRx store (select slice 'products') to receive state changes (no selector here)
    // this.store.select('products').subscribe(
    //   products => this.displayCode = products.showProductCode
    // );
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  checkChanged(): void {
    // this.displayCode = !this.displayCode;
    this.store.dispatch({
      type: '[Product] Toggle Product Code'
    })
  }

  newProduct(): void {
    this.productService.changeSelectedProduct(this.productService.newProduct());
  }

  productSelected(product: Product): void {
    this.productService.changeSelectedProduct(product);
  }

}
