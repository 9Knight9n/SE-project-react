import React, { Component } from 'react';
import { BsPeopleCircle } from "react-icons/bs";
import { IconContext } from "react-icons";
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import './personal-info.css';
import "react-datepicker/dist/react-datepicker.css";
import TextField from '@material-ui/core/TextField';
import {Form} from "react-bootstrap";
import { isPossiblePhoneNumber } from 'react-phone-number-input';
import { isValidPhoneNumber } from 'react-phone-number-input';
import {getItem, validateEmail} from '../../util';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {showMemoryVariables} from "../../util";
import {API_PROFILE_URL, API_PROFILE_UPDATE_URL} from "../../constants";
import axios from "axios";

class PersonalInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pageCount: 0,
            charsPerPage: 1,
            emailValidationError: false,
            firstNameValidationError: false,
            lastNameValidationError: false,
            invalidPhoneNum: false,
            toast: false,
            dataValid: true,
            firstName:"",
            lastName:"",
            nationalId:"",
            gender:"",
            bio:"",
            phonenumber:"",
            emailId:"",
            dateOfBirth:"",
            phone:""
        };
        this.baseState = this.state  
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleReset = this.handleReset.bind(this);
    }

    
    async componentDidMount() {
        await axios.get(API_PROFILE_URL,{
            headers: {
                'Authorization': 'Token '.concat(getItem('user-token'))
            }
        })                
        .then(res => {
            if (res.status===200)
            {
                console.log(res.data)
                console.log("data is shown")
                // this.setState({
                //     firstName: res.data.first_name,
                //     lastName: res.data.last_name,
                //     bio: res.data.bio,
                //     phonenumber: res.data.phone_number,
                //     gender: res.data.gender,
                //     nationalId: res.data.national_code,
                //     dateOfBirth: res.data.birthday,
                //     emailId: res.data.email
                // })
                this.loadData(res.data)
                // showMemoryVariables()
            }
            else
            {
                console.log("unknown status")
            }
        }).catch(error =>{
                console.log(error)
        })
    }

    loadData = (data) =>{
        this.setState({phone:data.phone_number})
        // document.getElementById("personalInfo-phoneNum").value = data.phone_number;
        document.getElementById("personalInfo-firstName").value = data.first_name;
        document.getElementById("personalInfo-lastName").value = data.last_name;
        document.getElementById("personalInfo-nationalId").value = data.national_code;
        document.getElementById("personalInfo-dateOfBirth").value = data.birthday;
        document.getElementById("personalInfo-emailId").value = data.email;
        document.getElementById("ptextArea").value = data.bio;
        document.getElementById("personalInfo-Gender").value = data.gender;
    }


    async handleSubmit(event) {
        event.preventDefault();
        let phonenumber = document.getElementById("personalInfo-phoneNum").value.replaceAll(" ", "").replaceAll("(","").replaceAll(")","")
        let firstName = document.getElementById("personalInfo-firstName").value;
        let lastName = document.getElementById("personalInfo-lastName").value;
        let nationalId = document.getElementById("personalInfo-nationalId").value;
        let dateOfBirth = document.getElementById("personalInfo-dateOfBirth").value;
        let emailId = document.getElementById("personalInfo-emailId").value;
        let bio = document.getElementById("ptextArea").value;
        let gender = document.getElementById("personalInfo-Gender").value;
        if (!isValidPhoneNumber(phonenumber)) {
            this.setState({
                invalidPhoneNum: true,
                dataValid: false,
            })
            return;
        }
        else{
            this.setState({
                invalidPhoneNum: false,
            })
        }
        if (!validateEmail(emailId) || emailId.length === 0) {
            this.setState({
                emailValidationError: true,
                dataValid: false,
            });
            return;
        }
        else{
            this.setState({emailValidationError: false});
        }

        if (firstName.length === 0) {
            this.setState({
                firstNameValidationError: true,
                dataValid: false,
            });
            return;
        }
        else{
            this.setState({firstNameValidationError: false});
        }

        if (lastName.length === 0) {
            this.setState({lastNameValidationError: true,
                dataValid: false,
            });
            return;
        }
        else{
            this.setState({lastNameValidationError: false,});
        }
        // && (firstName !== this.state.firstName || lastName !== this.state.lastName ||
        //     nationalId !== this.state.nationalId || bio !== this.state.bio || gender !== this.state.gender  ||
        //     emailId !== this.state.emailId || dateOfBirth !== this.state.dateOfBirth || phonenumber !== this.state.phonenumber )

        if (this.state.dataValid)
        {
            
            let FormData = require('form-data');
            let data = new FormData();
            data.append('first_name', firstName);
            data.append('last_name', lastName);
            data.append('email', emailId);
            data.append('national_code', nationalId);
            data.append('birthday', dateOfBirth);
            data.append('gender', gender);
            data.append('phone_number', phonenumber);
            data.append('bio', bio);
            await axios.post(API_PROFILE_UPDATE_URL,data,
            {
                headers: {
                    'Authorization': 'Token '.concat(getItem('user-token'))
                }
            })                
            .then(res => {
                if (res.status===205)
                {
                    console.log("edit was ok")
                    // showMemoryVariables()
                }
                else
                {
                    console.log("unknown status")
                }
            }).catch(error =>{
                    console.log(error)
            })
            toast.success("Changes saved")
        }else{
            toast.warn("No changes detected")
        }

    }

    handleReset() {
        this.setState(this.baseState)
    }

    handleChange(e) { 
        console.log("entered handle change")
        console.log("eeeee : " + e)
        let target=e.target;
        let name = target.name;
        let value = target.value
        if (name === "bio"){
         let currentText = e.target.value;
         //Now we need to recalculate the number of characters that have been typed in so far
         let characterCount = currentText.length;
         let charsPerPageCount = this.state.charsPerPage;
         let unitCount = Math.round(characterCount/charsPerPageCount);
         this.setState({pageCount: unitCount});
        }
        console.log("value : " + value)
   }

    render() { 
        return ( 
            <div className="personalInfo-main">
                <ToastContainer />
                <div className="personalInfo-avatar mt-4 mb-4">
                    <IconContext.Provider value={{ color: "black", size:100,  }}>
                        <div>
                            <BsPeopleCircle />
                        </div>
                    </IconContext.Provider>
                
                </div>

                <form className="row">
                    <div className="personalInfo-form w-100 ml-5 mt-4">
                        <div className="firstName row">
                                <label className="form-label col-lg-2 col-md-2 col-sm-3" htmlFor="personalInfo-firstName">First Name:</label>
                                <div className="form-group col-lg-10 col-md-10 col-sm-9">
                                    <div className="input-group">
                                        <Form.Control
                                            onChange={this.handleChange}
                                            id="personalInfo-firstName"
                                            className="form-control shadow-none"
                                            type="text"
                                            name="firstName"
                                            data-testid="personalInfo-firstName"
                                            isInvalid={this.state.firstNameValidationError}
                                        />
                                        <Form.Control.Feedback type="invalid" className={"ml-1"}>
                                            You must enter your first name!
                                        </Form.Control.Feedback>
                                    </div>
                                </div>
                                {/* <input className="form-control" name="firstName" value={this.state.firstName} onChange={this.handleChange} id="personalInfo-firstName" required/> */}


                        </div>

                        <hr className="personalInfo-line p-2"/>

                        <div className="personalInfo-lastName row">
                                <label className="form-label col-lg-2 col-md-2 col-sm-3" htmlFor="personalInfo-lastName">Last Name:</label>
                                <div className="form-group col-lg-10 col-md-10 col-sm-9">
                                    <div className="input-group">
                                        <Form.Control
                                            onChange={this.handleChange}
                                            id="personalInfo-lastName"
                                            className="form-control shadow-none"
                                            type="text"
                                            name="lastName"
                                            data-testid="personalInfo-lastName"
                                            isInvalid={this.state.lastNameValidationError}
                                        />
                                        <Form.Control.Feedback type="invalid" className={"ml-1"}>
                                            You must enter your last name!
                                        </Form.Control.Feedback>
                                    </div>
                                </div>
                        </div>

                        <hr className="personalInfo-line p-2 "/>

                        <div className="personalInfo-nationalId row">
                            <label className="form-label col-lg-2 col-md-2 col-sm-3" htmlFor="personalInfo-nationalId">National Code:</label>
                                <div className="form-group col-lg-10 col-md-10 col-sm-9">
                                    <div className="input-group">
                                        <Form.Control
                                            onChange={this.handleChange}
                                            id="personalInfo-nationalId"
                                            className="form-control shadow-none"
                                            type="text"
                                            name="nationalId"
                                            data-testid="personalInfo-nationalId"
                                            isInvalid={false}
                                        />
                                        <Form.Control.Feedback type="invalid" className={"ml-1"}>
                                            national id is invalid!
                                        </Form.Control.Feedback>
                                    </div>
                                </div>
                        </div>

                        <hr className="personalInfo-line p-2"/>

                        <div className="personalInfo-Gender ">
                            <div className="row">
                                <label className="form-label col-lg-2 col-md-2 col-sm-3" htmlFor="personalInfo-Gender">Gender:</label>
                                <div className="form-select form-group col-lg-10 col-md-10 col-sm-9">
                                    <select data-testid="personalInfo-Gender" className="" name="gender" onChange={this.handleChange} id="personalInfo-Gender" required>
                                        <option>Male</option>
                                        <option>Female</option>
                                        <option>Other</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <hr className="personalInfo-line p-2"/>

                        <div className="personalInfo-dateOfBirth row">
                            <label className="form-label col-lg-2 col-md-2 col-sm-3" htmlFor="personalInfo-dateOfBirth">Date Of Birth:</label>
                            <div className="form-group col-lg-10 col-md-10 col-sm-9">
                                <TextField
                                    id="personalInfo-dateOfBirth"
                                    type="date"
                                    defaultValue="2021-03-24"
                                    className="dateOfBirth-field"
                                    data-testid="personalInfo-dateOfBirth"
                                    InputLabelProps={{
                                    shrink: true,
                                    }}
                                />
                            </div>
                        </div>

                        <hr className="personalInfo-line p-2"/>

                        <div className="personalInfo-phoneNum row">
                            <label htmlFor="personalInfo-phoneNum" className="form-label col-lg-2 col-md-2 col-sm-3">Phone Number:</label>
                            <div className="form-group col-lg-10 col-md-10 col-sm-9">
                                <div className="input-group">
                                    <div className="input-group-prepend" style={{width:"inherit"}}>
                                        <span className={"input-group-btn".concat(this.state.invalidPhoneNum?" flag-warn":"")}>
                                            <PhoneInput
                                                // country="us"
                                                // country={'ir'}
                                                // enableSearch={true}
                                                // disableSearchIcon={true}
                                                value={this.state.phone}
                                                data-testid="personalInfo-phoneNum"
                                                inputProps={
                                                    {
                                                        id:"personalInfo-phoneNum",
                                                        type:"phone-number",
                                                        className:("form-control shadow-none".concat(this.state.invalidPhoneNum?" not-valid":"")),
                                                        style:{width:"inherit"},
                                                        
                                                    }
                                                }
                                            />
                                        </span>
                                    </div>
                                    {this.state.invalidPhoneNum?
                                    <div >
                                        <small id="passwordHelp" className="text-danger">
                                            Phone number is invalid!
                                        </small>
                                    </div>:""}
                                </div>
                            </div>
                        </div>

                        <hr className="personalInfo-line p-2"/>

                        <div className="personalInfo-emailId row ">
                            <label htmlFor="personalInfo-emailId" className="form-label col-lg-2 col-md-2 col-sm-3">Email:</label>
                                <div className="form-group col-lg-10 col-md-10 col-sm-9">
                                    <div className="input-group">
                                        <Form.Control
                                            onChange={this.handleChange}
                                            id="personalInfo-emailId"
                                            className="form-control shadow-none"
                                            type="text"
                                            name="email"
                                            data-testid="personalInfo-emailId"
                                            isInvalid={this.state.emailValidationError}
                                            disabled
                                            />
                                            <Form.Control.Feedback type="invalid" className={"ml-1"}>
                                                 Email is invalid!
                                            </Form.Control.Feedback>
                                    </div>
                                </div>


                            {/* <div>
                                {this.state.emailValidationError? <div>{this.state.emailValidationMsg}</div> : ''}
                            </div> */}
                        </div>

                        <hr className="personalInfo-line p-2"/>

                        <div className="personalInfo-bioField row">
                            <label className="form-lable col-lg-2 col-md-2 col-sm-3" htmlFor="bio">Bio:</label>
                            <div className="form-group col-lg-10 col-md-10 col-sm-9">
                                <textarea data-testid="personalInfo-ptextArea" id="ptextArea" name="bio" className="bio form-control" onChange={this.handleChange} maxLength="210">
                                            
                                </textarea>
                            
                                <div className="personalInfo-textAreaCounter">
                                    {this.state.pageCount} of 210
                                </div>
                            </div>
                        </div>
                        <div className="w-100 d-flex justify-content-center mb-5">
                            <div className="personalInfo-btn mr-5 mb-2 mt-5">
                                <div className="mb-4">
                                    <button data-testid="personalInfo-submit" className="btn btn-primary btn-lg btn-block" type="button" onClick={this.handleSubmit}>Submit</button>
                                </div>
                                <div className="mb-4">
                                    <button data-testid="personalInfo-reset" type="button" className="btn btn-secondary btn-lg btn-block" onClick={this.handleReset}>Reset</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
         );
    }
}
 
export default PersonalInfo;