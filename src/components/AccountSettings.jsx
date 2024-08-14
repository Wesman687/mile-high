import { Modal } from "@mui/material";
import Select from "react-select";
import "./AccountSettings.css";
import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch, useSelector } from "react-redux";
import { closeSettingModal, openSettingModal } from "../redux/modalSlice";
import { State, City } from "country-state-city";
import {
  collection,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "../firebase/init";
import { setUser } from "../redux/userSlice";

const AccountSettings = () => {
  const states = State.getAllStates();
  const cities = City.getAllCities();
  const isOpen = useSelector((state) => state.modals.settingModalOpen);
  const user = useSelector((state) => state.user);
  const [newFirstName, setFirstName] = useState(user.firstName);
  const [newLastName, setLastName] = useState(user.lastName);
  const [newPhone, setPhone] = useState(user.phone);
  const [newAddress, setAddress] = useState(user.address);
  const [newCity, setCity] = useState(user.city);
  const [newState, setState] = useState(user.state);
  const [newZip, setZip] = useState(user.zip);
  const [loading, setLoading] = useState(false);
  const [ready, setReady] = useState(false);
  const [newStateid, setstateid] = useState(user.stateid);
  const dispatch = useDispatch();
  let valueStates = [];
  let valueCities = [];
  const checkDisable = () => {
    return (
      user.firstName === newFirstName &&
      user.lastName === newLastName &&
      user.phone === newPhone &&
      user.address === newAddress &&
      user.zip === newZip &&
      user.city === newCity &&
      user.state === newState
    );
  };
  useEffect(() => {
    setReady(true);
    filterStates();
  });
  const filterStates = () => {
    const refinedStates = states.filter((states) => states.countryCode == "US");
    refinedStates.map((state) => {
      valueStates.push({
        value: state.name,
        label: state.name,
        stateid: state.isoCode,
      });
    });
  };
  const filterCity = () => {
    const refinedCities = cities.filter(
      (cities) => cities.stateCode == newStateid
    );
    refinedCities.map((cities) => {
      valueCities.push({ value: cities.name, label: cities.name });
    });
    return valueCities;
  };

  const updateUser = async (e) => {
    e.preventDefault();
    e.stopPropagation()
    setLoading(true);
    try {
      const userRef = await query(
        collection(db, "user"),
        where("uid", "==", user.uid)
      );
      const data = await getDocs(userRef);
      if (data.empty) {
        console.log("nothing", data.docs, user.uid);
      }
      const userInfo = data.docs.map(doc => doc.data())[0]
      const userData = {
        firstName: newFirstName,
        lastName: newLastName,
        city: newCity,
        address: newAddress,
        state: newState,
        zip: newZip,
        phone: newPhone,
        stateid: newStateid,
        email: userInfo.email,
        uid: userInfo.uid
      };
      const docRef = doc(db, "user", data.docs[0].id);
      await updateDoc(docRef, userData);
      dispatch(setUser(userData));
      
    } catch (error) {
      alert("Something went wrong with updating data, check your connection and try again.")
    }
    
    setLoading(false);
    dispatch(closeSettingModal());
  };
  return (
    <>
      {ready && (
        <>
          <p
            className="sb__link"
            onClick={() => dispatch(openSettingModal())}
          >
            Settings
          </p>
          <Modal
            open={isOpen}
            onClose={() => dispatch(closeSettingModal())}
            className="settings__modal contact__modal"
          >
            <div className="login contact settings">
              <div className="contact-form settings_form">
                <div className="contact__x">
                  <button
                    className="times__button"
                    onClick={() => dispatch(closeSettingModal())}
                  >
                    <FontAwesomeIcon icon="times" />
                  </button>
                </div>
                {loading ? (
                  <div className="login-spinner">
                    <FontAwesomeIcon icon="fas fa-spinner"></FontAwesomeIcon>
                  </div>
                ) : (
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
                      <div className="select">
                        <Select
                          name="States"
                          isSearchable={true}
                          defaultInputValue={newState}
                          options={valueStates}
                          classNamePrefix="react-select"
                          unstyled={true}
                          onChange={(e) => {
                            setstateid(e.stateid);
                            setState(e.value);
                            filterCity();
                          }}
                        ></Select>
                      </div>

                      <div className="select2">
                        <Select
                          name="Cities"
                          isSearchable={true}
                          defaultInputValue={newCity}
                          options={filterCity()}
                          classNamePrefix="react-select"
                          unstyled={true}
                          onChange={(e) => {
                            setCity(e.value);
                          }}
                        ></Select>
                      </div>

                      <input
                        value={newZip}
                        onChange={(event) => {
                          setZip(event.target.value);
                        }}
                        type="zip"
                        placeholder="Zip"
                      />

                      {checkDisable() ? (
                        <button className="disable__submit" disabled="True">
                          Update
                        </button>
                      ) : (
                        <button
                          className="contact__submit"
                          onClick={(e) => updateUser(e)}
                          type="submit"
                        >
                          Update
                        </button>
                      )}
                    </form>
                  </>
                )}
              </div>
            </div>
          </Modal>{" "}
        </>
      )}
    </>
  );
};

export default AccountSettings;
