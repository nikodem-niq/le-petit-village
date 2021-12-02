import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js"
import axios from "axios"
import React, { useState } from 'react'
import './Checkout.css'
import styled from 'styled-components'
import { useEffect } from "react"
import moment from 'moment';
import { Link } from "react-router-dom"

import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import { modalStyle } from '../../../../utils/config';
import { BackButton } from "../../../prebuilt--styled/BackButton"

const CARD_OPTIONS = {
	iconStyle: "solid",
	style: {
		base: {
			iconColor: "#c4f0ff",
			color: "#fff",
			fontWeight: 500,
			fontFamily: "Roboto, Open Sans, Segoe UI, sans-serif",
			fontSize: "16px",
			fontSmoothing: "antialiased",
			":-webkit-autofill": { color: "#fce883" },
			"::placeholder": { color: "#87bbfd" }
		},
		invalid: {
			iconColor: "#ffc7ee",
			color: "#ffc7ee"
		}
	}
}

const CheckoutForm = (props) => {
    const [success, setSuccess] = useState(false)
    const [error, setError] = useState(false)
    const [bookData, setBookData] = useState([]);
    const [programData, setProgramData] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const [processingPayment, setProcessingPayment] = useState(false);

    const [isModal, setModal] = useState(false);
    const [isErrorModal, setErrorModal] = useState(false);


    const stripe = useStripe()
    const elements = useElements()


    const { fullName,email,phone,howManyChildren,nameOfChildren } = props.data;
    useEffect(() => {
        const fetchData = async () => {
          axios({
            method: 'get',
            url: `/booking/fetch?bookId=${props.data.when}`,
            headers: {
                'Content-Type': 'application/json',
                'x-access-token' : localStorage.getItem('userToken')
            },
        }).then(res => {
          res.data.map((row) => {
            row['date'] = moment(row['date']).format('LL');
          })
          setBookData(res.data[0]);
        }).catch(err => {
          console.log(err);
        })
        }

        axios({
            method: 'get',
            url: `/programs/fetch?programPrice=${props.id}`,
            headers: {
                'Content-Type': 'application/json',
                'x-access-token' : localStorage.getItem('userToken')
            },
        }).then(res => {
          res.data.map((row) => {
            row['date'] = moment(row['date']).format('LL');
          })
          setProgramData(res.data[0]);
        }).catch(err => {
          console.log(err);
        })
    
        fetchData().then(() => {
          setLoading(false);
        })
    
      }, [isLoading])

    const handleSubmit = async (e) => {
        e.preventDefault()
        setProcessingPayment(true);
        const {error, paymentMethod} = await stripe.createPaymentMethod({
            type: "card",
            card: elements.getElement(CardElement)
        })


    if(!error) {
        try {
            const {id} = paymentMethod
            const response = await axios.post("/payments/payment", {
                amount: programData.cost * 100,
                id
            })

            if(response.data.success) {
                axios({
                    method: 'post',
                    url: '/reservations/post',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    data : {
                        bookId: props.data.when,
                        fullName,
                        email,
                        phone,
                        howManyChildren,
                        nameOfChildren
                    }
                  }).then(res => {
                    if(res.status === 200 || res.status === '200') {
                      setModal(true);
                      setTimeout(() => {
                        window.location.href = '/booking';
                      }, 1500)
                    } else if(res.status === 401 || res.status === '401') {
                      setModal(true);
                    }
                  }).catch(err => {
                    setErrorModal(true)
                    setModal(true);
                  })
                setSuccess(true)
                setProcessingPayment(false)
            }

        } catch (error) {
            console.log("Error", error)
        }
    } else {
        console.log(error.message)
        setError(error)
    }
}
    return (
        <div className="checkoutWrapper">
        <div>
      <Modal
        open={isModal}
        onClose={() => {setModal(false); setErrorModal(false)}}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        >
        <Box sx={modalStyle}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {success ? <p style={{color: 'green'}}>Successfully booked!</p> : <p style={{color: 'red'}}> Try again! Error with payment.</p>}
          </Typography>
          {/* <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </Typography> */}
        </Box>
      </Modal>
    </div>
        <>
        <div style={{display: 'flex', justifyContent: 'center', width: '100%'}}>
        <CheckoutData>
          <Link to="#" onClick={() => props.setFormStep(1)}><BackButton border="2px solid black">Back</BackButton></Link>
            <div>
                <h1>Payment details</h1>
                <hr/>
                <h2>Price: {programData.cost}£</h2>
                <h2>Full name: {fullName}</h2>
                <h2>Email: {email}</h2>
                <h2>Phone: {phone}</h2><br/>
            </div>
            <div>
                <h1>Booking details</h1>
                <hr/>
                <h2>Date: {bookData.date}</h2>
                <h2>Time: {bookData.hour}</h2>
                <h2>How many children: {howManyChildren}</h2>
                <h2>Name of children: {nameOfChildren}</h2>
                <h2>Currently reservations: {bookData.currentlyReservated}/{bookData.limit}</h2>
            </div>
        </CheckoutData>
    </div>
        <form id="stripeForm" onSubmit={handleSubmit}>
            <fieldset className="FormGroup">
                <div className="FormRow">
                    <CardElement options={CARD_OPTIONS}/>
                </div>
            </fieldset>
            {processingPayment ? <button disabled style={{cursor: 'not-allowed'}} id="stripeButton">Procesing..</button> :
            <button id="stripeButton">Pay</button>}
        </form>
        </>
            
        </div>
    )
}


const CheckoutData = styled.div`
  display: flex;
  /* align-items: center; */
  justify-content: space-between;
  font-size: 0.7rem;
  padding: 5%;
  /* flex-direction: column; */
  width: 50%;
  background-color: #E5D6AC;
  border: solid 1px black;
  border-radius: 15px;
  height: auto;
  margin: 5% 0;
  
  hr {
    width: 100%;
    background-color: black;
    border: black 1px solid;
    height: 0.2em;
    border-radius: 25px;
  }

  div {
    margin: 0 5%;
  }
`

export default CheckoutForm;