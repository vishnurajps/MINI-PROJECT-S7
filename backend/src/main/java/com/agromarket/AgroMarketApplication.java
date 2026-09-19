package com.agromarket;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class AgroMarketApplication {

    public static void main(String[] args) {
        SpringApplication.run(AgroMarketApplication.class, args);
        System.out.println("=========================================================");
        System.out.println("   AgroMarket Backend Service is running on port 8085    ");
        System.out.println("   API Base: http://localhost:8085/api                   ");
        System.out.println("   H2 Console: http://localhost:8085/h2-console           ");
        System.out.println("=========================================================");
    }
}
