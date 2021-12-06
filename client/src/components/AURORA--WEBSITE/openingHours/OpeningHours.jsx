import styled from 'styled-components';

const OpeningHours = () => {
    return (
        <OpeningHoursWrapper>
            <OpeningHoursHeader>Opening Hours</OpeningHoursHeader>
        </OpeningHoursWrapper>
    )
}

const OpeningHoursWrapper = styled.div`
    min-height: 100vh;
    width: 100%;
    height: auto;
    display: flex;
    justify-content: center;
    /* align-items: center; */
    background: #F2EFE6;
`

const OpeningHoursHeader = styled.h1`
    margin-top: 3% 0;
    font-size: 2.5em;
    color: black;
    z-index: 3;

    &::after {
        content: '';
        background: #CCA07A;
        width: 40%;
        height: 15px;
        left: 60%;
        bottom: 2.5%;
        z-index: -1;
        display: flex;
        position: relative;
    }
`

export default OpeningHours;