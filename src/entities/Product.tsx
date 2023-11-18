import React, { MouseEventHandler } from 'react';
import { ProductData } from '../shared/data/types';
import { useNavigate } from 'react-router-dom';

interface Props {
  data: ProductData;
  view: 'card' | 'details';
}

export const ProductUI = ({
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

export const Product = (props: Props) => {
  const { view, data } = props;
  const navigate = useNavigate();
  const openDetails: MouseEventHandler<HTMLDivElement> = (e) => {
    navigate(`details/${data.id}${window.location.search}`);
    e.stopPropagation();
  };

  return view === 'card' ? (
    <div
      onClick={openDetails}
      className="cursor-pointer hover:shadow-lg hover:bg-blue-100 transition"
    >
      <ProductUI {...props} />
    </div>
  ) : (
    <ProductUI {...props} />
  );
};
