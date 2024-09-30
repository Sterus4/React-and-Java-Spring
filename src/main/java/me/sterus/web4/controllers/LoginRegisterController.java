package me.sterus.web4.controllers;

import lombok.RequiredArgsConstructor;
import me.sterus.web4.model.User;
import me.sterus.web4.model.requestModel.LoginRequest;
import me.sterus.web4.model.requestModel.RegisterRequest;
import me.sterus.web4.repository.user.UserService;
import me.sterus.web4.security.JWTService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@CrossOrigin
public class LoginRegisterController {

    private final BCryptPasswordEncoder bCryptPasswordEncoder = new BCryptPasswordEncoder();
    private final UserService userService;
    private final JWTService jwtService;

    @GetMapping("/access")
    public ResponseEntity<String> checkAccess(){
        System.out.println("Пришел запрос на access от:" + SecurityContextHolder.getContext().getAuthentication().getName());
        return ResponseEntity.ok().body(SecurityContextHolder.getContext().getAuthentication().getName());
    }

    @PostMapping("/loginUser")
    public ResponseEntity<String> login(@RequestBody LoginRequest loginRequest){
        try {
            User user = userService.findUserByUsername(loginRequest.getUsername());
            if (!bCryptPasswordEncoder.matches(loginRequest.getPassword(), user.getPassword())){
                return ResponseEntity.badRequest().body("Неправильный пароль");
            }
            //Если все хорошо, надо выдать токен
            String token = jwtService.generateToken(user.getUsername());
            System.out.println("Сгенерированный токен для юзера: " + user.getUsername() + " : " + token);
            return ResponseEntity.ok().body(token);
        } catch (UsernameNotFoundException e){
            return ResponseEntity.badRequest().body("Пользователь не найден");
        }
    }

    @PostMapping("/registerUser")
    public ResponseEntity<String> register(@RequestBody RegisterRequest registerRequest){
        System.out.println(registerRequest.getUsername());
        try {
            userService.findUserByUsername(registerRequest.getUsername());
            return ResponseEntity.badRequest().body("Пользователь с таким именем уже существует");
        } catch (UsernameNotFoundException e){
            User user = new User();
            user.setUsername(registerRequest.getUsername());
            user.setPassword(bCryptPasswordEncoder.encode(registerRequest.getPassword()));
            userService.saveUser(user);
            return ResponseEntity.ok().body("Вы успешно зарегистрировались");
        }
    }

}

