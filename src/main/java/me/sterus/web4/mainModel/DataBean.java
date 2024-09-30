package me.sterus.web4.mainModel;

import jakarta.annotation.PostConstruct;
import lombok.Getter;

import java.util.ArrayList;
import java.util.List;

@Getter
public class DataBean {
    private List<HitInfo> mainHitList;

    @PostConstruct
    public void initList(){
        this.mainHitList = new ArrayList<>();
    }

    public void saveHitInfoToHistory(HitInfo hitInfo){
        mainHitList.add(hitInfo);
    }

}
