"use client"
import { SignIn } from "@clerk/nextjs";
import Image from "next/image";
import { useEffect } from "react";

export default function SignInPage() {
  useEffect(() => {
    console.log("On Sign In page!");
  }, []);
  
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
        <SignIn routing="path" />
      </div>
    </div>
  );
}
