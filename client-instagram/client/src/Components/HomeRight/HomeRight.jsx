import React, { useState, useEffect } from "react";
import { BsDot } from "react-icons/bs";
import { useSelector } from "react-redux";
import SuggestionsUserCard from "./SuggestionsUserCard";

const HomeRight = ({suggestedUser, onSuggestionsChange}) => {
  const {user}=useSelector(store=>store);
  const [localSuggestedUsers, setLocalSuggestedUsers] = useState([]);

  useEffect(() => {
    setLocalSuggestedUsers(suggestedUser || []);
  }, [suggestedUser]);

  const handleFollowSuccess = (followedUserId) => {
    // Remover el usuario seguido de la lista local
    const updatedUsers = localSuggestedUsers.filter(user => user.id !== followedUserId);
    setLocalSuggestedUsers(updatedUsers);
    
    // Notificar al componente padre si hay callback
    if (onSuggestionsChange) {
      onSuggestionsChange(updatedUsers);
    }
  };

  return (
    <div>
      <div>
        <div className="flex justify-between items-center">
          <div className="flex items-center ">
            <img
              className="w-12 h-12 rounded-full"
              src={ user.reqUser?.image ||
                "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"}
              alt={user.reqUser?.username || "profile"}
            />
            <div className="ml-3">
              <p className="text-black dark:text-gray-100">{user.reqUser?.username}</p>
            </div>
          </div>
          <p className="text-blue-600 dark:text-blue-400 font-semibold">cambiar</p>
        </div>
        <div className="flex justify-between py-5 items-center">
          <p className="font-semibold opacity-70 text-black dark:text-gray-300">Sugerencias para ti</p>
          <p className="text-xs font-semibold opacity-95 text-black dark:text-gray-200">Ver todo</p>
        </div>

        <div className="space-y-5">
          {localSuggestedUsers.map((item) => (
            <SuggestionsUserCard
              key={item.id || item.username}
              userId={item.id}
              image={
                item.userImage || item.image || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
              }
              username={item.username}
              description={"Te sigue"}
              onFollowSuccess={handleFollowSuccess}
            />
          ))}
          {localSuggestedUsers.length === 0 && (
            <p className="text-sm text-gray-500 dark:text-gray-400">No hay sugerencias disponibles</p>
          )}
        </div>
        <div className="opacity-60 text-xs flex items-center flex-wrap mt-10">
            <span>Acerca de</span>
            <BsDot/>
            <span>Ayuda</span>
            <BsDot/>
            <span>Prensa</span>
            <BsDot/>
            <span>API</span>
            <BsDot/>
            <span>Empleos</span>
            <BsDot/>
            <span>Privacidad</span>
            <BsDot/>
            <span>Términos</span>
            <BsDot/>
            <span>Ubicaciones</span>
            <BsDot/>
            <span>Idioma</span>
            <BsDot/>
            <span>Español</span>
            <BsDot/>
            <span>Meta</span>
            <BsDot/>
            <span>Verificado</span>
        </div>
      </div>
    </div>
  );
};

export default HomeRight;
