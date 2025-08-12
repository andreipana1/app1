import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import "./globals.css";

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Suspense } from "react";
import { Toaster } from "react-hot-toast";

import HotelModal from "@/components/modals/hotel-modal";
import LoginModal from "@/components/modals/login-modal";
import RegisterModal from "@/components/modals/register-modal";
import SearchModal from "@/components/modals/search-modal";
import Navbar from "@/components/navbar/navbar";
import AuthProvider from "@/providers/auth-provider";
import QueryProvider from "@/providers/query-provider";
import { Props } from "@/types";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "RuralHop - Boutique Hotel Booking",
  description: "Discover and book unique rural hotels and boutique accommodations",
  icons: {
    icon: '/favicon.svg',
  },
};

export const dynamic = 'force-dynamic';

export default async function RootLayout({ children }: Props) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <QueryProvider>
            <Toaster />
            <LoginModal />
            <RegisterModal />
            <Suspense fallback={<div>Loading...</div>}>
              <SearchModal />
            </Suspense>
            <HotelModal />
            <Suspense fallback={<div>Loading...</div>}>
              <Navbar />
            </Suspense>
            <div className="pb-20 pt-28">{children}</div>
          </QueryProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
