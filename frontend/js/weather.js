/**
 * AgroMarket Weather Widget Controller (weather.js)
 */

async function loadWeatherWidget(containerId, district) {
  const container = document.getElementById(containerId);
  if (!container) return;

  try {
    const res = await fetch(`${API_BASE}/weather?district=${encodeURIComponent(district || 'Coimbatore')}`);
    const data = await res.json();

    container.innerHTML = `
      <div class="weather-card">
        <div class="weather-header">
          <div>
            <div class="weather-location">📍 ${data.district}</div>
            <div class="weather-date">${data.date}</div>
          </div>
          <span style="background:rgba(255,255,255,0.2); padding:0.25rem 0.65rem; border-radius:12px; font-size:0.8rem; font-weight:700;">
            🌧️ Rain ${data.rainProbability}%
          </span>
        </div>
        
        <div class="weather-main">
          <div class="weather-temp">${data.temperature}°C</div>
          <div class="weather-condition">
            <div>${data.condition}</div>
            <div style="font-size:0.825rem; opacity:0.85;">💨 Wind: ${data.windSpeed} km/h</div>
            <div style="font-size:0.825rem; opacity:0.85;">💧 Humidity: ${data.humidity}%</div>
          </div>
        </div>

        <div class="weather-advisory-box">
          <strong>🌾 Advisory:</strong> ${data.agriculturalAdvisory}
        </div>
      </div>
    `;
  } catch (err) {
    console.error("Failed to load weather:", err);
    container.innerHTML = `<p style="color:#ef4444; font-size:0.85rem;">Weather service temporarily unavailable.</p>`;
  }
}
