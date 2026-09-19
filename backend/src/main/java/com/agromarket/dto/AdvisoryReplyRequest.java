package com.agromarket.dto;

public class AdvisoryReplyRequest {
    private Long advisorId;
    private String replyText;

    public AdvisoryReplyRequest() {}

    public Long getAdvisorId() { return advisorId; }
    public void setAdvisorId(Long advisorId) { this.advisorId = advisorId; }

    public String getReplyText() { return replyText; }
    public void setReplyText(String replyText) { this.replyText = replyText; }
}
