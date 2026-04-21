import React, { useEffect } from "react";
import { Text } from "react-native";

export default function Timer({ time, setTime, onFinish }) {
  useEffect(() => {
    if (time <= 0) {
      onFinish();
      return;
    }

    const t = setInterval(() => setTime(p => p - 1), 1000);
    return () => clearInterval(t);
  }, [time]);

  return (
    <Text style={{ fontSize: 18, color: time <= 60 ? "red" : "black" }}>
      Time: {time}s
    </Text>
  );
}