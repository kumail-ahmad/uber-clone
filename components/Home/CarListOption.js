import { carList } from "@/utilities/carList";
import React from "react";
import Image from "next/image";

const CarListOption = () => {
  return (
    <div>
      {carList.map((item) => (
        <div key={item.id} className="p-4 border rounded-md mb-2">
          <h3 className="text-lg font-bold">{item.name}</h3>
          <p className="text-sm">{item.desc}</p>
          <p className="text-sm">Capacity: {item.capactiy}</p>
          <Image
            src={item.image}
            alt={item.name}
            width={64}
            height={64}
            className="mt-2 object-contain"
          />
          
        </div>
      ))}
    </div>
  );
};

export default CarListOption;
