import axios from "axios"
import React, { useContext, useEffect, useState } from "react"
import { useForecastDispatch } from "../context/forecast"

const Input: React.FC = () => {
  const [city, setCity] = useState<string>("")
  const dispatch = useForecastDispatch()

  //usually I will save this in .env file, but for assignment purposes will stay here
  const keyAPI = "30bb7ce7b1bdbae74c400dc652fc6c9f"

  //promise syntax
  const successCallback = ({ coords: { latitude, longitude } }) => {
    dispatch({ type: "WEATHER_IS_LOADING" })
    axios
      .get(
        `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${keyAPI}&units=metric`
      )
      .then((res) => {
        dispatch({ type: "GET_WEATHER_BY_LOCATION", payload: res.data })
      })
      .catch(() => {
        dispatch({
          type: "WEATHER_ERROR",
          payload: {
            type: "Server error",
            message: "Something went wrong, please try again later",
          },
        })
      })
  }
  const errorCallback = () => {
    dispatch({
      type: "WEATHER_ERROR",
      payload: {
        type: "Unauthorized",
        message:
          "Opps couldn't get Your location to display the forecast, please type in the name of the city You want to see forecast for.",
      },
    })
  }

  const callGeolocation = () => {
    return navigator.geolocation.getCurrentPosition(
      successCallback,
      errorCallback
    )
  }

  //async await syntax
  const onSubmit = async (e) => {
    e.preventDefault()
    try {
      dispatch({ type: "WEATHER_IS_LOADING" })
      const res = await axios.get(
        `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${keyAPI}&units=metric`
      )
      dispatch({ type: "GET_WEATHER_BY_CITY_NAME", payload: res.data })
      setCity("")
    } catch (err) {
      dispatch({
        type: "WEATHER_ERROR",
        payload: { type: "Not found", message: "City not found" },
      })
      setCity("")
    }
  }
  return (
    <form onSubmit={onSubmit} className="flex flex-col mt-4">
      <button
        type="button"
        className="h-10 px-1 m-0 bg-pink-400 hover:bg-pink-500"
        onClick={() => callGeolocation()}
      >
        Get location
      </button>
      <span className="my-4 text-center">Or</span>
      <div className="flex justify-center">
        <input
          placeholder="city name"
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          required
          className="p-1 mr-1 text-2xl text-red-400 focus:outline-white"
        />

        <button
          type="submit"
          className="h-10 px-1 m-0 bg-pink-400 hover:bg-pink-500"
        >
          Search
        </button>
      </div>
    </form>
  )
}

export default Input
