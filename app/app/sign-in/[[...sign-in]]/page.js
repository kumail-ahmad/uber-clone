import { SignIn, useUser } from "@clerk/nextjs";
import Image from "next/image";

export default function Home() {
  const { user } = useUser();

  if (!user) {
    return (
      <div>
        <Image src="/banner.png" height={780} width={1500} alt=""></Image>

        {/* <SignIn /> */}
      </div>
    );
  }

  return (
    <div>
      <h1>Welcome, {user.firstName}!</h1>
      {/* Add your authenticated content here */}
    </div>
  );
}
