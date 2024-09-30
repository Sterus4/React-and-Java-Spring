package me.sterus.web4.repository.hit;

import jakarta.transaction.Transactional;
import me.sterus.web4.model.Hit;
import me.sterus.web4.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface HitRepository extends JpaRepository<Hit, Long> {
    List<Hit> findAllByUser(User user);
    @Transactional
    void deleteAllByUser(User user);

}
