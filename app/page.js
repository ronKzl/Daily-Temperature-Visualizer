"use client";

import React, { useState, useEffect } from "react";
import DayWeather from "./components/DayWeather";
import CalculateNextWarmDay from "./components/CalculateNextWarmDay";
export default function Page() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch( //use the key its going to expire anyway and has 0 premissions to the weather api - irl data would come from server
        "https://api.weatherapi.com/v1/forecast.json?key=fd22211bfd714f6c896200608240711&q=Los Angeles&days=10&aqi=no&alerts=no"
      );
      if (!response.ok) {
        throw new Error(`HTTPS error! status: ${response.status}`);
      }
      const result = await response.json();

      let localData = [];
      for (let day of result.forecast.forecastday) {
        localData.push({ date: day.date, temp: day.day.avgtemp_c });
      }
      // Update the state with the final localData array
      setData(localData); 
    };

    fetchData().catch((e) => {
      // handle the error as needed
      console.error("An error occurred while fetching the data: ", e);
    });
  }, []);

  return (
    <div className="text-xl items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <h1 className="text-7xl pb-20">California Temperature Forecast for Next 10 Days</h1>
      <main className="pb-64 flex flex-row gap-8 row-start-2 items-center sm:items-start">
        {data.map(day => (<DayWeather key={day.date} date={day.date} temp={day.temp}></DayWeather>))}
      </main>
      {data.length > 0 && <CalculateNextWarmDay data={data.map(day => day.temp)} />}
    </div>
  );
}
