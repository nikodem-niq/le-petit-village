import styled from 'styled-components';

export const BackButton = styled.button`
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
    border: ${props => props.border ? props.border : 'none'};
    border-radius: 10px;
    cursor: pointer;
    font-weight: bold;
`