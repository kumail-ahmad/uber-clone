import { carList } from "@/utilities/carList";
import React from "react";
import Image from "next/image";

const CarListOption = () => {
  return (
    <div>
      <p className="font-bold  mt-5 text-4xl">Choose a ride</p>
      <h1 className="font-bold text-2xl mt-5">Recomended</h1>
      {carList.map((item) => (
        <div
          key={item.id}
          className="p-4 border rounded-md mb-2 mt-3 flex gap-2  hover:bg-gray-200"
        >
          <Image
            src={item.image}
            alt={item.name}
            width={64}
            height={64}
            className="mt-2 object-contain"
          />{" "}
          <div className="second">
            <p className="text-sm flex items-center   gap-1">
              <h3 className="text-lg font-bold">{item.name}</h3>
              <Image src="/person.svg" alt="" width={14} height={14} />{" "}
              <div className="capacity">{item.capactiy}</div>
            </p>
            <p className="text-sm">{item.desc}</p>
          </div>
          <p className="price">${item.amount * 100}</p>
        </div>
      ))}
    </div>
  );
};

export default CarListOption;
