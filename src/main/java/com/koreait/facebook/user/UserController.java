package com.koreait.facebook.user;


import com.koreait.facebook.common.MyConst;
import com.koreait.facebook.feed.model.FeedDTO;
import com.koreait.facebook.feed.model.FeedDomain2;
import com.koreait.facebook.security.UserDetailsImpl;
import com.koreait.facebook.user.model.UserEntity;
import com.koreait.facebook.user.model.UserProfileEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.stereotype.Service;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.HashMap;
import java.util.List;
import java.util.Map;


@Controller
@RequestMapping("/user")
public class UserController {
    @Autowired
    private UserService service;

    @Autowired
    private MyConst myConst;

    @GetMapping("/login")
    public void login(@ModelAttribute UserEntity userEntity){}

    @GetMapping("/join")
    //@ModelAttribute 빼도된다
    //그래서 postmpping에는 안쓴거임
    public void join(@ModelAttribute UserEntity userEntity){}

    @PostMapping("/join")
    public String joinProc(UserEntity userEntity){
        service.join(userEntity);
        return "redirect:login?needEmail=1";
    }

    @GetMapping("/auth")
    public String auth(UserEntity param){
        int result = service.auth(param);
        return "redirect:login?auth=" + result;
    }

    @GetMapping("/profile")
    public void profile(Model model, UserEntity param,@AuthenticationPrincipal UserDetailsImpl userDetails) {
        System.out.println(param);
        if(param.getIuser() == 0){
            param.setIuser(userDetails.getUser().getIuser());
        }

        //UserEntity loginUser = userDetails.getUser();
        model.addAttribute(myConst.PROFILE, service.selUserProfile(param));
        model.addAttribute(myConst.PROFILE_LIST, service.selUserProfileList(param));
    }

    @PostMapping("/profileImg")
    public String profileImg(MultipartFile[] imgArr){
        service.profileImg(imgArr);
        return "redirect:profile";
    }

    @ResponseBody
    @GetMapping("/mainProfile")
    public Map<String, Object> mainProfile(UserProfileEntity param) {
        return service.updUserMainProfile(param);
    }

    @ResponseBody
    @GetMapping("/feedList")
    public List<FeedDomain2> selFeedList2(FeedDTO param) {
        return service.selFeedList2(param);
    }

}
