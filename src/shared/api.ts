import { ProductData } from './types';

interface SearchParams {
  query: string;
  page: number;
  limit: number;
}

export class Api {
  static instance: Api;

  static getInstance() {
    if (!this.instance) this.instance = new Api();
    return this.instance;
  }

  async getSearchResults({ query, limit, page }: SearchParams) {
    const response = await fetch(
      `https://dummyjson.com/products${
        query ? `/search?q=${query}` : '?'
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
}
