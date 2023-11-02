import React, { Component } from 'react';
import { Character } from '../../entities/character';
import { Api } from '../../shared/api';
import { CharacterData } from '../../shared/types';

interface Props {
  query: string;
}

interface State {
  results: CharacterData[] | null;
  hasError: boolean;
  isLoading: boolean;
}

export class SearchResults extends Component<Props, State> {
  state: State = {
    results: null,
    hasError: false,
    isLoading: false,
  };

  render() {
    return this.state.hasError ? (
      <p>Something went wrong...</p>
    ) : this.state.isLoading || !this.state.results ? (
      <p>Loading...</p>
    ) : (
      <div className="max-w-xl">
        {this.state.results.length ? (
          this.state.results.map((data) => (
            <Character key={data.id} {...data} />
          ))
        ) : (
          <p>Have not found anything...</p>
        )}
      </div>
    );
  }

  async componentDidUpdate(prevProps: Props) {
    if (
      this.props.query === prevProps.query &&
      (this.state.results || this.state.hasError || this.state.isLoading)
    )
      return;

    this.setState({ isLoading: true });
    try {
      const api = Api.getInstance();
      const results = await api.getSearchResults(this.props.query);
      this.setState({ results, hasError: false });
    } catch (err) {
      this.setState({ hasError: true });
    }
    this.setState({ isLoading: false });
  }
}
