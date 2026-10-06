/**
 * IFMAP / AgroMarket
 * Live Weather Widget Controller
 *
 * Weather source:
 * Open-Meteo
 *
 * Flow:
 * District → Geocoding → Latitude/Longitude → Live Weather
 */

const WEATHER_REFRESH_INTERVAL = 15 * 60 * 1000; // 15 minutes

// ------------------------------------------------------------
// Weather code → readable condition
// ------------------------------------------------------------
function getWeatherCondition(code) {

    const conditions = {
        0: "Clear Sky",
        1: "Mainly Clear",
        2: "Partly Cloudy",
        3: "Overcast",

        45: "Foggy",
        48: "Depositing Rime Fog",

        51: "Light Drizzle",
        53: "Moderate Drizzle",
        55: "Dense Drizzle",

        56: "Light Freezing Drizzle",
        57: "Dense Freezing Drizzle",

        61: "Slight Rain",
        63: "Moderate Rain",
        65: "Heavy Rain",

        66: "Light Freezing Rain",
        67: "Heavy Freezing Rain",

        71: "Slight Snow",
        73: "Moderate Snow",
        75: "Heavy Snow",

        77: "Snow Grains",

        80: "Slight Rain Showers",
        81: "Moderate Rain Showers",
        82: "Violent Rain Showers",

        85: "Slight Snow Showers",
        86: "Heavy Snow Showers",

        95: "Thunderstorm",
        96: "Thunderstorm with Hail",
        99: "Thunderstorm with Heavy Hail"
    };

    return conditions[code] || "Unknown Weather";
}


// ------------------------------------------------------------
// Weather icon
// ------------------------------------------------------------
function getWeatherIcon(code) {

    if (code === 0) return "☀️";

    if ([1, 2].includes(code)) return "🌤️";

    if (code === 3) return "☁️";

    if ([45, 48].includes(code)) return "🌫️";

    if ([51, 53, 55, 56, 57].includes(code)) return "🌦️";

    if ([61, 63, 65, 66, 67].includes(code)) return "🌧️";

    if ([71, 73, 75, 77, 85, 86].includes(code)) return "❄️";

    if ([80, 81, 82].includes(code)) return "🌦️";

    if ([95, 96, 99].includes(code)) return "⛈️";

    return "🌤️";
}


// ------------------------------------------------------------
// Agricultural advisory based on current weather
// ------------------------------------------------------------
function getAgriculturalAdvisory(weather) {

    const temperature = weather.temperature;
    const humidity = weather.humidity;
    const rain = weather.rain;
    const weatherCode = weather.weatherCode;

    // Heavy rain
    if (rain > 10 || [65, 82, 95, 96, 99].includes(weatherCode)) {
        return "Heavy rainfall is expected. Avoid unnecessary irrigation and protect crops from excess water.";
    }

    // Rain
    if (rain > 0 || [51, 53, 55, 61, 63, 80, 81].includes(weatherCode)) {
        return "Rain is possible. Consider delaying irrigation and protect harvested crops from moisture.";
    }

    // High temperature
    if (temperature >= 35) {
        return "High temperature detected. Provide adequate irrigation and monitor crops for heat stress.";
    }

    // High humidity
    if (humidity >= 80) {
        return "High humidity detected. Monitor crops for fungal diseases and maintain proper field ventilation.";
    }

    // Low temperature
    if (temperature <= 15) {
        return "Cool conditions detected. Monitor temperature-sensitive crops and protect them if necessary.";
    }

    return "Weather conditions are generally suitable for normal agricultural activities. Continue regular crop monitoring.";
}


// ------------------------------------------------------------
// Escape HTML
// ------------------------------------------------------------
function escapeWeatherHtml(value) {

    if (value === null || value === undefined) {
        return "";
    }

    return String(value)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}


// ------------------------------------------------------------
// Get district coordinates using Open-Meteo Geocoding API
// ------------------------------------------------------------
async function getDistrictCoordinates(district) {

    const locationName = `${district}, Tamil Nadu, India`;

    const url =
        `https://geocoding-api.open-meteo.com/v1/search` +
        `?name=${encodeURIComponent(locationName)}` +
        `&count=1` +
        `&language=en` +
        `&format=json`;

    const response = await fetch(url);

    if (!response.ok) {
        throw new Error("Unable to find district location");
    }

    const data = await response.json();

    if (!data.results || data.results.length === 0) {

        // Try district name alone if full search fails
        const fallbackUrl =
            `https://geocoding-api.open-meteo.com/v1/search` +
            `?name=${encodeURIComponent(district)}` +
            `&count=1` +
            `&language=en` +
            `&format=json`;

        const fallbackResponse = await fetch(fallbackUrl);

        if (!fallbackResponse.ok) {
            throw new Error("District location not found");
        }

        const fallbackData = await fallbackResponse.json();

        if (!fallbackData.results || fallbackData.results.length === 0) {
            throw new Error(`Location not found for ${district}`);
        }

        return fallbackData.results[0];
    }

    return data.results[0];
}


// ------------------------------------------------------------
// Get live weather from Open-Meteo
// ------------------------------------------------------------
async function getLiveWeather(latitude, longitude) {

    const url =
        `https://api.open-meteo.com/v1/forecast` +
        `?latitude=${latitude}` +
        `&longitude=${longitude}` +
        `&current=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,rain,weather_code,wind_speed_10m` +
        `&daily=temperature_2m_max,temperature_2m_min,precipitation_probability_max` +
        `&timezone=auto` +
        `&forecast_days=1`;

    const response = await fetch(url);

    if (!response.ok) {
        throw new Error("Weather API request failed");
    }

    return await response.json();
}


