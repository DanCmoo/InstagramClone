package edu.ProgAvUD.Parcial3.services;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

//import edu.ProgAvUD.Parcial3.model.User;
//import edu.ProgAvUD.Parcial3.model.User as MyNewClassName;
import edu.ProgAvUD.Parcial3.repository.UserRepository;

@Service
public class UserUserDetailService implements UserDetailsService {
	
	@Autowired
	private UserRepository userRepo;
	
	

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException, BadCredentialsException {
		
		
		Optional<edu.ProgAvUD.Parcial3.model.User> opt=userRepo.findByEmail(username);
		
		
		
		if(opt.isPresent()) {
			edu.ProgAvUD.Parcial3.model.User user=opt.get();
			
			List<GrantedAuthority> authorities=new ArrayList<>();
			
			System.out.println("errrrr ----------- "+ username);
			
			return new User(user.getEmail(), user.getPassword(), authorities);
		}
		
			
			throw new BadCredentialsException("Bad Credential"+ username);
		
	}

}
