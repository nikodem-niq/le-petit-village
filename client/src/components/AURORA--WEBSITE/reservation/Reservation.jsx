import './Reservation.css';
import styled from 'styled-components';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import cardOfProgram from '../../../img/cardOfProgram.svg'

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


    return (
        <div className="reservationWrapper">
            <Header>Make a reservation</Header>
            <SubHeader>funding of sessions</SubHeader>
            <div className="cardWrapper">
            {data.map((el) => {
                return (
                    <ProgramCard>
                        <DurationText>{el.duration} min. </DurationText>
                        {/* <TextCard>
                            <h3>{el.header}</h3>
                            <h4>{el.subHeader}</h4>
                            <p> £{el.cost} </p>
                            <Link style={{textDecoration: 'none', height: '100%', padding: '5%'}} to={`/booking/${el.programId}`}><button>Book now!</button></Link>
                        </TextCard> */}
                    </ProgramCard>
                    )
                })}
                </div>
        </div>
    )
}

const ProgramCard = styled.div`
    display: flex;
    align-items: center;
    position: relative;
    width: 20em;
    height: 20em;
    margin: 4%;
    padding: 2%;
    background: url(${cardOfProgram});
    background-size: 100% 100%;
    background-repeat: no-repeat;
`

const DurationText = styled.h4`
    position: relative;
    top: 0;
    right: 0;
    font-size: 1rem;
`

const TextCard = styled.div`
    display: flex;
    flex-direction: row-reverse;
    width: 100%;
    height: 100%;
    justify-content: center;
    align-items: center;
`

const Header = styled.h1`
    font-size: 3em;
    font-weight: bold;
`

const SubHeader = styled.h1`
    font-size: 1.5em;
`

export default Reservation;