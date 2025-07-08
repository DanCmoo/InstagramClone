package co.edu.udistrital.Comunicacion.models;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.sql.Timestamp;

@Data
@AllArgsConstructor
public class ModeloCorreo {
    private String email;
    private String username;
    private Timestamp timestamp;
}
