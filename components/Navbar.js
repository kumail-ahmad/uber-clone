import { UserButton } from "@clerk/nextjs";
import Image from "next/image";
import React from "react";

const Navbar = () => {
  const headerMenu = [
    { id: 1, name: "Ride", href: "/ride", icon: "/scooter.svg" },
    { id: 2, name: "Box", href: "/", icon: "/box.svg" },
  ];
  return (
    <div>
      <header className="flex gap-16 items-center p-3 mt-3 border-b-[5px] border-gray-200">
        <div className="logo ">
          <Image
            src="/logo.png"
            alt="Logo"
            width={110}
            height={110}
            className="ml-6  "
          />
        </div>
        <div>
          <div className="flex items-center gap-8">
            {headerMenu.map((item) => {
              return (
                <div className="flex items-center gap-2" key={item.id}>
                  <Image
                    src={item.icon}
                    width={20}
                    height={20}
                    alt={item.name}
                  />
                  <h2 className="font-sm font-bold">{item.name}</h2>
                </div>
              );
            })}
          </div>
        </div>
        <div className="user absolute top-2 right-0 p-4 ">
          <UserButton />
        </div>
      </header>
    </div>
  );
};

export default Navbar;
