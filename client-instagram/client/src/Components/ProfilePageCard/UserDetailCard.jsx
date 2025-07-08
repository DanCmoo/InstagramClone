import React, { useEffect, useState } from "react";
import { TbCircleDashed } from "react-icons/tb";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { followUserAction, unFollowUserAction, getUserProfileAction } from "../../Redux/User/Action";
import "./UserDetailCard.css"
// import { isReqUser } from '../../Config/Logic'

const UserDetailCard = ({ user, isRequser, isFollowing }) => {

  const token = localStorage.getItem("token");
  const { post } = useSelector((store) => store);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isFollow,setIsFollow]=useState(false);

  const goToAccountEdit = () => {
    navigate("/account/edit");
  };

  console.log("user --- ", user);
  

  const data = {
    jwt: token,
    userId: user?.id,
  };

  const handleFollowUser = () => {
    dispatch(followUserAction(data));
    console.log("follow");
    setIsFollow(true);
    // Refrescar el perfil del usuario para actualizar los datos de seguimiento
    setTimeout(() => {
      dispatch(getUserProfileAction(token));
    }, 500);
  };

  const handleUnFollowUser = () => {
    dispatch(unFollowUserAction(data));
    setIsFollow(false);
    // Refrescar el perfil del usuario para actualizar los datos de seguimiento
    setTimeout(() => {
      dispatch(getUserProfileAction(token));
    }, 500);
  };

  useEffect(()=>{
setIsFollow(isFollowing)
  },[isFollowing])

  return (
    <div className="py-10 bg-white dark:bg-gray-900 text-black dark:text-gray-100">
      <div className="flex items-center">
        <div className="">
           <img
          className="h-20 w-20 lg:w-32 lg:h-32 rounded-full"
          src={
            user?.image ||
            "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
          }
          alt=""
        />
        </div>
       

        <div className="ml-10 space-y-5 text-xs w-[50%] md:w-[60%] lg:w-[80%]">
          <div className=" flex space-x-10 items-center">
            <p className="text-base text-black dark:text-gray-100">{user?.username}</p>
            <button className="text-xs py-1 px-5 bg-slate-100 dark:bg-gray-800 hover:bg-slate-300 dark:hover:bg-gray-700 rounded-md font-semibold text-black dark:text-gray-100">
              {isRequser ? (
                <span onClick={goToAccountEdit}>Editar perfil</span>
              ) : isFollow ? (
                <span onClick={handleUnFollowUser}>Dejar de seguir</span>
              ) : (
                <span onClick={handleFollowUser}>Seguir</span>
              )}
            </button>
            <button className="text-xs py-1 px-5 bg-slate-100 dark:bg-gray-800 hover:bg-slate-300 dark:hover:bg-gray-700 rounded-md font-semibold text-black dark:text-gray-100">
              {isRequser ? "Agregar herramientas" : "Mensaje"}
            </button>
            <TbCircleDashed className="text-xl text-black dark:text-gray-100" />
          </div>

          <div className="flex space-x-10">
            <div>
              <span className="font-semibold mr-2 text-black dark:text-gray-100">
                {post?.reqUserPost?.length || 0}
              </span>
              <span className="text-black dark:text-gray-300">publicaciones</span>
            </div>

            <div>
              <span className="font-semibold mr-2 text-black dark:text-gray-100">
                {user?.follower?.length}
              </span>
              <span className="text-black dark:text-gray-300">seguidores</span>
            </div>
            <div>
              <span className="font-semibold mr-2 text-black dark:text-gray-100">
                {user?.following?.length}
              </span>
              <span className="text-black dark:text-gray-300">seguidos</span>
            </div>
          </div>
          <div>
            <p className="font-semibold text-black dark:text-gray-100">{user?.name}</p>
            <p className="font-thin text-sm text-black dark:text-gray-300">{user?.bio}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDetailCard;
