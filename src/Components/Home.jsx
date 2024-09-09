// import { IoSearchCircleOutline } from "react-icons/io5";
import { FaSearchLocation } from "react-icons/fa";

import humidity from "../assets/weather-app-img/images/humidity.png";
import wind from "../assets/weather-app-img/images/wind.png";
import { useNewcontext } from "../Storage/ContextApi";
import { useEffect, useState } from "react";

import rain from "../assets/weather-app-img/images/clouds.png";
import clear from "../assets/weather-app-img/images/clear.png";
import clouds from "../assets/weather-app-img/images/clouds.png";
import mist from "../assets/weather-app-img/images/mist.png";
import snow from "../assets/weather-app-img/images/snow.png";
import drizzle from "../assets/weather-app-img/images/drizzle.png";

const Home = () => {
  const weatherImages = {
    Rain: rain,
    Clear: clear,
    Clouds: clouds,
    Snow: snow,
    Haze: mist,
    Drizzle: drizzle,
  };

  const { weatherData, checkWeather, error } = useNewcontext();
  const [searchCity, setsearchCity] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchCity) {
      checkWeather(searchCity);
    }
    setsearchCity("");
  };

  const handleEnterClick = (e) => {
    if (e.key === "Enter") {
      handleSearch(e);
    }
  };
  useEffect(() => {
    checkWeather();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const weatherCondition = weatherData?.weather[0].main;
  const correctImage = weatherImages[weatherCondition];
  return (
    <div className="rounded-md py-5 bg-gray-900">
      <div className="text-center text-white text-3xl font-bold mb-3">
        ClimeScanner
      </div>
      <div className="flex flex-col items-center px-2 py-6 rounded-md mx-auto w-[320px] md:w-[410px] bg-slate-500">
        <div className="flex gap-3 ">
          <input
            className="md:w-[250px] w-[210px] px-2 py-1 rounded-lg text-black"
            type="text"
            placeholder="Enter A city name"
            onChange={(e) => setsearchCity(e.target.value)}
            value={searchCity}
            onKeyDown={handleEnterClick}
          />
          <button
            onClick={handleSearch}
            className="hover:text-white text-gray-200"
          >
            <FaSearchLocation className="w-[28px] h-[28px] " />
          </button>
        </div>
        <div className="flex text-white flex-col items-center">
          {error ? (
            <p className="text-2xl mt-2 font-semibold">{error}</p>
          ) : weatherData ? (
            <>
              <img
                src={correctImage}
                className="w-[200px] md:w-[280px] h-[200px] md:h-[225px]"
                alt="Weather Icon"
              />
              <h1 className="font-semibold text-5xl">
                {Math.round(weatherData.main.temp)}°C
              </h1>
              <h2 className="text-2xl font-semibold mb-2 mt-2">
                {weatherData.name}
              </h2>
              <div className="flex font-semibold items-center justify-center gap-7 mt-6">
                <div className="flex gap-2">
                  <img
                    className="w-10 h-11"
                    src={humidity}
                    alt="Humidity Icon"
                  />
                  <div>
                    <h2>{weatherData.main.humidity}%</h2>
                    <h2>Humidity</h2>
                  </div>
                </div>
                <div className="flex gap-2">
                  <img className="mb-1 h-11 w-10" src={wind} alt="Wind Icon" />
                  <div>
                    <h2>{weatherData.wind.speed} km/h</h2>
                    <h2>Wind Speed</h2>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <p className="text-2xl font-semibold">Loading...</p> //showing this while data is being
          )}
        </div>
      </div>
      <div className="text-white text-xl font-semibold text-center mt-2">
        Check Weather Now. Stay informed
      </div>
    </div>
  );
};

export default Home;
