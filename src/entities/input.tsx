import React, { Component, FormEvent, RefObject } from 'react';

const LS_ITEM_NAME = 'userSearchQuery';

interface Props {
  handleQuery: (query: string) => void;
}

interface State {
  query: string;
}

export class SearchInput extends Component<Props, State> {
  inputElement: RefObject<HTMLInputElement>;

  state = {
    query: '',
  };

  constructor(props: Props) {
    super(props);
    this.inputElement = React.createRef();
  }

  render() {
    return (
      <form
        onSubmit={(e) => this.processSubmitEvent(e)}
        className="flex flex-wrap items-center gap-3"
      >
        <input
          ref={this.inputElement}
          value={this.state.query}
          onChange={(e) => this.setState({ query: e.target.value })}
          className="border p-2 px-4 rounded-full hover:border-violet-700"
        />
        <button type="submit" className="hover:text-green-600 transition">
          Go!
        </button>
      </form>
    );
  }

  componentDidMount() {
    this.inputElement.current?.focus();
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
