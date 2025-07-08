import { Form } from "formik";
import React from "react";
import "./Register.css";

const Register = () => {
  return (
    <div>
      <div className="flex">
        <div>
            <img
            className="h-[80vh]"
          src="/instagram-web-lox-image.png"
          alt="Página principal de Instagram"
        />
        </div>
        
        <div className="">
          <img
            src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
            alt="Instagram Logo"
          />

          <form>
            <input type="text" placeholder="Usuario" />
            <input type="password" placeholder="Contraseña" />
            <button type="submit">Iniciar sesión</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
