"use client"
import Link from "next/link";
import { useEffect } from "react";

export default function Landing() {
  useEffect(() => {
    console.log("On landing page!");
  }, []);
  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gray-50">
      <h1 className="text-4xl font-bold mb-6 text-gray-800">
        Welcome to Hoppr
      </h1>
      <p className="mb-8 text-gray-600">Your destination, simplified.</p>
      <div className="flex space-x-4">
        <Link
          href="/sign-in"
          className="px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800"
        >
          Sign In
        </Link>
        <Link
          href="/sign-up"
          className="px-6 py-3 bg-gray-200 text-black rounded-lg hover:bg-gray-300"
        >
          Sign Up
        </Link>
      </div>
    </div>
  );
}
