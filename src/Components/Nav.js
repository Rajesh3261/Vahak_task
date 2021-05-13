import React from 'react';
import styled from 'styled-components'

export default function Nav(props) {
    return (
        <Background>
          {
            <h3>Place your Bid ( {props.stepno+1} /5 Step)</h3>
          } 
         
          </Background>
    )
}



const Background =styled.div`
height:20vh;
background-color: #08123b;
display: flex;
align-items:center;
justify-content:center;
color: white;
font-family:Source Sans Pro;
font-size:30px;

`;

