package co.edu.udistrital.Comunicacion.Controladores;
import co.edu.udistrital.Comunicacion.Service.impl.ServicioCorreoLogin;
import co.edu.udistrital.Comunicacion.Service.impl.ServicioCorreoRegistro;
import co.edu.udistrital.Comunicacion.models.ModeloCorreo;
import jakarta.mail.MessagingException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

// Indica que esta clase es un controlador REST de Spring
@RestController
// Define el mapeo base para las solicitudes HTTP
@RequestMapping("/comunicacion")
public class ControlCorreo {

    // Inyección de dependencia para el servicio de correo estándar
    @Autowired
    private ServicioCorreoRegistro servicioCorreoRegistro;

    // Inyección de dependencia para el servicio de correo amor
    @Autowired
    private ServicioCorreoLogin servicioCorreoLogin;

    // Maneja las solicitudes POST a /comunicacion/correo
    /**
     * Maneja las solicitudes POST para enviar un correo electrónico estándar.
     *
     * @param correo El modelo de correo que contiene la información necesaria para enviar el correo.
     * @return Una ResponseEntity que indica el resultado de la operación.
     */
    @PostMapping("/registered")
    private ResponseEntity<String> sendEmailRegister(@RequestBody ModeloCorreo correo) {
        try {
            // Llama al servicio para enviar el correo de registro
            servicioCorreoRegistro.enviarCorreo(correo);
        } catch (MessagingException ex) {
            // Maneja la excepción en caso de error al enviar el correo
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error al enviar el correo");
        }

        // Retorna una respuesta exitosa si el correo se envió correctamente
        return ResponseEntity.ok("Correo enviado correctamente");
    }

    /**
     * Maneja las solicitudes POST para enviar un correo electrónico de amor.
     *
     * @param correo El modelo de correo que contiene la información necesaria para enviar el correo.
     * @return Una ResponseEntity que indica el resultado de la operación.
     */
    @PostMapping("/logged")
    private ResponseEntity<String> sendEmailLogin(@RequestBody ModeloCorreo correo) {
        try {
            // Llama al servicio para enviar el correo de login
            servicioCorreoLogin.enviarCorreo(correo);
        } catch (MessagingException ex) {
            // Maneja la excepción en caso de error al enviar el correo
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error al enviar el correo");
        }

        // Retorna una respuesta exitosa si el correo se envió correctamente
        return ResponseEntity.ok("Correo enviado correctamente");
    }

}

