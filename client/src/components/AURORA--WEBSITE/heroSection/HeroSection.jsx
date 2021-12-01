import styled from 'styled-components';
import React, { useEffect, useState } from "react";
import FadingBalls from 'react-cssfx-loading/lib/FadingBalls';
import './HeroSection.css'

import heroGirl from '../../../img/girlHero.svg';
import heroGirlStroke from '../../../img/girlHeroStroke.svg';


const HeroSection = () => {
    const [isLoading, setLoading] = useState(false);

      if(isLoading) {
        return (
            <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh'}}><FadingBalls color="#3a43cc" width="20px" height="20px" duration="2s" /></div>
        )
    } else {
    return (
        <Wrapper>
            <div className="imgOpacity"></div>
            <HeroWrapper id="heroWrapperComponent">
                <div id="heroWrapper">
                    <h1>header</h1>
                    <h2>sub header</h2>
                    <button className="readMoreBtn">Read more..</button>
                </div>

                <div className="heroGirl">
                    <img src={heroGirl}/>
                </div>
                <div className="heroGirlStroke">
                    <img className="heroGirlStroke" src={heroGirlStroke}/>
                </div>
            </HeroWrapper>

            <HeroWrapperMobile id="heroWrapperMobile">
            <div id="heroWrapper">
                <h1>header</h1>
                <h2>sub header</h2>
                <center><button className="readMoreBtn">Read more..</button></center>
                </div>
            </HeroWrapperMobile>
        </Wrapper>
    )}
}

const Wrapper = styled.div`
    height: 100vh;
    width: 100vw;
    background: #E5D6AC;
`

const HeroWrapperMobile = styled.div`
    display: none;
    z-index: 5;
    flex-direction: column;
    position: relative;
    top: 35%;
    justify-content: space-between;
    margin: auto;
    align-items: center;
    width: 90%;
    height: 65vh;
    /* background-color: red; */
    font-size: 0.8em;

    #heroWrapper {
        width: 80%;
        color: white;
        height: auto;
        background-color: #5555557b;
        padding: 4%;
        border-top-left-radius: 20px;
        border-top-right-radius: 20px;
    }

    #heroWrapper > h1, #heroWrapper > h2 {
        transition: all 2s linear;
    }

    #sliderWrapper {
        display: flex;
        height: 30%;
        width: 100%;
        flex-direction: column;
        justify-content: space-evenly;
        align-items: flex-end;
    }

    .sliderIcon {
        background-color: #6d6d6d64;
        opacity: 0.5;
        width: 2em;
        height: 2em;
        border-radius: 100%;
        border: solid 1px black;
        box-shadow: #000000 0px 0px 2px 0.5px;
    }

    .activeSlider {
        background-color: #e0c422ac;
        opacity: 0.8;
        transition: 0.2s linear all;
    }
`

const HeroWrapper = styled.div`
    z-index: 5;
    display: flex;
    position: relative;
    /* top: 35%; */
    justify-content: space-between;
    margin: auto;
    align-items: center;
    width: 90%;
    height: 100vh;
    /* background-color: red; */
    font-size: 0.8em;

    #heroWrapper {
        width: 70%;
        color: white;
        /* margin-left: 2%; */
    }

    #heroWrapper > h1, #heroWrapper > h2 {
        transition: all 2s linear;
    }

    #sliderWrapper {
        display: flex;
        height: 100%;
        flex-direction: column;
        justify-content: space-evenly;
        align-items: center;
    }

    .sliderIcon {
        background-color: #6d6d6d64;
        opacity: 0.5;
        width: 2em;
        height: 2em;
        border-radius: 100%;
        border: solid 1px black;
        box-shadow: #000000 0px 0px 2px 0.5px;
    }

    .activeSlider {
        background-color: #e0c422ac;
        opacity: 0.8;
        transition: 0.2s linear all;
    }
`

export default HeroSection;