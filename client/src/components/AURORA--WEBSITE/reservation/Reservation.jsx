import './Reservation.css';
import styled from 'styled-components';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

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
            {data.map((el) => {
                return (
                    <ProgramCard>
                        <ImgCard>
                            <img src={el.heroImg} alt="program img"/>
                        </ImgCard>

                        <TextCard>
                            <h3>{el.header}</h3>
                            <h4>{el.subHeader}</h4>
                            <p>{el.duration} min. </p>
                            <p> £{el.cost} </p>
                            <Link style={{textDecoration: 'none', height: '100%', padding: '5%'}} to={`/booking/${el.programId}`}><button>Book now!</button></Link>
                        </TextCard>
                    </ProgramCard>
                )
            })}
        </div>
    )
}

const ProgramCard = styled.div`
    display: flex;
    flex-wrap: wrap;
    /* justify-content: space-evenly; */
    align-items: center;
    width: 25%;
    height: 25vh;
    /* padding: 3%; */
    margin: 2%;
    border: 1px solid black;
    box-shadow: black 1px 1px 3px 1px;
`

const TextCard = styled.div`
    display: flex;
    flex-direction: column;
    width: 50%;
    height: 100%;
    justify-content: center;
    align-items: center;
`

const ImgCard = styled.div`
    width: 50%;
    height: auto;
    /* background-color: black; */

    img {
        max-height: 100%;
        max-width: 100%;
    }
`

export default Reservation;