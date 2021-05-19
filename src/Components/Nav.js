import React from 'react';
import styled from 'styled-components'

export default function Nav(props) {
  const stepnum= props.stepno;
  if(stepnum < 4){
    return (
           <Background>
        
          {
            <h3>Place your Bid ( {stepnum+1} /5 Step)</h3>
       
          } 
           
          </Background>
    )
}


  return (
    <Background>
      <h3>Summary and Submit  Bid ({stepnum+1}/5 Step)</h3>
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

