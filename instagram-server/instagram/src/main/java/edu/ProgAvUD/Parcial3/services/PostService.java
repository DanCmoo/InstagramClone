package edu.ProgAvUD.Parcial3.services;

import java.util.List;

import edu.ProgAvUD.Parcial3.exception.PostException;
import edu.ProgAvUD.Parcial3.exception.UserException;
import edu.ProgAvUD.Parcial3.model.Post;
import edu.ProgAvUD.Parcial3.model.User;

public interface PostService {

	public Post createPost(Post post,Integer userId) throws UserException;
	
	public Post editPost(Post post,Integer userId) throws PostException;
	
	public String deletePost(Integer postId, Integer userId) throws UserException,PostException;
	
	public List<Post> findPostByUserId(Integer userId) throws UserException;
	
	public Post findePostById(Integer postId) throws PostException;
	
	public List<Post> findAllPost() throws PostException;
	
	public List<Post> findAllPostByUserIds(List<Integer> userIds) throws PostException, UserException;
	
	public String savedPost(Integer postId,Integer userId) throws PostException, UserException;
	
	public String unSavePost(Integer postId,Integer userId) throws PostException, UserException;
		
	public Post likePost(Integer postId ,Integer userId) throws UserException, PostException;
	
	public Post unLikePost(Integer postId ,Integer userId) throws UserException, PostException;
	
}
