import React, { useEffect, useState } from "react";
import { BsBookmark } from "react-icons/bs";
import { GrTable } from "react-icons/gr";
import { RiVideoFill, RiVideoLine } from "react-icons/ri";
import { BiBookmark, BiUserPin } from "react-icons/bi";
import { AiOutlineTable, AiOutlineUser } from "react-icons/ai";
import ReqUserPostCard from "./ReqUserPostCard";
import { useDispatch, useSelector } from "react-redux";
import { reqUserPostAction, savePostAction } from "../../Redux/Post/Action";
// import {reqUserPostAction} from "../../Redux/Post/Action.js"

const ProfilePostsPart = ({user}) => {
  const [activeTab, setActiveTab] = useState("Publicaciones");
  const { post} = useSelector((store) => store);
  const token = localStorage.getItem("token");
  const dispatch = useDispatch();


  const tabs = [
    {
      tab: "Publicaciones",
      icon: <AiOutlineTable className="text-xs" />,
      activeTab: "",
    },
    { tab: "Reels", icon: <RiVideoLine className="text-xs" />, activeTab: "" },
    { tab: "Guardado", icon: <BiBookmark className="text-xs" />, activeTab: "" },
    {
      tab: "Etiquetado",
      icon: <AiOutlineUser className="text-xs" />,
      activeTab: "",
    },
  ];

  useEffect(() => {
    const data = {
      jwt: token,
      userId: user?.id,
    };
    dispatch(reqUserPostAction(data));
  }, [user,post.createdPost]);



  return (
    <div className="">
      <div className="flex space-x-14 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-black dark:text-gray-100 relative ">
        {tabs.map((item) => (
          <div
            onClick={() => setActiveTab(item.tab)}
            className={`${
              item.tab === activeTab ? "border-t border-black" : "opacity-60"
            } flex items-center cursor-pointer py-2 text-sm`}
          >
            <p className="text-black dark:text-gray-100">{item.icon}</p>

            <p className="ml-1 text-xs text-black dark:text-gray-100">{item.tab} </p>
          </div>
        ))}
      </div>
      <div>
        <div className="flex flex-wrap">
          {post.reqUserPost?.length > 0 &&
            activeTab==="Publicaciones"? post.reqUserPost?.map((item, index) => (
              <ReqUserPostCard post={item} key={index} />
            )):activeTab==="Guardado"?user?.savedPost?.map((item, index) => (
              <ReqUserPostCard post={item} key={index} />
            )):
            ""}
        </div>
      </div>
    </div>
  );
};

export default ProfilePostsPart;
