import styled from 'styled-components'

const DonateButton = styled.button`
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #F1C40F;
    color: black;
    /* width: 17.5%; */
    height: auto;
    padding: 1em;
    border: none;
    border-radius: 20px;
    cursor: pointer;
    font-weight: bold;

    #donateLink .donateButton {
        text-decoration: none;
    }
`

export default DonateButton;