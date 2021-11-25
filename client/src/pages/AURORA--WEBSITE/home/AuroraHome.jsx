import React from "react";
import HeroSection from "../../../components/AURORA--WEBSITE/heroSection/HeroSection";
import Navbar from "../../../components/AURORA--WEBSITE/navbar/Navbar";
import OfferSection from "../../../components/AURORA--WEBSITE/offerSection/OfferSection";


const AuroraHome = () => {
    return (
        <div>
            <Navbar/>
            <HeroSection/>
            <OfferSection/>
        </div>
    )
}

export default AuroraHome