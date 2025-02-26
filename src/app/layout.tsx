"use client";

import "./globals.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ToastContainer } from "react-toastify";
import GlobalErrorBoundary from "../components/organisms/global-error";
import { ErrorBoundary } from "react-error-boundary";

const queryClient = new QueryClient();

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" dir="rtl">
      <head>
        <title>TIBZIWEAR</title>
        <link rel="icon" href="./favicon.svg" sizes="any" />
        <meta name="title" content="TIBZIWEAR | Best Shopping Experience" />
        <meta
          name="description"
          content="Discover the best products at unbeatable prices. Shop now and enjoy a seamless experience."
        />
        <meta
          name="keywords"
          content="shopping, fashion, best deals, TIBZIWEAR, online store, ecommerce"
        />
        <meta name="author" content="TIBZIWEAR" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      </head>
      <body className="font-app-peyda-regular">
        <QueryClientProvider client={queryClient}>
          <ErrorBoundary FallbackComponent={GlobalErrorBoundary}>
            {children}
            <ToastContainer />
          </ErrorBoundary>
        </QueryClientProvider>
      </body>
    </html>
  );
}