// ------------------------------------------------------------
// Render weather widget
// ------------------------------------------------------------
function renderWeatherWidget(container, location, weatherData) {

    const current = weatherData.current;
    const daily = weatherData.daily;

    const weatherCode = current.weather_code;

    const temperature = Math.round(current.temperature_2m);
    const feelsLike = Math.round(current.apparent_temperature);
    const humidity = Math.round(current.relative_humidity_2m);
    const windSpeed = Math.round(current.wind_speed_10m);
    const rain = Number(current.rain || 0);

    const maxTemp = Math.round(daily.temperature_2m_max[0]);
    const minTemp = Math.round(daily.temperature_2m_min[0]);

    const rainProbability =
        daily.precipitation_probability_max &&
        daily.precipitation_probability_max[0] !== null
            ? daily.precipitation_probability_max[0]
            : 0;

    const condition = getWeatherCondition(weatherCode);
    const icon = getWeatherIcon(weatherCode);

    const advisory = getAgriculturalAdvisory({
        temperature,
        humidity,
        rain,
        weatherCode
    });

    const updatedTime = new Date(current.time);

    const formattedTime = updatedTime.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit"
    });

    container.innerHTML = `
        <div class="weather-card">

            <div class="weather-header">

                <div>
                    <div class="weather-location">
                        📍 ${escapeWeatherHtml(
                            location.name || location.admin1 || "Location"
                        )}
                    </div>

                    <div class="weather-date">
                        Live weather • Updated ${formattedTime}
                    </div>
                </div>

                <span style="
                    background:rgba(255,255,255,0.2);
                    padding:0.25rem 0.65rem;
                    border-radius:12px;
                    font-size:0.8rem;
                    font-weight:700;
                ">
                    🌧️ Rain ${rainProbability}%
                </span>

            </div>


            <div class="weather-main">

                <div class="weather-temp">
                    ${temperature}°C
                </div>

                <div class="weather-condition">

                    <div style="font-size:1.1rem;">
                        ${icon} ${escapeWeatherHtml(condition)}
                    </div>

                    <div style="
                        font-size:0.825rem;
                        opacity:0.85;
                    ">
                        Feels like ${feelsLike}°C
                    </div>

                    <div style="
                        font-size:0.825rem;
                        opacity:0.85;
                    ">
                        💨 Wind: ${windSpeed} km/h
                    </div>

                    <div style="
                        font-size:0.825rem;
                        opacity:0.85;
                    ">
                        💧 Humidity: ${humidity}%
                    </div>

                </div>

            </div>


            <div style="
                display:flex;
                gap:10px;
                flex-wrap:wrap;
                margin:15px 0;
            ">

                <div style="
                    background:rgba(255,255,255,0.15);
                    padding:8px 12px;
                    border-radius:10px;
                    font-size:0.85rem;
                ">
                    🌡️ High: ${maxTemp}°C
                </div>

                <div style="
                    background:rgba(255,255,255,0.15);
                    padding:8px 12px;
                    border-radius:10px;
                    font-size:0.85rem;
                ">
                    ❄️ Low: ${minTemp}°C
                </div>

                <div style="
                    background:rgba(255,255,255,0.15);
                    padding:8px 12px;
                    border-radius:10px;
                    font-size:0.85rem;
                ">
                    🌧️ Rain: ${rain} mm
                </div>

            </div>


            <div class="weather-advisory-box">

                <strong>🌾 Agricultural Advisory:</strong>

                <span>
                    ${escapeWeatherHtml(advisory)}
                </span>

            </div>

        </div>
    `;
}


// ------------------------------------------------------------
// Main weather function
// ------------------------------------------------------------
async function loadWeatherWidget(containerId, district) {

    const container = document.getElementById(containerId);

    if (!container) {
        console.warn(`Weather container not found: ${containerId}`);
        return;
    }

    const selectedDistrict =
        district && district.trim()
            ? district.trim()
            : "Erode";


    // Loading state
    container.innerHTML = `
        <div class="weather-card">

            <div style="
                text-align:center;
                padding:30px;
            ">
                🌦️ Loading live weather...
            </div>

        </div>
    `;


    try {

        // ----------------------------------------------------
        // 1. Find district coordinates
        // ----------------------------------------------------
        const location =
            await getDistrictCoordinates(selectedDistrict);


        // ----------------------------------------------------
        // 2. Get live weather
        // ----------------------------------------------------
        const weatherData =
            await getLiveWeather(
                location.latitude,
                location.longitude
            );


        // ----------------------------------------------------
        // 3. Display weather
        // ----------------------------------------------------
        renderWeatherWidget(
            container,
            location,
            weatherData
        );


    } catch (error) {

        console.error(
            "Failed to load live weather:",
            error
        );

        container.innerHTML = `
            <div class="weather-card">

                <div style="
                    text-align:center;
                    padding:30px;
                    color:#ef4444;
                ">

                    <div style="font-size:2rem;">
                        ⚠️
                    </div>

                    <div style="
                        font-weight:700;
                        margin-top:8px;
                    ">
                        Weather service temporarily unavailable.
                    </div>

                    <div style="
                        font-size:0.8rem;
                        margin-top:5px;
                        opacity:0.8;
                    ">
                        Please try again later.
                    </div>

                </div>

            </div>
        `;
    }
}


// ------------------------------------------------------------
// Automatic refresh
// ------------------------------------------------------------
function startWeatherAutoRefresh(containerId, district) {

    // Initial load
    loadWeatherWidget(containerId, district);

    // Refresh every 15 minutes
    setInterval(() => {

        loadWeatherWidget(
            containerId,
            district
        );

    }, WEATHER_REFRESH_INTERVAL);
}