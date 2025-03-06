package org.filrouge.medding.services.implementations;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.filrouge.medding.services.interfaces.EmailService;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;

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
        return """
            <html>
                <body>
                    <h2>Wedding Invitation</h2>
                    <p>You are cordially invited to our wedding celebration!</p>
                    <p>Please click the link below to respond to the invitation:</p>
                    <a href="%s">Respond to Invitation</a>
                </body>
            </html>
            """.formatted(invitationLink);
    }


    private static final String EMAIL_STYLES = """
            <style>
                body {
                    margin: 0;
                    padding: 0;
                    background-color: #BDC3C7;
                    font-family: 'Raleway', sans-serif;
                }
                .top {
                    background-color: #264356;
                    height: 200px;
                    margin: 0;
                    padding: 0;
                    box-shadow: 2px 2px 4px rgba(0, 0, 0, .25);
                }
                .form {
                    height: 590px;
                    width: 400px;
                    background-color: #fff;
                    margin: -110px auto;
                    border-radius: 10px;
                    color: #666;
                    padding: 0;
                    box-shadow: 2px 2px 4px rgba(0, 0, 0, .25);
                }
                .info { padding: 10px; }
                h1, h2, p {
                    text-align: center;
                    padding: 0;
                    margin: 5px 5px;
                }
                h2 {
                    font-family: 'Great Vibes', cursive;
                    font-weight: 100;
                }
                p.line {
                    margin: 0 auto 20px auto;
                    color: #999;
                }
                .button-container {
                    margin-top: 20px;
                    text-align: center;
                }
                .button {
                    display: inline-block;
                    color: #666;
                    background-color: #ffbdc7;
                    border: none;
                    font-family: 'Raleway', sans-serif;
                    font-size: 18px;
                    font-weight: 600;
                    padding: 15px 32px;
                    text-decoration: none;
                    margin: 0 10px;
                }
                .button:hover {
                    background-color: #cc919a;
                }
            </style>
            """;
}