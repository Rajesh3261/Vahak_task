import React from 'react'
import styled from 'styled-components';

export default function Header() {
    return (
        <div>
            <Heading><img src='./images/Vaahak.jpg'  alt="logo"/> <span>Vahak</span> </Heading>
           
        </div>
    )
}

const Heading=styled.div`
display:flex;
flex-wrap:nowrap;
width: 100vw;
height:20vh;
img{
    width: 50px;
    height: 50px;
    margin-top: 20px;
    margin-left:5%;
    
}
span{
    margin-top: 40px;
    font-family:Source Sans Pro;
    letter-spacing:0.5px;
    
}
`;

