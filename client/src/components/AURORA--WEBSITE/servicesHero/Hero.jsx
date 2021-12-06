import styled from 'styled-components';
import React from 'react';
import './Hero.css';

import img from '../../../img/services/programmes.png';

const Hero = () => {
    return (
        <Wrapper>
            <HeroWrapper>
                <h1>Services</h1>
                <img id='heroImg' src={img} alt='' />
            </HeroWrapper>
            <LeftWrapper>
                <div id='left'>
                    <h1>Hello</h1>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                        Suspendisse vel urna auctor, sagittis nulla nec, accumsan enim. 
                        Ut commodo leo ut dolor congue, vitae commodo nunc tempor. 
                        Donec pretium, 
                        arcu sit amet sodales vestibulum,</p>
                </div>
            </LeftWrapper>
            <RightWrapper id='right'>
                <div>
                    <h1>Hello</h1>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                        Suspendisse vel urna auctor, sagittis nulla nec, accumsan enim. 
                        Ut commodo leo ut dolor congue, vitae commodo nunc tempor. 
                        Donec pretium, 
                        arcu sit amet sodales vestibulum,</p>
                </div>
            </RightWrapper>
        </Wrapper>
    )
}




const Wrapper = styled.div`
    display: flex;
    width: 100%;
    height: auto;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    background-color: var(--brown-bg);

`

const HeroWrapper = styled.div`
    display: flex;
    width: 80%;
    height: 150vh;
    flex-direction: column;
    justify-content: start ;
    align-items: center;
    padding-top: 50px;
    

img {
    width: 80%;
    margin-top: 2em;
}

h1 {
    text-align: center;
    background-image: linear-gradient(100deg, #F0C724 0%, #F0C724 100%);
    background-repeat: no-repeat;
    background-size: 98% .25em;
    background-position: 0 85%;

}`

const LeftWrapper = styled.div`
    display: flex;
    width: 30%;
    height: auto;
    font-size: 3em;
    margin-bottom: 15%;
    margin: 0 auto 15% 10%;

h1 {
    font-size: 2em;
}

p {
    font-size: 0.5em;
}
`
const RightWrapper = styled.div`
    display: flex;
    width: 30%;
    height: auto;
    font-size: 3em;
    margin: 0 10% 15% auto;

h1 {
    font-size: 2em;
}

p {
    font-size: 0.5em;
}

`
export default Hero;
