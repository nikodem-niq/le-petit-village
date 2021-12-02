import { Elements } from "@stripe/react-stripe-js"
import { loadStripe } from "@stripe/stripe-js"
import React from "react"
import CheckoutForm from "./CheckoutForm"

const PUBLIC_KEY = "pk_test_51K24W8ILqNIJwsdwvVGaPPzV97MuQ5lHssD4oSzh7XPrsV6ILM48oKoc1gpkiSyupiLssMLo69Gbq1GLJ2Gbb93500FqwspLsC"

const stripeTestPromise = loadStripe(PUBLIC_KEY)

const CheckoutLayout = (props) => {
	return (
		<Elements stripe={stripeTestPromise}>
			<CheckoutForm data={props.data} id={props.id} setFormStep={props.setFormStep}/>
		</Elements>
	)
}

export default CheckoutLayout;