package com.agromarket.service;

import com.agromarket.dto.AdvisoryReplyRequest;
import com.agromarket.dto.AdvisoryRequest;
import com.agromarket.model.AdvisoryQuery;
import com.agromarket.model.User;
import com.agromarket.repository.AdvisoryQueryRepository;
import com.agromarket.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class AdvisoryService {

    private final AdvisoryQueryRepository advisoryRepository;
    private final UserRepository userRepository;
    private final NotificationService notificationService;

    public AdvisoryService(AdvisoryQueryRepository advisoryRepository,
                           UserRepository userRepository,
                           NotificationService notificationService) {
        this.advisoryRepository = advisoryRepository;
        this.userRepository = userRepository;
        this.notificationService = notificationService;
    }

    public AdvisoryQuery askQuery(AdvisoryRequest request) {
        User user = userRepository.findById(request.getUserId())
                .orElseThrow(() -> new RuntimeException("User not found"));

        AdvisoryQuery query = new AdvisoryQuery();
        query.setUserId(user.getId());
        query.setUserName(user.getFullName());
        query.setUserRole(user.getRole());
        query.setDistrict(user.getDistrict());
        query.setCropType(request.getCropType());
        query.setSubject(request.getSubject());
        query.setQuestion(request.getQuestion());
        query.setStatus("OPEN");
        query.setCreatedAt(LocalDateTime.now());

        AdvisoryQuery saved = advisoryRepository.save(query);

        // Notify advisors in the platform
        List<User> advisors = userRepository.findByRole("ADVISORY");
        for (User adv : advisors) {
            notificationService.sendNotification(adv.getId(),
                    "New Agriculture Query: " + saved.getSubject(),
                    user.getFullName() + " (" + user.getRole() + ") asked a question regarding " + (saved.getCropType() != null ? saved.getCropType() : "farming") + ".");
        }

        return saved;
    }

    public AdvisoryQuery replyToQuery(Long queryId, AdvisoryReplyRequest request) {
        AdvisoryQuery query = advisoryRepository.findById(queryId)
                .orElseThrow(() -> new RuntimeException("Query not found"));

        User advisor = userRepository.findById(request.getAdvisorId())
                .orElseThrow(() -> new RuntimeException("Advisor not found"));

        query.setReply(request.getReplyText());
        query.setStatus("ANSWERED");
        query.setRepliedById(advisor.getId());
        query.setRepliedByName(advisor.getFullName());
        query.setRepliedAt(LocalDateTime.now());

        AdvisoryQuery updated = advisoryRepository.save(query);

        // Notify the user who asked
        notificationService.sendNotification(query.getUserId(),
                "Your Advisory Query has been Answered!",
                "Expert " + advisor.getFullName() + " replied to your question: \"" + query.getSubject() + "\"");

        return updated;
    }

    public List<AdvisoryQuery> getAllQueries() {
        return advisoryRepository.findAllByOrderByCreatedAtDesc();
    }

    public List<AdvisoryQuery> getQueriesByUser(Long userId) {
        return advisoryRepository.findByUserIdOrderByCreatedAtDesc(userId);
    }

    public List<AdvisoryQuery> getQueriesByStatus(String status) {
        return advisoryRepository.findByStatusOrderByCreatedAtDesc(status.toUpperCase());
    }
}
