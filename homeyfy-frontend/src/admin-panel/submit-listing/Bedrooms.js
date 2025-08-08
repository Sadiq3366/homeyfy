import React from "react";

const Bedrooms =({removeBedroom, addBedroom , services ,handlebedroomChange })=>{
    return(
        <>
            <div id="prices" className="dashboard-content-block-wrap">
                <h2>Bedrooms</h2>
                <div className="dashboard-content-block">
                    <div className="col-md-12 col-sm-12">
                        <div>
                            {services.map((service, index) => (
                                <div className="more_extra_services_wrap" key={service.id}>
                                    <div className="row">
                                        <div className="col-sm-6 col-xs-12">
                                            <div className="form-group">
                                                <label
                                                    htmlFor={`homeyfy_accomodation[${service.id}][acc_bedroom_name]`}>Bedroom
                                                    name</label>
                                                <input
                                                    type="text"
                                                    name={`homeyfy_accomodation[${service.id}][acc_bedroom_name]`}
                                                    className="form-control"
                                                    value={service.acc_bedroom_name}
                                                    onChange={(e) => handlebedroomChange(index, e)}
                                                    placeholder="Enter Bedroom name"
                                                />
                                            </div>
                                        </div>
                                        <div className="col-sm-6 col-xs-12">
                                            <div className="form-group">
                                                <label htmlFor={`homeyfy_accomodation[${service.id}][acc_guests]`}>Number
                                                    of guests</label>
                                                <input
                                                    type="text"
                                                    name={`homeyfy_accomodation[${service.id}][acc_guests]`}
                                                    className="form-control"
                                                    value={service.acc_guests}
                                                    onChange={(e) => handlebedroomChange(index, e)}
                                                    placeholder="Enter no of guests"
                                                />
                                            </div>
                                        </div>
                                        <div className="col-sm-6 col-xs-12">
                                            <div className="form-group">
                                                <label
                                                    htmlFor={`homeyfy_accomodation[${service.id}][acc_no_of_beds]`}>Number
                                                    of beds</label>
                                                <input
                                                    type="text"
                                                    name={`homeyfy_accomodation[${service.id}][acc_no_of_beds]`}
                                                    className="form-control"
                                                    value={service.acc_no_of_beds}
                                                    onChange={(e) => handlebedroomChange(index, e)}
                                                    placeholder="Enter No of Beds"
                                                />
                                            </div>
                                        </div>
                                        <div className="col-sm-6 col-xs-12">
                                            <div className="form-group">
                                                <label
                                                    htmlFor={`homeyfy_accomodation[${service.id}][acc_bedroom_type]`}>Bed type</label>
                                                <input
                                                    type="text"
                                                    name={`homeyfy_accomodation[${service.id}][acc_bedroom_type]`}
                                                    className="form-control"
                                                    value={service.acc_bedroom_type}
                                                    onChange={(e) => handlebedroomChange(index, e)}
                                                    placeholder="Enter bedroom type"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-sm-12 col-xs-12">
                                            <button
                                                type="button"
                                                className="remove-extra-services btn btn-danger btn-slim"
                                                onClick={() => removeBedroom(service.id)}
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}

                            <button type="button"
                                    onClick={() => addBedroom((services.length > 0) ? services[services.length - 1].id + 1 : 0)}
                                    className="btn btn-primary btn-slim add_more fa fa-plus">
                                Add more
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
export default Bedrooms
