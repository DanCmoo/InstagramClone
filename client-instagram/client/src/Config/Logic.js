export const isReqUser = (userId1, userId2) => {
  if (userId1 && userId2) return userId1 === userId2;
};

export const isFollowing = (reqUser, user2) => {
  if (reqUser && user2 && user2.follower && Array.isArray(user2.follower)) {
    for (let item of user2.follower) {
      if (reqUser.id === item.id) return true;
    }
  }

  return false;
};

export const suggetions=(reqUser)=>{
  // Verificar que reqUser y sus propiedades existan
  if (!reqUser || !reqUser.following || !reqUser.follower) {
    return [];
  }

  const set=new Set(reqUser.following.map((item)=>JSON.stringify(item)));

  const result = reqUser.follower.filter(item => {
    return !set.has(JSON.stringify(item));
  })

  return result;
}

export const isSavedPost = (user, postId) => {
  // Verificar que user y savedPost existan y sea un array
  if (!user || !user.savedPost || !Array.isArray(user.savedPost)) {
    return false;
  }

  for (let item of user.savedPost) {
    if (item.id === postId) return true;
  }
  return false;
};

export const isPostLikedByUser = (post, userId) => {
  // Verificar que post y likedByUsers existan y sea un array
  if (!post || !post.likedByUsers || !Array.isArray(post.likedByUsers)) {
    return false;
  }

  for (let item of post.likedByUsers) {
    if (item.id === userId) return true;
  }

  return false;
};

export const isCommentLikedByUser = (comment, userId) => {
  // Verificar que comment y likedByUsers existan y sea un array
  if (!comment || !comment.likedByUsers || !Array.isArray(comment.likedByUsers)) {
    return false;
  }

  for (let item of comment.likedByUsers) {
    // console.log("liked comment item -: ", item);
    if (item.id === userId) return true;
  }
  return false;
};

export const isReqUserPost = (post, reqUser) => {
  return post.user.id === reqUser.id;
};

function getTimeInHours(timestamp) {
  const date = new Date(timestamp);
  const hours = date.getHours();
  return hours;
}

export const hasStory = (users) => {
  // Verificar que users exista y sea un array
  if (!users || !Array.isArray(users)) {
    return [];
  }
 
  const temp = users.reduce((acc, item) => {
    if (item.stories?.length > 0) {
      const time = getTimeInHours(
        item.stories[item.stories?.length - 1].timestamp
      );
      if (time < 24) {
        acc.push(item);
      }
    }
    return acc;
  }, []);

  return temp;
};

export const activeStory = (stories) => {
  // Verificar que stories exista y sea un array
  if (!stories || !Array.isArray(stories)) {
    return [];
  }
 
  const temp = stories.reduce((acc, item) => {
    
      const time = getTimeInHours(
        // item.stories[item.stories?.length - 1].timestamp
        item.timestamp
      );
      if (time < 24) {
        acc.push(item);
      }
    
    return acc;
  }, []);

  return temp;
};


export function timeDifference(timestamp) {
  // Convertir la marca de tiempo a un objeto Date
  const date = new Date(timestamp);

  // Calcular la diferencia de tiempo en milisegundos
  const diff = Date.now() - date.getTime();

  // Convertir la diferencia de tiempo a segundos, minutos, horas y días
  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const weeks = Math.floor(days / 7);

  // Formatear la diferencia de tiempo como una cadena en español
  if (weeks > 0) {
    return `hace ${weeks} semana${weeks === 1 ? '' : 's'}`;
  } else if (days > 0) {
    return `hace ${days} día${days === 1 ? '' : 's'}`;
  } else if (hours > 0) {
    return `hace ${hours} hora${hours === 1 ? '' : 's'}`;
  } else if (minutes > 0) {
    return `hace ${minutes} minuto${minutes === 1 ? '' : 's'}`;
  } else {
    return `hace ${seconds} segundo${seconds === 1 ? '' : 's'}`;
  }
}
