package edu.ProgAvUD.Parcial3.services;

import java.util.List;

import edu.ProgAvUD.Parcial3.model.Reels;

public interface ReelService {
	
	public Reels createReels(Reels reel);
	
	public void deleteReels(Integer reelId);
	
	public void editReels(Reels reel);
	
	public List<Reels> getAllReels();

}
