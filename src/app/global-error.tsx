"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

interface GlobalErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

export default class GlobalErrorBoundary extends React.Component<
  { children: React.ReactNode },
  GlobalErrorBoundaryState
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false, error: undefined };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  resetErrorBoundary = () => {
    this.setState({ hasError: false, error: undefined });
  };

  renderErrorContent() {
    const { error } = this.state;

    if (!error) return null;

    // Error details mapping based on error codes
    const errorMap: Record<
      string,
      { title: string; description: string; image: string }
    > = {
      "403": {
        title: "دسترسی ممنوع!",
        description:
          "همه درها بسته بودند! شما اجازه دسترسی به این صفحه را ندارید.",
        image: "/images/403-error.svg",
      },
      "500": {
        title: "خطای داخلی سرور!",
        description: "مشکل فنی کوچکی پیش آمده است. لطفاً دوباره امتحان کنید.",
        image: "/images/500-error.svg",
      },
      "501": {
        title: "در دست ساخت!",
        description:
          "این صفحه در حال حاضر در دست ساخت است. لطفاً بعداً مراجعه کنید.",
        image: "/images/501-error.svg",
      },
      "502": {
        title: "ارتباط برقرار نشد!",
        description: "متأسفیم، مشکلی در ارتباط با سرور به وجود آمده است.",
        image: "/images/502-error.svg",
      },
      "503": {
        title: "سرویس در دسترس نیست!",
        description:
          "سرویس در حال حاضر در دسترس نیست. لطفاً بعداً مراجعه کنید.",
        image: "/images/503-error.svg",
      },
    };

    // Determine the error details based on error name or status
    const statusCode = (error as any)?.statusCode?.toString() || "500";
    const errorDetails = errorMap[statusCode] || errorMap["500"];

    return (
      <div className="flex flex-col items-center justify-center h-screen text-center p-4">
        <Image
          src={errorDetails.image}
          alt={errorDetails.title}
          width={300}
          height={300}
        />
        <h1 className="text-3xl font-bold mt-6">{errorDetails.title}</h1>
        <p className="text-lg text-gray-500 mt-2">{errorDetails.description}</p>
        <div className="mt-8">
          <button
            onClick={this.resetErrorBoundary}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
          >
            تلاش دوباره
          </button>
          <Link href="/">
            <a className="ml-4 px-6 py-2 bg-gray-200 text-gray-700 rounded-lg shadow hover:bg-gray-300 transition">
              بازگشت به خانه
            </a>
          </Link>
        </div>
      </div>
    );
  }

  render() {
    if (this.state.hasError) {
      return this.renderErrorContent();
    }

    return this.props.children;
  }
}
