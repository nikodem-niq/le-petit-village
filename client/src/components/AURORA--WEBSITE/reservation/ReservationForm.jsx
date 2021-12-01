import './Reservation.css';
import styled from 'styled-components';
import axios from 'axios';
import { useState, useEffect } from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';
import Navbar from '../navbar/Navbar';

const ReservationForm = (props) => {
    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState([]);

    // 1st Form
    const [when, setWhen] = useState('');

    // 2nd Form
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [howManyChildren, setHowManyChildren] = useState(0);
    const [nameOfChildren, setNameOfChildren] = useState('');

    const [formStep, setFormStep] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
          axios({
            method: 'get',
            url: `/programs/fetch?programId=${props.id}`,
            headers: {
                'Content-Type': 'application/json',
                'x-access-token' : localStorage.getItem('userToken')
            },
        }).then(res => {
          res.data.map((row) => {
            row['id'] = row.reservationId;
            row['date'] = moment(row['date']).format('L');
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


      switch(formStep) {
          case 0:
            return (
                <>
                <Navbar/>
                <div className="reservationWrapper--when">
                    <div className="reservationWrapper--header">
                        <Link to="/booking">Back</Link>
                        <Header>Schedule Online</Header>

                    </div>
                    <div className="availableReservation">
                        {data.map((el) => {
                            return(
                                <>
                                <ReservationCard className={when === el.bookId ? 'activeReservation' : ''} onClick={() => setWhen(el.bookId)}>
                                        {el.date} <br/>
                                        {el.hour} <br/>
                                        Limit: <br/>
                                        {el.currentlyReservated}/{el.limit}
                                </ReservationCard>
                                </>
                            )
                        })}
                                    <TextCard>
                                        <p style={{cursor: 'pointer'}} onClick={() => setFormStep(1)}>Next</p>
                                    </TextCard>
                    </div>
                </div>
                </>
            )
        case 1:
            return (
                <div className="reservationWrapper--who">
                    <Link to="#" onClick={() => setFormStep(0)}>Back</Link>
                    <input type="text" className="reservationInput" placeholder="Full name"/>
                    <input type="text" className="reservationInput" placeholder="Email"/>
                    <input type="text" className="reservationInput" placeholder="Phone"/>
                    <input type="text" className="reservationInput" placeholder="Phone"/>
                    etc
                </div>
            )
      }
}

const ReservationCard = styled.div`
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
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

const Header = styled.h1`
    font-size: 2em;
`

export default ReservationForm;