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

export interface apiProductData {
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
