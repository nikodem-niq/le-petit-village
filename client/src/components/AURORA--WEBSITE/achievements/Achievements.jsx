import styled from 'styled-components';
import React, { useEffect, useState } from "react";
import greenBalloon from '../../../img/balloonGreen.svg'
import redBalloon from '../../../img/balloonRed.svg'
import missionImg from '../../../img/missionImg.png'

const Achievements = () => {
    return (
        <Wrapper>
           <TopWrapper>
                <img alt="logo" src={greenBalloon}/>
                <TextWrapper>
                <h1>Our Achievements</h1>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce porta, turpis vel feugiat laoreet, nisi justo finibus lectus, a bibendum arcu nulla pellentesque Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce porta, turpis vel feugiat laoreet, nisi justo finibus lectus, a bibendum arcu nulla pellentesque </p>
               </TextWrapper>
                <img alt="logo" src={redBalloon}/>
           </TopWrapper>
           <AchievementCardWrapper>
               <div className="achievementCard">777 PEOPLE</div>
               <div className="achievementCard">47 PEOLPE</div>
               <div className="achievementCard">O PEOPLE</div>
           </AchievementCardWrapper>
           <WhoWeAreSection>
               <div className="aboutImgWrapper">
                <img alt="aboutImg" src={missionImg}/>
               </div>
               <TextWrapper>
                <h1>Who We Are</h1>
                <p>Le Petit Village is an indoor role-play based play center for children ages 7 and younger. We use this age simply as a guideline and have found that children of all ages enjoy the Village. The play center is based on a village and includes a mini market, pizza parlor, baby hospital, hair and beauty salon, construction site, fire truck house and farm. Each little unit has been equipped with an array of all sorts of toys and tools, so little ones can really become a farmer,mechanic,doctor,beautician,cook for the day.</p>
               </TextWrapper>
           </WhoWeAreSection>
        </Wrapper>
    )
}

const Wrapper = styled.div`
    min-height: 100vh;
    height: 100%;
    width: 100%;
    background: #E5D6AC;
`

const TopWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    max-width: 100vw;
    width: 100%;

    img {
        width: 15%;
        height: auto;
    }
`

const TextWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 40%;
    line-height: 1.5rem;
    /* padding: 5%; */
    flex-direction: column;

    h1 {
        font-size: 2.5rem;
        z-index: 3;
        margin: 10% 0;
    }

`

const AchievementCardWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    margin: 5% 0;

    .achievementCard {
        width: 20%;
        height: 3%;
        background-color: #F2EFE6;
        border-radius: 15px;
        padding: 2%;
        margin: 0 2%;
        border: 1.5px solid black;
    }
`

const WhoWeAreSection = styled.div`
    width: 100%;
    height: auto;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    /* margin: 0 0 5% 0; */
    padding: 3% 0;

    .aboutImgWrapper {
        width: 50%;
        display: flex;
        justify-content: flex-start;
        align-items: center;
    }

    .aboutImgWrapper img {
        width: 75%;
        height: auto;
    }

    h1 {
        font-size: 2.5rem;
        margin: 10% 0;
    }

    img {
        width: 50%;
        height: auto;
    }
`

export default Achievements;