package com.agromarket.service;

import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.*;

@Service
public class WeatherService {

    private final Map<String, Map<String, Object>> districtWeatherCache = new HashMap<>();

    public WeatherService() {
        initSampleWeatherData();
    }

    private void initSampleWeatherData() {
        districtWeatherCache.put("coimbatore", createWeather("Coimbatore", 28.5, 68, "Partly Cloudy", 12.4, 20,
                "Favorable for weeding and light irrigation. Check tomato crops for mild whitefly activity."));
        districtWeatherCache.put("madurai", createWeather("Madurai", 33.2, 54, "Sunny & Warm", 9.8, 10,
                "High evapotranspiration expected. Schedule drip irrigation for banana and jasmine plantations in early morning."));
        districtWeatherCache.put("chennai", createWeather("Chennai", 31.0, 78, "Scattered Showers", 18.2, 60,
                "Postpone foliar pesticide sprays due to impending evening rainfall. Ensure field drainage channels are clear."));
        districtWeatherCache.put("salem", createWeather("Salem", 30.1, 62, "Mild Breezy", 11.5, 15,
                "Optimal conditions for harvesting pulses and vegetables. Good soil moisture levels."));
        districtWeatherCache.put("thanjavur", createWeather("Thanjavur", 32.0, 72, "Mostly Cloudy", 14.0, 40,
                "Inspect paddy crops for stem borer infestation. Maintain 2-3 cm water level in nurseries."));
    }

    private Map<String, Object> createWeather(String district, double temp, int humidity, String condition, double windKm, int rainChance, String advisory) {
        Map<String, Object> data = new HashMap<>();
        data.put("district", district);
        data.put("temperature", temp);
        data.put("humidity", humidity);
        data.put("condition", condition);
        data.put("windSpeed", windKm);
        data.put("rainProbability", rainChance);
        data.put("agriculturalAdvisory", advisory);
        data.put("date", LocalDate.now().toString());

        // 3-day micro forecast
        List<Map<String, Object>> forecast = new ArrayList<>();
        forecast.add(Map.of("day", "Tomorrow", "temp", temp + 0.5, "condition", condition, "rain", rainChance));
        forecast.add(Map.of("day", "Day 2", "temp", temp - 1.0, "condition", "Partly Cloudy", "rain", Math.max(10, rainChance - 10)));
        forecast.add(Map.of("day", "Day 3", "temp", temp + 1.2, "condition", "Sunny", "rain", 15));
        data.put("forecast", forecast);

        return data;
    }

    public Map<String, Object> getWeatherForDistrict(String district) {
        if (district == null || district.trim().isEmpty()) {
            district = "coimbatore";
        }
        String key = district.trim().toLowerCase();
        if (districtWeatherCache.containsKey(key)) {
            return districtWeatherCache.get(key);
        }

        // Generic fallback for any other district entered
        return createWeather(district, 29.0, 65, "Partly Cloudy", 12.0, 25,
                "Ideal weather for regular field maintenance and vegetable harvesting. Ensure adequate soil mulching.");
    }
}
