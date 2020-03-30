import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { ProductService } from '../product.service';
import * as productActions from './product.actions';
import { mergeMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable()
export class ProductEffects {
  constructor(
    private actions$: Actions,
    private productService: ProductService
  ) {}

  loadProducts$ = createEffect(() => this.actions$.pipe(
    ofType(productActions.load),
    mergeMap(() =>
      this.productService.getProducts().pipe(
        map(products => productActions.loadSuccess({ products })),
        catchError(error => of(productActions.loadFail({ error })))
      )
    )
  ));

  updateProduct$ = createEffect(() => this.actions$.pipe(
    ofType(productActions.updateProduct),
    map(action => action.product),
    mergeMap(product =>
      this.productService.updateProduct(product).pipe(
        map(updatedProduct =>
          productActions.updateProductSuccess({ product: updatedProduct })
        ),
        catchError(error => of(productActions.updateProductFail({ error })))
      )
    )
  ));

  createProduct$ = createEffect(() => this.actions$.pipe(
    ofType(productActions.createProduct),
    map(action => action.product),
    mergeMap(product =>
      this.productService.createProduct(product).pipe(
        map(createdProduct =>
          productActions.createProductSuccess({ product: createdProduct })
        ),
        catchError(error => of(productActions.createProductFail({ error })))
      )
    )
  ));

  deleteProduct$ = createEffect(() => this.actions$.pipe(
    ofType(productActions.deleteProduct),
    map(action => action.id),
    mergeMap(productId =>
      this.productService.deleteProduct(productId).pipe(
        map(() => productActions.deleteProductSuccess({ id: productId })),
        catchError(error => of(productActions.deleteProductFail({ error })))
      )
    )
  ));
}
