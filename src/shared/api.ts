import { UserData } from './types';

const API_KEY = 'fcd41195ddfdb5c4521b26aff45b7db5';

export class Api {
  static instance: Api;

  static getInstance() {
    if (!this.instance) this.instance = new Api();
    return this.instance;
  }

  async getSearchResults(query: string) {
    const response = await fetch(
      `https://gateway.marvel.com/v1/public/characters?${
        query ? `nameStartsWith=${query}` : ''
      }&apikey=${API_KEY}`
    );
    if (!response.ok) {
      throw new Error("Response's status is not 200 OK");
    }
    const body = await response.json();
    const results: UserData[] = body.data.results.map(
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
    return results;
  }
}
