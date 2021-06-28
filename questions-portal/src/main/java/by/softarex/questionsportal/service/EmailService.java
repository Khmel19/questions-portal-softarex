package by.softarex.questionsportal.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    private final JavaMailSender emailSender;


    @Autowired
    public EmailService(@Qualifier("getMailSender") JavaMailSender emailSender) {

        this.emailSender = emailSender;

    }


    public void sendSimpleMessage(String to, String whichMessage) {
        SimpleMailMessage message = new SimpleMailMessage();

        String text = generateMessage(whichMessage);
        String subject = generateSubject(whichMessage);
        message.setFrom("dealer-statistics@yandex.by");
        message.setTo(to);
        message.setSubject(subject);
        message.setText(text);
        emailSender.send(message);

    }


    private String generateMessage(String whichMessage) {
        if (whichMessage.equals("registration")) {
            return "Hello!" + " \n" +
                    "Welcome to Question Portal!";
        } else if (whichMessage.equals("deletion")){
            return "You have deleted your account on the Question Portal. Waiting for you again!";
        }
        return "";
    }

    private String generateSubject(String whichMessage){
        if (whichMessage.equals("registration")) {
            return "You created an account";
        }else if (whichMessage.equals("deletion")){
            return "You have deleted your account";
        }
        return "";
    }

}


