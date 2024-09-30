package me.sterus.web4.repository.hit;

import lombok.RequiredArgsConstructor;
import me.sterus.web4.mainModel.HitInfo;
import me.sterus.web4.model.Hit;
import me.sterus.web4.model.User;
import me.sterus.web4.repository.user.UserService;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.function.Consumer;

@RequiredArgsConstructor
@Service
public class HitService {
    private final HitRepository hitRepository;
    private final UserService userService;

    private List<HitInfo> hitToHitInfo(List<Hit> local){
        List<HitInfo> result = new ArrayList<>();
        local.forEach(new Consumer<Hit>() {
            @Override
            public void accept(Hit hit) {
                result.add(new HitInfo(hit.getX(), hit.getY(), hit.getR(), hit.getIsHit(), hit.getDate()));
            }
        });
        return result;
    }
    public List<HitInfo> getAllUserHits(String username){
        User user = userService.findUserByUsername(username);
        List<Hit> local =  hitRepository.findAllByUser(user);
        return hitToHitInfo(local);
    }

    public String deleteAllByUsername(String username){
        User user = userService.findUserByUsername(username);
        hitRepository.deleteAllByUser(user);
        return "Все точки пользователя " + username + " удалены";
    }

    public void saveHit(HitInfo hit, String username){
        User user = userService.findUserByUsername(username);
        hitRepository.save(new Hit(hit.getX(), hit.getY(), hit.getR(), hit.getIsHit(), hit.getHitDate(), user));
    }
}
