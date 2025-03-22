import { FaSmoking, FaSmokingBan, FaUtensils, FaGlassCheers, FaEnvelope, FaFacebook, FaLinkedin, FaInstagram } from 'react-icons/fa';
import { GiChickenLeg, GiThreeLeaves } from 'react-icons/gi';

const ICONS = {
    // Social Media Icons
    FaFacebook,
    FaLinkedin,
    FaInstagram,
    FaEnvelope,

    // Preference Icons
    SmokingIcon: FaSmoking,
    NoSmokingIcon: FaSmokingBan,
    NonVegIcon: GiChickenLeg,
    VegIcon: GiThreeLeaves,
    DrinkingIcon: FaGlassCheers,
    NoDrinkingIcon: FaGlassCheers, // We can add a different icon for non-drinking if needed

    // Helper functions for preference icons
    getSmokingIcon: (isSmoker) => isSmoker === "1" ? FaSmoking : FaSmokingBan,
    getFoodIcon: (isNonVeg) => isNonVeg === "1" ? GiChickenLeg : GiThreeLeaves,
    getDrinkingIcon: (isDrinker) => FaGlassCheers, // We can add a different icon for non-drinking if needed
};

export default ICONS;
