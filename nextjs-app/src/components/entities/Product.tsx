import { ProductData } from "@/shared/data/types";
import { getQueryParams } from "@/shared/utils";
import Image from "next/image";
import { useRouter } from "next/router";
import { MouseEventHandler } from "react";

interface Props {
  data: ProductData;
  view: "card" | "details";
}

export const ProductUI = ({
  view,
  data: { imageUrl, name, description },
}: Props) => {
  return (
    <div
      className={
        view === "card"
          ? "p-5 flex gap-3"
          : "h-full p-3 flex flex-col gap-4 items-start justify-center"
      }
    >
      <Image
        src={imageUrl}
        width="100"
        height="100"
        className="rounded-md h-[100px] aspect-square object-cover"
        title={name}
        alt={name}
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
  const router = useRouter();
  const openDetails: MouseEventHandler<HTMLDivElement> = (e) => {
    router.push(`/details/${data.id}${getQueryParams(router)}`, undefined, {
      scroll: false,
    });
    e.stopPropagation();
  };

  return view === "card" ? (
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
