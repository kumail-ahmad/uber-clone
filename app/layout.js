import {
  ClerkProvider,
  SignedIn,
  SignedOut,
  UserButton,
  SignIn,
  useUser,
} from "@clerk/nextjs";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Image from "next/image";
export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className="antialiased">
          <header className="flex justify-between">
            <SignedIn></SignedIn>
          </header>
          <main>
            <SignedIn>
              <Navbar />
              {children}
            </SignedIn>
            <SignedOut>
              <div className="flex items-center justify-center h-screen">
                <SignIn routing="hash" />
              </div>
            </SignedOut>
          </main>
          {/* <Image src="/banner.png" height={780} width={1500} alt=""></Image> */}
        </body>
      </html>
    </ClerkProvider>
  );
}
