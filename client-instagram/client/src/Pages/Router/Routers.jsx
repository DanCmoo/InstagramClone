import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";

import StoryPage from "../../Components/Demo/Demo";
import Sidebar from "../../Components/Sidebar/Sidebar";
import { getUserProfileAction } from "../../Redux/User/Action";
import Auth from "../Auth/Auth";
import EditProfilePage from "../EditProfile/EditProfilePage";
import HomePage from "../HomePage/HomePage";
import Profile from "../Profile/Profile";
import Story from "../Story/Story";
import ReelViewer from "../ReelViewer/ReelViewer";

const Routers = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const reqUser = useSelector(store=>store.user.reqUser);
  const token = localStorage.getItem("token");
  const dispatch = useDispatch();
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(()=>{
    if (token && !reqUser) {
      dispatch(getUserProfileAction(token));
    } else {
      setIsInitialized(true);
    }
 },[token, reqUser, dispatch]);

  // Marcar como inicializado cuando se obtiene el usuario o no hay token
  useEffect(() => {
    if (reqUser || !token) {
      setIsInitialized(true);
    }
  }, [reqUser, token]);

  // Redirigir a login si no hay token al cargar la aplicación
  useEffect(() => {
    if (isInitialized && !token && location.pathname !== "/login" && location.pathname !== "/signup") {
      navigate("/login", { replace: true });
    }
  }, [isInitialized, token, location.pathname, navigate]);

  // Si el usuario está autenticado y está en login/signup, redirigir al perfil
  useEffect(() => {
    if (isInitialized && token && reqUser && reqUser.username && (location.pathname === "/login" || location.pathname === "/signup")) {
      navigate(`/${reqUser.username}`, { replace: true });
    }
  }, [isInitialized, token, reqUser, location.pathname, navigate]);

  // Si no hay token pero reqUser existe (inconsistencia), limpiar estado
  useEffect(() => {
    if (isInitialized && !token && reqUser) {
      // Esto puede pasar si se elimina manualmente el token del localStorage
      navigate("/login", { replace: true });
    }
  }, [isInitialized, token, reqUser, navigate]);

  // Mostrar un loader mientras se inicializa
  if (!isInitialized) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-lg">Cargando...</div>
      </div>
    );
  }
  return (
    <div>
{(token && reqUser && location.pathname !== "/login" && location.pathname !== "/signup") && (
    <div className="flex">
      {location.pathname!=="/reels" && <div className="sidebarBox border border-l-slate-500 w-[20%]">
        <Sidebar />
      </div>}
      <div className="w-full">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/p/:postId" element={<HomePage />} />
          <Route path="/p/:postId/edit" element={<HomePage />} />
          <Route path="/:username" element={<Profile />} />
          <Route path="/demo" element={<StoryPage />} />
          <Route path="/story/:userId" element={<Story />} />
          <Route path="/account/edit" element={<EditProfilePage />} />
          <Route path="/reels" element={<ReelViewer />} />
        </Routes>
      </div>
    </div>
  )}
  {(!token || !reqUser || location.pathname === "/login" || location.pathname === "/signup") && (
    <Routes>
      <Route path="/login" element={<Auth />} />
      <Route path="/signup" element={<Auth />} />
      <Route path="/" element={<Auth />} />
      <Route path="*" element={<Auth />} />
    </Routes>
  )}
    </div>
    
  );
};

export default Routers;
