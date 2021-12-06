import styled from 'styled-components';

const Contact = () => {
    return (
        <ContactWrapper>
            <ContactHeader>Contact Us</ContactHeader>
            <form id="contactForm">
                <label></label>
            </form>
        </ContactWrapper>
    )
}

const ContactWrapper = styled.div`
    min-height: 100vh;
    width: 100%;
    height: auto;
    display: flex;
    justify-content: center;
    /* align-items: center; */
    background: #F2EFE6;
`

const ContactHeader = styled.h1`
    margin-top: 3% 0;
    font-size: 4em;
    color: #35332F;
    z-index: 3;

    @supports (-webkit-text-stroke: 1px black) {
        &::after {
        content: 'Contact Us';
        width: 100%;
        /* height: 100%; */
        left: 2%;
        bottom: 10.5%;
        z-index: -1;
        -webkit-text-stroke: 2px #35332F;
        -webkit-text-fill-color: transparent;
        display: flex;
        /* border: solid 2px black; */
        position: relative;
    }
    }
`

export default Contact;