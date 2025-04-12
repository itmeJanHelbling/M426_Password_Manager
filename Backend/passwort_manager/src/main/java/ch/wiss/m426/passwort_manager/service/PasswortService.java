package ch.wiss.m426.passwort_manager.service;

import org.springframework.stereotype.Service;
import java.security.SecureRandom;
import java.util.Set;

@Service
public class PasswortService {

    private static final String LETTERS = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    private static final String NUMBERS = "0123456789";
    private static final String SPECIAL_CHARS = "!@#$%^&*()_-+=<>?/{}~|";
    private static final Set<Integer> ALLOWED_LENGTHS = Set.of(8, 12, 16);
    private static final SecureRandom random = new SecureRandom();

    public String generatePassword(int length, boolean includeNumbers, boolean includeSpecialChars) {
        if (!ALLOWED_LENGTHS.contains(length)) {
            throw new IllegalArgumentException("Nur Längen 8, 12 oder 16 sind erlaubt.");
        }

        StringBuilder password = new StringBuilder();
        String characters = LETTERS;
        
        // Mindestanzahl an Zahlen und Sonderzeichen sicherstellen
        int numbersCount = includeNumbers ? Math.max(2, length / 4) : 0;
        int specialCharsCount = includeSpecialChars ? Math.max(2, length / 4) : 0;
        int lettersCount = length - numbersCount - specialCharsCount;

        // Buchstaben hinzufügen
        for (int i = 0; i < lettersCount; i++) {
            password.append(LETTERS.charAt(random.nextInt(LETTERS.length())));
        }

        // Zahlen hinzufügen
        if (includeNumbers) {
            for (int i = 0; i < numbersCount; i++) {
                password.append(NUMBERS.charAt(random.nextInt(NUMBERS.length())));
            }
        }

        // Sonderzeichen hinzufügen
        if (includeSpecialChars) {
            for (int i = 0; i < specialCharsCount; i++) {
                password.append(SPECIAL_CHARS.charAt(random.nextInt(SPECIAL_CHARS.length())));
            }
        }

        // Passwort mischen
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