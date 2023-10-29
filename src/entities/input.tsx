import React, { Component, FormEvent } from 'react';

const LS_ITEM_NAME = 'userSearchQuery';

interface Props {
  handleQuery: (query: string) => void;
}

interface State {
  query: string;
}

export class SearchInput extends Component<Props, State> {
  state = {
    query: '',
  };

  render() {
    return (
      <form onSubmit={(e) => this.processSubmitEvent(e)}>
        <input
          value={this.state.query}
          onChange={(e) => this.setState({ query: e.target.value })}
        />
        <button type="submit">Search</button>
      </form>
    );
  }

  componentDidMount() {
    const query = localStorage.getItem(LS_ITEM_NAME);
    if (query) this.setState({ query });
    this.props.handleQuery(query || '');
  }

  processSubmitEvent(e: FormEvent) {
    e.preventDefault();
    const query = this.state.query.trim();
    this.props.handleQuery(query);
    localStorage.setItem(LS_ITEM_NAME, query);
  }
}
