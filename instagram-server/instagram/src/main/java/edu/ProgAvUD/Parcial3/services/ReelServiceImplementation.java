package edu.ProgAvUD.Parcial3.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import edu.ProgAvUD.Parcial3.model.Reels;
import edu.ProgAvUD.Parcial3.repository.ReelRepository;

@Service
public class ReelServiceImplementation implements ReelService {
	
	@Autowired
	private ReelRepository reelRepository;

	@Override
	public Reels createReels(Reels reel) {
		
		return reelRepository.save(reel);
	}
	

	@Override
	public void deleteReels(Integer reelId) {
		reelRepository.deleteById(reelId);
		
	}

	@Override
	public void editReels(Reels reel) {
		reelRepository.save(reel);
		
	}


	@Override
	public List<Reels> getAllReels() {
		List<Reels> reels=reelRepository.findAll();
		return reels;
	}

}
