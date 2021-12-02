import './Reservation.css';
import styled from 'styled-components';
import axios from 'axios';
import { useState, useEffect } from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';
import CheckoutLayout from './checkout/CheckoutLayout';
import { validate } from '../../../middlewares/validate';

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

    const [errors, setErrors] = useState({
      fullName : 'empty',
      email : 'empty',
      phone : 'empty',
      howManyChildren : 'empty',
      nameOfChildren : 'empty',
  })

    const [formStep, setFormStep] = useState(0);

    const handleChange = (event) => {
        const { name, value } = event.target;
        validate(name,value,errors,setErrors);
        switch(name) {
          case 'fullName':
            setFullName(value);
            break;
          case 'email':
            setEmail(value);
            break;
          case 'phone':
            setPhone(value);
            break;
          case 'howManyChildren':
            setHowManyChildren(parseInt(value));
            break;
          case 'nameOfChildren':
            setNameOfChildren(value);
            break;
        }
      }

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
            row['id'] = row.programId;
            row['date'] = moment(row['date']).format('LL');
          })
          setData(res.data);
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
                <div className="reservationWrapper--when">
                    <div className="reservationWrapper--header">
                        <Link to="/booking"><BackButton>Back</BackButton></Link>
                        <Header>Schedule Online</Header>

                    </div>
                    <div className="availableReservation">
                        {data.map((el) => {
                            return(
                                <>
                                {!(el.currentlyReservated >= el.limit) ?
                                  <ReservationCard className={when === el.bookId ? 'activeReservation' : ''} onClick={() => setWhen(el.bookId)}>
                                  <h4>{el.hour} </h4>
                                  <h3>{el.date} </h3>
                                  </ReservationCard>
                                : 
                                <ReservationCardDisabled className={when === el.bookId ? 'activeReservation' : ''}>
                                <h4>{el.hour} </h4>
                                <h3>{el.date} </h3> <br/>
                                <h3>Limit of reservations exceeded!</h3>
                                </ReservationCardDisabled>
                                }
                                </>
                            )
                        })}
                    </div>
                                    {/* <TextCard> */}
                                        <NextButton className="nextButton" style={{cursor: 'pointer'}} onClick={() => setFormStep(1)}>Next</NextButton>
                                    {/* </TextCard> */}
                </div>
                </>
            )
        case 1:
            return (
                <div className="reservationWrapper--who">
                    <div className="reservationWrapper--header">
                        <Link to="/booking" onClick={() => setFormStep(0)}><BackButton>Back</BackButton></Link>
                        <Header>Enter your details</Header>
                    </div>
                    {errors.fullName !== 'empty' && errors.fullName !== ''  ? <ErrorBox>{errors.fullName}</ErrorBox> : ''}
                    <input type="text" name="fullName" onChange={handleChange} className="reservationInput" placeholder="Full name" required/>
                    {errors.email !== 'empty' && errors.email !== ''  ? <ErrorBox>{errors.email}</ErrorBox> : ''}
                    <input type="text" name="email" onChange={handleChange} className="reservationInput" placeholder="Email" required/>
                    {errors.phone !== 'empty' && errors.phone !== ''  ? <ErrorBox>{errors.phone}</ErrorBox> : ''}
                    <input type="text" name="phone" onChange={handleChange} className="reservationInput" placeholder="Phone" required/>
                    {errors.howManyChildren !== 'empty' && errors.howManyChildren !== ''  ? <ErrorBox>{errors.howManyChildren}</ErrorBox> : ''}
                    <input type="number" name="howManyChildren" onChange={handleChange} className="reservationInput" placeholder="Number of children" required/>
                    {errors.nameOfChildren !== 'empty' && errors.nameOfChildren !== ''  ? <ErrorBox>{errors.nameOfChildren}</ErrorBox> : ''}
                    <input type="text" name="nameOfChildren" onChange={handleChange} className="reservationInput" placeholder="Name of children" required/>
                    <NextButton style={!(errors.fullName === '' && errors.email === '' && errors.phone === '' && errors.howManyChildren === '' && errors.nameOfChildren === '') ? {cursor: 'not-allowed'} : {cursor: 'pointer'}} disabled={!(errors.fullName === '' && errors.email === '' && errors.phone === '' && errors.howManyChildren === '' && errors.nameOfChildren === '')} onClick={() => {setFormStep(2)}}>Next</NextButton>
                </div>
            )
        case 2:
            return (
                <div className="reservationWrapper--payment">
                          <Link to="/booking" onClick={() => setFormStep(1)}><BackButton>Back</BackButton></Link>

                  {/* <div style={{display: 'flex', justifyContent: 'center'}}>
                    <Link to="/booking" onClick={() => setFormStep(1)}><BackButton>Back</BackButton></Link>
                    <CheckoutData>
                      <h1>Payment details</h1>
                      <h2>Programme: {console.log(props)}</h2>
                    </CheckoutData>
                  </div> */}
                  <CheckoutLayout id={props.id} data={{data, when, fullName, email, phone, howManyChildren, nameOfChildren}}/>
                </div>
            )
      }
}

const ReservationCard = styled.div`
    display: flex;
    /* flex-wrap: wrap; */
    /* flex-direction: row; */
    align-items: center;
    width: 25%;
    height: 25vh;
    /* padding: 3%; */
    margin: 2%;
    border: 2.5px solid black;
    border-radius: 15px;
`

const ReservationCardDisabled = styled.div`
    display: flex;
    /* flex-wrap: wrap; */
    /* flex-direction: row; */
    align-items: center;
    width: 25%;
    height: 25vh;
    /* padding: 3%; */
    margin: 2%;
    border: 2.5px solid black;
    border-radius: 15px;
    background-color: #a3a3a3;
`

const CheckoutData = styled.div`
  display: flex;
  /* align-items: center; */
  /* justify-content: center; */
  font-size: 0.5em;
  padding: 2%;
  flex-direction: column;
  width: 10rem;
  /* background-color: black; */
  border: solid 2px black;
  border-radius: 15px;
  height: 5rem;
  margin: 5% 0;
`

const TextCard = styled.div`
    /* display: flex; */
    /* justify-content: center;
    flex-direction: column;
    align-items: center; */
    width: 30%;
    height: 10em;
    margin: 3%;
    border-radius: 20px;
    z-index: 1;
    border: solid 2px black;

    &::after {
        display: flex;
        content: '';
        width: 100%;
        height: 100%;
        position: relative;
        top: 0%;
        left: 10%;
        border-radius: 20px;
        z-index: -1;
        background-color: #F1C40F;
    }
`

const Header = styled.h1`
    font-size: 2em;
`

const BackButton = styled.button`
    position: relative;
    right: 50%;
    top: 20%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #E5D6AC;
    font-size: 1.3em;
    color: black;
    height: auto;
    padding: 1em;
    border: none;
    border-radius: 10px;
    cursor: pointer;
    font-weight: bold;
`

const NextButton = styled.button`
    /* position: relative; */
    /* right: 50%; */
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #E5D6AC;
    font-size: 1.3em;
    color: black;
    height: auto;
    margin: 1% 0;
    padding: 1em;
    border: none;
    border-radius: 10px;
    cursor: pointer;
    font-weight: bold;
`

const ErrorBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 2em;
  background-color: #c41c1ca2;
  opacity: 0.9;
  color: black;
`

export default ReservationForm;