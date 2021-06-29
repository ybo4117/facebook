package com.koreait.facebook.feed;

import com.koreait.facebook.common.MyConst;
import com.koreait.facebook.feed.model.FeedEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import java.util.HashMap;
import java.util.Map;

@Controller
@RequestMapping("/feed")
public class FeedController {

    @Autowired private FeedService service;
    @Autowired private MyConst myConst;


    @GetMapping("/home")
    public void home(){ }

    @GetMapping("/reg")
    public void reg(FeedEntity param) { }

    @ResponseBody
    @PostMapping("/reg")
    public Map<String, Integer> reg(MultipartFile[] imgArr, FeedEntity param){
        // ~~. << .은 null이면 에러터진다
        // System.out.println("length : " + imgArr.length);
        // System.out.println(param);

        Map<String, Integer> res = new HashMap<>();
        res.put(myConst.RESULT, service.reg(imgArr, param));
        return res;
    }

}
