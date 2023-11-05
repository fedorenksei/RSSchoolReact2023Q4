import React from 'react';
import { ProductData } from '../shared/types';

export const Product = ({ imageUrl, name, description }: ProductData) => {
  return (
    <div className="p-5 flex gap-3">
      <img
        src={imageUrl}
        className="rounded-md h-[100px] aspect-square object-cover"
      />
      <div className="flex flex-col">
        <p className="text-lg">{name}</p>
        <p>{description}</p>
      </div>
    </div>
  );
};
