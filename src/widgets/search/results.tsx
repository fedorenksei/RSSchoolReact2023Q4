import React, { Component } from 'react';
import { User } from '../../entities/user';
import { Api } from '../../shared/api';
import { UserData } from '../../shared/types';

interface Props {
  query: string;
}

interface State {
  results: UserData[];
}

export class SearchResults extends Component<Props, State> {
  state: State = {
    results: [],
  };

  render() {
    return (
      <div>
        {this.state.results.map((data) => (
          <User key={data.login} {...data} />
        ))}
      </div>
    );
  }

  async componentDidUpdate(prevProps: Props) {
    if (this.props.query === prevProps.query && this.state.results.length)
      return;

    const api = Api.getInstance();
    const results = await api.getSearchResults(
      this.props.query || 'repos:>42+followers:>1000'
    );
    this.setState({ results });
  }
}
