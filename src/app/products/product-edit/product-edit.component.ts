import {Component, OnInit, OnDestroy} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

import {Observable, Subscription} from 'rxjs';

import {Product} from '../product';
import {ProductService} from '../product.service';
import {GenericValidator} from '../../shared/generic-validator';
import {NumberValidators} from '../../shared/number.validator';
/* NgRx */
import {AppState} from "../state/product-state";
import {Store} from "@ngrx/store";
import {getCurrentProduct} from "../state";
import {tap} from "rxjs/operators";
// import product action using its barrel file
import {ProductPageActions} from '../state/actions';

@Component({
  selector: 'pm-product-edit',
  templateUrl: './product-edit.component.html'
})
export class ProductEditComponent implements OnInit, OnDestroy {
  pageTitle = 'Product Edit';
  errorMessage = '';
  productForm!: FormGroup;

  product!: Product | null;
  sub!: Subscription;

  // Use with the generic validation message class
  displayMessage: { [key: string]: string } = {};
  private readonly validationMessages: { [key: string]: { [key: string]: string } };
  private genericValidator: GenericValidator;
  product$!: Observable<Product | null | undefined>;

  constructor(private fb: FormBuilder, private productService: ProductService, private store: Store<AppState>) {

    // Defines all the validation messages for the form.
    // These could instead be retrieved from a file or database.
    this.validationMessages = {
      productName: {
        required: 'Product name is required.',
        minlength: 'Product name must be at least three characters.',
        maxlength: 'Product name cannot exceed 50 characters.'
      },
      productCode: {
        required: 'Product code is required.'
      },
      starRating: {
        range: 'Rate the product between 1 (lowest) and 5 (highest).'
      }
    };

    // Define an instance of the validator for use with this form,
    // passing in this form's set of validation messages.
    this.genericValidator = new GenericValidator(this.validationMessages);
  }

  ngOnInit(): void {
    // Define the form group
    this.productForm = this.fb.group({
      productName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      productCode: ['', Validators.required],
      starRating: ['', NumberValidators.range(1, 5)],
      description: ''
    });

    // Watch for changes to the currently selected product

    // (old implementation)
    // this.sub = this.productService.selectedProductChanges$.subscribe(
    //   currentProduct => this.displayProduct(currentProduct)
    // );

    // using ngrx but before effects
    // this.store.select(getCurrentProduct).subscribe(
    //   currentProduct => this.displayProduct(currentProduct)
    // )

    // with effects
    this.product$ = this.store.select(getCurrentProduct).pipe(
      tap(currentProduct => this.displayProduct(currentProduct))
    )

    // Watch for value changes for validation
    this.productForm.valueChanges.subscribe(
      () => this.displayMessage = this.genericValidator.processMessages(this.productForm)
    );
  }

  ngOnDestroy(): void {
    // this.sub.unsubscribe();
  }

  // Also validate on blur
  // Helpful if the user tabs through required fields
  blur(): void {
    this.displayMessage = this.genericValidator.processMessages(this.productForm);
  }

  displayProduct(product: Product | null | undefined): void {

    if (product) {
      // Reset the form back to pristine
      this.productForm.reset();

      // Display the appropriate page title
      if (product.id === 0) {
        this.pageTitle = 'Add Product';
      } else {
        this.pageTitle = `Edit Product: ${product.productName}`;
      }

      // Update the data on the form
      this.productForm.patchValue({
        productName: product.productName,
        productCode: product.productCode,
        starRating: product.starRating,
        description: product.description
      });
    }
  }

  cancelEdit(product: Product | null): void {
    // Redisplay the currently selected product
    // replacing any edits made
    this.displayProduct(product);
  }

  deleteProduct(product: Product | null): void {
    if (product && product.id) {
      if (confirm(`Really delete the product: ${product.productName}?`)) {
        this.store.dispatch(ProductPageActions.deleteProduct({productId: product.id}));

        // old implementation (no ngrx effects)
        // this.productService.deleteProduct(product.id).subscribe({
        //   // next: () => this.productService.changeSelectedProduct(null), // old implementation
        //   next: () => this.store.dispatch(ProductActions.clearCurrentProduct()),
        //   error: err => this.errorMessage = err
        // });
      }
    } else {
      this.store.dispatch(ProductPageActions.clearCurrentProduct());

      // No need to delete, it was never saved
      // this.productService.changeSelectedProduct(null); // old implementation
    }
  }

  saveProduct(originalProduct: Product | null): void {
    if (this.productForm.valid) {
      if (this.productForm.dirty) {
        // Copy over all the original product properties
        // Then copy over the values from the form
        // This ensures values not on the form, such as the Id, are retained
        const product = {...originalProduct, ...this.productForm.value};

        if (product.id === 0) {
          this.store.dispatch(ProductPageActions.createProduct({product}));
          // old implementation (no ngrx actions/effects)
          // this.productService.createProduct(product).subscribe({
          //   // next: p => this.productService.changeSelectedProduct(p), // old implementation
          //   next: p => this.store.dispatch(ProductActions.setCurrentProduct({currentProductId: p.id})),
          //   error: err => this.errorMessage = err
          // });
        } else {
          this.store.dispatch(ProductPageActions.updateProduct({product}));
          // old implementation (no ngrx actions/effects)
          // this.productService.updateProduct(product).subscribe({
          //   next: p => this.productService.changeSelectedProduct(p), // old implementation
          // next: p => this.store.dispatch(ProductActions.setCurrentProduct({currentProductId: p.id})),
          // error: err => this.errorMessage = err
          // });
        }
      }
    }
  }

}
