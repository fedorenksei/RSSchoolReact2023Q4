import React from 'react';
import { CharacterData } from '../shared/types';

export const Character = ({ imageUrl, name, description }: CharacterData) => {
  return (
    <div className="p-5 flex gap-3">
      <img src={imageUrl} className="rounded-md h-[100px] aspect-square" />
      <div className="flex flex-col">
        <p className="text-lg">{name}</p>
        <p>{description}</p>
      </div>
    </div>
  );
};
