import React from "react";
import Location from "./Location";

const Private = ({fieldData,onChange})=>{
    return (
        <div id="prices" className="dashboard-content-block-wrap">
            <h2>Private Note</h2>
            <div className="dashboard-content-block">
                <p>Write private note for this property, it will not display for public.</p>
                <div className="col-md-12 col-sm-12">
                    <div className="form-group">
                        <textarea
                            className="form-control"
                            name="private_note"
                            rows="7"
                            placeholder="Enter the note here"
                            spellCheck="false"
                            value={fieldData.private_note}
                            onChange={onChange}
                        ></textarea>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Private
