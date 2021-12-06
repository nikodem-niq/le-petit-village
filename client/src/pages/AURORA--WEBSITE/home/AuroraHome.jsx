import React from "react";
import HeroSection from "../../../components/AURORA--WEBSITE/heroSection/HeroSection";
import Navbar from "../../../components/AURORA--WEBSITE/navbar/Navbar";
import Footer from '../../../components/AURORA--WEBSITE/footer/Footer';
import About from '../../../components/AURORA--WEBSITE/about/About';
import OfferSection from "../../../components/AURORA--WEBSITE/offerSection/OfferSection";
import Achievements from "../../../components/AURORA--WEBSITE/achievements/Achievements";
import OpeningHours from "../../../components/AURORA--WEBSITE/openingHours/OpeningHours";
import Contact from "../../../components/AURORA--WEBSITE/contact/Contact";



const AuroraHome = () => {
    return (
        <div>
            <Navbar/>
            <HeroSection/>
            <About />
            <Achievements/>
            <OpeningHours/>
            <OfferSection/>
            <Contact/>
            <Footer />
        </div>
    )
}

export default AuroraHome