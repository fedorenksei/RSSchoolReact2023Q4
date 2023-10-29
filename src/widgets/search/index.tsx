import React, { Component } from 'react';
import { SearchInput } from '../../entities/input';
import { SearchResults } from './results';

interface State {
  query: string;
}

export class Search extends Component<Record<string, never>, State> {
  state: State = {
    query: '',
  };

  render() {
    return (
      <div className="flex flex-col items-center pt-[10vh] flex-shrink-0 gap-5">
        <h1 className="text-3xl">Search for Marvel characters</h1>
        <SearchInput handleQuery={this.handleQuery.bind(this)} />
        <SearchResults query={this.state.query} />
      </div>
    );
  }

  handleQuery(query: string) {
    this.setState({ query });
  }
}
