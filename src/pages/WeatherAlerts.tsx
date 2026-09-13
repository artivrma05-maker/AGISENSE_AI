import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  CloudRain,
  Thermometer,
  Wind,
  Droplets,
  Bell,
} from "lucide-react";
import PageHeader from "@/components/PageHeader";
import { useLanguage } from "@/i18n/LanguageContext";

type WeatherData = {
  current: {
    temperature_2m: number;
    apparent_temperature: number;
    relative_humidity_2m: number;
    wind_speed_10m: number;
    weather_code: number;
  };
  daily: {
    time: string[];
    weather_code: number[];
    temperature_2m_max: number[];
    precipitation_probability_max: number[];
  };
};

type LocationData = {
  name: string;
  latitude: number;
  longitude: number;
};

const weatherDescription = (code: number) => {
  if (code === 0) return { text: "Clear Sky", icon: "☀️" };
  if (code <= 3) return { text: "Partly Cloudy", icon: "⛅" };
  if (code <= 48) return { text: "Cloudy", icon: "☁️" };
  if (code <= 67) return { text: "Rain", icon: "🌧️" };
  if (code <= 77) return { text: "Snow", icon: "❄️" };
  if (code <= 82) return { text: "Rain Showers", icon: "🌦️" };
  if (code <= 99) return { text: "Thunderstorm", icon: "⛈️" };

  return { text: "Unknown", icon: "🌤️" };
};

const getDayName = (date: string, index: number) => {
  if (index === 0) return "Today";
  if (index === 1) return "Tomorrow";

  return new Date(date).toLocaleDateString("en-IN", {
    weekday: "short",
  });
};
const getFarmingRecommendations = (weather: WeatherData) => {
  const recommendations: string[] = [];

  const todayTemp = weather.current.temperature_2m;
  const humidity = weather.current.relative_humidity_2m;
  const wind = weather.current.wind_speed_10m;
  const tomorrowRain =
    weather.daily.precipitation_probability_max[1];

  if (tomorrowRain >= 70) {
    recommendations.push(
      "🌧️ Heavy rain is likely tomorrow. Avoid irrigation and plan harvesting before rainfall."
    );
  } else if (tomorrowRain < 30) {
    recommendations.push(
      "🌱 Low rain probability tomorrow. Morning irrigation may be suitable if the soil is dry."
    );
  }

  if (todayTemp >= 35) {
    recommendations.push(
      "🌡️ High temperature detected. Provide adequate irrigation and avoid field work during peak afternoon hours."
    );
  }

  if (humidity >= 80) {
    recommendations.push(
      "💧 High humidity detected. Monitor crops for fungal diseases and avoid unnecessary leaf wetness."
    );
  }

  if (wind >= 25) {
    recommendations.push(
      "💨 Strong winds detected. Avoid spraying pesticides or fertilizers until wind conditions improve."
    );
  }

  if (recommendations.length === 0) {
    recommendations.push(
      "🌾 Weather conditions look relatively suitable for normal farm activities. Continue monitoring your crop and soil."
    );
  }

  return recommendations;
};
const getCropWeatherRisk = (weather: WeatherData) => {
  const risks: string[] = [];

  const temperature = weather.current.temperature_2m;
  const humidity = weather.current.relative_humidity_2m;
  const tomorrowRain =
    weather.daily.precipitation_probability_max[1];
  const upcomingRain =
    weather.daily.precipitation_probability_max[2];

  if (humidity >= 80 && (tomorrowRain >= 50 || upcomingRain >= 50)) {
    risks.push(
      "🍄 High fungal disease risk: High humidity combined with rain can increase fungal infections."
    );
  }

  if (temperature >= 35) {
    risks.push(
      "🔥 Heat stress risk: High temperature may affect crop growth. Maintain adequate soil moisture."
    );
  }

  if (tomorrowRain >= 70) {
    risks.push(
      "🌧️ Heavy rainfall risk: Avoid unnecessary irrigation and protect harvested crops from rain."
    );
  }

  if (risks.length === 0) {
    risks.push(
      "✅ Current weather conditions show no major crop-weather risk. Continue regular crop monitoring."
    );
  }

  return risks;
};

