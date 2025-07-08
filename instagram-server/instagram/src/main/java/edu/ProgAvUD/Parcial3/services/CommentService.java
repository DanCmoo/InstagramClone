package edu.ProgAvUD.Parcial3.services;

import java.util.List;

import edu.ProgAvUD.Parcial3.exception.CommentException;
import edu.ProgAvUD.Parcial3.exception.PostException;
import edu.ProgAvUD.Parcial3.exception.UserException;
import edu.ProgAvUD.Parcial3.model.Comments;

public interface CommentService {
	
	public Comments createComment(Comments comment,Integer postId,Integer userId) throws PostException, UserException;

	public Comments findCommentById(Integer commentId) throws CommentException;
	public Comments likeComment(Integer CommentId,Integer userId) throws UserException, CommentException;
	public Comments unlikeComment(Integer CommentId,Integer userId) throws UserException, CommentException;
	
	public String deleteCommentById(Integer commentId) throws CommentException;
	
	public String editComment(Comments comment, Integer commentId) throws CommentException;
	
	public List<Comments> findCommentByPostId(Integer postId)throws PostException;
}
