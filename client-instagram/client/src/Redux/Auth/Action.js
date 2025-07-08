// ${BASE_URL}


import { BASE_URL } from "../../Config/api";
import { sendRegistrationEmail, sendLoginEmail } from "../../Config/EmailService";
import { SIGN_IN, SIGN_UP, LOGOUT } from "./ActionType";

import { getUserProfileAction } from "../User/Action";

export const signinAction = (data) => async (dispatch) => {
  try {
    const res = await fetch(`${BASE_URL}/signin`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Basic " + btoa(data.email + ":" + data.password),
      },
    });
    
    if (res.ok) {
      const token = res.headers.get("Authorization");
      if (token) {
        localStorage.setItem("token", token);
        console.log("token from header :- ", token);
        dispatch({type:SIGN_IN,payload:token});
        
        // Inmediatamente después de obtener el token, obtener el perfil del usuario
        const userProfile = await dispatch(getUserProfileAction(token));
        
        // Enviar notificación por correo de login exitoso
        // Usamos el email del login y el username del perfil obtenido
        if (userProfile && userProfile.username) {
          await sendLoginEmail(data.email, userProfile.username);
        } else {
          // Si no se pudo obtener el perfil, usar solo el email
          console.warn("No se pudo obtener el perfil del usuario para el email de login");
          await sendLoginEmail(data.email, "unknown");
        }
      }
    } else {
      console.log("Login failed with status:", res.status);
      throw new Error("Credenciales inválidas");
    }
  } catch (error) {
    console.log("catch error ", error);
    throw error;
  }
};

export const signupAction = (data) => async (dispatch) => {
  try {
    const res = await fetch(`${BASE_URL}/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    
    if (res.ok) {
      const user = await res.json();
      console.log("Signup :- ",user)
      dispatch({ type: SIGN_UP, payload: user });
      
      // Enviar notificación por correo de registro exitoso
      await sendRegistrationEmail(data.email, data.username);
    } else {
      console.log("Signup failed with status:", res.status);
      throw new Error("Error en el registro");
    }
  } catch (error) {
    console.log("catch error ", error);
    throw error;
  }
};

export const logoutAction = () => (dispatch) => {
  localStorage.clear();
  
  // Despachar LOGOUT a todos los reducers
  dispatch({ type: LOGOUT });
  
  // Esto asegura que todos los reducers que manejen LOGOUT se reseteen
  console.log("Usuario desconectado exitosamente");
};
