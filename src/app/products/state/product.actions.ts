import { createAction, props } from '@ngrx/store';
import { Product } from '../product';

export const toggleProductCode = createAction(
    '[Product] Toggle Product Code',
    props<{ value: boolean }>()
);

export const setCurrentProduct = createAction(
    '[Product] Set Current Product',
    props<{ product: Product }>()
);

export const clearCurrentProduct = createAction(
    '[Product] Clear Current Product'
);

export const initializeCurrentProduct = createAction(
    '[Product] Initialize Current Product'
);

export const load = createAction(
    '[Product] Load'
);

export const loadSuccess = createAction(
    '[Product] Load Success',
    props<{ products: Product[] }>()
);

export const loadFail = createAction(
    '[Product] Load Fail',
    props<{ error: string }>()
);

export const updateProduct = createAction(
    '[Product] Update Product',
    props<{ product: Product }>()
);

export const updateProductSuccess = createAction(
    '[Product] Update Product Success',
    props<{ product: Product }>()
);

export const updateProductFail = createAction(
    '[Product] Update Product Fail',
    props<{ error: string }>()
);

export const createProduct = createAction(
    '[Product] Create Product',
    props<{ product: Product }>()
);

export const createProductSuccess = createAction(
    '[Product] Create Product Success',
    props<{ product: Product }>()
);

export const createProductFail = createAction(
    '[Product] Create Product Fail',
    props<{ error: string }>()
);

export const deleteProduct = createAction(
    '[Product] Delete Product',
    props<{ id: number }>()
);

export const deleteProductSuccess = createAction(
    '[Product] Delete Product Success',
    props<{ id: number }>()
);

export const deleteProductFail = createAction(
    '[Product] Delete Product Fail',
    props<{ error: string }>()
);
