import React from "react";
import HeroSection from "../../../components/AURORA--WEBSITE/heroSection/HeroSection";
import Navbar from "../../../components/AURORA--WEBSITE/navbar/Navbar";
import Footer from '../../../components/AURORA--WEBSITE/footer/Footer';
import About from '../../../components/AURORA--WEBSITE/about/About';
import OfferSection from "../../../components/AURORA--WEBSITE/offerSection/OfferSection";



const AuroraHome = () => {
    return (
        <div>
            <Navbar/>
            <HeroSection/>
            {/* <OfferSection/> */} 
            <About />
            <Footer />
        </div>
    )
}

export default AuroraHome