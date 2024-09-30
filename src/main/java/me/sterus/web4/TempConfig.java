package me.sterus.web4;

import me.sterus.web4.mainModel.DataBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.context.annotation.SessionScope;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class TempConfig implements WebMvcConfigurer {

    @Bean
    @SessionScope
    public DataBean makeDataBean(){
        return new DataBean();
    }

}