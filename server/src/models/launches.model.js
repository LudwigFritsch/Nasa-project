const launches = require("./launches.mongo");

const launchesMap = new Map();

const launch = {
  flightNumber: 100,
  mission: "Kepler exploration X",
  rocket: "Explorer IS1",
  launchDate: new Date("December 27, 2030"),
  target: "Kepler-442 b",
  customers: ["NASA", "ESA"],
  upcoming: true,
  success: true,
};

saveLaunch(launch);

function existsLaunchWithId(launchId) {
  return launchesMap.has(launchId);
}

function getAllLaunches() {
  return Array.from(launchesMap.values());
}

async function saveLaunch(launch) {
  await launches.updateOne(
    {
      flightNumber: launch.flightNumber,
    },
    launch,
    { upsert: true }
  );
}

function addNewLaunch(launch) {
  const flightNumber = getNextFlightNumber();

  launchesMap.set(
    flightNumber,
    Object.assign(launch, {
      success: true,
      upcoming: true,
      customers: ["NASA"],
      flightNumber,
    })
  );
}

function getNextFlightNumber() {
  const launchesArray = Array.from(launchesMap.values());
  const nextFlightNumber = Math.max(
    ...launchesArray.map((o) => o.flightNumber + 1)
  );
  return nextFlightNumber;
}

function abortLaunchById(launchId) {
  const aborted = launchesMap.get(launchId);
  aborted.upcoming = false;
  aborted.success = false;
  return aborted;
}

module.exports = {
  existsLaunchWithId,
  getAllLaunches,
  addNewLaunch,
  abortLaunchById,
};
