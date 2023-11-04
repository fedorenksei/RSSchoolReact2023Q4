import { CharacterData } from './types';

interface SearchParams {
  query: string;
  page: number;
  limit: number;
}

const API_KEY = 'fcd41195ddfdb5c4521b26aff45b7db5';

export class Api {
  static instance: Api;

  static getInstance() {
    if (!this.instance) this.instance = new Api();
    return this.instance;
  }

  async getSearchResults({ query, limit, page }: SearchParams) {
    const response = await fetch(
      `https://gateway.marvel.com/v1/public/characters?${
        query ? `nameStartsWith=${query}` : ''
      }&apikey=${API_KEY}&limit=${limit}&offset=${limit * (page - 1)}`
    );
    if (!response.ok) {
      throw new Error("Response's status is not 200 OK");
    }
    const body = await response.json();
    const results: CharacterData[] = body.data.results.map(
      (data: {
        id: string;
        name: string;
        description: string;
        thumbnail: { path: string; extension: string };
      }) => ({
        id: data.id,
        name: data.name,
        description: data.description,
        imageUrl: `${data.thumbnail?.path}.${data.thumbnail?.extension}`,
      })
    );
    const total: number = body.data.total;
    return { results, total };
  }
}
