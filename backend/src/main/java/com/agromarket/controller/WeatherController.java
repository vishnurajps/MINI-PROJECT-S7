package com.agromarket.controller;

import com.agromarket.service.WeatherService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/weather")
@CrossOrigin(origins = "*")
public class WeatherController {

    private final WeatherService weatherService;

    public WeatherController(WeatherService weatherService) {
        this.weatherService = weatherService;
    }

    @GetMapping
    public ResponseEntity<Map<String, Object>> getWeather(@RequestParam(required = false, defaultValue = "coimbatore") String district) {
        return ResponseEntity.ok(weatherService.getWeatherForDistrict(district));
    }
}
