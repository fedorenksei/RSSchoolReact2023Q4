export interface ProductData {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
}

interface ok200ApiResponse {
  total: number;
  results: ProductData[];
}

export type ApiRequestStatus = null | ok200ApiResponse | 'loading' | 'error';
