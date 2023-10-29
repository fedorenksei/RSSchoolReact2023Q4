import React, { Component, PropsWithChildren } from 'react';

interface ErrorBoundaryState {
  error: Error | null;
}

export class ErrorBoundary extends Component<
  PropsWithChildren,
  ErrorBoundaryState
> {
  state: ErrorBoundaryState = { error: null };

  render() {
    return (
      <>
        {this.state.error ? (
          <>
            <p>
              Error: <b>{this.state.error.name}</b>
            </p>
            <p>{this.state.error.message}</p>
          </>
        ) : (
          this.props.children
        )}
      </>
    );
  }

  static getDerivedStateFromError(error: Error) {
    return { error };
  }
}
