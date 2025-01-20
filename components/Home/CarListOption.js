import { carList } from "@/utilities/carList";
import { React, useState } from "react";
import Image from "next/image";

const CarListOption = () => {
  const [activeIndex, setActiveIndex] = useState();
  return (
    <div className="h-[200px] overflow-auto w-[420px]">
      <p className="font-bold  mt-5 text-4xl">Choose a ride</p>
      <h1 className="font-bold text-2xl mt-5">Recomended</h1>
      {carList.map((item, index) => (
        <div
          key={item.id}
          className={`p-4  rounded-lg mb-2 mt-3 flex gap-2 cursor-pointer border-black hover:bg-gray-200 overflow-auto w-[380px] ${
            activeIndex === index ? "border-[2px]" : null
          }`}
          onClick={() => setActiveIndex(index)}
        >
          <Image
            src={item.image}
            alt={item.name}
            width={64}
            height={64}
            className="mt-2 object-contain"
          />{" "}
          <div className="second">
            <div className="text-sm flex items-center   gap-1">
              <p className="text-lg font-bold">{item.name}</p>
              <Image src="/person.svg" alt="" width={14} height={14} />{" "}
              <div className="capacity">{item.capactiy}</div>
            </div>
            <p className="text-sm">{item.desc}</p>
          </div>
          <p className="price">₹{item.amount * 100}</p>
        </div>
      ))}
    </div>
  );
};

export default CarListOption;
