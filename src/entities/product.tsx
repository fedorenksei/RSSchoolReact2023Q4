import React from 'react';
import { ProductData } from '../shared/types';

interface Props {
  data: ProductData;
  view: 'card' | 'details';
}

export const Product = ({
  view,
  data: { imageUrl, name, description },
}: Props) => {
  return (
    <div
      className={
        view === 'card'
          ? 'p-5 flex gap-3'
          : 'h-full p-3 flex flex-col gap-4 items-start justify-center'
      }
    >
      <img
        src={imageUrl}
        className="rounded-md h-[100px] aspect-square object-cover"
        title={name}
      />
      <div className="flex flex-col">
        <p className="text-lg">{name}</p>
        <p>{description}</p>
      </div>
    </div>
  );
};
