interface Product {
  id: number;
  name: string;
}

export interface ProductsState {
  data: Product[];
  loading: 'idle' | 'pending' | 'succeeded' | 'failed';
  error: string | null;
}
