import React, {useState} from "react";

const Price=({fieldData,onChange, removeService, addService , services ,handleServiceChange })=>{
    const [instantBooking, setInstantBooking] = useState((fieldData.is_instance > 0 ) ? 'checked' : '');
    const handleCheckboxChange = (e) => {
        setInstantBooking(e.target.checked);
    };
    return(
        <>
            <div id="prices" className="dashboard-content-block-wrap">
                <h2>Pricing</h2>
                <div className="dashboard-content-block">
                    <div className="col-md-12 col-sm-12">
                        <div className="form-group">
                            <label>Instance booking</label>
                            <label className="control control--checkbox radio-tab">Allow instant booking for this place.
                                <input type="checkbox" checked={instantBooking} onChange={handleCheckboxChange} name="instant_booking"/>
                                <span className="control__indicator"></span>
                                <span className="radio-tab-inner"></span>
                            </label>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-6 col-sm-12">
                            <div className="form-group">
                                <label>Nightly</label>
                                <input className="form-control"
                                       name="base_price"
                                       id="base_price"
                                       placeholder="Enter price for 1 night"
                                       type="text"
                                       value={fieldData.base_price}
                                       onChange={onChange}
                                />
                            </div>
                        </div>
                        <div className="col-md-6 col-sm-12">
                            <div className="form-group">
                                <label>After Price Label</label>
                                <input className="form-control"
                                       name="price_postfix"
                                       id="price_postfix"
                                       placeholder="Enter after price label. Eg: Night/Hr"
                                       type="text"
                                       value={fieldData.price_postfix}
                                       onChange={onChange}
                                />
                            </div>
                        </div>
                        <div className="col-md-6 col-sm-12">
                            <div className="form-group">
                                <label>Weekends</label>
                                <input className="form-control"
                                       name="weekends_price"
                                       id="weekends_price"
                                       placeholder="Enter the unit price for a single day"
                                       type="text"
                                       value={fieldData.weekends_price}
                                       onChange={onChange}
                                />
                            </div>
                        </div>
                        <div className="col-md-6 col-sm-12">
                            <div className="form-group">
                                <label>Select the days to apply weekend pricing</label>
                                <select
                                    className="form-control"
                                    name="weekends_days"
                                    id="weekends_days"
                                >
                                    <option value="">Select your weekends</option>
                                    <option value="sat_sun">Saturday and Sunday</option>
                                    <option value="fri_sat">Friday and Saturday</option>
                                    <option value="thu_sat_sun">Thursday, Friday and Saturday</option>
                                    <option value="fri_sat_sun">Friday, Saturday and Sunday</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <hr className="row-separator"/>
                    <div className="row">
                        <h3 className="sub-title">Long-term pricing</h3>
                        <div className="col-md-6 col-sm-12">
                            <div className="form-group">
                                <label>Weekly 7 + nights</label>
                                <input className="form-control"
                                       name="priceWeek"
                                       id="priceWeek"
                                       placeholder="Enter the weekly price"
                                       type="text"
                                       value={fieldData.priceWeek}
                                       onChange={onChange}
                                />
                            </div>
                        </div>
                        <div className="col-md-6 col-sm-12">
                            <div className="form-group">
                                <label>Monthly 30 + nights</label>
                                <input className="form-control"
                                       name="priceMonthly"
                                       id="priceMonthly"
                                       placeholder="Enter the monthly price"
                                       type="text"
                                       value={fieldData.priceMonthly}
                                       onChange={onChange}
                                />
                            </div>
                        </div>
                    </div>
                    <hr className="row-separator"/>
                    <div className="row">
                        <h3 className="sub-title">Setup Extra Services Price</h3>
                        <div>
                            {services.map((service, index) => (
                                <div className="more_extra_services_wrap" key={service.id}>
                                    <div className="row">
                                        <div className="col-sm-4 col-xs-12">
                                            <div className="form-group">
                                                <label htmlFor={`extra_price[${service.id}][name]`}>Name</label>
                                                <input
                                                    type="text"
                                                    name={`extra_price[${service.id}][name]`}
                                                    className="form-control"
                                                    value={service.name}
                                                    onChange={(e) => handleServiceChange(index, e)}
                                                    placeholder="Enter service name"
                                                />
                                            </div>
                                        </div>
                                        <div className="col-sm-4 col-xs-12">
                                            <div className="form-group">
                                                <label htmlFor={`extra_price[${service.id}][price]`}>Price</label>
                                                <input
                                                    type="text"
                                                    name={`extra_price[${service.id}][price]`}
                                                    className="form-control"
                                                    value={service.price}
                                                    onChange={(e) => handleServiceChange(index, e)}
                                                    placeholder="Enter price"
                                                />
                                            </div>
                                        </div>
                                        <div className="col-sm-4 col-xs-12">
                                            <div className="form-group">
                                                <label htmlFor={`extra_price[${service.id}][type]`}>Type</label>
                                                <select
                                                    name={`extra_price[${service.id}][type]`}
                                                    className="form-control"
                                                    value={service.type}
                                                    onChange={(e) => handleServiceChange(index, e)}
                                                >
                                                    <option value="single_fee">Single Fee</option>
                                                    <option value="per_night">Per Night</option>
                                                    <option value="per_guest">Per Guest</option>
                                                    <option value="per_night_per_guest">Per Night Per Guest</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-sm-12 col-xs-12">
                                            <button
                                                type="button"
                                                className="remove-extra-services btn btn-danger btn-slim"
                                                onClick={() => removeService(service.id)}
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}

                            <button type="button"
                                    onClick={() => addService((services.length > 0) ? services[services.length - 1].id + 1 : 0)}
                                    className="btn btn-primary btn-slim add_more fa fa-plus">
                                Service
                            </button>
                        </div>
                    </div>
                    <hr className="row-separator"/>
                    <div className="row">
                        <h3 className="sub-title">Extra Cost</h3>
                        <div className="col-sm-6 col-xs-12">
                            <div className="form-group">
                                <label htmlFor="">Allow additional guests</label>
                                <div className="row">
                                    <div className="col-sm-6 col-xs-6">
                                        <label className="control control--radio radio-tab">
                                            <input type="radio" checked="checked" name="allow_additional_guests"
                                                   value="yes"/>
                                            <span className="control-text">Yes</span>
                                            <span className="control__indicator"></span>
                                            <span className="radio-tab-inner"></span>
                                        </label>
                                    </div>
                                    <div className="col-sm-6 col-xs-6">
                                        <label className="control control--radio radio-tab">
                                            <input type="radio" name="allow_additional_guests" value="no"/>
                                            <span className="control-text">No</span>
                                            <span className="control__indicator"></span>
                                            <span className="radio-tab-inner"></span>
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6 col-sm-12">
                            <div className="form-group">
                                <label>Additional guests</label>
                                <input className="form-control"
                                       name="additional_guests_price"
                                       id="additional_guests_price"
                                       placeholder="Enter the price for 1 additional guest"
                                       type="text"
                                       value={fieldData.additional_guests_price}
                                       onChange={onChange}
                                />
                            </div>
                        </div>
                        <div className="col-md-6 col-sm-12">
                            <div className="form-group">
                                <label>No of Guests</label>
                                <input className="form-control"
                                       name="num_additional_guests"
                                       id="num_additional_guests"
                                       placeholder="Number of additional guests allowed"
                                       type="text"
                                       value={fieldData.num_additional_guests}
                                       onChange={onChange}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-12 col-xs-12">
                            <label>Cleaning fee</label>
                        </div>
                        <div className="col-sm-6 col-xs-12">
                            <div className="form-group">
                                <input type="text"
                                       name="cleaning_fee"
                                       value=""
                                       className="form-control"
                                       placeholder="Enter the price for cleaning fee"/>
                            </div>
                        </div>
                        <div className="col-sm-3 col-xs-6">
                            <div className="form-group">
                                <label className="control control--radio radio-tab">
                                    <input type="radio" name="cleaning_fee_type" value="daily"/>
                                    <span className="control-text">Daily</span>
                                    <span className="control__indicator"></span>
                                    <span className="radio-tab-inner"></span>
                                </label>
                            </div>
                        </div>
                        <div className="col-sm-3 col-xs-6">
                            <div className="form-group">
                                <label className="control control--radio radio-tab">
                                    <input type="radio" name="cleaning_fee_type" value="per_stay"/>
                                    <span className="control-text">Per stay</span>
                                    <span className="control__indicator"></span>
                                    <span className="radio-tab-inner"></span>
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-12 col-xs-12">
                            <label>City fee</label>
                        </div>
                        <div className="col-sm-6 col-xs-12">
                            <div className="form-group">
                                <input type="text"
                                       name="city_fee"
                                       value=""
                                       className="form-control"
                                       placeholder="Enter the price for city fee"/>
                            </div>
                        </div>
                        <div className="col-sm-3 col-xs-6">
                            <div className="form-group">
                                <label className="control control--radio radio-tab">
                                    <input type="radio" name="city_fee_type" value="daily"/>
                                    <span className="control-text">Daily</span>
                                    <span className="control__indicator"></span>
                                    <span className="radio-tab-inner"></span>
                                </label>
                            </div>
                        </div>
                        <div className="col-sm-3 col-xs-6">
                            <div className="form-group">
                                <label className="control control--radio radio-tab">
                                    <input type="radio" name="city_fee_type" value="per_stay"/>
                                    <span className="control-text">Per stay</span>
                                    <span className="control__indicator"></span>
                                    <span className="radio-tab-inner"></span>
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-12 col-xs-12">
                            <label>Security deposit</label>
                        </div>
                        <div className="col-sm-12 col-xs-12">
                            <div className="form-group">
                                <input type="text"
                                       name="security_deposit"
                                       value=""
                                       className="form-control"
                                       placeholder="Enter price for security deposit"/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Price
