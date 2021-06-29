CREATE TABLE t_user(
    iuser INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    email VARCHAR(50) UNIQUE NOT NULL,
    pw VARCHAR(100) NOT NULL,
    nm VARCHAR(5) NOT NULL,
    tel CHAR(13),
    authCd CHAR(5) COMMENT '회원I 인증코드, null 이면 인증, 아니면 인증안됨',
    regdt DATETIME DEFAULT NOW(),
    INDEX idx_auth_cd (`authCd`)
);

CREATE TABLE t_user_profile(
    iprofile INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    iuser INT UNSIGNED,
    img VARCHAR(50),
    regdt DATETIME DEFAULT NOW(),
    FOREIGN KEY(iuser) REFERENCES t_user(iuser)
);

CREATE TABLE t_feed (
                        ifeed INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
                        location VARCHAR(20),
                        ctnt TEXT,
                        iuser INT UNSIGNED NOT NULL,
                        regdt DATETIME DEFAULT NOW(),
                        FOREIGN KEY (iuser) REFERENCES t_user(iuser)
);



CREATE TABLE t_feed_img(
                           ifeedimg INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
                           ifeed INT UNSIGNED NOT NULL,
                           img VARCHAR(50) NOT NULL,
                           FOREIGN KEY (ifeed) REFERENCES t_feed(ifeed)
);