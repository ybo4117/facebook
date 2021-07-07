package com.koreait.facebook.security;

import com.koreait.facebook.user.model.UserEntity;
import lombok.Getter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;

// 인증 순서임 보셈
/*인증 순서

    처음에 요청이 들어오면 AuthenticationFilter(UsernamePassAuthenticationFilter)를 거친다.

        우리는 요청에 따른 UsernamePasswordAuthenticationToken을 생성한다. (Authentication 인터페이스의 구현체다.)

        UsernamePasswordAuthenticationToken(Token이라고 하겠다.)을 AuthenticationManager에게 이 Token은 옳바른 유저인지 물어본다.

        AuthenticationManager는 1개 이상의 Provider를 갖고 있는데, Provider는 Token(Authentication의 구현체) 객체를 적절히 판단하여 인증처리를 한다.

        우리가 직접 구현한 서비스에 해당 유저에게 인증요청을 보낸다.

        인증된 유저라고 판단되면 적절한 User DTO객체를 전달한다.

        인증된 결과를 SecurityContextHolder에 저장한다.
     */


public class UserDetailsImpl implements UserDetails {

    @Getter
    private UserEntity user;

    public UserDetailsImpl(UserEntity user){
        this.user = user;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return null;
    }

    @Override
    public String getPassword() {
        return user.getPw();
    }

    @Override
    public String getUsername() {
        return user.getEmail();
    }



    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}


