"use client";

import { useEffect } from "react";

const Test: React.FC = () => {
  useEffect(() => {
    throw new Error("501");
  }, []);

  return (
    <div className="w-full">
      <h1>ABOUT US</h1>
    </div>
  );
};
export default Test;
