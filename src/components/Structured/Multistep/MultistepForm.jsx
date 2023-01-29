import React from 'react'
import MultiStep from './MultiStep'

export function DefaultMultistep(props){

  const buttonsStyle = { 
    background: "#33c3f0",
    color: "#ffff",
    width: 200, 
    height: 45,
    borderRadius: 25,
    fontWeight: "bold",
    fontSize: 15,
  }

  return (
    <div className='container'>
      <MultiStep activeStep={0} steps={props.steps} prevStyle={buttonsStyle} nextStyle={buttonsStyle} />
    </div>
  );
}