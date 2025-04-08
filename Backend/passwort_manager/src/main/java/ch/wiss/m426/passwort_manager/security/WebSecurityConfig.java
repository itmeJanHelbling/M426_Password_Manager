package ch.wiss.m426.passwort_manager.security;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebSecurityConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")  // Alle Endpunkte
                .allowedOrigins("http://localhost:5174")  // Das Frontend (hier anpassen)
                .allowedMethods("GET", "POST", "PUT", "DELETE")  // Welche HTTP-Methoden erlaubt sind
                .allowedHeaders("*")  // Alle Header erlauben
                .allowCredentials(true);  // Falls Cookies oder Auth-Daten verwendet werden
    }
}

