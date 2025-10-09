import React, { useEffect, useState } from 'react';


const Weather = () => {
  const [city, setCity] = useState("");
  const [season, setSeason] = useState("");
  const [weatherDetails, setWeatherDetails] = useState([]);
  const [currentTime, setCurrentTime] = useState("");
  const [uv, setUv] = useState(null);
  const [today, setToday] = useState(null);

  const API_KEY_OPENWEATHER = "a5e0a66950c6c4887b9779c628700760";
  const API_KEY_TOMORROW = "RcTXUWomTGYmnIgOGA6XoA73Hf45GcE5";

  const handleCity = (e) => setCity(e.target.value);

  const getLocalTime = (timezone) => {
    const utc = Date.now() + new Date().getTimezoneOffset() * 60000;
    const local = new Date(utc + timezone * 1000);
    return local.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  const getSeason = (lat, timezone) => {
    const now = new Date();
    const utc = now.getTime() + now.getTimezoneOffset() * 60000;
    const localTime = new Date(utc + timezone * 1000);
    const month = localTime.getMonth() + 1;

    if (lat >= 0) {
      if ([12, 1, 2].includes(month)) return "❄️ Winter";
      if ([3, 4, 5].includes(month)) return "🌸 Spring";
      if ([6, 7, 8].includes(month)) return "☀️ Summer";
      return "🍂 Autumn";
    } else {
      if ([12, 1, 2].includes(month)) return "☀️ Summer";
      if ([3, 4, 5].includes(month)) return "🍂 Autumn";
      if ([6, 7, 8].includes(month)) return "❄️ Winter";
      return "🌸 Spring";
    }
  };

  // --- Skincare Recommendation Functions ---
  const getSunscreen = (uv, temp) => {
    if (uv === null) return "Loading...";
    if (uv < 3) return "🌥️ Low UV – SPF 15 is fine if outdoors.";
    if (uv < 6) return "☀️ Moderate UV – SPF 30, reapply every 3–4 hours.";
    if (uv < 8) return "🔥 High UV – SPF 50+, reapply every 2 hours.";
    if (uv < 11) return "⚠️ Very High UV – SPF 50+, sunglasses, hat, shade.";
    return "🚫 Extreme UV – Avoid direct sun if possible.";
  };

  const getMoisturizer = (humidity) => {
    if (humidity === undefined) return "Loading...";
    if (humidity < 30) return "🌵 Dry air – Use hydrating cream-based moisturizer.";
    if (humidity < 60) return "😊 Normal humidity – Lightweight lotion works well.";
    return "💦 Humid weather – Use gel-based or oil-free moisturizer.";
  };

  const getSerum = (season, temp) => {
    if (!season || temp === null) return "Loading...";
    if (season.includes("Winter")) return "❄️ Winter – Hyaluronic acid serum for hydration.";
    if (season.includes("Summer") || temp > 32)
      return "☀️ Summer – Vitamin C serum for UV protection.";
    if (season.includes("Autumn")) return "🍂 Autumn – Niacinamide serum to repair barrier.";
    return "🌸 Spring – Antioxidant serum for fresh skin.";
  };

  const getSkinFood = (uv, season) => {
    if (uv === null) return "Loading...";
    if (uv < 3) return "🥛 Add more fruits & veggies.";
    if (uv < 6) return "🍊 Add citrus fruits (Vitamin C) for glow.";
    if (uv < 8) return "🍉 Hydrating fruits (watermelon, cucumber) + Omega-3.";
    if (uv < 11) return "🥦 Leafy greens + antioxidants (berries, green tea).";
    return "🥥 Coconut water, aloe juice & antioxidants to fight skin damage.";
  };

  const getClothing = (uv, temp) => {
    if (uv === null || temp === null) return "Loading...";
    if (uv < 3) return "👕 Normal clothes, but wear cotton for breathability.";
    if (uv < 6) return "🧢 Add sunglasses & hat, avoid tight clothes.";
    if (uv < 8) return "👗 Light long-sleeves, hat & breathable fabrics.";
    if (uv < 11) return "🧥 Full UV-blocking clothing, wide-brim hat.";
    return "🚫 Stay indoors if possible, max protection required.";
  };

  const handleSearch = () => {
    if (!city) return;

    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY_OPENWEATHER}&units=metric`
    )
      .then((res) => res.json())
      .then((data) => {
        setWeatherDetails(data);
        if (data.coord && data.timezone) {
          setCurrentTime(getLocalTime(data.timezone));
          setSeason(getSeason(data.coord.lat, data.timezone));

          fetch(
            `https://api.tomorrow.io/v4/weather/forecast?location=${data.coord.lat},${data.coord.lon}&timesteps=1h&apikey=${API_KEY_TOMORROW}`
          )
            .then((res1) => res1.json())
            .then((data1) => {
              setToday(data1);
              const uvIndex = data1.timelines?.hourly?.[0]?.values?.uvIndex;
              setUv(uvIndex);
            });
        }
      });
  };

  useEffect(() => {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=chennai&appid=${API_KEY_OPENWEATHER}&units=metric`
    )
      .then((res) => res.json())
      .then((data) => setWeatherDetails(data));
  }, []);

  return (
    <div className="relative h-[400px] w-full rounded overflow-hidden">
      {/* Video Background */}
      {/* <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source type="video/mp4" />
      </video> */}

    
      <div className="absolute inset-0 bg-black/40"></div>

    
      <div className="relative z-10 p-4">
     
        <div className="text-white flex flex-col sm:flex-row justify-between border border-white/20 rounded-2xl px-4 py-2 w-11/12 sm:w-4/5  mx-auto gap-2 sm:gap-0">
          <input
            onChange={handleCity}
            value={city}
            placeholder="Wanna go new City"
            className="bg-transparent outline-none border-none text-white placeholder-gray-300 w-full"
          />
          <button
            onClick={handleSearch}
            className="bg-white px-3 py-2 rounded-xl text-black font-semibold text-sm md:text-lg"
          >
            Search
          </button>
        </div>
        <p className="text-white px-4 mt-2 hidden sm:block md:block text-2xl text-center font-bold">
          {weatherDetails.name}
        </p>

        {/* Weather Info */}
        <div className="bg-white/30 sm:mt-2 mt-1 py-4 mx-auto rounded-2xl p-4 w-11/12 sm:w-4/5 flex flex-col gap-1 sm:gap-4 shadow-2xl">
        <div className='flex items-center justify-between px-4'>
        <p className='text-white text-sm sm:text-xl font-bold p-1'>Skincare Recomendation based on weather</p>
          <p className="text-white text-sm sm:text-2xl text-center font-semibold ">{currentTime}</p>
</div>
          <div className="flex justify-around items-center text-white">
            <p className="text-lg sm:text-4xl">
              {today?.timelines?.hourly?.[0]?.values?.temperature
                ? `${Math.round(today.timelines.hourly[0].values.temperature)}°C`
                : "35°C"}
            </p>
            <p className="capitalize font-semibold text-sm sm:text-xl">{weatherDetails.weather?.[0]?.description}</p>
            <p className='font-semibold text-sm md:text-xl'>{season}</p>
          </div>

          {/* Skincare Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-1 sm:gap-4 text-white w-fit">
            <div className="bg-white/20 p-4 rounded-xl">
              <h2 className="font-semibold text-sm md:text-xl ">Sunscreen</h2>
              <p className='text-sm md:text'>{getSunscreen(uv)}</p>
            </div>
            <div className="bg-white/20 p-4 rounded-xl w-fit">
              <h2 className="font-semibold text-sm md:text-xl">Moisturizer</h2>
              <p className='text-sm md:text' >{getMoisturizer(weatherDetails.main?.humidity)}</p>
            </div>
            <div className="bg-white/20 p-4 rounded-xl hidden sm:block ">
              <h2 className="font-semibold text-sm md:text-xl w-fit">Serum</h2>
              <p className='text-sm md:text'>{getSerum(season, today?.timelines?.hourly?.[0]?.values?.temperature)}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Weather;


