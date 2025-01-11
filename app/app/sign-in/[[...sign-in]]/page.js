import { SignIn, useUser } from "@clerk/nextjs";
import Image from "next/image";

export default function Home() {
  return (
    <div>
      <Image
        src="/banner.png"
        height={780}
        width={1500}
        alt="hey"
        classname="object-contain h-full w-full"
      ></Image>
      <div className="absolute top-10 right-0">vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv
        <SignIn />
      </div>
    </div>
  );
}
