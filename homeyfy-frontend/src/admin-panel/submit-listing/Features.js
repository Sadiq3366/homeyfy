import React from "react";

const Features =({fieldData,onChange})=>{
    return(
        <div>
            <div id="feature" className="dashboard-content-block-wrap">
                <div className="dashboard-content-block">
                    <div className="house-features-list">
                        <label className="label-title">Amenities</label>
                        <label className="control control--checkbox">
                            <input type="checkbox"
                                   checked={(fieldData.amenities || []).includes("Air Conditioning")}
                                   onChange={onChange}
                                   name="amenities[]"
                                   id="amenity-air-conditioning"
                                   value="Air Conditioning"/>
                            <span className="contro-text">Air Conditioning</span>
                            <span className="control__indicator"></span>
                        </label>
                        <label className="control control--checkbox">
                            <input type="checkbox"
                                   checked={(fieldData.amenities || []).includes("Barbecue Area")}
                                   onChange={onChange}
                                   name="amenities[]"
                                   id="amenity-barbecue-area"
                                   value="Barbecue Area"/>
                            <span className="contro-text">Barbecue Area</span>
                            <span className="control__indicator"></span>
                        </label>
                        <label className="control control--checkbox">
                            <input type="checkbox"
                                   checked={(fieldData.amenities || []).includes("Dishwasher")}
                                   onChange={onChange}
                                   name="amenities[]"
                                   id="amenity-dishwasher"
                                   value="Dishwasher"/>
                            <span className="contro-text">Dishwasher</span>
                            <span className="control__indicator"></span>
                        </label>
                        <label className="control control--checkbox">
                            <input type="checkbox"
                                   checked={(fieldData.amenities || []).includes("Gym")}
                                   onChange={onChange}
                                   name="amenities[]"
                                   id="amenity-gym"
                                   value="Gym"/>
                            <span className="contro-text">Gym</span>
                            <span className="control__indicator"></span>
                        </label>
                        <label className="control control--checkbox">
                            <input type="checkbox"
                                   checked={(fieldData.amenities || []).includes("Laundry")}
                                   onChange={onChange}
                                   name="amenities[]"
                                   id="amenity-laundry"
                                   value="Laundry"/>
                            <span className="contro-text">Laundry</span>
                            <span className="control__indicator"></span>
                        </label>
                        <label className="control control--checkbox">
                            <input type="checkbox"
                                   checked={(fieldData.amenities || []).includes("Microwave")}
                                   onChange={onChange}
                                   name="amenities[]"
                                   id="amenity-microwave"
                                   value="Microwave"/>
                            <span className="contro-text">Microwave</span>
                            <span className="control__indicator"></span>
                        </label>
                        <label className="control control--checkbox">
                            <input type="checkbox"
                                   checked={(fieldData.amenities || []).includes("Sauna")}
                                   onChange={onChange}
                                   name="amenities[]"
                                   id="amenity-sauna"
                                   value="Sauna"/>
                            <span className="contro-text">Sauna</span>
                            <span className="control__indicator"></span>
                        </label>
                        <label className="control control--checkbox">
                            <input type="checkbox"
                                   checked={(fieldData.amenities || []).includes("Swimming Pool")}
                                   onChange={onChange}
                                   name="amenities[]"
                                   id="amenity-swimming-pool"
                                   value="Swimming Pool"/>
                            <span className="contro-text">Swimming Pool</span>
                            <span className="control__indicator"></span>
                        </label>
                        <label className="control control--checkbox">
                            <input type="checkbox"
                                   checked={(fieldData.amenities || []).includes("TV Cable")}
                                   onChange={onChange}
                                   name="amenities[]"
                                   id="amenity-tv-cable"
                                   value="TV Cable"/>
                            <span className="contro-text">TV Cable</span>
                            <span className="control__indicator"></span>
                        </label>
                        <label className="control control--checkbox">
                            <input type="checkbox"
                                   checked={(fieldData.amenities || []).includes("Wi-Fi")}
                                   onChange={onChange}
                                   name="amenities[]"
                                   id="amenity-wi-fi"
                                   value="Wi-Fi"/>
                            <span className="contro-text">Wi-Fi</span>
                            <span className="control__indicator"></span>
                        </label>

                        <label className="label-title">Facilities</label>
                        <label className="control control--checkbox">
                            <input type="checkbox"
                                   checked={(fieldData.facilities || []).includes("Beachside")}
                                   onChange={onChange}
                                   name="facilities[]"
                                   id="facility-beachside"
                                   value="Beachside"/>
                            <span className="contro-text">Beachside</span>
                            <span className="control__indicator"></span>
                        </label>
                        <label className="control control--checkbox">
                            <input type="checkbox"
                                   checked={(fieldData.facilities || []).includes("Farmacy")}
                                   onChange={onChange}
                                   name="facilities[]"
                                   id="facility-farmacy"
                                   value="Farmacy"/>
                            <span className="contro-text">Farmacy</span>
                            <span className="control__indicator"></span>
                        </label>
                        <label className="control control--checkbox">
                            <input type="checkbox"
                                   checked={(fieldData.facilities || []).includes("Free Parking")}
                                   onChange={onChange}
                                   name="facilities[]"
                                   id="facility-free-parking"
                                   value="Free Parking"/>
                            <span className="contro-text">Free Parking</span>
                            <span className="control__indicator"></span>
                        </label>
                        <label className="control control--checkbox">
                            <input type="checkbox"
                                   checked={(fieldData.facilities || []).includes("Markets")}
                                   onChange={onChange}
                                   name="facilities[]"
                                   id="facility-markets"
                                   value="Markets"/>
                            <span className="contro-text">Markets</span>
                            <span className="control__indicator"></span>
                        </label>
                        <label className="control control--checkbox">
                            <input type="checkbox"
                                   checked={(fieldData.facilities || []).includes("Playground")}
                                   onChange={onChange}
                                   name="facilities[]"
                                   id="facility-playground"
                                   value="Playground"/>
                            <span className="contro-text">Playground</span>
                            <span className="control__indicator"></span>
                        </label>
                        <label className="control control--checkbox">
                            <input type="checkbox"
                                   checked={(fieldData.facilities || []).includes("Reception")}
                                   onChange={onChange}
                                   name="facilities[]"
                                   id="facility-reception"
                                   value="Reception"/>
                            <span className="contro-text">Reception</span>
                            <span className="control__indicator"></span>
                        </label>
                        <label className="control control--checkbox">
                            <input type="checkbox"
                                   checked={(fieldData.facilities || []).includes("Security")}
                                   onChange={onChange}
                                   name="facilities[]"
                                   id="facility-security"
                                   value="Security"/>
                            <span className="contro-text">Security</span>
                            <span className="control__indicator"></span>
                        </label>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Features
