import { useState } from "react";

function SmartParking() {
  //   const SPOT_TYPES = ["MOTORBIKE", "CAR", "SUV", "TRUCK", "EV"];
  const SPOT_TYPES = ["🚲", "🚓", "🚙", "🚒", "🚃"];

  const generateSpots = (levelNumber, countPerType = 3) => {
    let spots = [];
    SPOT_TYPES.forEach((type) => {
      for (let i = 1; i <= countPerType; i++) {
        spots.push({
          id: `${levelNumber}-${type}-${i}`,
          level: levelNumber,
          type,
          occupied: false,
        });
      }
    });
    return spots;
  };

  const [levels, setLevels] = useState([
    generateSpots(1),
    generateSpots(2),
    generateSpots(3),
  ]);

  const [vehicleType, setVehicleType] = useState("CAR");
  const [message, setMessage] = useState("");

  const parkVehicle = () => {
    let updatedLevels = JSON.parse(JSON.stringify(levels));
    let assigned = false;

    for (let lvlIndex = 0; lvlIndex < updatedLevels.length; lvlIndex++) {
      let freeSpot = updatedLevels[lvlIndex].find(
        (spot) => spot.type === vehicleType && !spot.occupied
      );
      if (freeSpot) {
        freeSpot.occupied = true;
        setMessage(
          `Assigned ${vehicleType} to Level ${
            freeSpot.level
          } Spot ID: ${freeSpot.id.split("-").pop()}`
        );
        assigned = true;
        break;
      }
    }

    if (!assigned) {
      setMessage(`No available spot for a ${vehicleType}`);
    }
    setLevels(updatedLevels);
  };

  const freeSpot = (spotId) => {
    let updatedLevels = JSON.parse(JSON.stringify(levels));
    updatedLevels = updatedLevels.map((spots) =>
      spots.map((spot) =>
        spot.id === spotId ? { ...spot, occupied: false } : spot
      )
    );
    setLevels(updatedLevels);
    setMessage(
      `Spot ${spotId.split("-").pop()} on Level ${
        spotId.split("-")[0]
      } is now free`
    );
  };

  return (
    <div className=" flex flex-col items-center">
      <div className="w-full">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
          <label className="text-3xl font-medium text-gray-700">
            Select Vehicle Type:
          </label>
          <select
            value={vehicleType}
            onChange={(e) => setVehicleType(e.target.value)}
            className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 shadow-sm text-gray-800"
          >
            {SPOT_TYPES.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
          <button
            onClick={parkVehicle}
            className="bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg hover:bg-blue-700 transition-all duration-300 shadow-md transform hover:scale-105"
          >
            Park Vehicle
          </button>
        </div>

        {message && (
          <p className="text-center text-lg font-medium text-gray-600 my-4 p-3 bg-blue-50 rounded-lg shadow-inner border border-blue-200">
            {message}
          </p>
        )}

        <div className="grid grid-cols-1 gap-8">
          {levels.map((spots, lvlIndex) => (
            <div
              key={lvlIndex}
              className="bg-gray-50 p-6 rounded-xl shadow-lg border border-gray-200"
            >
              <h3 className="text-2xl font-bold text-gray-800 mb-4 text-center">
                Level {lvlIndex + 1}
              </h3>

              {/* Spots Container */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {spots.map((spot) => (
                  <div
                    key={spot.id}
                    className={`
                      p-4 rounded-lg flex flex-col items-center justify-center 
                      shadow-sm transition-all duration-300 transform hover:scale-105
                      ${
                        spot.occupied
                          ? "bg-red-200 text-red-800 border-red-300"
                          : "bg-green-200 text-green-800 border-green-300"
                      }
                    `}
                  >
                    <span className="text-4xl sm:text-4xl font-bold">
                      {spot.type}
                    </span>
                    <span className="text-xs sm:text-sm text-gray-600">
                      ID: {spot.id.split("-").pop()}
                    </span>
                    {spot.occupied && (
                      <button
                        onClick={() => freeSpot(spot.id)}
                        className="mt-2 text-xs bg-red-500 text-white font-semibold py-1 px-6 rounded-md hover:bg-red-600 transition-colors duration-300 shadow-sm cursor-pointer"
                      >
                        Free
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default SmartParking;
