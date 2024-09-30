package me.sterus.web4.controllers;

import lombok.RequiredArgsConstructor;
import me.sterus.web4.mainModel.CheckBean;
import me.sterus.web4.mainModel.DataBean;
import me.sterus.web4.mainModel.HitInfo;
import me.sterus.web4.repository.hit.HitService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.context.request.RequestContextHolder;

import java.util.*;


@CrossOrigin(maxAge = 3600)
@RestController
@RequiredArgsConstructor
public class MainController {
    private final HitService hitService;

    @Autowired
    private final CheckBean mainCheckBean;

    @CrossOrigin("http://localhost:3000/")
    @GetMapping("/dots")
    @ResponseBody
    public List<HitInfo> getAll(){
        return hitService.getAllUserHits(SecurityContextHolder.getContext().getAuthentication().getName());
    }

    @CrossOrigin("http://localhost:3000/")
    @GetMapping("/dots/deleteAll")
    @ResponseBody
    public String deleteAll(){
        return hitService.deleteAllByUsername(SecurityContextHolder.getContext().getAuthentication().getName());
    }
    @CrossOrigin("http://localhost:3000/")
    @PostMapping("/dots/check")
    @ResponseBody
    public List<HitInfo> greetUser(@RequestBody @Validated Map<String, Double> ajaxData){

        var tempResult = mainCheckBean.processHit(ajaxData.get("X"), ajaxData.get("Y"), ajaxData.get("R"));
        hitService.saveHit(tempResult, SecurityContextHolder.getContext().getAuthentication().getName());

        return hitService.getAllUserHits(SecurityContextHolder.getContext().getAuthentication().getName());


    }
}
