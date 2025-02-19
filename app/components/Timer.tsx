
import { useEffect, useState } from "react";

const Timer = ({ onTimeout }: { onTimeout: () => void }) => {
  const [timeLeft, setTimeLeft] = useState(30);

  useEffect(() => {
    if (timeLeft === 0) {
      onTimeout(); // Trigger timeout function when time reaches zero
      return;
    }

    const timer = setTimeout(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [timeLeft, onTimeout]);

  return <p className="text-lg font-semibold text-red-500">Time Left: {timeLeft}s</p>;
};

export default Timer;
