package co.edu.udistrital.Comunicacion.Service.impl;
import co.edu.udistrital.Comunicacion.Service.iServicioCorreo;
import co.edu.udistrital.Comunicacion.models.ModeloCorreo;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;

// Indica que esta clase es un servicio de Spring
@Service
public class ServicioCorreoLogin implements iServicioCorreo {

    // Inyección de dependencias
    private final JavaMailSender javaMailSender;
    private final TemplateEngine templateEngine;

    // Constructor para inyectar JavaMailSender y TemplateEngine
    public ServicioCorreoLogin(JavaMailSender javaMailSender, TemplateEngine templateEngine) {
        this.javaMailSender = javaMailSender;
        this.templateEngine = templateEngine;
    }

    // Implementación del método enviarCorreo definido en la interfaz iServicioCorreo
    @Override
    public void enviarCorreo(ModeloCorreo correo) throws MessagingException {
        // Crear el primer mensaje de correo electrónico
        MimeMessage mensaje = javaMailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(mensaje, true, "UTF-8");
        helper.setTo(correo.getEmail()); // Establece el destinatario
        helper.setSubject("Inicio de sesión detectado"); // Establece el asunto del correo

        // Configurar el contexto para la plantilla de correo
        Context context = new Context();
        context.setVariable("username", correo.getUsername());
        context.setVariable("email", correo.getEmail());
        context.setVariable("timeLogged", correo.getTimestamp());

        // Procesar la plantilla de correo y generar el contenido HTML
        String contenidoHTML = templateEngine.process("Login", context);
        helper.setText(contenidoHTML, true); // Establece el contenido del correo
        javaMailSender.send(mensaje); // Envía el correo

    }
}