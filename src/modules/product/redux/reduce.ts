import { ActionType, createCustomAction, getType } from 'typesafe-actions';
import { Product, SearchDataType, UpdateProduct } from '../../../models/product';

export interface ProductState {
  product?: Product;
  searchProduct?: SearchDataType;
}

export const getProduct = createCustomAction('public/getProduct', (data: Product) => ({
  data,
}));

export const searchItemProduct = createCustomAction('public/seachItemProduct', (data: SearchDataType) => ({
  data,
}));

export const updateProduct = createCustomAction('public/updateProduct', (data: UpdateProduct) => ({
  data,
}));

const actions = { getProduct, searchItemProduct, updateProduct };

type Action = ActionType<typeof actions>;

export default function reducer(state: ProductState = {}, action: Action) {
  switch (action.type) {
    case getType(getProduct):
      return { ...state, product: action.data };
    case getType(searchItemProduct):
      return { ...state, searchProduct: action.data };
    case getType(updateProduct):
      return { ...state, data: action.data };
    default:
      return state;
  }
}
