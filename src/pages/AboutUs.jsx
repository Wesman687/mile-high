import React from 'react'
import './AboutUs.css'
import { Fade } from 'react-awesome-reveal'

const AboutUs = () => {
  return (
    <div className='landing__container aboutus__container'>
        <div className="aboutus__wrapper">
          <Fade cascade={true}>
            <h1>ABOUT US</h1>
            <p>Our experience in the Hemp industry spans over 18 years. Our mission is to promote the use of Hemp and highlight its many benefits to users. </p>
              <p>Mile High Hemp Co proudly adheres to a culture of unwavering dedication to premium quality, meaningful engagements, and unrelenting progress.</p> 
              <p>We collaborate with premier farming enterprises in America to deliver exceptional quality and a diverse range of options to our customers.</p>
              <p>We demonstrate a professional passion for Hemp and all its applications. </p>
              </Fade>
        </div>
      
    </div>
  )
}

export default AboutUs
