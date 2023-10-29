import React, { Component } from 'react';
import { CharacterData } from '../shared/types';

export class Character extends Component<CharacterData> {
  constructor(props: CharacterData) {
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
          <p className="text-lg">{this.props.name}</p>
          <p>{this.props.description}</p>
        </div>
      </div>
    );
  }
}
