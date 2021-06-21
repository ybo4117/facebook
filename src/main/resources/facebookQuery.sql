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