import React, { Component } from 'react';
import { ErrorBoundary } from './errorBoundary';
import { Home } from '../pages/home';

export class App extends Component {
  render() {
    return (
      <ErrorBoundary>
        <Home />
      </ErrorBoundary>
    );
  }
}
