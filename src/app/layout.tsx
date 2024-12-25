"use client";

import { Flowbite } from "flowbite-react";
import "./globals.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
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
          <Flowbite theme={{ mode: "dark", theme: {} }}>{children}</Flowbite>
        </QueryClientProvider>
      </body>
    </html>
  );
}
