import { Montserrat } from "next/font/google";
import {
  ClerkProvider,
  SignedIn,
  SignedOut,
  UserButton,
  SignIn,
} from "@clerk/nextjs";
import "./globals.css";
import Navbar from "@/components/Navbar";

const montserrat = Montserrat({
  subsets: ["latin"],
});

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`antialiased ${montserrat.className}`}>
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
        </body>
      </html>
    </ClerkProvider>
  );
}
