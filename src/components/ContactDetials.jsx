import React, { useEffect,useState , useContext, useRef } from "react";
import { useReducer } from "react";
import ProductsContext from "../context/ProductsContext";
import Input from "../reuseble-components/Input";


function ContactDetials() {

  let [formIsValid, setFormIsValid] = useState(false);
  let page = useContext(ProductsContext);
  const fullNameRef = useRef(null);
  const emailRef = useRef(null);
  const phoneRef = useRef(null);
  const drnoRef = useRef(null);
  const streetRef = useRef(null);
  const cityRef = useRef(null);
  const stateRef = useRef(null);
  const pincodeRef = useRef(null);

    let contactDetReducer = (state,action) => {
        switch(action.type){
            case "fullName":
                return {...state,fullName : action.value}
            case "email":
                return {...state,email : action.value}
            case "phone":
                return {...state,phone : action.value}
            case "drno":
                return {...state,address : {...state.address,drno : action.value}}
            case "street":
                return {...state,address : {...state.address,street : action.value}}
            case "city":
                return {...state,address : {...state.address,city : action.value}}
            case "state":
                return {...state,address : {...state.address,state : action.value}}
            case "pincode":
                return {...state,address : {...state.address,pincode : action.value}}
            default:
                return state

        }
            
      };

      let initialState ={
        fullName : "",
        email : "",
        phone : "",
        address : {
            drno : "",
            street : "",
            city : "",
            state : "",
            pincode : "",

        }
    }
    

    /** In reducer is also a state management , here we are using useReducer and setContactDetails is a reducer and 
      when we calling dispatcher method it internally calling setContactDetails and another it takes object structural way
     */
    let [contactDetails, contactDetDispatcher] = useReducer(contactDetReducer,initialState)

    if (page.existingPage !== "ContactDetails") {
      return null;
    }
    
  useEffect(() => {

   const timeout = setTimeout(() => {
    // console.log(contactDetails,"check");
    const isValid = 
    contactDetails.fullName.trim() !== "" &&
    contactDetails.email.trim() !== "" &&
    contactDetails.phone.trim() !== "" &&
    contactDetails.address.drno.trim() !== "" &&
    contactDetails.address.street.trim() !== "" &&
    contactDetails.address.city.trim() !== "" &&
    contactDetails.address.state.trim() !== "" &&
    contactDetails.address.pincode.trim() !== "";
      setFormIsValid(isValid);
    },700)

    return () => {
      clearTimeout(timeout);
    }


  },[contactDetails])

 

    let ContactDetialsForm = (event) => {
        event.preventDefault();
        console.log(contactDetails);
        if(formIsValid){
          page.onPageChange("Products");
        }else{
          console.log("invalid");
          if (!fullNameRef.current?.isValid) {
            fullNameRef.current?.focus();
          } else if(!emailRef.isValid){
            emailRef.focus();
          }else if(!phoneRef.isValid){
            phoneRef.focus();
          }else if(!drnoRef.isValid){
            drnoRef.focus();
          }else if(!streetRef.isValid){
            streetRef.focus();
          }else if(!cityRef.isValid){
            cityRef.focus();
          }else if(!stateRef.isValid){
            stateRef.focus();
          }else if(!pincodeRef.isValid){
            pincodeRef.focus();
          } 

        }
      };

      {/**page.existingPage == "ContactDetails" ? <> : <> "Before using Router i used existing page to handle the page to display or not" */}

  return   <>
            <div className="d-flex align-items-center justify-content-center mt-3">
      <div className="container py-1">
        <div className="row justify-content-center">
          <div className="col-md-11 col-lg-8">
            <div className="card">
              <div className="card-body">
                <form id="contactForm" onSubmit={ContactDetialsForm}>
                  <div className="mb-4">
                    <h5 className="border-bottom pb-2">Personal Information</h5>
                    {/**If you see below ref will not work since custome component ref will not work to 
                     * acheive it we use FormwardRef to make it work
                     */}
                    <Input
                      ref={fullNameRef}
                      divClass="mb-3"
                      labelClass="form-label"
                      label="Full Name*"
                      type="text"
                      value={contactDetails.fullName}
                      id="fullName"
                      onInputHandler={(event) => contactDetDispatcher({value : event.target.value, type : "fullName"})}
                      placeholder="Enter full name"
                      required
                    />

                    <div className="row">
                      <div className="col-6 mb-3">
                        <label htmlFor="email" className="form-label">
                          Email*
                        </label>
                        <input
                          ref={emailRef}
                          type="email"
                          className="form-control"
                          id="email"
                          onInput={(event) => contactDetDispatcher({value : event.target.value, type : "email"})}
                          value={contactDetails.email}
                          placeholder="Enter email"
                          required
                        />
                      </div>
                      <div className="col-6 mb-3">
                        <label htmlFor="phone" className="form-label">
                          Phone Number*
                        </label>
                        <input
                          ref={phoneRef}
                          type="tel"
                          className="form-control"
                          id="phone"
                          onInput={(event) => contactDetDispatcher({value : event.target.value, type : "phone"})}
                          value={contactDetails.phone}
                          placeholder="Enter phone number"
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <div className="mb-4">
                    <h5 className="border-bottom pb-2">Address Details</h5>

                    <div className="row">
                      <div className="col-6 mb-3">
                        <label htmlFor="drNo" className="form-label">
                          Door Number*
                        </label>
                        <input
                          ref={drnoRef}
                          type="text"
                          className="form-control"
                          id="drNo"
                          onInput={(event) => contactDetDispatcher({value : event.target.value, type : "drno"})}
                          value={contactDetails.address.drno}
                          placeholder="Enter door number"
                          required
                        />
                      </div>
                      <div className="col-6 mb-3">
                        <label htmlFor="village" className="form-label">
                          Village/Street*
                        </label>
                        <input
                          ref={streetRef}
                          type="text"
                          className="form-control"
                          id="village"
                          onInput={(event) => contactDetDispatcher({value : event.target.value, type : "street"})}
                          value={contactDetails.address.street}
                          placeholder="Enter village/street"
                          required
                        />
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-4 mb-3">
                        <label htmlFor="city" className="form-label">
                          City*
                        </label>
                        <input
                          ref={cityRef}
                          type="text"
                          className="form-control"
                          id="city"
                          onInput={(event) => contactDetDispatcher({value : event.target.value, type : "city"})}
                          value={contactDetails.address.city}
                          placeholder="Enter city"
                          required
                        />
                      </div>

                      <div className="col-5 mb-3">
                        <label htmlFor="state" className="form-label">
                          State*
                        </label>
                        <select className="form-select" id="state" ref={stateRef}
                        onChange={(event) => contactDetDispatcher({value : event.target.value, type : "state"})}
                        value={contactDetails.address.state}
                        required>
                          <option value="">Select State</option>
                          <option value="Andhra Pradesh">Andhra Pradesh</option>
                          <option value="Karnataka">Karnataka</option>
                          <option value="Kerala">Kerala</option>
                          <option value="Tamil Nadu">Tamil Nadu</option>
                          <option value="Telangana">Telangana</option>
                        </select>
                      </div>

                      <div className="col-3 mb-3">
                        <label htmlFor="pincode" className="form-label">
                          Pincode*
                        </label>
                        <input
                          ref={pincodeRef}
                          type="text"
                          className="form-control"
                          id="pincode"
                          maxLength="6"
                          onInput={(event) => contactDetDispatcher({value : event.target.value, type : "pincode"})}
                          value={contactDetails.address.pincode}
                          placeholder="Enter pincode"
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <div className="text-end">
                    <button type="submit" className="btn btn-primary"
                      // disabled={!formIsValid}
                      >
                      Submit
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>
    </>
}

export default ContactDetials;
