import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import http from "../../http";
import {useAuth} from "../../context/AuthContext";

const ListingList =(props)=>{
    const [isOpen, setIsOpen] = useState(false);
    const price = JSON.parse(props.listing.price);
    const date = new Date(props.listing.updated_date);
    const images = JSON.parse(props.listing.image_path );
    const thumb = images[0];
    const Date_time = date.toLocaleString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true
    });
    let status ='';
    if(props.listing.status==='pending'){
          status = 'badge-warning';
    }else if(props.listing.status==='draft'){
          status = 'badge-dark';
    } else{
          status = 'badge-success';
    }

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const closeDropdown = () => {
        setIsOpen(false);
    };

    return(
        <>
            <tr>
                <td className="property-table-thumbnail" data-label="Thumbnail">
                    <div className="table-property-thumb">
                        <Link to="">
                            <img src={`http://localhost:8000${thumb}`} width="80" height="70" />
                        </Link>
                    </div>
                </td>
                <td className="property-table-address" data-label="Title">
                    <Link to=""><strong>{props.listing.Title}</strong></Link><br/>
                    {props.listing.address}<br/>
                </td>
                <td className="property-table-type" data-label="Type">
                    {props.listing.listing_type}
                </td>

                <td className="property-table-status" data-label="Status">
                    <span className={`badge ${status} `}>{props.listing.status}</span>
                </td>

                <td className="property-table-price" data-label="Price">
                    {price}
                </td>

                {/*<td className="property-table-featured" data-label="Featured">*/}
                {/*    Featured*/}
                {/*</td>*/}
                <td>
                    {Date_time}
                </td>

                <td className="property-table-actions" data-label="Actions">
                    <div className="dropdown property-action-menu">
                        <button
                            className="btn btn-primary-outlined dropdown-toggle"
                            type="button"
                            id="dropdownMenuButton"
                            onClick={toggleDropdown}
                            aria-haspopup="true"
                            aria-expanded={isOpen}
                        >
                            Actions
                        </button>
                        {isOpen && (
                            <div className={`dropdown-menu dropdown-menu-right ${ isOpen?'show':''}`} aria-labelledby="dropdownMenuButton">
                                <Link className="dropdown-item" to="#" onClick={closeDropdown}>View Stats</Link>
                                <Link className="dropdown-item" to={`/create-listings/?listing-id=${props.listing.ID}`} onClick={closeDropdown}>Edit</Link>
                                <Link className="dropdown-item delete-property" to="#" data-id="$post->ID"
                                      onClick={closeDropdown}>Delete</Link>
                                <Link className="dropdown-item clone-property" to="#"
                                      onClick={closeDropdown}>Duplicate</Link>
                                <Link className="dropdown-item" to="#" onClick={closeDropdown}>Put On Hold</Link>
                                <Link className="dropdown-item" to="#" onClick={closeDropdown}>Go Live</Link>
                                <Link className="dropdown-item mark_as_sold_js" to="#" onClick={closeDropdown}>Mark as
                                    Sold</Link>
                                <Link className="dropdown-item houzez-prop-action-js" to="#"
                                      data-propid="'.intval( $post->ID ).'"
                                      onClick={closeDropdown}><strong>Approve</strong></Link>
                                <Link className="dropdown-item houzez-prop-action-js" to="#"
                                      data-propid="'.intval( $post->ID ).'"
                                      onClick={closeDropdown}><strong>Disapproved</strong></Link>
                                <Link className="dropdown-item houzez-prop-action-js" to="#"
                                      data-propid="'.intval( $post->ID ).'" onClick={closeDropdown}><strong>Mark as
                                    Featured</strong></Link>
                                <Link className="dropdown-item houzez-prop-action-js" to="#"
                                      data-propid="'.intval( $post->ID ).'" onClick={closeDropdown}><strong>Remove from
                                    Featured</strong></Link>
                                <Link className="dropdown-item houzez-prop-action-js" to="#"
                                      data-propid="'.intval( $post->ID ).'" data-type="expire" onClick={closeDropdown}>Mark
                                    as Expired</Link>
                                <Link className="dropdown-item houzez-prop-action-js" to="#"
                                      data-propid="'.intval( $post->ID ).'" data-type="publish"
                                      onClick={closeDropdown}>Publish</Link>
                                <Link className="houzez-woocommerce-pay btn pay-btn" to="#"
                                      data-listid="'.intval($post_id).'" onClick={closeDropdown}>Pay Now</Link>
                                <Link className="btn pay-btn" to="#" onClick={closeDropdown}>Pay Now</Link>
                                <Link className="houzez-woocommerce-pay btn pay-btn" to="#" data-featured="1"
                                      data-listid="'.intval($post_id).'" onClick={closeDropdown}>Upgrade to
                                    Featured</Link>
                                <Link className="btn pay-btn" to="#" onClick={closeDropdown}>Upgrade to Featured</Link>
                                <Link className="houzez-woocommerce-pay btn pay-btn" to="#"
                                      data-listid="'.intval($post_id).'" onClick={closeDropdown}>Re-List</Link>
                                <Link className="btn pay-btn" to="#" onClick={closeDropdown}>Re-List</Link>
                                <Link className="relist-free btn pay-btn" to="#" data-property="'.$post->ID.'"
                                      onClick={closeDropdown}>Re-List</Link>
                                <Link className="make-prop-featured btn pay-btn" to="#" data-proptype="membership"
                                      data-propid="'.intval( $post->ID ).'" onClick={closeDropdown}>Set as
                                    Featured</Link>
                                <Link className="remove-prop-featured btn pay-btn" to="#" data-proptype="membership"
                                      data-propid="'.intval( $post->ID ).'" onClick={closeDropdown}>Remove From
                                    Featured</Link>
                                <Link className="resend-for-approval btn pay-btn" to="#"
                                      data-propid="'.intval( $post->ID ).'" onClick={closeDropdown}>Reactivate
                                    Listing</Link>
                                <Link className="houzez-woocommerce-pay btn pay-btn" to="#" data-featured="1"
                                      data-listid="'.intval($post_id).'" onClick={closeDropdown}>Upgrade to
                                    Featured</Link>
                                <Link className="btn pay-btn" to="#" onClick={closeDropdown}>Upgrade to Featured</Link>
                            </div>
                        )}
                    </div>
                </td>
            </tr>
        </>
    );
}
export default ListingList
