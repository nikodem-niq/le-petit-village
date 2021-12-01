import styled from 'styled-components';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import Twitter from '@mui/icons-material/Twitter';
import Facebook from '@mui/icons-material/Facebook'

const Footer = () => {
    return (
        <FooterWrapper>
            <TopWrapper>
                <LeftWrapper>
                    <h5>LePetitVillage</h5> <br/>
                    <h6>Mail: LOREM IPSUM</h6>
                    <h6>Phone: 123</h6>
                </LeftWrapper>
                <RightWrapper>
                    <ul>
                        <div>
                            <li>LOREM IPSUM</li>
                            <li>LOREM IPSUM</li>
                            <li>LOREM IPSUM</li>
                        </div>
                        <div>
                            <li>LOREM IPSUM</li>
                            <li>LOREM IPSUM</li>
                            <li>LOREM IPSUM</li>
                        </div>
                        <div>
                            <li>LOREM IPSUM</li>
                            <li>LOREM IPSUM</li>
                            <li>LOREM IPSUM</li>
                        </div>
                    </ul>
                </RightWrapper>
            </TopWrapper>
            <BottomWrapper>
                <div className="leftLine"></div>
                    <WhatsAppIcon fontSize="large"/>
                    <Twitter fontSize="large"/>
                    <Facebook fontSize="large"/>
                <div className="rightLine"></div>
            </BottomWrapper>
        </FooterWrapper>
    )
}

const FooterWrapper = styled.footer`
    height: 35vh;
    width: 100%;
    background-color: #242424;
    color: white;

    display: flex;
    flex-direction: column;
`

const TopWrapper = styled.div`
    display: flex;
    width: 100%;
    height: 70%;
    justify-content: space-around;
    align-items: center;
`

const BottomWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 100%;
    width: 100%;

    .leftLine {
        background-color: white;
        width: 60%;
        height: 3%;
    }

    .rightLine {
        background-color: white;
        width: 20%;
        height: 3%;
    }
`

const LeftWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 50%;
    height: 100%;

    h5 {
        font-size: 2.5em;
    }

    h6 {
        font-size: 1em;
    }
`

const RightWrapper = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    width: 50%;
    height: 100%;
    margin-top: 2%;

    div {
        display: flex
    }

    ul {
        display: flex;
        flex-direction: column;
        list-style: none;
    }

    ul li {
        margin: 1% 0%;
        width: 33%;
        height: 30%;
        letter-spacing: 1px;
    }

    ul li.notLastItem {
        margin: 1% 10%;
    }
`

export default Footer;