export interface ProductData {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
}

interface Ok200ApiResponse {
  total: number;
  results: ProductData[];
}

export type ApiRequestStatus = null | Ok200ApiResponse | 'loading' | 'error';

export interface ApiProductData {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
}
