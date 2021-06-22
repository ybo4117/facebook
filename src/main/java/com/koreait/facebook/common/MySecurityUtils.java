package com.koreait.facebook.common;


import org.springframework.stereotype.Component;

import java.util.Random;

@Component
public class MySecurityUtils {
    public int getRandomNumber(int sNum, int eNum){
        return (int)(Math.random() * (eNum - sNum + 1)) + sNum;
    }

    // len길이만큼의 랜덤한 숫자(0~9)를 문자열로 리턴
    public String getRandomStringValue(int len){
        StringBuilder sb = new StringBuilder();
        for(int i = 0 ; i < len ; i++){
            sb.append(getRandomNumber(0 , 9));
        }
        return sb.toString();

//        Random ran = new Random();
//        len = ran.nextInt(10);
//        String size="";
//        System.out.println("len :" +len);
//        for(int i = 1 ; i <= len ; i++){
//            size += " ";
//        }
//        return size;
    }

    // 숫자 + 영문자 랜덤하게 만드는 문자열 리턴 10 > ex) : "1ab9Dl7"
    /*
    public String getRandomString(int len){ }
     */
}
