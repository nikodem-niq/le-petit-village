import './Reservation.css';
import styled from 'styled-components';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import cardOfProgram from '../../../img/cardOfProgram.svg'
import FadingBalls from 'react-cssfx-loading/lib/FadingBalls';

const Reservation = () => {
    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
          axios({
            method: 'get',
            url: `/programs/fetch`,
            headers: {
                'Content-Type': 'application/json',
                'x-access-token' : localStorage.getItem('userToken')
            },
        }).then(res => {
          res.data.map((row) => {
            row['id'] = row.reservationId;
          })
          setData(res.data);
          console.log(res.data);
        }).catch(err => {
          console.log(err);
        })
        }
    
        fetchData().then(() => {
          setLoading(false);
        })
    
      }, [isLoading])


      if(isLoading) {
        return (
            <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh'}}><FadingBalls color="#3a43cc" width="20px" height="20px" duration="2s" /></div>
        )
    } else {
    return (
        <div className="reservationWrapper">
            <Header>Make a reservation</Header>
            <SubHeader>funding of sessions</SubHeader>
            <div className="cardWrapper">
            {data.map((el) => {
                return (
                    <ProgramCard duration={el.duration}>
                        <TextCard>
                            <div style={{display: 'flex', flexDirection: 'column'}}>
                            <Header>{el.header}</Header>
                            <SubHeader>{el.subHeader}</SubHeader>
                            </div>
                        </TextCard>
                        <PriceCard>
                            <PriceHeader> {el.cost}£ </PriceHeader>
                            <Link to={`/booking/${el.programId}`}><BookButton>Book now!</BookButton></Link>
                        </PriceCard>
                    </ProgramCard>
                    )
                })}
                </div>
        </div>
    )}
}

const ProgramCard = styled.div`
    display: flex;
    position: relative;
    align-items: flex-start;
    justify-content: flex-end;
    /* flex-direction: column; */
    width: 20em;
    height: 20em;
    margin: 10%;
    padding: 3%;
    border: solid 2px black;
    border-radius: 20px;
    /* background: url(${cardOfProgram}); */
    /* background-size: 100% 100%; */
    /* background-repeat: no-repeat; */
    &::before {
        content: '';
        min-width: 26em;
        max-width: 31em;
        height: 26em;
        position: relative;
        background-color: #E5D6AC;
        border-radius: 20px;
        top: -10%;
        left: 20%;
        z-index: -1;
        /* margin: 6%; */
    }

    &::after {
        content: '${props => props.duration} min.';
        font-size: 1.2em;
        display: flex;
        justify-content: center;
        align-items: center;
        position: absolute;
        top: -15%;
        right: -15%;
        background-color: white;
        border-radius: 100%;
        width: 7em;
        height: 7em;
    }
`
const TextCard = styled.div`
    display: flex;
    position: absolute;
    flex-direction: column;
    width: 85%;
    height: 100%;
    justify-content: space-between;
    /* align-items: center; */
`

const PriceCard = styled.div`
    display: flex;
    position: absolute;
    bottom: 10%;
    width: 80%;
    height: 20%;
    justify-content: space-evenly;
    align-items: center;
`

const BookButton = styled.button`
    width: 100%;
    height: 4em;
    padding: 5%;
    background-color: black;
    color: white;
    border: none;
    box-shadow: black 1px 1px 2px 2px;
    border-radius: 5px;
    cursor: pointer;
`

const PriceHeader = styled.h2`
    font-size: 5em;
`


const Header = styled.h1`
    font-size: 3em;
    font-weight: bold;
`

const SubHeader = styled.h2`
    font-size: 2em;
    opacity: 0.5;
`

export default Reservation;