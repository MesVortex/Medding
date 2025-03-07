package org.filrouge.medding.services.implementations;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.filrouge.medding.entities.Wedding;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.filrouge.medding.services.interfaces.EmailService;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;

import java.time.ZoneId;
import java.time.format.DateTimeFormatter;

@Service
@RequiredArgsConstructor
@Slf4j
public class EmailServiceImpl implements EmailService {

    private final JavaMailSender mailSender;

    @Override
    public void sendInvitationEmail(String receiver, String invitationLink, Wedding wedding) {
        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");

            helper.setTo(receiver);
            helper.setSubject("Wedding Invitation");
            helper.setText(createInvitationEmailTemplate(invitationLink, wedding), true);

            mailSender.send(message);
            log.info("Invitation email sent successfully to: {}", receiver);
        } catch (MessagingException e) {
            log.error("Failed to send invitation email to {}: {}", receiver, e.getMessage());
            throw new RuntimeException("Failed to send invitation email", e);
        }
    }

    private String createInvitationEmailTemplate(String invitationLink, Wedding wedding) {
        // Format the wedding date
        String formattedDate = DateTimeFormatter.ofPattern("dd/MM").format(
                wedding.getDate().toInstant().atZone(ZoneId.systemDefault()).toLocalDate());

        String formattedYear = DateTimeFormatter.ofPattern("yyyy").format(
                wedding.getDate().toInstant().atZone(ZoneId.systemDefault()).toLocalDate());

        String dayOfWeek = DateTimeFormatter.ofPattern("EEEE").format(
                wedding.getDate().toInstant().atZone(ZoneId.systemDefault()).toLocalDate());

        String brideInitial = wedding.getBride().substring(0, 1).toUpperCase();

        String groomInitial = wedding.getGroom().substring(0, 1).toUpperCase();

        return """
        <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
        <html dir="ltr" xmlns="http://www.w3.org/1999/xhtml" xmlns:o="urn:schemas-microsoft-com:office:office" lang="en">
        <head>
            <meta charset="UTF-8">
            <meta content="width=device-width, initial-scale=1" name="viewport">
            <meta name="x-apple-disable-message-reformatting">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta content="telephone=no" name="format-detection">
            <title>Wedding Invitation</title><!--[if (mso 16)]>
            <style type="text/css">
            a {text-decoration: none;}
            </style>
            <![endif]--><!--[if gte mso 9]><style>sup { font-size: 100%% !important; }</style><![endif]--><!--[if gte mso 9]>
            <xml>
            <o:OfficeDocumentSettings>
            <o:AllowPNG></o:AllowPNG>
            <o:PixelsPerInch>96</o:PixelsPerInch>
            </o:OfficeDocumentSettings>
            </xml>
            </noscript>
            <![endif]--><!--[if !mso]><!-- -->
            <link href="https://fonts.googleapis.com/css2?family=Cinzel&display=swap" rel="stylesheet">
            <link href="https://fonts.googleapis.com/css2?family=Cinzel+Decorative&display=swap" rel="stylesheet"><!--<![endif]--><!--[if mso]><xml>
            <w:WordDocument xmlns:w="urn:schemas-microsoft-com:office:word">
            <w:DontUseAdvancedTypographyReadingMail/>
            </w:WordDocument>
            </xml><![endif]-->
            <style type="text/css">
            .rollover:hover .rollover-first { max-height:0px!important; display:none!important; }
            .rollover:hover .rollover-second { max-height:none!important; display:block!important; }
            .rollover span { font-size:0px; }
            u + .body img ~ div div { display:none; }
            #outlook a { padding:0; }
            span.MsoHyperlink, span.MsoHyperlinkFollowed { color:inherit; mso-style-priority:99; }
            a.es-button { mso-style-priority:100!important; text-decoration:none!important; }
            a[x-apple-data-detectors], #MessageViewBody a { color:inherit!important; text-decoration:none!important; font-size:inherit!important; font-family:inherit!important; font-weight:inherit!important; line-height:inherit!important; }
            .es-desk-hidden { display:none; float:left; overflow:hidden; width:0; max-height:0; line-height:0; mso-hide:all; }
            @media only screen and (max-width:600px) {.es-m-p0r { padding-right:0px!important } .es-m-p20b { padding-bottom:20px!important } .es-p-default { } *[class="gmail-fix"] { display:none!important } p, a { line-height:150%%!important } h1, h1 a { line-height:120%%!important } h2, h2 a { line-height:120%%!important } h3, h3 a { line-height:120%%!important } h4, h4 a { line-height:120%%!important } h5, h5 a { line-height:120%%!important } h6, h6 a { line-height:120%%!important } .es-header-body p { } .es-content-body p { } .es-footer-body p { } .es-infoblock p { } h1 { font-size:30px!important; text-align:center } h2 { font-size:24px!important; text-align:center } h3 { font-size:20px!important; text-align:center } h4 { font-size:24px!important; text-align:left } h5 { font-size:20px!important; text-align:left } h6 { font-size:16px!important; text-align:left } .es-header-body h1 a, .es-content-body h1 a, .es-footer-body h1 a { font-size:30px!important } .es-header-body h2 a, .es-content-body h2 a, .es-footer-body h2 a { font-size:24px!important } .es-header-body h3 a, .es-content-body h3 a, .es-footer-body h3 a { font-size:20px!important } .es-header-body h4 a, .es-content-body h4 a, .es-footer-body h4 a { font-size:24px!important } .es-header-body h5 a, .es-content-body h5 a, .es-footer-body h5 a { font-size:20px!important } .es-header-body h6 a, .es-content-body h6 a, .es-footer-body h6 a { font-size:16px!important } .es-menu td a { font-size:14px!important } .es-header-body p, .es-header-body a { font-size:14px!important } .es-content-body p, .es-content-body a { font-size:14px!important } .es-footer-body p, .es-footer-body a { font-size:14px!important } .es-infoblock p, .es-infoblock a { font-size:12px!important } .es-m-txt-c, .es-m-txt-c h1, .es-m-txt-c h2, .es-m-txt-c h3, .es-m-txt-c h4, .es-m-txt-c h5, .es-m-txt-c h6 { text-align:center!important } .es-m-txt-r, .es-m-txt-r h1, .es-m-txt-r h2, .es-m-txt-r h3, .es-m-txt-r h4, .es-m-txt-r h5, .es-m-txt-r h6 { text-align:right!important } .es-m-txt-j, .es-m-txt-j h1, .es-m-txt-j h2, .es-m-txt-j h3, .es-m-txt-j h4, .es-m-txt-j h5, .es-m-txt-j h6 { text-align:justify!important } .es-m-txt-l, .es-m-txt-l h1, .es-m-txt-l h2, .es-m-txt-l h3, .es-m-txt-l h4, .es-m-txt-l h5, .es-m-txt-l h6 { text-align:left!important } .es-m-txt-r img, .es-m-txt-c img, .es-m-txt-l img { display:inline!important } .es-m-txt-r .rollover:hover .rollover-second, .es-m-txt-c .rollover:hover .rollover-second, .es-m-txt-l .rollover:hover .rollover-second { display:inline!important } .es-m-txt-r .rollover span, .es-m-txt-c .rollover span, .es-m-txt-l .rollover span { line-height:0!important; font-size:0!important; display:block } .es-spacer { display:inline-table } a.es-button, button.es-button { font-size:18px!important; padding:10px 20px 10px 20px!important; line-height:120%%!important } a.es-button, button.es-button, .es-button-border { display:inline-block!important } .es-m-fw, .es-m-fw.es-fw, .es-m-fw .es-button { display:block!important } .es-m-il, .es-m-il .es-button, .es-social, .es-social td, .es-menu { display:inline-block!important } .es-adaptive table, .es-left, .es-right { width:100%%!important } .es-content table, .es-header table, .es-footer table, .es-content, .es-footer, .es-header { width:100%%!important; max-width:600px!important } .adapt-img { width:100%%!important; height:auto!important } .es-mobile-hidden, .es-hidden { display:none!important } .es-desk-hidden { width:auto!important; overflow:visible!important; float:none!important; max-height:inherit!important; line-height:inherit!important } tr.es-desk-hidden { display:table-row!important } table.es-desk-hidden { display:table!important } td.es-desk-menu-hidden { display:table-cell!important } .es-menu td { width:1%%!important } table.es-table-not-adapt, .esd-block-html table { width:auto!important } .h-auto { height:auto!important } } @media screen and (max-width:384px) {.mail-message-content { width:414px!important } }
            </style>
        </head>
        <body class="body" style="width:100%%;height:100%%;-webkit-text-size-adjust:100%%;-ms-text-size-adjust:100%%;padding:0;Margin:0">
            <div dir="ltr" class="es-wrapper-color" lang="en" style="background-color:#FFFFFF"><!--[if gte mso 9]>
                <v:background xmlns:v="urn:schemas-microsoft-com:vml" fill="t">
                <v:fill type="tile" src="https://tlr.stripocdn.email/content/guids/CABINET_248d9830df6756962072d95163984b52/images/rectangle_41.png" color="#ffffff" origin="0.5, 0" position="0.5, 0"></v:fill>
                </v:background>
                <![endif]-->
                <table width="100%%" cellspacing="0" cellpadding="0" background="https://ftrbofc.stripocdn.email/content/guids/CABINET_248d9830df6756962072d95163984b52/images/rectangle_41.png" class="es-wrapper" role="none" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;padding:0;Margin:0;width:100%%;height:100%%;background-image:url(https://ftrbofc.stripocdn.email/content/guids/CABINET_248d9830df6756962072d95163984b52/images/rectangle_41.png);background-repeat:repeat;background-position:center top;background-color:#FFFFFF">
                    <tr>
                        <td valign="top" style="padding:0;Margin:0">
                            <table cellpadding="0" cellspacing="0" align="center" class="es-header" role="none" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;width:100%%;table-layout:fixed !important;background-color:transparent;background-repeat:repeat;background-position:center top">
                                <tr>
                                    <td align="center" style="padding:0;Margin:0">
                                        <table bgcolor="#ffffff" align="center" cellpadding="0" cellspacing="0" class="es-header-body" role="none" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:#DFE5EC;width:600px">
                                            <tr>
                                                <td align="left" style="padding:20px;Margin:0">
                                                    <table cellpadding="0" cellspacing="0" width="100%%" role="none" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                                                        <tr>
                                                            <td align="left" style="padding:0;Margin:0;width:560px">
                                                                <table cellpadding="0" cellspacing="0" width="100%%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                                                                    <tr>
                                                                        <td align="center" style="padding:0;Margin:0"><h2 style="Margin:0;font-family:Cinzel, serif;mso-line-height-rule:exactly;letter-spacing:0;font-size:24px;font-style:normal;font-weight:normal;line-height:28.8px;color:#8B6B6A">%s &amp;&nbsp;%s</h2></td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td align="center" style="padding:0;Margin:0;padding-top:5px;padding-right:20px;padding-left:20px;font-size:0">
                                                                            <table border="0" width="25%%" height="100%%" cellpadding="0" cellspacing="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;width:25%% !important;display:inline-table" role="presentation">
                                                                                <tr>
                                                                                    <td style="padding:0;Margin:0;border-bottom:1px solid #8b6b6a;background:unset;height:0px;width:100%%;margin:0px"></td>
                                                                                </tr>
                                                                            </table>
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td align="center" style="padding:0;Margin:0;padding-top:5px;padding-right:20px;padding-left:20px;font-size:0">
                                                                            <table border="0" width="15%%" height="100%%" cellpadding="0" cellspacing="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;width:15%% !important;display:inline-table" role="presentation">
                                                                                <tr>
                                                                                    <td style="padding:0;Margin:0;border-bottom:1px solid #8b6b6a;background:unset;height:0px;width:100%%;margin:0px"></td>
                                                                                </tr>
                                                                            </table>
                                                                        </td>
                                                                    </tr>
                                                                </table>
                                                            </td>
                                                        </tr>
                                                    </table>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                            </table>
                            
                            <!-- Main content section with names -->
                            <table cellpadding="0" cellspacing="0" align="center" class="es-content" role="none" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;width:100%%;table-layout:fixed !important">
                                <tr>
                                    <td align="center" style="padding:0;Margin:0">
                                        <table bgcolor="#dfe5ec" align="center" cellpadding="0" cellspacing="0" class="es-content-body" role="none" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:#DFE5EC;width:600px">
                                            <tr>
                                                <td align="left" style="padding:20px;Margin:0">
                                                    <table cellpadding="0" cellspacing="0" width="100%%" role="none" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                                                        <tr>
                                                            <td align="center" valign="top" style="padding:0;Margin:0;width:560px">
                                                                <table cellpadding="0" cellspacing="0" width="100%%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                                                                    <tr>
                                                                        <td align="center" style="padding:0;Margin:0;padding-bottom:15px;font-size:0px"><a target="_blank" href="#" style="mso-line-height-rule:exactly;text-decoration:underline;color:#8B6B6A;font-size:14px"><img src="https://ftrbofc.stripocdn.email/content/guids/CABINET_248d9830df6756962072d95163984b52/images/pngegg_12_1_2n2.png" alt="" width="150" style="display:block;font-size:14px;border:0;outline:none;text-decoration:none"></a></td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td align="center" style="padding:0;Margin:0"><h1 style="Margin:0;font-family:Cinzel, serif;mso-line-height-rule:exactly;letter-spacing:0;font-size:50px;font-style:normal;font-weight:normal;line-height:60px;color:#8B6B6A">%s</h1></td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td align="center" style="padding:0;Margin:0;padding-bottom:15px;padding-top:15px"><h3 style="Margin:0;font-family:Cinzel, serif;mso-line-height-rule:exactly;letter-spacing:0;font-size:20px;font-style:normal;font-weight:normal;line-height:24px;color:#8B6B6A">&amp;</h3></td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td align="center" style="padding:0;Margin:0"><h1 style="Margin:0;font-family:Cinzel, serif;mso-line-height-rule:exactly;letter-spacing:0;font-size:50px;font-style:normal;font-weight:normal;line-height:60px;color:#8B6B6A">%s</h1></td>
                                                                    </tr>
                                                                </table>
                                                            </td>
                                                        </tr>
                                                    </table>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                            </table>
                            
                            <!-- Location and date section -->
                            <table cellpadding="0" cellspacing="0" align="center" class="es-content" role="none" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;width:100%%;table-layout:fixed !important">
                                <tr>
                                    <td align="center" style="padding:0;Margin:0">
                                        <table bgcolor="#dfe5ec" align="center" cellpadding="0" cellspacing="0" class="es-content-body" role="none" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:#DFE5EC;width:600px">
                                            <tr>
                                                <td align="left" background="https://ftrbofc.stripocdn.email/content/guids/CABINET_248d9830df6756962072d95163984b52/images/group_123.png" style="padding:20px;Margin:0;background-image:url(https://ftrbofc.stripocdn.email/content/guids/CABINET_248d9830df6756962072d95163984b52/images/group_123.png);background-repeat:no-repeat;background-position:center top">
                                                    <table cellpadding="0" cellspacing="0" width="100%%" role="none" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                                                        <tr>
                                                            <td align="center" class="es-m-p0r" style="padding:0;Margin:0;width:560px">
                                                                <table cellpadding="0" cellspacing="0" width="100%%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                                                                    <tr>
                                                                        <td align="center" style="padding:20px;Margin:0;font-size:0">
                                                                            <table border="0" width="50%%" height="100%%" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                                                                                <tr>
                                                                                    <td style="padding:0;Margin:0;border-bottom:1px solid #8b6b6a;background:unset;height:0px;width:100%%;margin:0px"></td>
                                                                                </tr>
                                                                            </table>
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td align="center" style="padding:0;Margin:0"><p style="Margin:0;mso-line-height-rule:exactly;font-family:Cinzel, serif;line-height:21px;letter-spacing:0;color:#8B6B6A;font-size:14px">%s</p></td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td align="center" style="padding:0;Margin:0;padding-bottom:15px;padding-top:15px"><h1 style="Margin:0;font-family:Cinzel, serif;mso-line-height-rule:exactly;letter-spacing:0;font-size:50px;font-style:normal;font-weight:normal;line-height:60px;color:#8B6B6A">%s&amp;%s</h1></td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td align="center" style="padding:0;Margin:0"><p style="Margin:0;mso-line-height-rule:exactly;font-family:Cinzel, serif;line-height:21px;letter-spacing:0;color:#8B6B6A;font-size:14px">#%sand%s</p></td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td align="center" style="padding:20px;Margin:0;font-size:0">
                                                                            <table border="0" width="50%%" height="100%%" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                                                                                <tr>
                                                                                    <td style="padding:0;Margin:0;border-bottom:1px solid #8b6b6a;background:unset;height:0px;width:100%%;margin:0px"></td>
                                                                                </tr>
                                                                            </table>
                                                                        </td>
                                                                    </tr>
                                                                </table>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td align="center" class="es-m-p0r" style="padding:0;Margin:0;width:559px">
                                                                <table cellpadding="0" cellspacing="0" width="100%%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                                                                    <tr>
                                                                        <td align="center" style="padding:0;Margin:0"><p style="Margin:0;mso-line-height-rule:exactly;font-family:Cinzel, serif;line-height:21px;letter-spacing:0;color:#8B6B6A;font-size:14px">%s</p></td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td align="center" style="padding:0;Margin:0;padding-bottom:15px;padding-top:15px"><h1 style="Margin:0;font-family:Cinzel, serif;mso-line-height-rule:exactly;letter-spacing:0;font-size:50px;font-style:normal;font-weight:normal;line-height:60px;color:#8B6B6A">%s</h1></td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td align="center" style="padding:0;Margin:0"><p style="Margin:0;mso-line-height-rule:exactly;font-family:Cinzel, serif;line-height:21px;letter-spacing:0;color:#8B6B6A;font-size:14px">%s</p></td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td align="center" style="padding:20px;Margin:0;font-size:0">
                                                                            <table border="0" width="50%%" height="100%%" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                                                                                <tr>
                                                                                    <td style="padding:0;Margin:0;border-bottom:1px solid #8b6b6a;background:unset;height:0px;width:100%%;margin:0px"></td>
                                                                                </tr>
                                                                            </table>
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td align="center" style="padding:0;Margin:0">
                                                                            <span class="es-button-border" style="border-style:solid;border-color:#2CB543;background:#8B6B6A;border-width:0px;display:inline-block;border-radius:0px;width:auto">
                                                                                <a href="%s&response=CONFIRMED" target="_blank" class="es-button" style="mso-style-priority:100 !important;text-decoration:none !important;mso-line-height-rule:exactly;color:#F0EFEB;font-size:18px;padding:10px 20px 10px 20px;display:inline-block;background:#8B6B6A;border-radius:0px;font-family:Cinzel, serif;font-weight:normal;font-style:normal;line-height:21.6px;width:auto;text-align:center;letter-spacing:0;mso-padding-alt:0;mso-border-alt:10px solid #8B6B6A">ACCEPT</a>
                                                                            </span>
                                                                            <span class="es-button-border" style="border-style:solid;border-color:#2CB543;background:#8B6B6A;border-width:0px;display:inline-block;border-radius:0px;width:auto;margin-left:10px">
                                                                                <a href="%s&response=DECLINED" target="_blank" class="es-button" style="mso-style-priority:100 !important;text-decoration:none !important;mso-line-height-rule:exactly;color:#F0EFEB;font-size:18px;padding:10px 20px 10px 20px;display:inline-block;background:#8B6B6A;border-radius:0px;font-family:Cinzel, serif;font-weight:normal;font-style:normal;line-height:21.6px;width:auto;text-align:center;letter-spacing:0;mso-padding-alt:0;mso-border-alt:10px solid #8B6B6A">DECLINE</a>
                                                                            </span>
                                                                        </td>
                                                                    </tr>
                                                                </table>
                                                            </td>
                                                            <td class="es-hidden" style="padding:0;Margin:0;width:20px"></td>
                                                        </tr>
                                                    </table>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                            </table>
                            
                            <!-- Decorative section -->
                            <table cellpadding="0" cellspacing="0" align="center" class="es-content" role="none" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;width:100%%;table-layout:fixed !important">
                                <tr>
                                    <td align="center" style="padding:0;Margin:0">
                                        <table bgcolor="#dfe5ec" align="center" cellpadding="0" cellspacing="0" class="es-content-body" role="none" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:#DFE5EC;width:600px">
                                            <tr>
                                                <td align="left" background="https://ftrbofc.stripocdn.email/content/guids/CABINET_248d9830df6756962072d95163984b52/images/pngegg_13_9Oo.png" style="padding:20px;Margin:0;background-image:url(https://ftrbofc.stripocdn.email/content/guids/CABINET_248d9830df6756962072d95163984b52/images/pngegg_13_9Oo.png);background-repeat:no-repeat;background-position:center center">
                                                    <table cellpadding="0" cellspacing="0" width="100%%" role="none" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                                                        <tr>
                                                            <td align="center" valign="top" style="padding:0;Margin:0;width:560px">
                                                                <table cellpadding="0" cellspacing="0" width="100%%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                                                                    <tr>
                                                                        <td align="center" style="padding:0;Margin:0;padding-top:40px;padding-bottom:40px"><h1 style="Margin:0;font-family:'cinzel decorative', georgia, arial, roboto, serif;mso-line-height-rule:exactly;letter-spacing:0;font-size:50px;font-style:normal;font-weight:normal;line-height:60px;color:#8B6B6A">%s&amp;%s</h1></td>
                                                                    </tr>
                                                                </table>
                                                            </td>
                                                        </tr>
                                                    </table>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                            </table>
                            
                            <!-- Footer section with details -->
                            <table cellpadding="0" cellspacing="0" align="center" class="es-footer" role="none" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;width:100%%;table-layout:fixed !important;background-color:transparent;background-repeat:repeat;background-position:center top">
                                <tr>
                                    <td align="center" style="padding:0;Margin:0">
                                        <table bgcolor="#ffffff" align="center" cellpadding="0" cellspacing="0" class="es-footer-body" role="none" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:#DFE5EC;width:600px">
                                            <tr>
                                                <td align="left" style="padding:20px;Margin:0">
                                                    <table cellpadding="0" cellspacing="0" width="100%%" role="none" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                                                        <tr>
                                                            <td align="left" style="padding:0;Margin:0;width:560px">
                                                                <table cellpadding="0" cellspacing="0" width="100%%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                                                                    <tr>
                                                                        <td align="center" style="padding:0;Margin:0"><p style="Margin:0;mso-line-height-rule:exactly;font-family:Cinzel, serif;line-height:21px;letter-spacing:0;color:#8B6B6A;font-size:14px">For more details about the wedding and accommodations please visit our wedding website at<br><br></p><h4 style="Margin:0;font-family:Cinzel, serif;mso-line-height-rule:exactly;letter-spacing:0;font-size:14px;font-style:normal;font-weight:normal;line-height:16.8px;color:#333333"><a href="#" target="_blank" style="mso-line-height-rule:exactly;text-decoration:underline;color:#8B6B6A;font-size:14px">www.medding.com</a>.<br><br></h4><p style="Margin:0;mso-line-height-rule:exactly;font-family:Cinzel, serif;line-height:21px;letter-spacing:0;color:#8B6B6A;font-size:14px">Please RSVP by %s.<br><br></p></td>
                                                                    </tr>
                                                                </table>
                                                            </td>
                                                        </tr>
                                                    </table>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                </table>
            </div>
        </body>
        </html>
        """.formatted(
                wedding.getBride(),
                wedding.getGroom(),
                wedding.getBride(),
                wedding.getGroom(),
                wedding.getLocation(),
                groomInitial,
                brideInitial,
                wedding.getGroom().toLowerCase(),
                wedding.getBride().toLowerCase(),
                dayOfWeek,
                formattedDate,
                formattedYear,
                invitationLink,
                invitationLink,
                groomInitial,
                brideInitial,
                DateTimeFormatter.ofPattern("dd/MM/yyyy").format(
                        wedding.getDate().toInstant().atZone(ZoneId.systemDefault()).toLocalDate().minusDays(10))
        );
    }
}