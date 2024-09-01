import React from 'react'
import './Benefits.css'
import { Fade } from 'react-awesome-reveal'

const Benefits = () => {
  return (
    <div className="landing__container benefit__container">
    <div className='benefits__wrapper'>
        <h1>THCa BENEFITS</h1>
        <Fade cascade={true}>
        <p>Common conditions for which  cannabinoids are used are chronic pain, cancer, chemotherapy-induced nausea and vomiting, anorexia and weight loss associated with HIV, </p> 
        <p> irritable bowel syndrome, degenerative neurological conditions, epilepsy, spasticity, Tourette syndrome, amyotrophic lateral sclerosis, cachexia, Huntington's disease,</p> 
        <p> Parkinson's disease, dystonia, dementia, glaucoma, traumatic brain injury, addiction, anxiety, depression, sleep disorders, </p> 
        <p> posttraumatic stress disorder, and schizophrenia and other psychoses.</p>
        </Fade>
    </div>
    </div>
  )
}

export default Benefits
