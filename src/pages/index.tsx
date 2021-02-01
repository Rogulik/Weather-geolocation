import Head from "next/head"
import Forecast from "../components/Forecast"
import Input from "../components/Input"

export default function Home() {
  return (
    <>
      <Head>
        <title>Weather app</title>
      </Head>
      <main className="flex flex-col items-center justify-center mt-10 justify-items-center">
        <header className="px-4 py-3 text-center">
          <h1 className="text-4xl font-bold text-pink-200">
            Current weather foreacast
          </h1>
          <span className="block w-1/2 mx-auto text-xl">
            Get the weather forecast by typing in the name of the city or click
            on 'get location' button to check the weather by Your location data.
          </span>
        </header>
        <Input />
        <Forecast />
      </main>
    </>
  )
}
