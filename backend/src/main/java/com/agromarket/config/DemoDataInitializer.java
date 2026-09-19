package com.agromarket.config;

import com.agromarket.model.User;
import com.agromarket.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
public class DemoDataInitializer {

    @Bean
    CommandLineRunner createDemoUsers(
            UserRepository userRepository,
            PasswordEncoder passwordEncoder) {

        return args -> {

            createUser(
                    userRepository,
                    passwordEncoder,
                    "Demo Farmer",
                    "demo.farmer@agromarket.com",
                    "FARMER"
            );

            createUser(
                    userRepository,
                    passwordEncoder,
                    "Demo Buyer",
                    "demo.buyer@agromarket.com",
                    "BUYER"
            );

            createUser(
                    userRepository,
                    passwordEncoder,
                    "Demo Delivery Agent",
                    "demo.delivery@agromarket.com",
                    "DELIVERY"
            );

            createUser(
                    userRepository,
                    passwordEncoder,
                    "Demo Advisory Expert",
                    "demo.advisor@agromarket.com",
                    "ADVISORY"
            );
        };
    }

    private void createUser(
            UserRepository userRepository,
            PasswordEncoder passwordEncoder,
            String fullName,
            String email,
            String role) {

        if (userRepository.existsByEmail(email)) {
            System.out.println("Demo user already exists: " + email);
            return;
        }

        User user = new User();

        user.setFullName(fullName);
        user.setEmail(email);
        user.setPassword(passwordEncoder.encode("demo123"));
        user.setRole(role);
        user.setPhone("9876543210");
        user.setDistrict("Erode");
        user.setState("Tamil Nadu");
        user.setAddress("AgroMarket Demo Address");

        if ("FARMER".equals(role)) {
            user.setFarmSizeAcres(5.0);
            user.setUpiId("demofarmer@upi");
        }

        if ("DELIVERY".equals(role)) {
            user.setVehicleType("Bike");
            user.setVehicleNumber("TN33DEMO01");
            user.setBankAccountNo("1234567890");
            user.setBankIfsc("SBIN0001234");
            user.setBankName("Demo Bank");
            user.setIsAvailable(true);
        }

        if ("ADVISORY".equals(role)) {
            user.setSpecialization("Crop Management");
            user.setQualification("B.Sc Agriculture");
        }

        userRepository.save(user);

        System.out.println("Demo user created: " + email);
    }
}