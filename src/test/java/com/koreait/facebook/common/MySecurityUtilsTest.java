package com.koreait.facebook.common;

import groovyjarjarantlr4.v4.runtime.ParserInterpreter;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.text.CollationElementIterator;
import java.util.Random;

import static org.junit.jupiter.api.Assertions.*;


@SpringBootTest
class MySecurityUtilsTest {
    @Autowired
    private MySecurityUtils utils;

    @Test
    public void test1(){
        int len = 5;
        String val = utils.getRandomStringValue(len);
        System.out.println("val : " + val);
        assertEquals(val.length(), len);

        String val2 = utils.getRandomStringValue(len);
        assertEquals(val2.length(), len);

        assertEquals(val, val2);

        System.out.println("val : " + val);
        System.out.println("val2 : " + val2);
    }

}