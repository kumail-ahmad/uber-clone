"use client"
import { SignUp } from "@clerk/nextjs";
import Image from "next/image";

export default function SignUpPage() {
  return (
    <div>
      <Image
        src="/banner.png"
        height={780}
        width={1500}
        alt="hey"
        className="object-contain h-full w-full"
      />
      <SignUp />
    </div>
  );
}
