import styled from 'styled-components';
import React from 'react';
import './Hero.css';

const Hero = () => {
    return (
        <Wrapper>
            <h1>Service</h1>
            <img src='' alt='' />
        </Wrapper>
    )
}




const Wrapper = styled.div`
    width: 100vw;
    height: 100vh;
    margin: auto;
`

const HeroWrapper = styled.div`
    width: 80%;
    height: 100vh;
    display: flex;
    position: relative;
    flex-direction: column;
    


`

export default Hero;
export default HeroWrapper;
