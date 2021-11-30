import react from 'react';
import './OfferSection.css';
import styled from 'styled-components';

const OfferSection = () => {
    return (
        <OfferWrapper id="offerWrapper">
            <OfferHeader>What we offer?</OfferHeader>
            <OfferCard>1</OfferCard>
            <OfferCard>2</OfferCard>
            <OfferCard>3</OfferCard>
            <OfferCard>4</OfferCard>
        </OfferWrapper>
    )
}

const OfferCard = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: #E5D6AC;
    box-shadow: rgba(229, 214, 172, 0.3) 0px 0px 20px;
    border-radius: 15px;

    width: 50%;
    height: 40vh;
    margin: 3% 0;
`

const OfferWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    width: 100%;
    height: 100vh;

    margin-top: 5%;
`

const OfferHeader = styled.h1`
    color: #000000c3;
`

export default OfferSection;