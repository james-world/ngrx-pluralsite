import { Product } from '../product';
import * as ProductActions from './product.actions';
import { createReducer, on, Action } from '@ngrx/store';

// State for this feature (Product)
export const productFeatureKey = 'products';

export interface ProductState {
  showProductCode: boolean;
  currentProductId: number | null;
  products: Product[];
  error: string;
}

const initialState: ProductState = {
  showProductCode: true,
  currentProductId: null,
  products: [],
  error: ''
};

const productReducer = createReducer(
  initialState,

  on(ProductActions.toggleProductCode, (state, { value }) => ({
    ...state,
    showProductCode: value
  })),

  on(ProductActions.setCurrentProduct, (state, { product }) => ({
    ...state,
    currentProductId: product.id
  })),

  on(ProductActions.clearCurrentProduct, state => ({
    ...state,
    currentProductId: null
  })),

  on(ProductActions.initializeCurrentProduct, state => ({
    ...state,
    currentProductId: 0
  })),

  on(ProductActions.loadSuccess, (state, { products }) => ({
    ...state,
    products,
    error: ''
  })),

  on(ProductActions.loadFail, (state, { error }) => ({
    ...state,
    products: [],
    error
  })),

  on(ProductActions.updateProductSuccess, (state, { product }) => {
    const updatedProducts = state.products.map(item =>
      product.id === item.id ? product : item
    );
    return {
      ...state,
      products: updatedProducts,
      currentProductId: product.id,
      error: ''
    };
  }),

  on(ProductActions.updateProductFail, (state, { error }) => ({
    ...state,
    error
  })),

  on(ProductActions.createProductSuccess, (state, { product }) => ({
    ...state,
    products: state.products.concat(product),
    currentProductId: product.id,
    error: ''
  })),

  on(ProductActions.createProductFail, (state, { error }) => ({
    ...state,
    error
  })),

  on(ProductActions.deleteProductSuccess, (state, { id }) => ({
    ...state,
    products: state.products.filter(p => p.id !== id),
    error: ''
  })),

  on(ProductActions.deleteProductFail, (state, { error }) => ({
    ...state,
    error
  }))
);

export function reducer(state: ProductState | undefined, action: Action) {
  return productReducer(state, action);
}
