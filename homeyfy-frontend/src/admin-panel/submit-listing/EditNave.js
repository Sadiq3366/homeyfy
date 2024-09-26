import React from "react";

const EditNave =({handleOnchange})=>{
    return (
        <div className="order-2">
            <div className="menu-edit-property-wrap">
                <div className="menu-title">
                    MENU
                </div>
                <ul className="menu-edit-property list-unstyled">
                    <li>
                        <a href="#" data-val="description-price" onClick={()=>{handleOnchange('description')}} className="menu-edit-property-link">
                            <i className="houzez-icon icon-arrow-right-1"></i> Description
                        </a>
                    </li>
                    <li>
                        <a href="#" data-val="description-price" onClick={()=>{handleOnchange('price')}} className="menu-edit-property-link">
                            <i className="houzez-icon icon-arrow-right-1"></i> Price
                        </a>
                    </li>
                    <li>
                        <a href="#" data-val="media" onClick={()=>{handleOnchange('media')}} className="menu-edit-property-link">
                            <i className="houzez-icon icon-arrow-right-1"></i> Media
                        </a>
                    </li>
                    <li>
                        <a href="#" data-val="details" onClick={()=>{handleOnchange('details')}} className="menu-edit-property-link">
                            <i className="houzez-icon icon-arrow-right-1"></i> Details
                        </a>
                    </li>
                    <li>
                        <a href="#" data-val="features" onClick={()=>{handleOnchange('features')}} className="menu-edit-property-link">
                            <i className="houzez-icon icon-arrow-right-1"></i> Features
                        </a>
                    </li>
                    <li>
                        <a href="#" data-val="location" onClick={()=>{handleOnchange('location')}} className="menu-edit-property-link">
                            <i className="houzez-icon icon-arrow-right-1"></i> Location
                        </a>
                    </li>
                    <li>
                        <a href="#" data-val="virtual-tour" onClick={()=>{handleOnchange('virtual')}} className="menu-edit-property-link">
                            <i className="houzez-icon icon-arrow-right-1"></i> 360° Virtual Tour
                        </a>
                    </li>

                    <li>
                        <a href="#" data-val="sub-properties" onClick={()=>{handleOnchange('sublistings')}} className="menu-edit-property-link">
                            <i className="houzez-icon icon-arrow-right-1"></i> Sub listings
                        </a>
                    </li>
                    <li>
                        <a href="#" data-val="attachments" onClick={()=>{handleOnchange('documents')}} className="menu-edit-property-link">
                            <i className="houzez-icon icon-arrow-right-1"></i> Property Documents
                        </a>
                    </li>
                    <li>
                        <a href="#" data-val="contact-info" onClick={()=>{handleOnchange('contact')}} className="menu-edit-property-link">
                            <i className="houzez-icon icon-arrow-right-1"></i> Contact Information
                        </a>
                    </li>
                    <li>
                        <a href="#" data-val="private-note" onClick={()=>{handleOnchange('note')}} className="menu-edit-property-link">
                            <i className="houzez-icon icon-arrow-right-1"></i> Private Note
                        </a>
                    </li>
                    <li>
                        <a href="#" data-val="settings" onClick={()=>{handleOnchange('setting')}} className="menu-edit-property-link">
                            <i className="houzez-icon icon-arrow-right-1"></i> Property Settings
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    )
}
export default EditNave
