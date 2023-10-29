import { UserData } from './types';

export class Api {
  static instance: Api;

  static getInstance() {
    if (!this.instance) this.instance = new Api();
    return this.instance;
  }

  async getSearchResults(query: string) {
    const response = await fetch(
      `https://api.github.com/search/users?q=${query}`
    );
    if (!response.ok) {
      throw new Error("Response's status is not 200 OK");
    }
    const body = await response.json();
    const results: UserData[] = body.items.map(
      (data: { login: string; avatar_url: string; html_url: string }) => ({
        login: data.login,
        avatarUrl: data.avatar_url,
        profileUrl: data.html_url,
      })
    );
    return results;
  }

  async getUserBio(login: string) {
    const response = await fetch(`https://api.github.com/users/${login}`);
    if (!response.ok) {
      throw new Error("Response's status is not 200 OK");
    }
    const body = await response.json();
    return body.bio || '';
  }
}
