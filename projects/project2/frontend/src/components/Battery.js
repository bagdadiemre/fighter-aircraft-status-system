// Battery.js
import React, { useState, useEffect } from "react";
import BatterySVG from "../assets/batterySVG.js";
import useWebSocket from "../utils/webSocket";
import "../App.css";

const Battery = () => {
  const [batteryLevel, setBatteryLevel] = useState(0);
  const socket = useWebSocket("ws://localhost:5175");

  useEffect(() => {
    if (socket) {
      socket.onmessage = (event) => {
        const data = JSON.parse(event.data);
        if (data.eventName === "PLANE_BATTERY") {
          setBatteryLevel(data.data.battery);
        }
      };
    }
  }, [socket]);

  const getBatteryColor = () => {
    if (batteryLevel < 20) {
      return "red";
    } else if (batteryLevel < 50) {
      return "yellow";
    } else {
      return "green";
    }
  };

  return (
    <div className="battery">
      <BatterySVG
        alt="Battery"
        style={{ fill: getBatteryColor(), height: `${batteryLevel}%` }}
      />
    </div>
  );
};

export default Battery;
