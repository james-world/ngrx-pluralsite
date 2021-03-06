import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

import { Observable } from 'rxjs';

import { Product } from '../../product';
import { Store } from '@ngrx/store';
import * as fromProduct from '../../state';
import * as productActions from '../../state/product.actions';

@Component({
  templateUrl: './product-shell.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductShellComponent implements OnInit {
  errorMessage$: Observable<string>;
  displayCode$: Observable<boolean>;
  products$: Observable<Product[]>;
  selectedProduct$: Observable<Product | null>;

  constructor(private store: Store<fromProduct.State>) {}

  ngOnInit(): void {
    this.store.dispatch(productActions.load());

    this.errorMessage$ = this.store.select(fromProduct.getError);
    this.products$ = this.store.select(fromProduct.getProducts);
    this.selectedProduct$ = this.store.select(fromProduct.getCurrentProduct);
    this.displayCode$ = this.store.select(fromProduct.getShowProductCode);
  }

  checkChanged(value: boolean): void {
    this.store.dispatch(productActions.toggleProductCode({ value }));
  }

  newProduct(): void {
    this.store.dispatch(productActions.initializeCurrentProduct());
  }

  productSelected(product: Product): void {
    this.store.dispatch(productActions.setCurrentProduct({ product }));
  }

  deleteProduct(id: number): void {
    this.store.dispatch(productActions.deleteProduct({ id }));
  }

  clearProduct(): void {
    this.store.dispatch(productActions.clearCurrentProduct());
  }

  createProduct(product: Product): void {
    this.store.dispatch(productActions.createProduct({ product }));
  }

  updateProduct(product: Product): void {
    this.store.dispatch(productActions.updateProduct({ product }));
  }
}
