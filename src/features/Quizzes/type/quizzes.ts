interface Product {
  id: number;
  name: string;
}

export interface ProductsState {
  data: Product[];
  loading: boolean;
  error: string | null;
}
