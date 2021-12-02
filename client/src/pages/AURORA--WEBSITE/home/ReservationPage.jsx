import Footer from "../../../components/AURORA--WEBSITE/footer/Footer";
import Navbar from "../../../components/AURORA--WEBSITE/navbar/Navbar";
import Reservation from "../../../components/AURORA--WEBSITE/reservation/Reservation";
import ReservationForm from "../../../components/AURORA--WEBSITE/reservation/ReservationForm";
import Layout from "../../../components/AURORA--WEBSITE/stripeLayout/Layout";



const ReservationPage = (props) => {
    if(!props.match.params.id) {
        return (
            <>
            <Navbar bg="reservationNav"/>
            <Reservation/>
            <Footer/>
            </>
        )
    } else {
        return (
            <>
            <Layout>
                
            <Navbar bg="reservationNav"/>
            <ReservationForm id={props.match.params.id}/>
            <Footer/>
            </Layout>
            </>
        )
    }
}

export default ReservationPage;