"use client";
import { SignIn, SignUp } from "@clerk/nextjs";
import Image from "next/image";

export default function SignInPage() {
  return (
    <div>
      <Image
        src="/banner.png"
        height={180}
        width={1500}
        alt="hey"
        className="object-contain w-full h-1/2"
      />
      <div className="absolute top-20 left-40">
        <SignUp routing="path" forceRedirectUrl="/" />
      </div>
    </div>
  );
}
