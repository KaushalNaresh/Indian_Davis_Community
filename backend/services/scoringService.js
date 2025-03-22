const calculateMatchScore = (currentUser, potentialRoommate) => {
    if (!currentUser || !potentialRoommate) {
        return 0;
    }

    let totalScore = 0;
    
    // Core Preferences (40%)
    // Smoking match (15%)
    if (currentUser.smoker && potentialRoommate.smoker && 
        currentUser.smoker === potentialRoommate.smoker) {
        totalScore += 15;
    }
    
    // Food preferences (15%)
    if (currentUser.foodPreference && potentialRoommate.foodPreference && 
        currentUser.foodPreference === potentialRoommate.foodPreference) {
        totalScore += 15;
    }
    
    // Drinking preferences (10%)
    if (currentUser.drinker && potentialRoommate.drinker && 
        currentUser.drinker === potentialRoommate.drinker) {
        totalScore += 10;
    }
    
    // Location (25%)
    // Exact location match (15%)
    if (currentUser.country && potentialRoommate.country && 
        currentUser.region && potentialRoommate.region &&
        currentUser.country === potentialRoommate.country && 
        currentUser.region === potentialRoommate.region) {
        totalScore += 15;
    }
    // Same country/state (10%)
    else if (currentUser.country && potentialRoommate.country && 
             currentUser.country === potentialRoommate.country) {
        totalScore += 10;
    }
    
    // Academic Background (20%)
    // Same major (10%)
    if (currentUser.major && potentialRoommate.major && 
        currentUser.major === potentialRoommate.major) {
        totalScore += 10;
    }
    // Similar degree level (10%)
    if (currentUser.degree && potentialRoommate.degree && 
        currentUser.degree === potentialRoommate.degree) {
        totalScore += 10;
    }
    
    // Additional Factors (15%)
    // Bio similarity (10%)
    if (currentUser.aboutYou && potentialRoommate.aboutYou) {
        // Simple word overlap check
        const currentWords = new Set(currentUser.aboutYou.toLowerCase().split(/\s+/));
        const potentialWords = new Set(potentialRoommate.aboutYou.toLowerCase().split(/\s+/));
        const commonWords = [...currentWords].filter(word => potentialWords.has(word));
        const similarity = commonWords.length / Math.max(currentWords.size, potentialWords.size);
        totalScore += Math.round(similarity * 10);
    }
    
    // Social media presence (5%)
    if (potentialRoommate.socialMediaAccounts && 
        Array.isArray(potentialRoommate.socialMediaAccounts) && 
        potentialRoommate.socialMediaAccounts.length > 0) {
        totalScore += 5;
    }
    
    return totalScore;
};

const sortByMatchScore = (currentUser, roommates) => {
    if (!currentUser || !roommates || !Array.isArray(roommates)) {
        return [];
    }

    return roommates
        .map(roommate => ({
            ...roommate,
            matchScore: calculateMatchScore(currentUser, roommate)
        }))
        .sort((a, b) => b.matchScore - a.matchScore);
};

module.exports = {
    calculateMatchScore,
    sortByMatchScore
}; 