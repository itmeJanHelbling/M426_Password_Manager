package ch.wiss.m426.passwort_manager.controller;

import java.io.IOException;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import ch.wiss.m426.passwort_manager.model.PasswortEntry;
import ch.wiss.m426.passwort_manager.service.CsvExportService;
import ch.wiss.m426.passwort_manager.service.PasswortService;

@RestController
@RequestMapping("/api/")
public class Passwort_Controller {

    @Autowired
    private PasswortService passwordService;

    @Autowired
    private CsvExportService csvExportService;

    // Get Mapping um eine Passwort zu generieren
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

    //Post Mapping um ein Eintrag zu speichern
     @PostMapping("/save")
    public String savePassword(@RequestBody PasswortEntry entry) {
        try {
            // Optional: Add timestamp server-side
            entry.setCreatedAt(LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")));
            csvExportService.saveToCsv(entry);
            return "Gespeichert!";
        } catch (IOException e) {
            e.printStackTrace();
            return "Fehler beim Speichern";
        }
    }

    //Get Mapping um alle Passwörter auszulesen
    @GetMapping("/passwords/")
    public List<PasswortEntry> getAllPasswords(){
        try{
            return csvExportService.readFromCsv();
        } catch (IOException e){
            e.printStackTrace();
            return List.of(); // return empty list on error
        }
    }

    //Put Mapping um einen Eintrag anzupassen
    @PutMapping("/passwords/{id}")
    public ResponseEntity<String> updatePassword(@PathVariable String id, @RequestBody PasswortEntry updatedEntry) {
        try {
            updatedEntry.setId(id); // Ensure ID from path is used
            csvExportService.updateEntry(updatedEntry);
            return ResponseEntity.ok("Eintrag erfolgreich aktualisiert.");
        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().body("Fehler beim Aktualisieren.");
        }
    }

    //Delete Mapping um ein Eintrag zu löschen
    @DeleteMapping("/passwords/{id}")
    public ResponseEntity<String> deletePassword(@PathVariable String id) {
        try {
            csvExportService.deleteEntryById(id);
            return ResponseEntity.ok("Eintrag erfolgreich gelöscht.");
        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().body("Fehler beim Löschen.");
        }
    }
}

