import { createContext, useContext, useState } from "react";

const newContext = createContext();
const apiKey = "50259d838e4c6bb4960ff16aa17d386c";
const apiURL =
  "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

// eslint-disable-next-line react/prop-types
export const ValueProvider = ({ children }) => {
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);

  async function checkWeather(city = "dhaka") {
    try {
      const response = await fetch(apiURL + `${city}+&appid=${apiKey}`);
      if (!response.ok) {
        throw new Error("City Not Found");
      }
      const data = await response.json();

      console.log(data);
      setWeatherData(data);
      setError(null);
    } catch (error) {
      setWeatherData(null);
      setError(error.message);
      // console.log(error.message);
    }
  }

  return (
    <newContext.Provider value={{ weatherData, checkWeather, error }}>
      {children}
    </newContext.Provider>
  );
};
// eslint-disable-next-line react-refresh/only-export-components
export const useNewcontext = () => {
  return useContext(newContext);
};
