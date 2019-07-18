import { IProduct } from '../Shop/interfaces';
import { ReactRouterProps } from '../../typings/interfaces';

export interface IProductDetailed {
  basic: IProduct;
  manufacturerId: number;
  subcategoryName: string;
  manufacturerName: string;
  externalUrl: string;
}

export interface IProductViewState {
  product: IProductDetailed;
  meta: {
    isFetchingData: boolean;
    dataLoaded: boolean;
    error: string;
  }
}

export interface IProductViewPageMappedProps {
  product: IProductDetailed;
  isFetchingData: boolean;
  dataLoaded: boolean;
  error: string;
}

export interface IProductViewPageMappedDispatch {
  onProductFetch: (id: number) => void;
  onAddProduct: (productId: number) => void;
  onRemoveProduct: (productId: number) => void;
}

export type IProductViewPageProps =
  & IProductViewPageMappedProps
  & IProductViewPageMappedDispatch
  & ReactRouterProps
  ;
