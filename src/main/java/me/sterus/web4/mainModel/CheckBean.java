package me.sterus.web4.mainModel;

import org.springframework.stereotype.Component;
import org.springframework.web.context.annotation.ApplicationScope;
import org.springframework.web.context.annotation.SessionScope;

import java.util.Date;

@Component
@ApplicationScope
public class CheckBean {

    private boolean checkHit(Double x, Double y, Double r){
        if(x <= 0 && y >= 0 && y <= x + r / 2){
            return true;
        }
        if(x <= 0 && y <= 0 && y >= -r / 2 && x >= -r){
            return true;
        }
        if(x >= 0 && y <= 0 && x * x + y * y <= r * r / 4){
            return true;
        }
        return false;
    }
    public HitInfo processHit(Double x, Double y, Double r){
        var isHit = checkHit(x, y, r);
        var nowTime = new Date().toString();
        return new HitInfo(x, y, r, isHit, nowTime);
    }
}
