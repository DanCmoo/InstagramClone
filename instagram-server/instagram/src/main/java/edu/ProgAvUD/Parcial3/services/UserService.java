package edu.ProgAvUD.Parcial3.services;

import java.util.List;
import java.util.Optional;

import edu.ProgAvUD.Parcial3.dto.UserDto;
import edu.ProgAvUD.Parcial3.exception.PostException;
import edu.ProgAvUD.Parcial3.exception.UserException;
import edu.ProgAvUD.Parcial3.model.Post;
import edu.ProgAvUD.Parcial3.model.User;

public interface UserService {
	
	public User registerUser(User user) throws UserException;
	
	public User findUserById(Integer userId) throws UserException;
	
	public User findUserProfile(String token) throws UserException;
	
	public User findUserByUsername(String username) throws UserException;
	
	public String followUser(Integer reqUserId,Integer followUserId) throws UserException;
	
	public String unfollowUser(Integer reqUserId, Integer unfollowUserId) throws UserException; 
	
	public List<User> findUsersByUserIds(List<Integer> userIds);
	
	public List<User> searchUser(String query) throws UserException;
	
	public List<User> popularUser();
	
	

	public User updateUserDetails(User updatedUser, User existingUser) throws UserException;
	
	
}
