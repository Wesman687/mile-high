import { Modal } from '@mui/material';
import './AccountSettings.css'
import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useDispatch, useSelector } from 'react-redux';
import { closeSettingModal, openSettingModal } from '../redux/modalSlice';
import {
    CitySelect,
    CountrySelect,
    StateSelect,
    LanguageSelect,
  } from "react-country-state-city";
  import "react-country-state-city/dist/react-country-state-city.css";

const AccountSettings = () => {
    const isOpen = useSelector((state) => state.modals.settingModalOpen)
    const user = useSelector((state) => state.user)
    const [newFirstName, setFirstName] = useState(user.firstName)
    const [newLastName, setLastName] = useState(user.lastName)
    const [newPhone, setPhone] = useState(user.phone)
    const [newAddress, setAddress] = useState(user.address)
    const [newCity, setCity] = useState(user.city)
    const [newState, setState] = useState(user.state)
    const [newZip, setZip] = useState(user.zip)
    const [loading, setLoading] = useState(false)
    const [ready, setReady] = useState(false)
    const [countryid, setCountryid] = useState(0);
    const [cityid, setCityid] = useState(0)
    const [stateid, setstateid] = useState(0);
    const dispatch = useDispatch()
    const checkDisable = () => {
        return ((user.firstName === newFirstName) && (user.lastName === newLastName) && (user.phone === newPhone) && (user.address === newAddress)  && (user.state === newState) && (user.zip === newZip))
    }
    useEffect(()=> {
        setReady(true)
    })
  return (
    <>
        {ready && <><p className="nav_link sb__link" onClick={()=>dispatch(openSettingModal())}>Settings</p>
        <Modal
        open={isOpen}
        onClose={() => dispatch(closeSettingModal())}
        className="settings__modal contact__modal"
      >
          <div className="login contact settings">
            
            <div className="contact-form settings_form">
                
            <div className='contact__x'>
            <button className='times__button' onClick={()=>dispatch(closeSettingModal())}>
                <FontAwesomeIcon icon="times" />
                </button>
            </div>
              {loading ?  
          <div className="login-spinner">
            <FontAwesomeIcon icon="fas fa-spinner"></FontAwesomeIcon>
            </div>
           
              : 
              <>
              <h1>Review Account Information, and update as needed.</h1>
              <form>                   
                  <input
                    value={newFirstName}
                    onChange={(event) => {
                      setFirstName(event.target.value);
                    }}
                    type="first Name"
                    placeholder="First Name"
                  />
                <input
                  value={newLastName}
                  onChange={(event) => {
                    setLastName(event.target.value);
                  }}
                  type="last Name"
                  placeholder="Last Name"
                />
                <input
                  value={newPhone}
                  onChange={(event) => {
                    setPhone(event.target.value);
                  }}
                  type="phone"
                  placeholder="Phone Number"
                />
                <input
                  value={newAddress}
                  onChange={(event) => {
                    setAddress(event.target.value);
                  }}
                  type="address"
                  placeholder="Address"
                />
                <h6>Country</h6>
      <CountrySelect
        onChange={(e) => {
          setCountryid(e.id);
        }}
        placeHolder="Select Country"
      />
      <h6>State</h6>
      <StateSelect
        countryid={countryid}
        onChange={(e) => {
          setstateid(e.id);
        }}
        placeHolder="Select State"
      />
      <h6>City</h6>
      <CitySelect
        countryid={countryid}
        stateid={stateid}
        value={cityid}
        onChange={(e) => {
          setCityid(e.id)
        }}
        placeHolder="Select City"
      />
                <input
                  value={newZip}
                  onChange={(event) => {
                    setZip(event.target.value);
                  }}
                  type="zip"
                  placeholder="Zip"
                />
                
            
                {checkDisable() ?  <button className='disable__submit' type='submit'>Update</button>   : <button className='contact__submit' type='submit'>Update</button>}
                </form>
                </>}
              </div>
            </div>
      </Modal>   </>  }
      
    </>
  )
}

export default AccountSettings
