import styled from 'styled-components';
import React, { useEffect, useState } from "react";
import about1 from '../../../img/about1.svg'
import about2 from '../../../img/about2.svg'
import aboutImg from '../../../img/AboutImg.png'

const About = () => {
    return (
        <Wrapper>
           <ImgWrapper>
            <div className="marginImgWrapper">
                <img alt="logo" src={about2}/>
                <img alt="logo" src={about1}/>
            </div>
           </ImgWrapper>
           <AboutSection>
               <TextWrapper>
                <h1>About Us</h1>
                <p>Making dinner, cleaning, Shopping, babysitting, exploring, fixing things, it makes our children love being us. Watching children play with imagination and creativity often surprises and amazes us. Children learn so much through imaginative play, they use and develop many skills: cognitive, physical, emotional and social.</p>
               </TextWrapper>
               <div className="aboutImgWrapper">
                <img alt="aboutImg" src={aboutImg}/>
               </div>
           </AboutSection>
        </Wrapper>
    )
}

const Wrapper = styled.div`
    height: 100%;
    width: 100%;
    background: #F2EFE6;
    min-height: calc(100% + 20vh);
`

const ImgWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 100%;
    
    .marginImgWrapper {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        margin: 5% 0;
    }

    img {
        width: 75%;
        height: auto;
    }
`

const AboutSection = styled.div`
    width: 100%;
    height: auto;
    display: flex;
    justify-content: center;
    align-items: center;
    /* margin: 0 0 5% 0; */
    padding: 3% 0;

    .aboutImgWrapper {
        width: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .aboutImgWrapper img {
        width: 75%;
        height: auto;
    }

    h1 {
        font-size: 1rem;
    }

    img {
        width: 50%;
        height: auto;
    }
`

const TextWrapper = styled.div`
    display: flex;
    justify-content: center;
    /* align-items: center; */
    width: 30%;
    padding: 5%;
    flex-direction: column;

    h1 {
        font-size: 2.5rem;
        z-index: 3;
    }

    h1:after {
        display: flex;
        background-color: #F0C724;
        content: '';
        position: relative;
        right: 0.25em;
        bottom: 0.4em;
        z-index: -1;
        width: 4.5em;
        height: 0.33em;
        /* border-radius: 10px; */
    }
`


export default About;