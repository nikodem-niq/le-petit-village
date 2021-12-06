import react from 'react';
import './OfferSection.css';
import styled from 'styled-components';
import cardServiceVector from '../../../img/offerSection/cardServiceVector.svg'
import heart from '../../../img/offerSection/heart.png';
import love from '../../../img/offerSection/love.png';
import sign from '../../../img/offerSection/sign.png';
import hands from '../../../img/offerSection/hands.png';

const OfferSection = () => {
    return (
        <OfferWrapper id="offerWrapper">
            <OfferHeader>Services We Offer</OfferHeader>
            <div id="offerCardWrapper">
                <OfferCard id="firstOfferCard" className="offerCards">
                    <div className="headOfOfferCard">
                        <div className="imageOfferWrapper">
                            <img src={heart} alt="heart"/>
                            <div className="imageUnderline"></div>
                        </div>
                        <h1>Public Play Sessions</h1>
                    </div>
                    <div className="contentOfOfferCard">
                        <p>Lorem ipsum dolor sit amet consectetur adipiscing elit. Fusce porta, turpis vel feugiat laoreet, nisi justo finibus lectus, a bibendum arcu nulla pellentesque </p>
                    </div>
                </OfferCard>
                <OfferCard className="offerCards">
                <div className="headOfOfferCard">
                        <div className="imageOfferWrapper">
                            <img src={love} alt="heart"/>
                            <div className="imageUnderline"></div>
                        </div>
                        <h1>Birthday Parties</h1>
                    </div>
                    <div className="contentOfOfferCard">
                        <p>Lorem ipsum dolor sit amet consectetur adipiscing elit. Fusce porta, turpis vel feugiat laoreet, nisi justo finibus lectus, a bibendum arcu nulla pellentesque </p>
                    </div>
                </OfferCard>
                <OfferCard className="offerCards">
                <div className="headOfOfferCard">
                        <div className="imageOfferWrapper">
                            <img src={sign} alt="heart"/>
                            <div className="imageUnderline"></div>
                        </div>
                        <h1>Programmes</h1>
                    </div>
                    <div className="contentOfOfferCard">
                        <p>Lorem ipsum dolor sit amet consectetur adipiscing elit. Fusce porta, turpis vel feugiat laoreet, nisi justo finibus lectus, a bibendum arcu nulla pellentesque </p>
                    </div>
                </OfferCard>
                <OfferCard className="offerCards">
                <div className="headOfOfferCard">
                        <div className="imageOfferWrapper">
                            <img src={hands} alt="heart"/>
                            <div className="imageUnderline"></div>
                        </div>
                        <h1>Special events</h1>
                    </div>
                    <div className="contentOfOfferCard">
                        <p>Lorem ipsum dolor sit amet consectetur adipiscing elit. Fusce porta, turpis vel feugiat laoreet, nisi justo finibus lectus, a bibendum arcu nulla pellentesque </p>
                    </div>
                </OfferCard>
            </div>
        </OfferWrapper>
    )
}

const OfferCard = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    background-color: #F2EFE6;
    border-radius: 15px;
    border: solid 2px black;
    padding: 2%;
    color: #725C33;

    flex: 1 0 20%;
    /* width: 0%; */
    height: 15rem;
    margin: 3% 10%;

    .imageOfferWrapper {
        display: flex;
        align-items: center;
        flex-direction: column;
    }

    .imageUnderline {
        width: 90%;
        height: 1px;
        margin: 10% 0;
        border: solid 1px #725C33;
        border-radius: 15px;
        background: #725C33;
    }

    .headOfOfferCard {
        display: flex;
        width: 100%;
        height: 30%;
        align-items: center;
        justify-content: space-around;
    }

    .contentOfOfferCard {
        display: flex;
        width: 100%;
        height: 70%;
        padding: 10%
        /* height: auto; */
        /* justify-content: center; */
        /* align-items: center; */
    }

    .headOfOfferCard img {
        width: 100%;
        height: auto;
        max-width: 75px;
    }

    .headOfOfferCard img::after {
        content: '';
        display: flex;
        position: relative;
        background: black;
        width: 100%;
        height: 1em;
    }

    h1 {
        font-size: 1.5em;
        color: #725C33;
    }
`

const OfferWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    min-height: 100vh;
    height: auto;

    margin-top: 5%;

    #offerCardWrapper {
        display: flex;
        justify-content: center;
        flex-wrap: wrap;
        align-items: center;
        /* flex-direction: column; */
        width: 100%;
        height: auto;
        z-index: 3;
    }

    /* #firstOfferCard::before {
    content: '';
    position: relative;
    width: 100%;
    height: 100%;
    background-color: black;
    top: 30%;
    z-index: -1;
    background: url(${cardServiceVector});
    background-repeat: no-repeat;
    left: -5rem;
} */
`

const OfferHeader = styled.h1`
    color: #000000c3;
    font-size: 2.5rem;
    margin-top: 3%;
`

export default OfferSection;