import Link from "next/link";
import Image from "next/image";
import React from "react";

const Card = ({ title, description, price, theme, _id, image }: any) => {
  return (
    <div className="card bg-base-100 shadow-md rounded-lg overflow-hidden w-[350px]">
      <Image
        src={image}
        alt={title}
        width={350}
        height={200}
        className="w-full h-40 object-cover"
      />
      <div className="card-body px-4 pt-4 pb-2">
        <h2 className="card-title text-xl font-bold">{title}</h2>
        <p className="card-description text-base h-20">{description}</p>
        <div className="flex justify-between items-center my-2">
          <p className="font-bold text-lg">Price:</p>
          <p className="text-lg text-right">{price}€</p>
        </div>
        <div className="flex justify-between items-center">
          <p className="font-bold text-lg">Theme:</p>
          <p className="text-lg text-right">{theme}</p>
        </div>
        <Link
          href={`/courses/${_id}`}
          className="btn btn-primary mt-4 w-full text-white my-2 rounded-full py-4"
        >
          Voir le cours
        </Link>
      </div>
    </div>
  );
};

export default Card;
