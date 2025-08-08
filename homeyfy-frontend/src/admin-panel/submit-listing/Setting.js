import React from "react";

const Setting =({fieldData,onChange})=>{
    return(
        <>
            <div id="prices" className="dashboard-content-block-wrap">
                <h2>Property Settings</h2>
                <div className="dashboard-content-block">
                    <div className="col-md-12 col-sm-12">
                        <div className="form-group">
                            <div className="d-flex justify-content-between">
                                <label>Do you want to mark this property as featured?</label>
                                <div className="d-flex">
                                    <label className="control control--checkbox">
                                        <input type="checkbox"
                                               checked={fieldData.is_feature === "yes"}
                                               onChange={onChange}
                                               name="is_feature"
                                               id="is_feature"
                                               value="yes"/>
                                        <span className="contro-text">Yes</span>
                                        <span className="control__indicator"></span>
                                    </label>
                                    <label className="control control--checkbox">
                                        <input type="checkbox"
                                               checked={fieldData.is_feature === "no"}
                                               onChange={onChange}
                                               name="is_feature"
                                               id="is_feature"
                                               value="no"/>
                                        <span className="contro-text">No</span>
                                        <span className="control__indicator"></span>
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div className="form-group">
                            <div className="d-flex justify-content-between">
                                <label>The user must be logged in to view this property?</label>
                                <div className="d-flex">
                                    <label className="control control--checkbox">
                                        <input type="checkbox"
                                               checked={fieldData.view_login === "yes"}
                                               onChange={onChange}
                                               name="view_login"
                                               id="view_login"
                                               value="yes"/>
                                        <span className="contro-text">Yes</span>
                                        <span className="control__indicator"></span>
                                    </label>
                                    <label className="control control--checkbox">
                                        <input type="checkbox"
                                               checked={fieldData.view_login === "no"}
                                               onChange={onChange}
                                               name="view_login"
                                               id="view_login"
                                               value="no"/>
                                        <span className="contro-text">No</span>
                                        <span className="control__indicator"></span>
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Setting
