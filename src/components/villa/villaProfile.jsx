import React, { Component } from 'react';
import './villaProfile.css';
import sampleImage1 from '../villa/img/1.jpg';
import sampleImage2 from '../villa/img/2.jpg';
import sampleImage3 from '../villa/img/3.jpg';
import sampleImage4 from '../villa/img/4.jpg';
import sampleProfileImg from '../../assets/img/default-profile-picture.jpg';
import SlideShow from '../slideShow/sildeShow'
import {Link, Route, Switch, BrowserRouter as Router} from "react-router-dom";
class VillaProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hostName: "Ali Ebadi",
            placeName: "Seaside villa",
            placeDescription: "Seaside luxury villa near the sea and view of jungle.",
            placeArea: 150 ,
            placeNormalCapacity: 4,
            placeMaxCapacity: 5,
            numOfBedrooms: 4,
            numOfBathrooms: 2,
            numOfShowers: 2,
            numOfSingleBeds: 1,
            numOfDoubleBeds: 4,
        }
    }
   
    render() { 
        return ( 

            <div className="villaProfile-main ml-4 mr-4">
                <div className="villaProfile-header">
                    <div className="villaProfile-title">
                        <h4>Seaside villa</h4>
                        <div className="villaProfile-subTitle">
                            <h6>Iran,Tehran,Tehran</h6>
                        </div>
                    </div>  
                </div>

                <div className="villaProfile-body">
                    <div className="villaProfile-attributes row">
                        <div className="villaProfile-gallery col-xl-6">
                            <div className="mb-4 row">
                                <div className="img1 col">
                                    <img alt="villa-image1" src={sampleImage1} />
                                </div>
                                <div className="img2 col">
                                    <img alt="villa-image2" src={sampleImage2} />
                                </div>
                            </div>
                            <div className="row">
                                <div className="img3 col">
                                    <img alt="villa-image3" src={sampleImage3} />
                                    <Link to="/villa/villaProfile/villaGallery/">
                                    <button className="btn btn-light">Show all photos</button>
                                    </Link>
                                </div>
                                <div className="img4 col">
                                    <img alt="villa-image4" src={sampleImage4} />
                                </div>    
                            </div>
                            
                        </div>

                        <div className="villaProfile-details col-xl-6 mt-2">


                            <div className="villaProfile-placeDetail row">
                                <div className="villaProfile-title col-8">
                                    <h5>{this.state.placeName}</h5>
                                    <div className="villaProfile-subtitle">
                                        <h6>hosted by {this.state.hostName}</h6>
                                    </div>
                                </div>
                                
                                <div className="villaProfile-hostAvatar col-4">
                                    <img alt="profile-image" src={localStorage.getItem("profileAvatar")? localStorage.getItem("profileAvatar"): sampleProfileImg} />
                                </div>
                            </div>
                            
                            <div className="villaProfile-placeDetail">
                                <div className="villaProfile-placeDescription">
                                    <h5>About villa </h5>
                                    <p>{this.state.placeDescription}</p>
                                </div>
                            </div>

                            <div className="villaProfile-placeDetail">
                                <div className="villaProfile-placeCapacity">
                                    <h5>Capacity </h5>
                                    <p>Normal : {this.state.placeNormalCapacity} , Maximum : {this.state.placeMaxCapacity}</p>
                                </div>
                            </div>

                            <div className="villaProfile-placeDetail">
                                <div className="villaProfile-placeArea">
                                    <h5>Area </h5>
                                    <p>{this.state.placeArea} Meters</p>
                                </div>
                            </div>

                            <div className="villaProfile-placeDetail">
                                <div className="villaProfile-placeArea">
                                    <h5>Villa space </h5>
                                    <p>Bedrooms : {this.state.numOfBedrooms} , bathrooms : {this.state.numOfBathrooms} , Showers : {this.state.numOfShowers}</p>
                                </div>
                            </div>

                            <div className="villaProfile-placeDetail">
                                <div className="villaProfile-placeArea">
                                    <h5>Bed set </h5>
                                    <p>DoubleBeds : {this.state.numOfDoubleBeds} , SignleBeds : {this.state.numOfSingleBeds}</p>
                                </div>
                            </div>

                            <div className="villaProfile-placeDetail mt-4">
                                <div className="villaProfile-placeArea">
                                    <h5>Bed set </h5>
                                    <p>DoubleBeds : {this.state.numOfDoubleBeds} , SignleBeds : {this.state.numOfSingleBeds}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="villaProfile-facilities row mt-4">

                        <div className="col-xl-6">
                            <div className="villaProfile-title col-8">
                                <h5>Facilities</h5>
                                <div className="villaProfile-subtitle">
                                </div>
                            </div>
                        </div>

                        <div className="col-xl-6">
                            <div className="villaProfile-title col-8">
                                <h5>Location</h5>
                                <div className="villaProfile-subtitle">
                                </div>
                            </div>

                        </div>
                    </div>

                    <div className="villaProfile-facilities row mt-4">
                        <div className="col-xl-6">
                            <div className="villaProfile-title col-8">
                                <h5>Host rules</h5>
                                <div className="villaProfile-subtitle">
                                </div>
                            </div>
                        </div>

                        <div className="col-xl-6">
                            <div className="villaProfile-title col-8">
                                <h5>Cancellation rules</h5>
                                <div className="villaProfile-subtitle">
                                </div>
                            </div>

                        </div>
                    </div>
                </div>

                <div className="villaProfile-footer">

                </div>
            </div>
         );
    }
}
 
export default VillaProfile;