import { connectRouter, RouterState } from 'connected-react-router';
import { History } from 'history';
import { combineReducers } from 'redux';
import authReducer, { AuthState } from '../modules/auth/redux/authReducer';
import intlReducer, { IntlState } from '../modules/intl/redux/intlReducer';
import { Product } from '../models/product';
import dataReducer from '../modules/product/redux/reduce';

export interface AppState {
  router: RouterState;
  intl: IntlState;
  profile: AuthState;
  product: Product;
}

export default function createRootReducer(history: History) {
  return combineReducers({
    router: connectRouter(history),
    intl: intlReducer,
    profile: authReducer,
    product: dataReducer,
  });
}
