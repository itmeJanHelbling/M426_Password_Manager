package ch.wiss.m426.passwort_manager.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/")
public class Passwort_Controller {
    
    @GetMapping("generate")
    public String generatePassword() {
        // Beispiel für ein einfaches Passwort (16 Zeichen lang)
        return generateRandomPassword();
    }

    private String generateRandomPassword() {
        int length = 16;
        String chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()-_=+";
        StringBuilder password = new StringBuilder(length);
        
        for (int i = 0; i < length; i++) {
            int randomIndex = (int) (Math.random() * chars.length());
            password.append(chars.charAt(randomIndex));
        }
        
        return password.toString();
    }

}
