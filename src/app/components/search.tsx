import React, { Component, FormEvent } from 'react';
import { UserData } from '../types';
import { User } from './user';

interface SearchState {
  query: string;
  results: UserData[];
}

export class Search extends Component<Record<string, never>, SearchState> {
  state: SearchState = {
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
    this.setState({ results });
  }
}
