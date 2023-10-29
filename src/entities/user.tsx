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
          src={this.props.avatarUrl}
          className="rounded-md h-[100px] aspect-square"
        />
        <div className="flex flex-col">
          <a
            href={this.props.profileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-800 transition"
            title="See profile"
          >
            {this.props.login}
          </a>
        </div>
      </div>
    );
  }
}
