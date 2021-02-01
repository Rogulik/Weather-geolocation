import React, { useContext } from "react"
import { useForecastState } from "../context/forecast"

const Forecast = () => {
  const { forecast, isLoading, error } = useForecastState()

  if (isLoading) {
    return <div className="mt-4 text-3xl text-center">Loading...</div>
  }

  if (forecast) {
    return (
      <div className="mt-4 text-center">
        <img
          src={`http://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png`}
          alt="weather icon"
          className="mx-auto w-14 "
        />
        <p className="text-2xl font-extrabold">{forecast.name}</p>
        <p className="text-xl ">{forecast.weather[0].description}</p>
        <p className="text-xl">avg temp: {forecast.main.temp}</p>
        <p className="text-xl">fells like: {forecast.main.feels_like}</p>
        <p className="text-xl">min temp: {forecast.main.temp_min}</p>
        <p className="text-xl">max temp: {forecast.main.temp_max}</p>
      </div>
    )
  }

  if (error) {
    return <div>{error.message}</div>
  }

  return <></>
}

export default Forecast
