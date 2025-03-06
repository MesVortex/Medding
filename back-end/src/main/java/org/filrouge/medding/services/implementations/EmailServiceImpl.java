package org.filrouge.medding.services.implementations;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.filrouge.medding.services.interfaces.EmailService;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;

import java.time.format.DateTimeFormatter;

@Service
@RequiredArgsConstructor
@Slf4j
public class EmailServiceImpl implements EmailService {

    private final JavaMailSender mailSender;

    @Override
    public void sendInvitationEmail(String receiver, String invitationLink) {
        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");

            helper.setTo(receiver);
            helper.setSubject("Wedding Invitation");
            helper.setText(createInvitationEmailTemplate(invitationLink), true);

            mailSender.send(message);
            log.info("Invitation email sent successfully to: {}", receiver);
        } catch (MessagingException e) {
            log.error("Failed to send invitation email to {}: {}", receiver, e.getMessage());
            throw new RuntimeException("Failed to send invitation email", e);
        }
    }

    private String createInvitationEmailTemplate(String invitationLink) {
//        return """
//            <!DOCTYPE html>
//            <html>
//            <head>
//                <link href="https://fonts.googleapis.com/css2?family=Raleway:wght@400;600&family=Great+Vibes&display=swap" rel="stylesheet">
//                %s
//            </head>
//            <body>
//                <div class="top"></div>
//                <div class="form">
//                    <div class="info">
//                        <h1>RSVP</h1>
//                        <h2>for the wedding of</h2>
//                        <h1>%s & %s</h1>
//                        <p class="line">________________________________________</p>
//                        <h2>The Details</h2>
//                        <p>%s</p>
//                        <br>
//                        <h2>Ceremony & Reception</h2>
//                        <p>%s</p>
//                        <p class="line">________________________________________</p>
//                        <div class="button-container">
//                            <a href="%s&response=CONFIRMED" class="button">Accept</a>
//                            <a href="%s&response=DECLINED" class="button">Regret</a>
//                        </div>
//                    </div>
//                </div>
//            </body>
//            </html>
//            """.formatted(
//                EMAIL_STYLES,
//                wedding.getBride(),
//                wedding.getGroom(),
//                wedding.getDate().format(DateTimeFormatter.ofPattern("EEEE, MMMM d, yyyy")),
//                wedding.getLocation(),
//                invitationLink,
//                invitationLink
//        );
        return null;
    }
}