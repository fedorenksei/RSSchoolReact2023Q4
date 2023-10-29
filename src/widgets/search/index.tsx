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
      <>
        <SearchInput handleQuery={this.handleQuery.bind(this)} />
        <SearchResults query={this.state.query} />
      </>
    );
  }

  handleQuery(query: string) {
    this.setState({ query });
  }
}
