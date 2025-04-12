package ch.wiss.m426.passwort_manager.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import ch.wiss.m426.passwort_manager.service.PasswortService;

@RestController
@RequestMapping("/api/")
public class Passwort_Controller {

    @Autowired
    private PasswortService passwordService;

    @GetMapping("/generate")
    public ResponseEntity<?> generatePassword(
            @RequestParam int length,
            @RequestParam boolean includeNumbers,
            @RequestParam boolean includeSpecialChars) {

        try {
            String password = passwordService.generatePassword(length, includeNumbers, includeSpecialChars);
            return ResponseEntity.ok(password);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
