import React, { useState } from "react";
import { Link } from "react-router-dom";

const ListingList = ({ listing }) => {
    const [isOpen, setIsOpen] = useState(false);

    const price = JSON.parse(listing.base_price);
    const date = new Date(listing.updated_at);
    const formattedDate = date.toLocaleString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
    });

    // Extract image
    let image = listing.listing_gallery?.[0]?.main_image;
    if (!image) {
        const imagePath = listing.listing_gallery?.[0]?.image_path;
        try {
            const parsed = imagePath ? JSON.parse(imagePath) : [];
            image = parsed?.[0] || "";
        } catch (e) {
            console.error("Invalid image_path JSON:", e);
            image = "";
        }
    }

    // Determine status class
    const statusClass = {
        pending: "badge-warning",
        draft: "badge-dark",
        published: "badge-success",
    }[listing.status] || "badge-success";

    const toggleDropdown = () => setIsOpen(!isOpen);
    const closeDropdown = () => setIsOpen(false);

    const dropdownActions = [
        { label: "View Stats", action: "#" },
        { label: "Edit", action: `/create-listings/?listing-id=${listing.id}` },
        { label: "Delete", action: "#" },
        { label: "Duplicate", action: "#" },
        { label: "Put On Hold", action: "#" },
        { label: "Go Live", action: "#" },
        { label: "Mark as Sold", action: "#" },
        { label: "Approve", action: "#" },
        { label: "Disapprove", action: "#" },
        { label: "Mark as Featured", action: "#" },
        { label: "Remove from Featured", action: "#" },
        { label: "Mark as Expired", action: "#" },
        { label: "Publish", action: "#" },
        { label: "Pay Now", action: "#" },
        { label: "Upgrade to Featured", action: "#" },
        { label: "Re-List", action: "#" },
        { label: "Reactivate Listing", action: "#" },
        { label: "Set as Featured", action: "#" },
        { label: "Remove From Featured", action: "#" },
    ];

    return (
        <tr>
            <td className="property-table-thumbnail" data-label="Thumbnail">
                <div className="table-property-thumb">
                    <Link to="#">
                        <img src={image} width="80" height="70" alt="Thumbnail" />
                    </Link>
                </div>
            </td>

            <td className="property-table-address" data-label="Title">
                <Link to="#"><strong>{listing.listing_title}</strong></Link>
                <br />
                {listing.addresses?.[0]?.address || "No Address"}
            </td>

            <td className="property-table-type" data-label="Type">
                {listing.listing_type}
            </td>

            <td className="property-table-status" data-label="Status">
                <span className={`badge ${statusClass}`}>{listing.status}</span>
            </td>

            <td className="property-table-price" data-label="Price">
                {price}
            </td>

            <td className="property-table-date" data-label="Posted">
                {formattedDate}
            </td>

            <td className="property-table-actions" data-label="Actions">
                <div className="dropdown property-action-menu">
                    <button
                        className="btn btn-primary-outlined dropdown-toggle"
                        type="button"
                        onClick={toggleDropdown}
                        aria-expanded={isOpen}
                    >
                        Actions
                    </button>

                    {isOpen && (
                        <div className="dropdown-menu dropdown-menu-right show">
                            {dropdownActions.map((item, index) => (
                                <Link
                                    key={index}
                                    className="dropdown-item"
                                    to={item.action}
                                    onClick={closeDropdown}
                                >
                                    {item.label}
                                </Link>
                            ))}
                        </div>
                    )}
                </div>
            </td>
        </tr>
    );
};

export default ListingList;
