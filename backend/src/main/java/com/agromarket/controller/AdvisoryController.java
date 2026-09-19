package com.agromarket.controller;

import com.agromarket.dto.AdvisoryReplyRequest;
import com.agromarket.dto.AdvisoryRequest;
import com.agromarket.model.AdvisoryQuery;
import com.agromarket.service.AdvisoryService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/advisory")
@CrossOrigin(origins = "*")
public class AdvisoryController {

    private final AdvisoryService advisoryService;

    public AdvisoryController(AdvisoryService advisoryService) {
        this.advisoryService = advisoryService;
    }

    @PostMapping("/ask")
    public ResponseEntity<AdvisoryQuery> askQuery(@RequestBody AdvisoryRequest request) {
        return ResponseEntity.ok(advisoryService.askQuery(request));
    }

    @PostMapping("/{queryId}/reply")
    public ResponseEntity<?> replyToQuery(@PathVariable Long queryId, @RequestBody AdvisoryReplyRequest request) {
        try {
            return ResponseEntity.ok(advisoryService.replyToQuery(queryId, request));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/queries")
    public ResponseEntity<List<AdvisoryQuery>> getAllQueries(@RequestParam(required = false) String status) {
        if (status != null && !status.trim().isEmpty()) {
            return ResponseEntity.ok(advisoryService.getQueriesByStatus(status));
        }
        return ResponseEntity.ok(advisoryService.getAllQueries());
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<AdvisoryQuery>> getQueriesByUser(@PathVariable Long userId) {
        return ResponseEntity.ok(advisoryService.getQueriesByUser(userId));
    }
}
