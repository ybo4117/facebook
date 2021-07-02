package com.koreait.facebook.feed.model;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter @Setter @ToString
public class FeedCmtEntity {
    private int icmt;
    private int iuser;
    private int ifeed;
    private String cmt;
    private String regdt;

}
