import React, {useState} from "react";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
const Description=({fieldData,onChange, decs ,handleDescriptionChange })=>{

    return(
        <div id="description" className="dashboard-content-block-wrap">
            <h2>Description</h2>
            <div className="dashboard-content-block">
                <div className="form-group">
                    <label>Title</label>
                    <input className="form-control"
                           name="listing_title"
                           id="listing_title"
                           placeholder="Enter your listing title"
                           type="text"
                           value={fieldData.listing_title || ''}
                           onChange={onChange}
                    />
                </div>
                <div className="form-group">
                    <label>Content</label>
                    <ReactQuill
                        value={decs.description}
                        onChange={handleDescriptionChange}
                    />
                    <input
                        type="hidden"
                        name="description"
                        value={decs.description}
                    />

                </div>
                <div className="row">
                    <div className="col-md-6 col-sm-12">
                        <div className="form-group">
                            <label>Type of listing</label>
                            <select
                                className="form-control"
                                name="list_type"
                                id="list_type"
                                onChange={onChange}
                            >
                                <option value="">Enter your listing Type</option>
                                <option value="apartment">Apartment</option>
                                <option value="vila">Villa</option>
                                <option value="glow">Glow</option>
                            </select>
                        </div>
                    </div>
                    <div className="col-md-6 col-sm-12">
                        <div className="form-group">
                            <label>Number of bedrooms</label>
                            <input className="form-control"
                                   name="listing_bedrooms"
                                   id="listing_bedrooms"
                                   placeholder="Enter your listing bedroom"
                                   type="text"
                                   value={fieldData.listing_bedrooms || ""}
                                   onChange={onChange}
                            />
                        </div>
                    </div>
                    <div className="col-md-6 col-sm-12">
                        <div className="form-group">
                            <label>Number of guest</label>
                            <input className="form-control"
                                   name="guests"
                                   id="guests"
                                   placeholder="Enter your listing guest"
                                   type="text"
                                   value={fieldData.guests || ""}
                                   onChange={onChange}
                            />
                        </div>
                    </div>
                    <div className="col-md-6 col-sm-12">
                        <div className="form-group">
                            <label>Number of beds</label>
                            <input className="form-control"
                                   name="l_beds"
                                   id="l_beds"
                                   placeholder="Enter your listing beds"
                                   type="text"
                                   value={fieldData.l_beds || ""}
                                   onChange={onChange}
                            />
                        </div>
                    </div>
                    <div className="col-md-6 col-sm-12">
                        <div className="form-group">
                            <label>Number of bathrooms</label>
                            <input className="form-control"
                                   name="baths"
                                   id="baths"
                                   placeholder="Enter your listing bathrooms"
                                   type="text"
                                   value={fieldData.baths || ""}
                                   onChange={onChange}
                            />
                        </div>
                    </div>
                    <div className="col-md-6 col-sm-12">
                        <div className="form-group">
                            <label>Number of Room</label>
                            <input className="form-control"
                                   name="listing_rooms"
                                   id="listing_rooms"
                                   placeholder="Enter your listing room"
                                   type="text"
                                   value={fieldData.listing_rooms || ""}
                                   onChange={onChange}
                            />
                        </div>
                    </div>
                    <div className="col-md-6 col-sm-12">
                        <div className="form-group">
                            <label>Size</label>
                            <input className="form-control"
                                   name="listing_size"
                                   id="listing_size"
                                   placeholder="Enter your listing size"
                                   type="text"
                                   value={fieldData.listing_size || ""}
                                   onChange={onChange}
                            />
                        </div>
                    </div>
                    <div className="col-md-6 col-sm-12">
                        <div className="form-group">
                            <label>Unit of measure</label>
                            <input className="form-control"
                                   name="listing_size_unit"
                                   id="listing_size_unit"
                                   placeholder="Enter Unit of measure e.g (sqft)"
                                   type="text"
                                   value={fieldData.listing_size_unit || ""}
                                   onChange={onChange}
                            />
                        </div>
                    </div>
                    <div className="col-md-12 col-sm-12">
                        <div className="form-group">
                            <label>Affiliate Booking Link</label>
                            <input className="form-control"
                                   name="affiliate_booking_link"
                                   id="affiliate_booking_link"
                                   placeholder="Enter Affiliate Booking Link"
                                   type="text"
                                   value={fieldData.affiliate_booking_link || ""}
                                   onChange={onChange}
                            />
                        </div>
                    </div>
                </div>

            </div>
        </div>

    )
}
export default Description
