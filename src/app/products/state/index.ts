import * as fromRoot from '../../state/app.state';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ProductState, productFeatureKey } from './product.reducer';

// Extends the app state to include the product feature.
// This is required because products are lazy loaded.
// So the reference to ProductState cannot be added to app.state
export interface State extends fromRoot.State {
    products: ProductState;
}

// Selector functions
const getProductFeatureState = createFeatureSelector<ProductState>(productFeatureKey);

export const getShowProductCode = createSelector(
    getProductFeatureState,
    state => state.showProductCode
);

export const getCurrentProductId = createSelector(
    getProductFeatureState,
    state => state.currentProductId
);

export const getCurrentProduct = createSelector(
    getProductFeatureState,
    getCurrentProductId,
    (state, currentProductId) => {
        switch (currentProductId) {
            case 0:
                return {
                    id: 0,
                    productName: '',
                    productCode: 'New',
                    description: '',
                    starRating: 0
                };
            case null:
                return null;
            default:
                return state.products.find(p => p.id === currentProductId) || null;
        }
    }
);

export const getProducts = createSelector(
    getProductFeatureState,
    state => state.products
);

export const getError = createSelector(
    getProductFeatureState,
    state => state.error
);
