package ch.wiss.m426.passwort_manager.model;

import java.util.UUID;

public class PasswortEntry {
    private String id;
    private String name;
    private String username;
    private String password;
    private String createdAt;


    // Constructors
    public PasswortEntry() {}

    public PasswortEntry(String id, String name, String username, String password, String createdAt) {
        this.id = UUID.randomUUID().toString();
        this.name = name;
        this.username = username;
        this.password = password;
        this.createdAt = createdAt;
    }

    
    //Setters und Getters
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(String createdAt) {
        this.createdAt = createdAt;
    }


    
}
