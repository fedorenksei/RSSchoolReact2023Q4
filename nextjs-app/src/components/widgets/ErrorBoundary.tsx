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
        {this.props.children}
        {this.state.error && (
          <>
            <div className="fixed z-10 top-0 left-0 w-full h-full grid place-items-center bg-slate-600 opacity-50"></div>
            <div className="fixed z-20 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-5 bg-white rounded-lg space-y-3">
              <p>Oops! Something went wrong...</p>
              <p>
                <b>{this.state.error.name}</b>: {this.state.error.message}
              </p>
              <button
                onClick={() => {
                  location.reload();
                }}
                className="block mx-auto border hover:border-green-800 p-2 rounded-md"
              >
                Reload page!
              </button>
            </div>
          </>
        )}
      </>
    );
  }

  static getDerivedStateFromError(error: Error) {
    return { error };
  }
}
