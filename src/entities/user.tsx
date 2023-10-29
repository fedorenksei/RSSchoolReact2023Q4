import React, { Component } from 'react';
import { UserData } from '../shared/types';

export class User extends Component<UserData> {
  constructor(props: UserData) {
    super(props);
  }

  render() {
    return (
      <div className="p-5 flex gap-3">
        <img
          src={this.props.imageUrl}
          className="rounded-md h-[100px] aspect-square"
        />
        <div className="flex flex-col">
          <p>{this.props.name}</p>
          <p>{this.props.description}</p>
        </div>
      </div>
    );
  }
}
