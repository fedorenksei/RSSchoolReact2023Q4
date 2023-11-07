import { ProductData } from './types';

interface SearchParams {
  searchTerm: string;
  page: number;
  limit: number;
}

export class Api {
  static instance: Api;

  static getInstance() {
    if (!this.instance) this.instance = new Api();
    return this.instance;
  }

  async getSearchResults({ searchTerm, limit, page }: SearchParams) {
    const response = await fetch(
      `https://dummyjson.com/products${
        searchTerm ? `/search?q=${searchTerm}` : '?'
      }&limit=${limit}&skip=${limit * (page - 1)}`
    );
    if (!response.ok) {
      throw new Error("Response's status is not 200 OK");
    }
    const body = await response.json();
    const results: ProductData[] = body.products.map(
      (data: {
        id: string;
        title: string;
        description: string;
        thumbnail: string;
      }) => ({
        id: data.id,
        name: data.title,
        description: data.description,
        imageUrl: data.thumbnail,
      })
    );
    const total: number = body.total;
    return { results, total };
  }

  async getProduct(id: string) {
    const response = await fetch(`https://dummyjson.com/products/${id}`);
    if (!response.ok) {
      throw new Error("Response's status is not 200 OK");
    }
    const data: {
      id: string;
      title: string;
      description: string;
      thumbnail: string;
    } = await response.json();
    return {
      id: data.id,
      name: data.title,
      description: data.description,
      imageUrl: data.thumbnail,
    };
  }
}
