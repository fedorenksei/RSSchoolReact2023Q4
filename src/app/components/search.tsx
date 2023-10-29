import React, { Component, FormEvent } from 'react';
import { UserData } from '../types';
import { User } from './user';
import { Api } from './api';
import { TestError } from './testError';

const lsItemName = 'userSearchQuery';

interface SearchState {
  query: string;
  results: UserData[];
}

export class Search extends Component<Record<string, never>, SearchState> {
  state: SearchState = {
    query: '',
    results: [],
  };

  async componentDidMount() {
    const query = localStorage.getItem(lsItemName);
    if (query) this.setState({ query });
    const api = Api.getInstance();
    this.setState({
      results: await api.getSearchResults(query || 'repos:>42+followers:>1000'),
    });
  }

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
        <TestError />
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
    const api = Api.getInstance();
    this.setState({ results: await api.getSearchResults(this.state.query) });
    localStorage.setItem(lsItemName, this.state.query);
  }
}
