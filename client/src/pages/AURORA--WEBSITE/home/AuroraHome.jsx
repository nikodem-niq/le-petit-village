import React from "react";
import HeroSection from "../../../components/AURORA--WEBSITE/heroSection/HeroSection";
import Navbar from "../../../components/AURORA--WEBSITE/navbar/Navbar";
import OfferSection from "../../../components/AURORA--WEBSITE/offerSection/OfferSection";
import Reservation from "../../../components/AURORA--WEBSITE/reservation/Reservation";



const AuroraHome = () => {
    return (
        <div>
            <Navbar/>
            {/* <HeroSection/> */}
            {/* <OfferSection/> */}
            <Reservation/>
        </div>
    )
}

export default AuroraHome