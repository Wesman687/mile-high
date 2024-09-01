import React from 'react'
import './ShipStates.css'
import { Fade } from 'react-awesome-reveal'
const ShipStates = () => {
  return (
    <div className='landing__container'>
      <div className='states__wrapper'>
      <Fade cascade={true}>
      <p >We CAN currently ship THCa Flower to the following states: </p>
      <p> Alabama, Alaska, Arizona, Arkansas, Connecticut, Florida, Georgia, Illinois, Kentucky, Louisiana, Maine, Missouri, Nebraska, Nevada,</p> 
      <p> New York, North Carolina, Ohio, Pennsylvania, South Carolina, Tennessee, Texas, West Virginia. </p>
      </Fade>
      </div>
    </div>
  )
}

export default ShipStates
