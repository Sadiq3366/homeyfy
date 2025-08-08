import React from "react";

const Virtual = ({fieldData,onChange})=>{
    return (
        <div id="prices" className="dashboard-content-block-wrap">
            <h2>Virtual Tour</h2>
            <div className="dashboard-content-block">
                <div className="col-md-12 col-sm-12">
                    <div className="form-group">
                        <textarea
                            className="form-control"
                            name="virtual_tour"
                            rows="7"
                            placeholder="Enter virtual tour iframe/embed code"
                            spellCheck="false"
                            value={fieldData.virtual_tour}
                            onChange={onChange}
                        ></textarea>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Virtual
