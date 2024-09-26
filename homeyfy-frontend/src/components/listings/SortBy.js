import React from "react";

const SortBy =()=>{
    return(
        <div>
            <div className="sort-by">
                <div className="d-flex align-items-center">
                    <div className="sort-by-title">
                        Sort by:
                    </div>
                    <select id="" className="selectpicker form-control bs-select-hidden"  >
                        <option value="">Default Order</option>
                        <option value="a_price">Price - Low to High</option>
                        <option value="d_price">Price - High to Low</option>
                        <option value="featured_first">Featured Listings First</option>
                        <option value="a_date">Date - Old to New</option>
                        <option value="d_date">Date - New to Old</option>
                        <option value="a_title">Title - ASC</option>
                        <option value="d_title">Title - DESC</option>
                    </select>
                </div>
            </div>
        </div>
    );
}

export default SortBy
