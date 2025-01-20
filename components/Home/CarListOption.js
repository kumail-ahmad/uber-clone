import { carList } from "@/utilities/carList";
import React from "react";

const CarListOption = () => {
  return (
    <div>
      {carList.map((item) => {
        <div key={item.id}>
          {item.name}
        </div>;
      })}
    </div>
  );
};

export default CarListOption;
