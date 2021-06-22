package com.koreait.facebook;

import com.koreait.facebook.common.EmailService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
class FacebookApplicationTests {

    @Autowired
    private EmailService emailService;

    @Test
    void sendEmail() {
        String to = "ybo4117@naver.com";
        String subject = "제목임";
        String txt = "내용임 <a href=\"http://localhost:8090/user/login\">로그인으로 이동</a>" ;
        // <a href=\"http://localhost:8090/user/login\">로그인으로 이동 </a> 이렇게 txt에 보내면 a태그 안먹힘
        emailService.sendSimpleMessage(to, subject, txt);
    }

}
