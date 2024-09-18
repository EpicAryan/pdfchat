import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider, SignedOut,  UserButton, SignedIn } from "@clerk/nextjs";
import Providers from "@/components/Providers";
import {Toaster} from 'react-hot-toast';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Pdf-Chat",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    
    <ClerkProvider>
      <Providers>
        <html lang="en">
          <body className={`${inter.className} bg-gradient-to-r from-slate-700 to-slate-900`}>
            {/* <SignedOut>
            </SignedOut> */}
            <header>

            <SignedIn>
              <UserButton />
            </SignedIn>
            </header>
            <main>

            {children}
            </main>
          <Toaster/>
          </body>
        </html>
      </Providers>
    </ClerkProvider>
  );
}
