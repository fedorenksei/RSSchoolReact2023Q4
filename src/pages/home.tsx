import React from 'react';
import { Search } from '../widgets/search';
import { TestError } from '../entities/testError';

export const Home = () => {
  return (
    <div className="p-2 space-y-3">
      <Search />
      <TestError />
    </div>
  );
};
