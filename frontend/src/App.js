import React, { useState } from "react";
import axios from "axios";
import SearchBar from "./components/SearchBar";
import WeatherCard from "./components/WeatherCard";
import "./App.css";

const App = () => {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchWeather = async (city) => {
    setLoading(true);
    setError("");
    setWeather(null);

    try {
      const res = await axios.get(`https://weather-app-7k04.onrender.com/weather?city=${city}`);
      setWeather(res.data);
    } catch (err) {
      setError("Could not fetch weather data. Try a valid city.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <h1>Weather DashBoard</h1>
      <SearchBar onSearch={fetchWeather} />
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {weather && <WeatherCard data={weather} />}
    </div>
  );
};

export default App;
