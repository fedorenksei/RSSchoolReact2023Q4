import React, { Component } from 'react';
import { Search } from '../widgets/search';
import { TestError } from '../entities/testError';

export class Home extends Component {
  render() {
    return (
      <div className="p-2 space-y-3">
        <Search />
        <TestError />
      </div>
    );
  }
}
