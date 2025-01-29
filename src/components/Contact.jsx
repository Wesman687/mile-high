import React, { useState } from 'react'
import './Contact.css'
import { useDispatch, useSelector } from 'react-redux'
import { Modal} from '@mui/material'
import { closeContactModal, openContactModal } from '../redux/modalSlice'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import emailjs from "@emailjs/browser"
//
const Contact = () => {
    const isOpen = useSelector((state) => state.modals.contactModalOpen)
    const dispatch = useDispatch()
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [text, setText] = useState("")
    const [isSending, setIsSending] = useState(false)
    const [sendStatus, setSendStatus] = useState({ processed: false, message: "", variant: "success" })
    const timeoutAlert = () =>
        setTimeout(() => {
          setSendStatus({ ...sendStatus, processed: false })
        }, 3000) 

    const checkCredentials = () => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (text && name && emailRegex.test(email))
          return true
        else return false
    }
    const sendEmail = async (e) => {   
        e.preventDefault()
        const serviceid = process.env.REACT_APP_SERVICE_ID
        const templateid = process.env.REACT_APP_TEMPLATE_ID
        const publicKey = process.env.REACT_APP_PUBLIC_KEY
        
        
    
        setIsSending(true)
        try {
    
          console.log("trigger")
    
          const templateParams = {
            user_name: name,
            user_email: email,
            message: text
        }
          const response = await emailjs.send(serviceid, templateid, templateParams, publicKey)
    
          console.log("Email sent successfully:", response)
          setIsSending(false)
          setSendStatus({ processed: true, variant: "success", message: "Success!" })
          setEmail("")
          setName("")
          setText("")
          dispatch(closeContactModal())
        } catch (error) {
          console.error("Error sending email:", error)
          setIsSending(false)
          setSendStatus({ processed: true, variant: "error", message: "Error" })
          alert("Error Sending Email, please try again.", sendStatus.message)
        }
    
        timeoutAlert()
      }
    
  return (
    <>
        <p className="nav_link btn__nav--link" onClick={()=>dispatch(openContactModal())}>Contact Us</p>
        <Modal
        open={isOpen}
        onClose={() => dispatch(closeContactModal())}
        className="contact__modal"
      >
        {isSending ? (
          <div className="login-spinner">
            <FontAwesomeIcon icon="fas fa-spinner"></FontAwesomeIcon>
            <img src="" alt="" />
          </div>
        ) : (
            
            <div className="contact-form">
              
                
            <div className='contact__x'>
            <button className='times__button' onClick={()=>dispatch(closeContactModal())}>
                <FontAwesomeIcon icon="times" />
                </button>
            </div>
              <h1>We Look forward to hearing from you</h1>
              <form>
                  <input
                    value={name}
                    onChange={(event) => {
                      setName(event.target.value);
                    }}
                    type="text"
                    placeholder="Your Name"
                  />
                <input
                  value={email}
                  onChange={(event) => {
                    setEmail(event.target.value);
                  }}
                  type="email"
                  placeholder="Email"
                />
                <textarea onChange={e => {
                  setText(e.target.value)                  
                  }} className='contact__text' placeholder='Let us know how we can help you' value={text}></textarea>
                
                
                </form>
                {(checkCredentials()) ? <button className='contact__submit' onClick={(e)=>sendEmail(e)}>{isSending ? 'Sending Message' : 'Send Message'}</button> :
                <button className='contact__submit--disabled'>Fill in Fields</button>
                 }
              </div>
        )}
      </Modal>
      
    </>
  )
}

export default Contact
