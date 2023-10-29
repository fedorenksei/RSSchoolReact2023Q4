import React, { Component } from 'react';
import { Search } from '../widgets/search';
import { TestError } from '../entities/testError';

export class Home extends Component {
  render() {
    return (
      <>
        <Search />
        <TestError />
      </>
    );
  }
}
