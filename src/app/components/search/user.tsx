import React, { Component } from 'react';
import { UserData } from '../../types';

export class User extends Component<UserData> {
  constructor(props: UserData) {
    super(props);
  }
  render() {
    return (
      <div>
        <img src={this.props.avatarUrl} width="100px" />
        {this.props.login}
        <a
          href={this.props.profileUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          see profile
        </a>
      </div>
    );
  }
}
