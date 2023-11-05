import React from 'react';
import { Search } from '../widgets/search';
import { TestError } from '../entities/testError';
import { ErrorBoundary } from './errorBoundary';

export const Home = () => {
  return (
    <ErrorBoundary>
      <div className="p-2 space-y-3">
        <Search />
        <TestError />
      </div>
    </ErrorBoundary>
  );
};
