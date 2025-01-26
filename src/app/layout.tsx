"use client";

import "./globals.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ToastContainer } from "react-toastify";
import GlobalErrorBoundary from "./global-error";

const queryClient = new QueryClient();

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" dir="rtl">
      <body className="font-app-peyda-regular">
        <QueryClientProvider client={queryClient}>
          <GlobalErrorBoundary>
            {children}
            <ToastContainer />
          </GlobalErrorBoundary>
        </QueryClientProvider>
      </body>
    </html>
  );
}
