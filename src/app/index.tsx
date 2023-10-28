import React, { Component, FormEvent } from 'react';
import { UserData } from './types';
import { User } from './user';

interface AppState {
  query: string;
  results: UserData[];
}

export class App extends Component<Record<string, never>, AppState> {
  state: AppState = {
    query: '',
    results: [],
  };

  render() {
    return (
      <>
        <form onSubmit={(e) => this.handleSubmit(e)}>
          <input
            value={this.state.query}
            onChange={(e) => this.setState({ query: e.target.value })}
          />
          <button type="submit">Search</button>
        </form>
        <div>
          {this.state.results.map((data) => (
            <User key={data.login} {...data} />
          ))}
        </div>
      </>
    );
  }

  async handleSubmit(e: FormEvent) {
    e.preventDefault();
    const response = await fetch(
      `https://api.github.com/search/users?q=${this.state.query}`
    );
    const body = await response.json();
    console.log(body);
    const results: UserData[] = body.items.map(
      (data: { login: string; avatar_url: string; html_url: string }) => ({
        login: data.login,
        avatarUrl: data.avatar_url,
        profileUrl: data.html_url,
      })
    );
    this.setState({ results });
  }
}
