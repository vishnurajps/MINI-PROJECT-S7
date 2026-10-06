package com.agromarket.controller;

import com.agromarket.model.User;
import com.agromarket.repository.UserRepository;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "*")
public class UserController {

    private final UserRepository userRepository;

    public UserController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    // Update delivery boy bank details
    @PutMapping("/{userId}/bank-details")
    public ResponseEntity<?> updateBankDetails(
            @PathVariable Long userId,
            @RequestBody Map<String, String> bankDetails) {

        try {
            User user = userRepository.findById(userId)
                    .orElseThrow(() -> new RuntimeException("User not found"));

            String bankName = bankDetails.get("bankName");
            String bankAccountNo = bankDetails.get("bankAccountNo");
            String bankIfsc = bankDetails.get("bankIfsc");

            if (bankName == null || bankName.trim().isEmpty()) {
                return ResponseEntity.badRequest()
                        .body(Map.of("error", "Bank name is required"));
            }

            if (bankAccountNo == null || bankAccountNo.trim().isEmpty()) {
                return ResponseEntity.badRequest()
                        .body(Map.of("error", "Account number is required"));
            }

            if (bankIfsc == null || bankIfsc.trim().isEmpty()) {
                return ResponseEntity.badRequest()
                        .body(Map.of("error", "IFSC code is required"));
            }

            user.setBankName(bankName.trim());
            user.setBankAccountNo(bankAccountNo.trim());
            user.setBankIfsc(bankIfsc.trim().toUpperCase());

            User updatedUser = userRepository.save(user);

            return ResponseEntity.ok(Map.of(
                    "message", "Bank details updated successfully",
                    "userId", updatedUser.getId(),
                    "bankName", updatedUser.getBankName(),
                    "bankAccountNo", updatedUser.getBankAccountNo(),
                    "bankIfsc", updatedUser.getBankIfsc()
            ));

        } catch (Exception e) {

            return ResponseEntity.internalServerError()
                    .body(Map.of(
                            "error", "Failed to update bank details",
                            "message", e.getMessage()
                    ));
        }
    }

    // Get latest bank details from database
    @GetMapping("/{userId}/bank-details")
    public ResponseEntity<?> getBankDetails(@PathVariable Long userId) {

        try {
            User user = userRepository.findById(userId)
                    .orElseThrow(() -> new RuntimeException("User not found"));

            return ResponseEntity.ok(Map.of(
                    "userId", user.getId(),
                    "bankName", user.getBankName() != null ? user.getBankName() : "",
                    "bankAccountNo", user.getBankAccountNo() != null ? user.getBankAccountNo() : "",
                    "bankIfsc", user.getBankIfsc() != null ? user.getBankIfsc() : ""
            ));

        } catch (Exception e) {

            return ResponseEntity.internalServerError()
                    .body(Map.of(
                            "error", "Failed to load bank details",
                            "message", e.getMessage()
                    ));
        }
    }
}