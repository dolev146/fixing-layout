import React, { useState } from "react";
import BarChartComponent from "./NRMS/BarChartComponent";
import PSDComponent from "./PSD/PSDComponent";

const RMSPSDContainer = () => {
  const [isAnimating, setIsAnimating] = useState(false);

  // RMS related code
  const [siteDepthArray, setSiteDepthArray] = useState([]);
  const [rmsData, setRmsData] = useState([]);
  const [shouldUpdate, setShouldUpdate] = useState(true);
  const [timeoutId, setTimeoutId] = useState(null);
  const [currentDepth, setCurrentDepth] = useState(5);
  const generateData = (depth = currentDepth) => {
    if (depth < 0 || !shouldUpdate) {
      return;
    }

    setCurrentDepth(depth);

    setSiteDepthArray((prevSiteDepthArray) => [
      ...prevSiteDepthArray,
      depth.toFixed(5),
    ]);
    let rmsValue;
    if (depth < 5) {
      rmsValue = 2 + Math.random();
    } else {
      rmsValue = Math.random();
    }
    setRmsData((prevRmsData) => [...prevRmsData, rmsValue.toFixed(5)]);
    if (shouldUpdate) {
      const newTimeoutId = setTimeout(() => {
        generateData(depth - 0.1);
      }, 5000 / ((15 - 0) * 10));
      setTimeoutId(newTimeoutId);
    }
  };
  const startRmsAnimation = () => {
    console.log("startRmsAnimation");
    setIsAnimating(!isAnimating);
    setShouldUpdate(!shouldUpdate);
    if (shouldUpdate) {
      generateData();
    } else {
      clearTimeout(timeoutId);
    }
  };

  return (
    <div>
      <button
        onClick={() => {
          setIsAnimating(!isAnimating);
          setShouldUpdate(!shouldUpdate);
          if (shouldUpdate) {
            generateData();
          } else {
            clearTimeout(timeoutId);
          }
        }}
      >
        {isAnimating ? "stop" : "start"}
      </button>
      <div className="flex">
        <BarChartComponent
          isAnimating={isAnimating}
          siteDepthArray={siteDepthArray}
          setSiteDepthArray={setSiteDepthArray}
          rmsData={rmsData}
          setRmsData={setRmsData}
          shouldUpdate={shouldUpdate}
          setShouldUpdate={setShouldUpdate}
          timeoutId={timeoutId}
          setTimeoutId={setTimeoutId}
          currentDepth={currentDepth}
          setCurrentDepth={setCurrentDepth}
          startRmsAnimation={startRmsAnimation}
        />
        <PSDComponent isAnimating={isAnimating} />
      </div>
    </div>
  );
};

export default RMSPSDContainer;
