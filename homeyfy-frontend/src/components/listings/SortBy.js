import React from "react";

const SortBy = ({ sortOrderChange }) => {
    return (
        <div className="sort-by d-flex align-items-center gap-2">
            <label htmlFor="sortOrder" className="sort-by-title mb-0">
                Sort by:
            </label>
            <select
                id="sortOrder"
                onChange={sortOrderChange}
                className="form-select"
            >
                <option value="">Default Order</option>
                <option value="a_price">Price - Low to High</option>
                <option value="d_price">Price - High to Low</option>
                <option value="featured_first">Featured Listings First</option>
                <option value="a_date">Date - Old to New</option>
                <option value="d_date">Date - New to Old</option>
                <option value="a_title">Title - A → Z</option>
                <option value="d_title">Title - Z → A</option>
            </select>
        </div>
    );
};

export default SortBy;
