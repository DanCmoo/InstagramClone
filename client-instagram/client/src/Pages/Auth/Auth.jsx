import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Signin from "../../Components/Register/Signin";
import Signup from "../../Components/Register/Singup";
import "./Auth.css" 

const Auth = () => {
  const location=useLocation();
  const navigate = useNavigate();

  // Si estamos en la ruta raíz, redirigir a /login
  useEffect(() => {
    if (location.pathname === "/") {
      navigate("/login", { replace: true });
    }
  }, [location.pathname, navigate]);
  return (
    <>
      <div>
        <div className="flex items-center justify-center h-[100vh]">
          <div className="relative mr-10 hidden lg:block">
            <div style={{ height: '80vh', display: 'flex', alignItems: 'center' }}>
              <img
                style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }}
                src="/instagram-web-lox-image.png"
                alt="Página principal de Instagram"
              />
            </div>
          </div>

          <div className="form md:w-[35vw] lg:w-[22vw]">
            {location.pathname === "/signup" ? <Signup/> : <Signin/>}
          </div>
        </div>
      </div>
      <footer className="w-full flex flex-col items-center mt-10 text-xs text-gray-500">
        <div className="flex flex-wrap justify-center gap-4 mb-2">
          <a href="https://about.meta.com/" target="_blank" rel="noopener noreferrer">Meta</a>
          <a href="https://about.instagram.com/" target="_blank" rel="noopener noreferrer">Información</a>
          <a href="https://about.instagram.com/blog/" target="_blank" rel="noopener noreferrer">Blog</a>
          <a href="https://about.instagram.com/about-us/careers" target="_blank" rel="noopener noreferrer">Empleo</a>
          <a href="https://help.instagram.com/" target="_blank" rel="noopener noreferrer">Ayuda</a>
          <a href="https://developers.facebook.com/docs/instagram" target="_blank" rel="noopener noreferrer">API</a>
          <a href="/legal/privacy/" target="_blank" rel="noopener noreferrer">Privacidad</a>
          <a href="/legal/terms/" target="_blank" rel="noopener noreferrer">Condiciones</a>
          <a href="/explore/locations/" target="_blank" rel="noopener noreferrer">Ubicaciones</a>
          <a href="/web/lite/" target="_blank" rel="noopener noreferrer">Instagram Lite</a>
          <a href="https://www.threads.com/" target="_blank" rel="noopener noreferrer">Threads</a>
          <a href="https://www.facebook.com/help/instagram/261704639352628" target="_blank" rel="noopener noreferrer">Importación de contactos</a>
        </div>
        <div className="mb-2">
          <select className="border rounded px-2 py-1 text-xs">
            <option value="es">Español</option>
            <option value="en">English</option>
            <option value="pt">Português</option>
            <option value="fr">Français</option>
          </select>
        </div>
        <div className="mb-4">© 2025 Instagram from Meta</div>
      </footer>
    </>
  );
};

export default Auth;

// https://res.cloudinary.com/dnbw04gbs/image/upload/v1679490221/screenshot4_hb7xtr.png
//
// 
// 