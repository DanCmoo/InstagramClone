import { useDisclosure } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import {
  BsBookmark,
  BsBookmarkFill,
  BsDot,
  BsEmojiSmile,
  BsThreeDots,
} from "react-icons/bs";
import { FaRegComment } from "react-icons/fa";
import { RiSendPlaneLine } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  isPostLikedByUser,
  isReqUserPost,
  isSavedPost,
  timeDifference,
} from "../../../Config/Logic";

import { createComment } from "../../../Redux/Comment/Action";
import {
  deletePostAction,
  likePostAction,
  savePostAction,
  unLikePostAction,
  unSavePostAction,
} from "../../../Redux/Post/Action";
import CommentModal from "../../Comment/CommentModal";

import "./PostCard.css";
import EditPostModal from "../Create/EditPostModal";

const PostCard = ({
  userProfileImage,
  username,
  location,
  postImage,
  createdAt,
  post,
}) => {
  const [commentContent, setCommentContent] = useState();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const { user } = useSelector((store) => store);
  
  // Usar la imagen actualizada del usuario si es el usuario logueado o si está en userByIds
  const getUserImage = () => {
    // Si es el usuario logueado, usar su imagen actualizada
    if (post.user.id === user.reqUser?.id) {
      return user.reqUser?.image || user.reqUser?.userImage || post.user.userImage || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png";
    }
    
    // Si el usuario está en userByIds (usuarios cargados), usar su imagen actualizada
    const updatedUser = user.userByIds?.find(u => u.id === post.user.id);
    if (updatedUser) {
      return updatedUser.image || updatedUser.userImage || post.user.userImage || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png";
    }
    
    // Usar la imagen del post por defecto
    return post.user.userImage || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png";
  };
  const [isSaved, setIsSaved] = useState(false);
  const [isPostLiked, setIsPostLiked] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [openEditPostModal,setOPenEditPostModal]=useState(false);

  const handleCommnetInputChange = (e) => {
    setCommentContent(e.target.value);
  };
  const [numberOfLikes, setNumberOfLike] = useState(0);

  const data = {
    jwt: token,
    postId: post.id,
  };

  const handleAddComment = () => {
    const data = {
      jwt: token,
      postId: post.id,
      data: {
        content: commentContent,
      },
    };
    console.log("comment content ", commentContent);
    dispatch(createComment(data));
  };

  const handleOnEnterPress = (e) => {
    if (e.key === "Enter") {
      handleAddComment();
    } else return;
  };

  const handleLikePost = () => {
    dispatch(likePostAction(data));
    setIsPostLiked(true);
    setNumberOfLike(numberOfLikes + 1);
  };
  const handleUnLikePost = () => {
    dispatch(unLikePostAction(data));
    setIsPostLiked(false);
    setNumberOfLike(numberOfLikes - 1);
  };

  const handleSavePost = (postId) => {
    dispatch(savePostAction(data));
    setIsSaved(true);
  };

  const handleUnSavePost = () => {
    dispatch(unSavePostAction(data));
    setIsSaved(false);
  };

  const handleNavigate = (username) => {
    navigate(`/${username}`);
  };

  useEffect(() => {
    setIsSaved(isSavedPost(user.reqUser, post.id));
    setIsPostLiked(isPostLikedByUser(post, user.reqUser?.id));
    setNumberOfLike(post?.likedByUsers?.length);
  }, [user.reqUser, post]);

  function handleClick() {
    setShowDropdown(!showDropdown);
  }

  function handleWindowClick(event) {
    if (!event.target.matches(".dots")) {
      setShowDropdown(false);
    }
  }


  useEffect(() => {
    window.addEventListener("click", handleWindowClick);

    return () => {
      window.removeEventListener("click", handleWindowClick);
    };
  }, []);

  const handleDeletePost = (postId) => {
    const data = {
      jwt: token,
      postId,
    };
    dispatch(deletePostAction(data));
  };
  const isOwnPost = isReqUserPost(post, user.reqUser);

  const handleOpenCommentModal = () => {
    navigate(`/p/${post.id}`);
    onOpen();
  };

  const handleCloseEditPostModal=()=>{
    setOPenEditPostModal(false)
  }
  const handleOpenEditPostModal=()=>{
    navigate(`/p/${post?.id}/edit`)
    setOPenEditPostModal(true);
  }
  const handleEditPost=()=>{
    
  }
  return (
    <div>
      <div className="flex flex-col items-center w-full border border-gray-200 dark:border-gray-700 rounded-md bg-white dark:bg-gray-900 text-black dark:text-gray-100">
        <div className="flex justify-between items-center w-full py-4 px-5">
          <div className="flex items-center">
            <img
              className="w-12 h-12 rounded-full"
              src={getUserImage()}
              alt=""
            />

            <div className="pl-2">
              <p className="font-semibold text-sm flex items-center text-black dark:text-gray-100">
                <span
                  onClick={() => handleNavigate(username)}
                  className="cursor-pointer text-black dark:text-blue-400"
                >
                  {post?.user?.username}
                </span>
                <span className="opacity-50 flex items-center text-black dark:text-gray-300">
                  {" "}
                  <BsDot />
                  {timeDifference(post?.createdAt)}
                </span>{" "}
              </p>
              <p className="font-thin text-sm text-black dark:text-gray-300">{location} </p>
            </div>
          </div>
          <div>
            <div className="dropdown">
              <BsThreeDots onClick={handleClick} className="dots text-black dark:text-gray-100" />
              {isOwnPost && (
                <div className="dropdown-content">
                  {showDropdown && (
                    <div className="p-2 w-[10rem] shadow-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                      <p
                        onClick={handleOpenEditPostModal}
                        className="hover:bg-slate-300 dark:hover:bg-gray-700 py-2 px-4  cursor-pointer font-semibold text-black dark:text-gray-100"
                      >
                        Editar
                      </p>
                      <hr className="border-gray-200 dark:border-gray-700" />
                      <p
                        onClick={() => handleDeletePost(post.id)}
                        className="hover:bg-slate-300 dark:hover:bg-gray-700 px-4 py-2 cursor-pointer font-semibold text-red-600 dark:text-red-400"
                      >
                        Eliminar
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="w-full">
          <img className="w-full" src={postImage} alt="" />
        </div>
        <div className="flex justify-between items-center w-full px-5 py-4">
          <div className="flex items-center space-x-2 ">
            {isPostLiked ? (
              <AiFillHeart
                onClick={handleUnLikePost}
                className="text-2xl hover:opacity-50 cursor-pointer text-red-600 dark:text-red-400"
              />
            ) : (
              <AiOutlineHeart
                onClick={handleLikePost}
                className="text-2xl hover:opacity-50 cursor-pointer text-black dark:text-gray-100"
              />
            )}

            <FaRegComment
              onClick={handleOpenCommentModal}
              className="text-xl hover:opacity-50 cursor-pointer text-black dark:text-gray-100"
            />
            <RiSendPlaneLine className="text-xl hover:opacity-50 cursor-pointer text-black dark:text-gray-100" />
          </div>
          <div className="cursor-pointer">
            {isSaved ? (
              <BsBookmarkFill
                onClick={() => handleUnSavePost(post.id)}
                className="text-xl text-black dark:text-gray-100"
              />
            ) : (
              <BsBookmark
                onClick={() => handleSavePost(post.id)}
                className="text-xl hover:opacity-50 cursor-pointer text-black dark:text-gray-100"
              />
            )}
          </div>
        </div>
        <div className="w-full py-2 px-5">
          {numberOfLikes > 0 && (
            <p className="text-sm text-black dark:text-gray-100">{numberOfLikes} me gusta</p>
          )}

         <p className="py-2 text-black dark:text-gray-100">
          {post.caption}
         </p>
          {post?.comments?.length > 0 && (
            <p
              onClick={handleOpenCommentModal}
              className="opacity-50 text-sm py-2 -z-0 cursor-pointer text-black dark:text-gray-300"
            >
              Ver todos los {post?.comments?.length} comentarios
            </p>
          )}
        </div>

        <div className="border border-t w-full border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
          <div className="w-full flex items-center px-5">
            <BsEmojiSmile className="text-black dark:text-gray-100" />
            <input
              onKeyPress={handleOnEnterPress}
              onChange={handleCommnetInputChange}
              className="commentInput bg-white dark:bg-gray-900 text-black dark:text-gray-100"
              type="text"
              placeholder="Agrega un comentario..."
            />
          </div>
        </div>
      </div>

      <EditPostModal onClose={handleCloseEditPostModal} isOpen={openEditPostModal} onOpen={handleOpenEditPostModal} />

      <CommentModal
        handleLikePost={handleLikePost}
        handleSavePost={handleSavePost}
        handleUnSavePost={handleUnSavePost}
        handleUnLikePost={handleUnLikePost}
        isPostLiked={isPostLiked}
        isSaved={isSaved}
        postData={post}
        isOpen={isOpen}
        onClose={onClose}
        onOpen={onOpen}
      />
    </div>
  );
};

export default PostCard;
