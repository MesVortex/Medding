package org.filrouge.medding.services.interfaces;

public interface EmailService {
    void sendInvitationEmail(String to, String invitationLink);
}
