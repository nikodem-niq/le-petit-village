import styled from 'styled-components';
import React, { useEffect, useState } from "react";
import axios from 'axios';
import moment from 'moment';
import FadingBalls from 'react-cssfx-loading/lib/FadingBalls';


const HeroSection = () => {
    const [currentlyNews, setCurrentlyNews] = useState(1)
    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    
    // Hero section
    const [heroHeader, setHeroHeader] = useState('');
    const [subHeader, setSubHeader] = useState('');

    const fetchData = async () => {
        axios({
          method: 'get',
          url: `/articles/fetch`,
          headers: {
              'Content-Type': 'application/json',
              'x-access-token' : localStorage.getItem('userToken')
          },
      }).then(res => {
        setLoading(true);
        res.data.map((row) => {
          row['id'] = row.articleId;
          row.date = moment(row.date).format('L')
        })
        setLoading(false);
        setData(res.data);
        setLoading(false);
      }).catch(err => {
        console.log(err);
      })
    }
    
    
    useEffect(() => {
        setLoading(true);
        fetchData();
    
      }, [])

      if(isLoading || !data) {
        return (
            <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh'}}><FadingBalls color="#3a43cc" width="20px" height="20px" duration="2s" /></div>
        )
    } else {
    return (
        <ImgWrapper>
            <div className="imgOpacity"></div>
            <HeroWrapper>
                <div id="heroWrapper">
                <h1>{data[currentlyNews-1].header}</h1>
                <h2>{data[currentlyNews-1].subHeader}</h2>
                <p>read more</p>
                </div>
                <div id="sliderWrapper">
                    <div onClick={() => setCurrentlyNews(1)} className={currentlyNews == 1 ? 'activeSlider sliderIcon' : 'sliderIcon'}></div>
                    <div onClick={() => setCurrentlyNews(2)} className={currentlyNews == 2 ? 'activeSlider sliderIcon' : 'sliderIcon'}></div>
                    <div onClick={() => setCurrentlyNews(3)} className={currentlyNews == 3 ? 'activeSlider sliderIcon' : 'sliderIcon'}></div>
                </div>
            </HeroWrapper>
        </ImgWrapper>
    )}
}

const ImgWrapper = styled.div`
    height: 100vh;
    width: 100vw;
    background-image: url('https://i.imgur.com/HTencre.jpg');
    background-position: center center;
    background-repeat: no-repeat;
    background-attachment: fixed;
    background-size: cover;

    .imgOpacity {
        position: absolute;
        z-index: 3;
        background-color: #99905e;
        opacity: 0.1;
        width: 100%;
        height: 100%;
    }
`

const HeroWrapper = styled.div`
    z-index: 5;
    display: flex;
    position: relative;
    top: 35%;
    justify-content: space-between;
    margin: auto;
    align-items: center;
    width: 90%;
    height: 30vh;
    /* background-color: red; */
    font-size: 0.8em;

    #heroWrapper {
        width: 70%;
        color: white;
        /* margin-left: 2%; */
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