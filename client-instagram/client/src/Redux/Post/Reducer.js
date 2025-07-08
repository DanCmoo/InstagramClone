import {CREATE_NEW_POST, DELETE_POST, EDIT_POST, GET_SINGLE_POST, GET_USER_POST, LIKE_POST, REQ_USER_POST, UNSAVE_POST, UPDATE_USER_POSTS_PROFILE_IMAGE, LOGOUT} from "./ActionType";

const initialState = {
  createdPost:null,
  userPost:[],
  reqUserPost:[],
  unsavePost:[],
  singlePost:null,
  deletedPost:null,
  updatedPost:null,
  
};



export const postReducer=(store=initialState, {type,payload})=>{

    if(type===CREATE_NEW_POST){
        return {...store, createdPost:payload};
    }
    else if(type===GET_USER_POST){
        return {...store, userPost:payload};
    }
    else if(type===LIKE_POST){
        return {...store, likePost:payload};
    }
    else if(type===REQ_USER_POST){
        return {...store, reqUserPost:payload};
    }
    else if(type===UNSAVE_POST){
        return {...store, unsavePost:payload};
    }
    else if(type===GET_SINGLE_POST){
        return{...store, singlePost:payload}
    }
    else if(type===DELETE_POST){
        return{...store, deletedPost:payload}
    }
    else if(type===EDIT_POST){
        return{...store,updatedPost:payload}
    }
    else if(type===UPDATE_USER_POSTS_PROFILE_IMAGE){
        // Actualizar la imagen del usuario en todas sus publicaciones
        const { userId, newImage } = payload;
        return {
            ...store,
            userPost: store.userPost.map(post => 
                post.user.id === userId 
                    ? { ...post, user: { ...post.user, userImage: newImage } }
                    : post
            ),
            reqUserPost: store.reqUserPost.map(post => 
                post.user.id === userId 
                    ? { ...post, user: { ...post.user, userImage: newImage } }
                    : post
            )
        }
    }
    else if(type===LOGOUT){
        return initialState; // Reset post state on logout
    }
    return store;
}