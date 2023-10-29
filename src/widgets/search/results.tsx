import React, { Component } from 'react';
import { User } from '../../entities/user';
import { Api } from '../../shared/api';
import { UserData } from '../../shared/types';

interface Props {
  query: string;
}

interface State {
  results: UserData[];
  hasError: boolean;
}

export class SearchResults extends Component<Props, State> {
  state: State = {
    results: [],
    hasError: false,
  };

  render() {
    return this.state.hasError ? (
      <p>Something went wrong...</p>
    ) : (
      <div className="max-w-xl">
        {this.state.results.map((data) => (
          <User key={data.id} {...data} />
        ))}
      </div>
    );
  }

  async componentDidMount() {
    try {
      const api = Api.getInstance();
      const results = await api.getSearchResults(this.props.query);
      this.setState({ results });
    } catch (err) {
      this.setState({ hasError: true });
    }
  }
}
