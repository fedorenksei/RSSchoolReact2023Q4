import React from 'react';
import { Search } from '../widgets/Search/Search';
import { TestError } from '../entities/TestError';
import { ErrorBoundary } from './ErrorBoundary';
import { Outlet } from 'react-router-dom';

export const Home = () => {
  return (
    <ErrorBoundary>
      <div className="flex">
        <div className="grow p-2 space-y-3">
          <Search />
        </div>
        <Outlet />
      </div>
      <TestError />
    </ErrorBoundary>
  );
};
