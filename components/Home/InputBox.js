import Image from "next/image";
import React from "react";

const InputBox = ({ type }) => {
  return (
    <div className="p-2 bg-gray-100  rounded-2xl mt-3 flex items-center gap-4 ml-6">
      <Image src="/dot.svg" alt="dot" width={42} height={30} />

      <input
        type="text"
        placeholder={type == "source" ? "Pickup location" : "Drop location"}
        className=" bg-transparent w-[270px] px-3 py-2 rounded-lg outline-black"
      />
    </div>
  );
};

export default InputBox;
