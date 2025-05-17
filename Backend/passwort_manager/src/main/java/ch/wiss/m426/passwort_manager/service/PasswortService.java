package ch.wiss.m426.passwort_manager.service;

import org.springframework.stereotype.Service;
import java.security.SecureRandom;
import java.util.Set;

@Service
public class PasswortService {

    private static final String LETTERS = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    private static final String NUMBERS = "0123456789";
    private static final String SPECIAL_CHARS = "!@#$%&*_-+=?/";
    private static final Set<Integer> ALLOWED_LENGTHS = Set.of(8, 12, 16);
    private static final SecureRandom random = new SecureRandom();

    public String generatePassword(int length, boolean includeNumbers, boolean includeSpecialChars) {
        if (!ALLOWED_LENGTHS.contains(length)) {
            throw new IllegalArgumentException("Nur Längen 8, 12 oder 16 sind erlaubt.");
        }
    
        StringBuilder characterPool = new StringBuilder(LETTERS);
        StringBuilder password = new StringBuilder();
    
        // Platz für garantierte Zeichen reservieren
        if (includeNumbers) {
            char number = NUMBERS.charAt(random.nextInt(NUMBERS.length()));
            password.append(number);
            characterPool.append(NUMBERS);
        }
        if (includeSpecialChars) {
            char special = SPECIAL_CHARS.charAt(random.nextInt(SPECIAL_CHARS.length()));
            password.append(special);
            characterPool.append(SPECIAL_CHARS);
        }
    
        // Restliche Zeichen zufällig aus dem Pool wählen
        while (password.length() < length) {
            int index = random.nextInt(characterPool.length());
            password.append(characterPool.charAt(index));
        }
    
        // Zeichen mischen und zurückgeben
        return shuffleString(password.toString());
    }
    
    

    private String shuffleString(String input) {
        char[] characters = input.toCharArray();
        for (int i = 0; i < characters.length; i++) {
            int randomIndex = random.nextInt(characters.length);
            char temp = characters[i];
            characters[i] = characters[randomIndex];
            characters[randomIndex] = temp;
        }
        return new String(characters);
    }
}