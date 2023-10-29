import React, { Component } from 'react';

interface State {
  throwError: boolean;
}

export class TestError extends Component<Record<string, never>, State> {
  state: State = { throwError: false };

  render() {
    if (this.state.throwError) throw new Error('This is a test Error');

    return (
      <button
        className="fixed bottom-2 right-2 px-3 py-2 bg-white border rounded-md border-slate-700 transition hover:text-red-900 hover:border-red-900 shadow-md"
        onClick={() => this.setState({ throwError: true })}
      >
        Try to throw an error
      </button>
    );
  }
}
