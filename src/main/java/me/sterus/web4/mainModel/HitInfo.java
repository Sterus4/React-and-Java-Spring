package me.sterus.web4.mainModel;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class HitInfo {
    Double x;
    Double y;
    Double r;
    Boolean isHit;
    String hitDate;
    public HitInfo(){

    }

    public HitInfo(Double x, Double y, Double r, Boolean isHit, String hitDate) {
        this.x = x;
        this.y = y;
        this.r = r;
        this.isHit = isHit;
        this.hitDate = hitDate;
    }
}
