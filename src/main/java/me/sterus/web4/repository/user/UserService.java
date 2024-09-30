package me.sterus.web4.repository.user;

import lombok.RequiredArgsConstructor;
import me.sterus.web4.model.User;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;
    public User findUserByUsername(String username){
        return userRepository.findByUsername(username).orElseThrow(() -> new UsernameNotFoundException("Такого пользователя не существует"));
    }

    public void saveUser(User user){
        userRepository.save(user);
    }
}
