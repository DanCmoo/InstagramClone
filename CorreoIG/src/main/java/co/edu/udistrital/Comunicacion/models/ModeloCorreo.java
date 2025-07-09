package co.edu.udistrital.Comunicacion.models;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.sql.Timestamp;


@AllArgsConstructor
public class ModeloCorreo {
    private String email;
    private String username;
    private Timestamp timestamp;

    public ModeloCorreo() {
    }
    public ModeloCorreo(String email, String username) {
        this.email = email;
        this.username = username;
        this.timestamp = new Timestamp(System.currentTimeMillis());
    }
    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public Timestamp getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(Timestamp timestamp) {
        this.timestamp = timestamp;
    }
}
