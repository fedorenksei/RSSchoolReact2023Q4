import React, { Component } from 'react';
import { UserData } from '../../types';
import { User } from './user';
import { Api } from '../api';
import { TestError } from '../testError';
import { SearchInput } from './input';

interface SearchState {
  results: UserData[];
}

export class Search extends Component<Record<string, never>, SearchState> {
  state: SearchState = {
    results: [],
  };

  render() {
    return (
      <>
        <SearchInput handleQuery={this.handleQuery.bind(this)} />
        <TestError />
        <div>
          {this.state.results.map((data) => (
            <User key={data.login} {...data} />
          ))}
        </div>
      </>
    );
  }

  async handleQuery(query: string) {
    const api = Api.getInstance();
    this.setState({
      results: await api.getSearchResults(query || 'repos:>42+followers:>1000'),
    });
  }
}
