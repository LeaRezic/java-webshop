import { RouteComponentProps, StaticContext } from 'react-router';
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
  product: IProductDetailed | null;
  meta: {
    isFetchingData: boolean;
    dataLoaded: boolean;
    error: string | undefined;
  }
}

export interface IProductViewPageMappedProps {
  product: IProductDetailed | null;
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
