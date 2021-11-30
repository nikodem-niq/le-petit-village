import Reservation from "../../../components/AURORA--WEBSITE/reservation/Reservation";
import ReservationForm from "../../../components/AURORA--WEBSITE/reservation/ReservationForm";

const ReservationPage = (props) => {
    if(!props.match.params.id) {
        return (
            <Reservation/>
        )
    } else {
        return (
            <ReservationForm id={props.match.params.id}/>
        )
    }
}

export default ReservationPage;