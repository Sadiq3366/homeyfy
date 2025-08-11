import React, { useState } from "react";

const Search = ({ onSearch }) => {
    const [keyword, setKeyword] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        onSearch({ keyword: keyword.trim() });
    };

    return (
        <form onSubmit={handleSubmit} className="search-bar d-flex align-items-center">
            <div className="search-input-wrapper position-relative flex-grow-1">
                <span className="fa fa-search search-icon"></span>
                <input
                    type="text"
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                    className="form-control search-input"
                    placeholder="Search properties..."
                    aria-label="Search listings"
                />
            </div>
            <button type="submit" className="btn btn-primary search-btn">
                Search
            </button>
        </form>
    );
};

export default Search;
