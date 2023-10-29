import React, { Component } from 'react';
import { Search } from './components/search';
import { ErrorBoundary } from './components/errorBoundary';

export class App extends Component {
  render() {
    return (
      <ErrorBoundary>
        <Search />
      </ErrorBoundary>
    );
  }
}
