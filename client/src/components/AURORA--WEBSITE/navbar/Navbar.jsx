import styled from 'styled-components';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from 'react-router-dom';
import './Navbar.css'
import logo from '../../../img/logo.svg';
import { useEffect, useState } from 'react';

const Navbar = () => {
    const [isOpenMenu, openMenu] = useState(false);
    const handleOpenMenu = () => openMenu(!isOpenMenu);
    useEffect(() => {
        window.addEventListener('resize', () => openMenu(false));
        window.addEventListener('scroll', () => openMenu(false));
    }, [])

    return (
        <NavWrapper>
            <MenuIcon id="hamburger" onClick={handleOpenMenu}/>
            {/* <h2 id="headerTitle"><b>Services</b> Counselling</h2> */}
            <div className="logoWrapper">
                <img src={logo}/>
            </div>
            <div className="menuWrapper">
                <ul>
                    <Link to="#">Home</Link>
                    <Link to="#">Services</Link>
                    <Link to="#">Opening</Link>
                    <Link to="#">Contact</Link>
                </ul>
            <DonateButton id="donateBtn"><b>RESERVATION</b></DonateButton>
            </div>
                    {isOpenMenu ? <NavMobile>
                    <ul className="navMobileList">
                    <Link to="#">Home</Link>
                    <Link to="#">Services</Link>
                    <Link to="#">Opening</Link>
                    <Link to="#">Contact</Link>
                    </ul>
                    </NavMobile> : ''}
        </NavWrapper>
    )
}

const NavMobile = styled.div`
    position: absolute;
    top: 10vh;
    left: 0;
    background-color: #000000;
    opacity: 0.3;
    width: 100%;

    .navMobileList {
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        align-items: center;
        width: 100%;
        height: 50vh;
    }

    .navMobileList > a {
        text-decoration: none;
        margin: 0;
        color: white;
        font-size: 1.55em;
    }
`

const NavWrapper = styled.nav`
    z-index: 999;
    position: relative;
    font-family: 'Roboto', sans-serif;
    font-size: 0.95rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 10vh;
    color: white;

    background-color: #F2EFE6;
`

const DonateButton = styled.button`
    position: relative;
    right: 50%;
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
    /* margin: 0 1%; */
`

export default Navbar;