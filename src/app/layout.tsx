"use client";

import { Flowbite } from "flowbite-react";
import "./globals.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ErrorBoundary } from "next/dist/client/components/error-boundary";
import { ToastContainer } from "react-toastify";

const queryClient = new QueryClient();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" dir="rtl">
      <body className="font-app-peyda-regular">
        <QueryClientProvider client={queryClient}>
         {children}
         <ToastContainer />
        </QueryClientProvider>
      </body>
    </html>
  );
}
