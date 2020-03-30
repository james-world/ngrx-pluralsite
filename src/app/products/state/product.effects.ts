import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { ProductService } from '../product.service';
import * as productActions from './product.actions';
import { mergeMap, map, catchError } from 'rxjs/operators';
import { Product } from '../product';
import { of } from 'rxjs';

@Injectable()
export class ProductEffects {
  constructor(
    private actions$: Actions,
    private productService: ProductService
  ) {}

  @Effect()
  loadProducts$ = this.actions$.pipe(
    ofType(productActions.ProductActionTypes.Load),
    mergeMap((action: productActions.Load) =>
      this.productService
        .getProducts()
        .pipe(
          map((products: Product[]) => new productActions.LoadSuccess(products)),
          catchError(err => of(new productActions.LoadFail(err)))
        )
    )
  );

  @Effect()
  updateProduct$ = this.actions$.pipe(
      ofType(productActions.ProductActionTypes.UpdateProduct),
      map((action: productActions.UpdateProduct) => action.payload),
      mergeMap((product: Product) =>
        this.productService.updateProduct(product).pipe(
            map(updatedProduct => (new productActions.UpdateProductSuccess(updatedProduct))),
            catchError(err => of (new productActions.UpdateProductFail(err)))
        )
      )
  );

  @Effect()
  createProduct$ = this.actions$.pipe(
      ofType(productActions.ProductActionTypes.CreateProduct),
      map((action: productActions.CreateProduct) => action.payload),
      mergeMap((product: Product) =>
        this.productService.createProduct(product).pipe(
            map(createdProduct => (new productActions.CreateProductSuccess(createdProduct))),
            catchError(err => of(new productActions.CreateProductFail(err)))
        )
      )
  );
}
