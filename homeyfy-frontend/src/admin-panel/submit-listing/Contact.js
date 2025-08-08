import React from "react";

const contact=({fieldData,onChange})=>{

    return(
        <>
            <div id="prices" className="dashboard-content-block-wrap">
                <h2>Contact Information</h2>
                <div className="dashboard-content-block">
                    <div className="col-md-12 col-sm-12">
                        <p>What information do you want to display in agent data container?</p>
                        <div className="form-group" >
                            <label className="control control--checkbox">
                                <input type="checkbox"
                                       checked={fieldData.contact_info === "author"}
                                       onChange={onChange}
                                       name="contact_info"
                                       id="author_info"
                                       value="author"/>
                                <span className="contro-text">Author Info</span>
                                <span className="control__indicator"></span>
                            </label>
                            <label className="control control--checkbox">
                                <input type="checkbox"
                                       checked={fieldData.contact_info === "none"}
                                       onChange={onChange}
                                       name="contact_info"
                                       id="contact_not"
                                       value="none"/>
                                <span className="contro-text">Do not display</span>
                                <span className="control__indicator"></span>
                            </label>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );

}
export default contact
