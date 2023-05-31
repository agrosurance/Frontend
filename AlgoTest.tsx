import axios from "axios";

interface Land {
  location: {
    latitude: number;
    longitude: number;
  };
  area: number;
  crop: {
    id: number;
    name: string;
  };
}

const OPENWEATHER_API_KEY = "83db90835eb7287ed3a1ec686c639256";

function generateNumberRange(
  start: number,
  end: number,
  count: number
): number[] {
  const step = (end - start) / (count - 1);
  const result: number[] = [];

  for (let i = 0; i < count; i++) {
    const num = start + i * step;
    result.push(num);
  }

  return result;
}

function convertUnixToDateFormat(timestamp: number): string {
  const date = new Date(timestamp);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

async function getScore(land: Land) {
  const;
  const weatherData = (
    await axios.get(
      `http://api.weatherapi.com/v1/history.json?key=d518e09e86ce4beeb5e145103233105&q=18.990713,73.116844&dt=${convertUnixToDateFormat()}`
    )
  ).data;

  console.log(weatherData);

  return 90;
}

const land: Land = {
  location: {
    latitude: 31.1471,
    longitude: 75.3412,
  },
  area: 100,
  crop: {
    id: 10,
    name: "rice",
  },
};

async function main() {
  console.log(
    `The score for this land at ${land.location.latitude}° N, ${
      land.location.longitude
    }° E growing ${land.crop.name} is ${await getScore(land)}`
  );
}

main();

console.log();

// Humidity, Avg. Temperature, Avg. Max Temp, Soil Type, Rain
