import { createContext, useContext, useReducer } from "react"
import { State } from "../types"

interface Action {
  type: string
  payload: any
}

export const StateContext = createContext<State>({
  forecast: null,
  error: null,
  isLoading: null,
})

const DispatchContext = createContext(null)

const reducer = (state: State, { type, payload }: Action) => {
  switch (type) {
    case "WEATHER_IS_LOADING":
      return {
        ...state,
        isLoading: true,
      }
    case "GET_WEATHER_BY_LOCATION":
      return {
        ...state,
        forecast: payload,
        isLoading: false,
      }
    case "GET_WEATHER_BY_CITY_NAME":
      return {
        ...state,
        forecast: payload,
        isLoading: false,
      }
    case "WEATHER_ERROR":
      return {
        forecast: null,
        error: payload,
        isLoading: false,
      }
    default:
      throw new Error("Something went wrong")
  }
}

export const ForecastProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const [state, dispatch] = useReducer(reducer, {
    forecast: null,
    error: null,
    isLoading: null,
  })
  return (
    <DispatchContext.Provider value={dispatch}>
      <StateContext.Provider value={state}>{children}</StateContext.Provider>
    </DispatchContext.Provider>
  )
}

export const useForecastState = () => useContext(StateContext)
export const useForecastDispatch = () => useContext(DispatchContext)
