package com.agromarket.service;

import com.agromarket.dto.AuthResponse;
import org.springframework.security.crypto.password.PasswordEncoder;
import com.agromarket.dto.LoginRequest;
import com.agromarket.dto.RegisterRequest;
import com.agromarket.model.User;
import com.agromarket.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class AuthService {

	private final UserRepository userRepository;
	private final PasswordEncoder passwordEncoder;

	public AuthService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
	    this.userRepository = userRepository;
	    this.passwordEncoder = passwordEncoder;
	}

    public AuthResponse register(RegisterRequest request) {
        if (request.getEmail() == null || request.getEmail().trim().isEmpty()) {
            return AuthResponse.error("Email is required");
        }
        if (userRepository.existsByEmail(request.getEmail().trim().toLowerCase())) {
            return AuthResponse.error("An account with this email already exists");
        }

        User user = new User();
        user.setFullName(request.getFullName());
        user.setEmail(request.getEmail().trim().toLowerCase());
        user.setPassword(passwordEncoder.encode(request.getPassword()));        user.setRole(request.getRole() != null ? request.getRole().toUpperCase() : "BUYER");
        user.setPhone(request.getPhone());
        user.setDistrict(request.getDistrict());
        user.setState(request.getState() != null ? request.getState() : "Tamil Nadu");
        user.setAddress(request.getAddress());

        // Farmer fields
        if ("FARMER".equalsIgnoreCase(user.getRole())) {
            user.setUpiId(request.getUpiId());
            // If QR code is provided, use it; otherwise generate standard UPI QR API url if UPI ID is present
            if (request.getQrCodeUrl() != null && !request.getQrCodeUrl().trim().isEmpty()) {
                user.setQrCodeUrl(request.getQrCodeUrl());
            } else if (request.getUpiId() != null && !request.getUpiId().trim().isEmpty()) {
                String upiUri = "upi://pay?pa=" + request.getUpiId() + "&pn=" + user.getFullName().replace(" ", "%20") + "&cu=INR";
                user.setQrCodeUrl("https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=" + upiUri);
            }
            user.setFarmSizeAcres(request.getFarmSizeAcres());
        }

        // Delivery Agent fields
        if ("DELIVERY".equalsIgnoreCase(user.getRole())) {
            user.setVehicleType(request.getVehicleType());
            user.setVehicleNumber(request.getVehicleNumber());
            user.setBankAccountNo(request.getBankAccountNo());
            user.setBankIfsc(request.getBankIfsc());
            user.setBankName(request.getBankName());
            user.setIsAvailable(true);
        }

        // Advisory fields
        if ("ADVISORY".equalsIgnoreCase(user.getRole())) {
            user.setSpecialization(request.getSpecialization());
            user.setQualification(request.getQualification());
        }

        User savedUser = userRepository.save(user);
        String token = UUID.randomUUID().toString();
        return AuthResponse.success("Registration successful! Welcome to AgroMarket.", token, savedUser);
    }

    public AuthResponse login(LoginRequest request) {
        if (request.getEmail() == null || request.getPassword() == null) {
            return AuthResponse.error("Email and password are required");
        }

        Optional<User> userOpt = userRepository.findByEmail(request.getEmail().trim().toLowerCase());
        if (userOpt.isEmpty()) {
            return AuthResponse.error("Invalid email or password");
        }

        User user = userOpt.get();
        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            return AuthResponse.error("Invalid email or password");
        }

        String token = UUID.randomUUID().toString();
        return AuthResponse.success("Login successful!", token, user);
    }

    public Optional<User> getUserById(Long id) {
        return userRepository.findById(id);
    }

    public List<User> getUsersByRole(String role) {
        return userRepository.findByRole(role.toUpperCase());
    }

    public User updateProfile(Long userId, User updatedData) {
        return userRepository.findById(userId).map(user -> {
            if (updatedData.getFullName() != null) user.setFullName(updatedData.getFullName());
            if (updatedData.getPhone() != null) user.setPhone(updatedData.getPhone());
            if (updatedData.getDistrict() != null) user.setDistrict(updatedData.getDistrict());
            if (updatedData.getAddress() != null) user.setAddress(updatedData.getAddress());
            
            // Farmer fields
            if (updatedData.getUpiId() != null) {
                user.setUpiId(updatedData.getUpiId());
                if (updatedData.getQrCodeUrl() == null || updatedData.getQrCodeUrl().isEmpty()) {
                    String upiUri = "upi://pay?pa=" + updatedData.getUpiId() + "&pn=" + user.getFullName().replace(" ", "%20") + "&cu=INR";
                    user.setQrCodeUrl("https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=" + upiUri);
                }
            }
            if (updatedData.getQrCodeUrl() != null) user.setQrCodeUrl(updatedData.getQrCodeUrl());
            if (updatedData.getFarmSizeAcres() != null) user.setFarmSizeAcres(updatedData.getFarmSizeAcres());

            // Delivery Agent fields
            if (updatedData.getBankAccountNo() != null) user.setBankAccountNo(updatedData.getBankAccountNo());
            if (updatedData.getBankIfsc() != null) user.setBankIfsc(updatedData.getBankIfsc());
            if (updatedData.getBankName() != null) user.setBankName(updatedData.getBankName());
            if (updatedData.getVehicleType() != null) user.setVehicleType(updatedData.getVehicleType());
            if (updatedData.getVehicleNumber() != null) user.setVehicleNumber(updatedData.getVehicleNumber());
            if (updatedData.getIsAvailable() != null) user.setIsAvailable(updatedData.getIsAvailable());

            return userRepository.save(user);
        }).orElseThrow(() -> new RuntimeException("User not found with id: " + userId));
    }
}
