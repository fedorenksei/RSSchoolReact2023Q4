import React, { Component } from 'react';
import { Search } from '../widgets/search';
import { ErrorBoundary } from './errorBoundary';
import { TestError } from '../entities/testError';

export class App extends Component {
  render() {
    return (
      <ErrorBoundary>
        <Search />
        <TestError />
      </ErrorBoundary>
    );
  }
}
