package ch.wiss.m426.passwort_manager.service;

import java.io.BufferedReader;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import org.springframework.stereotype.Service;

import ch.wiss.m426.passwort_manager.model.PasswortEntry;

@Service
public class CsvExportService {

    private static final String CSV_FILE_PATH = "passwords.csv";

    // Method to save a password entry to the CSV file
    public void saveToCsv(PasswortEntry entry) throws IOException {
        boolean fileExists = new java.io.File(CSV_FILE_PATH).exists();

        // If the entry doesn't have an id, generate one
        if (entry.getId() == null || entry.getId().isEmpty()) {
            entry.setId(UUID.randomUUID().toString());  // Generate a new ID
        }

        try (FileWriter writer = new FileWriter(CSV_FILE_PATH, true)) {
            if (!fileExists) {
                // If the file is new, add headers
                writer.append("Id,Name,Username,Password,CreatedAt\n");
            }
            // Append the entry data to the CSV
            writer.append(escape(entry.getId())).append(",");
            writer.append(escape(entry.getName())).append(",");
            writer.append(escape(entry.getUsername())).append(",");
            writer.append(escape(entry.getPassword())).append(",");
            writer.append(escape(entry.getCreatedAt())).append("\n");
        }
    }

    // Method to escape CSV special characters (like commas and quotes)
    private String escape(String value) {
        if (value.contains(",") || value.contains("\"")) {
            value = value.replace("\"", "\"\"");
            return "\"" + value + "\"";
        }
        return value;
    }

    // Method to read entries from the CSV file
    public List<PasswortEntry> readFromCsv() throws IOException {
        List<PasswortEntry> entries = new ArrayList<>();
        try (BufferedReader reader = new BufferedReader(new FileReader(CSV_FILE_PATH))) {
            String line;
            boolean firstLine = true;
    
            while ((line = reader.readLine()) != null) {
                if (firstLine) {
                    firstLine = false; // skip header
                    continue;
                }
    
                // Split into *exactly* 5 parts:
                String[] parts = line.split(",", 5);
                if (parts.length == 5) {
                    // Clean up quotes and whitespace on each field
                    String id        = parts[0].replaceAll("^\"|\"$", "").trim();
                    String name      = parts[1].replaceAll("^\"|\"$", "").trim();
                    String username  = parts[2].replaceAll("^\"|\"$", "").trim();
                    String password  = parts[3].replaceAll("^\"|\"$", "").trim();
                    String createdAt = parts[4].replaceAll("^\"|\"$", "").trim();
    
                    PasswortEntry entry = new PasswortEntry();
                    entry.setId(id);
                    entry.setName(name);
                    entry.setUsername(username);
                    entry.setPassword(password);
                    entry.setCreatedAt(createdAt);
                    entries.add(entry);
                } else {
                    System.out.println("Malformed CSV line (expected 5 fields): " + line);
                }
            }
        }
        return entries;
    }
    
    
    // Update an existing entry in the CSV
    public void updateEntry(PasswortEntry updatedEntry) throws IOException {
        List<PasswortEntry> entries = readFromCsv();
        System.out.println("Updating entry with ID: " + updatedEntry.getId());
        System.out.println("Current entries:");
        entries.forEach(e -> System.out.println(" - " + e.getId() + " | " + e.getName()));
        
        try (FileWriter writer = new FileWriter(CSV_FILE_PATH)) {
            writer.append("Id,Name,Username,Password,CreatedAt\n");
            boolean found = false;
            
            for (PasswortEntry entry : entries) {
                if (entry.getId().equals(updatedEntry.getId())) {
                    System.out.println("Found matching entry. Updating...");
                    found = true;
                    // Write updated entry
                    writer.append(escape(updatedEntry.getId())).append(",");
                    writer.append(escape(updatedEntry.getName())).append(",");
                    writer.append(escape(updatedEntry.getUsername())).append(",");
                    writer.append(escape(updatedEntry.getPassword())).append(",");
                    writer.append(escape(updatedEntry.getCreatedAt())).append("\n");
                } else {
                    // Write existing entry
                    writer.append(escape(entry.getId())).append(",");
                    writer.append(escape(entry.getName())).append(",");
                    writer.append(escape(entry.getUsername())).append(",");
                    writer.append(escape(entry.getPassword())).append(",");
                    writer.append(escape(entry.getCreatedAt())).append("\n");
                }
            }
            
            if (!found) {
                System.out.println("Warning: No entry found with ID " + updatedEntry.getId());
            }
        }
    }

    // Delete an entry by ID from the CSV
    public void deleteEntryById(String id) throws IOException {
        List<PasswortEntry> entries = readFromCsv();
        try (FileWriter writer = new FileWriter(CSV_FILE_PATH)) {
            // Write header
            writer.append("Id,Name,Username,Password,CreatedAt\n");
            for (PasswortEntry entry : entries) {
                if (!entry.getId().equals(id)) {
                    writer.append(escape(entry.getId())).append(",");
                    writer.append(escape(entry.getName())).append(",");
                    writer.append(escape(entry.getUsername())).append(",");
                    writer.append(escape(entry.getPassword())).append(",");
                    writer.append(escape(entry.getCreatedAt())).append("\n");
                }
            }
        }
    }      
}
