import Image from "next/image";
import React from "react";

const InputBox = () => {
  return (
    <div className="p-2 bg-gray-100  rounded-2xl mt-3 flex items-center gap-4 ml-14">
      {/* Icon */}
      <Image src="/dot.svg" alt="dot" width={42} height={32} />

      {/* Input Field without outline */}
      <input
        type="text"
        placeholder="Pickup location"
        className="border border-black bg-transparent w-full px-3 py-2 rounded-lg outline-none ring-0"
      />
    </div>
  );
};

export default InputBox;
