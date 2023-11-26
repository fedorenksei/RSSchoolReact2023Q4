export interface ProductData {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
}

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