export default function WeatherAlerts() {
  const { t } = useLanguage();

  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [location, setLocation] = useState<LocationData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        setLoading(true);
        setError("");

        // Get farmer location from Profile
        const savedLocation =
          localStorage.getItem("farmerLocation") || "Lucknow, Uttar Pradesh";

        // Step 1: Convert location name into latitude/longitude
        const locationUrl =
          `https://geocoding-api.open-meteo.com/v1/search` +
          `?name=${encodeURIComponent(savedLocation)}` +
          `&count=1` +
          `&language=en` +
          `&format=json`;

        const locationResponse = await fetch(locationUrl);

        if (!locationResponse.ok) {
          throw new Error("Location search failed");
        }

        const locationData = await locationResponse.json();

        if (
          !locationData.results ||
          locationData.results.length === 0
        ) {
          throw new Error("Location not found");
        }

        const result = locationData.results[0];

        const farmerLocation: LocationData = {
          name: result.name,
          latitude: result.latitude,
          longitude: result.longitude,
        };

        setLocation(farmerLocation);

        // Step 2: Get weather using coordinates
        const weatherUrl =
          `https://api.open-meteo.com/v1/forecast` +
          `?latitude=${result.latitude}` +
          `&longitude=${result.longitude}` +
          `&current=temperature_2m,relative_humidity_2m,apparent_temperature,wind_speed_10m,weather_code` +
          `&daily=weather_code,temperature_2m_max,precipitation_probability_max` +
          `&timezone=Asia%2FKolkata` +
          `&forecast_days=5`;

        const weatherResponse = await fetch(weatherUrl);

        if (!weatherResponse.ok) {
          throw new Error("Weather data unavailable");
        }

        const data = await weatherResponse.json();

        setWeather(data);
      } catch (err) {
        console.error(err);
        setError(
          "Unable to load weather data. Please check your location."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, []);

  const alerts = weather
    ? [
        ...(weather.daily.precipitation_probability_max[2] >= 70
          ? [
              {
                type: "warning",
                msg:
                  "Heavy rain expected soon — plan harvesting and field work carefully.",
                icon: CloudRain,
              },
            ]
          : []),

        ...(weather.daily.precipitation_probability_max[1] < 40
          ? [
              {
                type: "info",
                msg:
                  "Lower rain probability tomorrow — suitable conditions for fertilizer application.",
                icon: Droplets,
              },
            ]
          : []),

        ...(weather.current.relative_humidity_2m >= 80
          ? [
              {
                type: "warning",
                msg:
                  "High humidity detected — monitor crops for fungal disease symptoms.",
                icon: Bell,
              },
            ]
          : []),
      ]
    : [];

  return (
    <div className="pb-24 max-w-lg mx-auto">
      <PageHeader
        title={t.weatherTitle}
        subtitle={t.weatherSubtitle}
      />

      <div className="px-4 space-y-4">

        {/* Current Weather */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="gradient-sky rounded-2xl p-5 text-sky-foreground shadow-elevated"
        >
          {loading ? (
            <p className="text-sm">Loading weather...</p>
          ) : error ? (
            <p className="text-sm">{error}</p>
          ) : weather ? (
            <>
              <p className="text-xs opacity-70 mb-1">
                {location?.name || "Your Location"}
              </p>

              <div className="flex items-center justify-between">
                <div>
                  <span className="text-4xl font-black">
                    {Math.round(
                      weather.current.temperature_2m
                    )}
                    °C
                  </span>

                  <p className="text-sm opacity-80 mt-1">
                    {
                      weatherDescription(
                        weather.current.weather_code
                      ).text
                    }
                  </p>
                </div>

                <div className="text-6xl">
                  {
                    weatherDescription(
                      weather.current.weather_code
                    ).icon
                  }
                </div>
              </div>

              <div className="flex gap-4 mt-4 text-xs flex-wrap">

                <span className="flex items-center gap-1">
                  <Thermometer className="w-3.5 h-3.5" />
                  {t.feels}{" "}
                  {Math.round(
                    weather.current.apparent_temperature
                  )}
                  °C
                </span>

                <span className="flex items-center gap-1">
                  <Wind className="w-3.5 h-3.5" />
                  {Math.round(
                    weather.current.wind_speed_10m
                  )}{" "}
                  km/h
                </span>

                <span className="flex items-center gap-1">
                  <Droplets className="w-3.5 h-3.5" />
                  {Math.round(
                    weather.current.relative_humidity_2m
                  )}
                  %
                </span>

              </div>
            </>
          ) : null}
        </motion.div>

        {/* Weather Alerts */}
        {!loading &&
          weather &&
          alerts.length > 0 && (
            <>
              {alerts.map((a, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className={`rounded-2xl p-3.5 flex items-start gap-3 ${
                    a.type === "warning"
                      ? "bg-warning/15 border border-warning/30"
                      : "bg-primary/10 border border-primary/20"
                  }`}
                >
                  <Bell
                    className={`w-5 h-5 mt-0.5 flex-shrink-0 ${
                      a.type === "warning"
                        ? "text-warning"
                        : "text-primary"
                    }`}
                  />

                  <p className="text-sm font-medium text-foreground">
                    {a.msg}
                  </p>
                </motion.div>
              ))}
            </>
          )}

        {/* 5 Day Forecast */}
        <div className="bg-card rounded-2xl p-4 shadow-card">
          <h3 className="font-bold text-sm mb-3">
            {t.fiveDayForecast}
          </h3>

          {loading ? (
            <p className="text-sm text-muted-foreground">
              Loading forecast...
            </p>
          ) : weather ? (
            <div className="space-y-2.5">
              {weather.daily.time.map((date, i) => {
                const description = weatherDescription(
                  weather.daily.weather_code[i]
                );

                return (
                  <div
                    key={date}
                    className="flex items-center justify-between text-sm"
                  >
                    <span className="w-16 font-semibold text-foreground">
                      {getDayName(date, i)}
                    </span>

                    <span className="text-xl">
                      {description.icon}
                    </span>

                    <span className="font-bold text-foreground">
                      {Math.round(
                        weather.daily.temperature_2m_max[i]
                      )}
                      °C
                    </span>

                    <span className="text-xs text-muted-foreground flex items-center gap-1">
                      <Droplets className="w-3 h-3" />
                      {
                        weather.daily
                          .precipitation_probability_max[i]
                      }
                      %
                    </span>
                  </div>
                );
              })}
            </div>
          ) : null}
        </div>
        {/* Smart Farming Recommendations */}
{!loading && weather && (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    className="bg-card rounded-2xl p-4 shadow-card"
  >
    <div className="flex items-center gap-2 mb-3">
      <span className="text-xl">🌾</span>

      <h3 className="font-bold text-sm">
        Smart Farming Recommendations
      </h3>
    </div>

    <div className="space-y-2">
      {getFarmingRecommendations(weather).map(
        (recommendation, index) => (
          <div
            key={index}
            className="rounded-xl bg-primary/5 border border-primary/10 p-3"
          >
            <p className="text-sm text-foreground leading-relaxed">
              {recommendation}
            </p>
          </div>
        )
      )}
    </div>
  </motion.div>
)}
{/* Weather-Based Crop Risk */}
{!loading && weather && (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    className="bg-card rounded-2xl p-4 shadow-card"
  >
    <div className="flex items-center gap-2 mb-3">
      <span className="text-xl">🌱</span>

      <h3 className="font-bold text-sm">
        Weather-Based Crop Risk
      </h3>
    </div>

    <div className="space-y-2">
      {getCropWeatherRisk(weather).map((risk, index) => (
        <div
          key={index}
          className="rounded-xl bg-warning/10 border border-warning/20 p-3"
        >
          <p className="text-sm text-foreground leading-relaxed">
            {risk}
          </p>
        </div>
      ))}
    </div>

    <p className="text-xs text-muted-foreground mt-3">
      Risk is estimated from current temperature, humidity and rainfall forecast.
    </p>
  </motion.div>
)}

      </div>
    </div>
  );
}