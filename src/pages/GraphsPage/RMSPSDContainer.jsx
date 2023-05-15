import React, { useState } from "react";
import BarChartComponent from "./NRMS/BarChartComponent";
import PSDComponent from "./PSD/PSDComponent";

const RMSPSDContainer = () => {
  const [isAnimating, setIsAnimating] = useState(false);

  return (
    <div>
      <button onClick={() => {setIsAnimating(!isAnimating)}}>{isAnimating ? "stop" : "start"}</button>
      <div className="flex">
        <BarChartComponent />
        <PSDComponent />
      </div>
    </div>
  );
};

export default RMSPSDContainer;
