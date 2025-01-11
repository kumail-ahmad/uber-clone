import { SignUp, useUser } from "@clerk/nextjs";
import Image from "next/image";

export default function Home() {
  const { user } = useUser();

  if (!user) {
    return (
      <div>
        <Image
          src="/banner.png"
          height={780}
          width={1500}
          alt="hey"
          classname="object-contain h-full w-full"
        ></Image>
        <SignUp />
      </div>
    );
  }

  return <div>Welcome!</div>;
}
