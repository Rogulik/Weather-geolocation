import { ForecastProvider } from "../context/forecast"
import "../styles/globals.css"

function MyApp({ Component, pageProps }) {
  return (
    <ForecastProvider>
      <Component {...pageProps} />
    </ForecastProvider>
  )
}

export default MyApp
