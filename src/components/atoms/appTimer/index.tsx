"use client";

import React, { useState, useEffect } from "react";

interface TimeoutProps {
  initialTime: number;
  onTimeEnd: () => void;
}

const appTimer: React.FC<TimeoutProps> = ({ initialTime, onTimeEnd }) => {
  const [remainingTime, setRemainingTime] = useState(initialTime);

  useEffect(() => {
    const timer = setInterval(() => {
      setRemainingTime((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          onTimeEnd();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [onTimeEnd]);

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  return (
    <span className="text-green-600 font-bold p-2 text-lg w-full block text-end">
      زمان باقیمانده: {formatTime(remainingTime)}
    </span>
  );
};

export default appTimer;
