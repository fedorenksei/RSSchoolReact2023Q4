import React, { Component } from 'react';

interface State {
  throwError: boolean;
}

export class TestError extends Component<Record<string, never>, State> {
  state: State = { throwError: false };

  render() {
    if (this.state.throwError) throw new Error('This is a test Error');

    return (
      <button onClick={() => this.setState({ throwError: true })}>
        Try to throw an error
      </button>
    );
  }
}
