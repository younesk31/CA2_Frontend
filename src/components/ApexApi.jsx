import React, { useState, useEffect } from "react";
import { ApexApi_URL } from "./Urls";

function ApexApi() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentMapData, setCurrentMapData] = useState();
  const [nextMapData, setNextMapData] = useState();
  let [mapTimer, setMapTimer] = useState();

  useEffect(() => {
    fetch(ApexApi_URL + "maprotation?version=2&auth=neoWHFfqrUVApKdUZXUe")
      .then((res) => res.json())
      .then(
        (result) => {
          setCurrentMapData({
            map: result.battle_royale.current.map,
            duration: result.battle_royale.current.DurationInMinutes,
            asset: result.battle_royale.current.asset,
          });
          setMapTimer({
            timeleftonmap: result.battle_royale.current.remainingTimer,
          });
          setNextMapData({
            map: result.battle_royale.next.map,
            duration: result.battle_royale.next.DurationInMinutes,
          });
          setIsLoaded(true);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      fetch(ApexApi_URL + "maprotation?version=2&auth=neoWHFfqrUVApKdUZXUe")
        .then((res) => res.json())
        .then((result) => {
          const newtime = {
            timeleftonmap: result.battle_royale.current.remainingTimer,
          };
          setMapTimer((mapTimer.timeleftonmap = newtime));
        });
    }, 1000);
    return () => clearInterval(interval);
  });

  if (error) {
    return <div>Error: {error}</div>;
  } else if (!isLoaded) {
    return (
      <div>
        <h1> Fetching Data! Please wait.... </h1>{" "}
      </div>
    );
  } else {
    return (
      <div>
        <p>Current Map: {currentMapData.map}</p>
        <p>Duration: {currentMapData.duration} mins</p>

        <div>
          <img src={currentMapData.asset} width="600" height="350" />
        </div>
        <p>Next Map: {nextMapData.map}</p>
        <p>Time left on map: {mapTimer.timeleftonmap} mins</p>
      </div>
    );
  }
}

export default ApexApi;
