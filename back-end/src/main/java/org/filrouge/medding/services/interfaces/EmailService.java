package org.filrouge.medding.services.interfaces;

import org.filrouge.medding.entities.Wedding;

public interface EmailService {
    void sendInvitationEmail(String to, String invitationLink, Wedding wedding);
}
