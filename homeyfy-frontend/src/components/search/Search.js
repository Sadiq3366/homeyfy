import React, { useState } from "react";

const Search = ({ onSearch }) => {
    const [keyword, setKeyword] = useState("");

    const handleChange = (e) => {
        setKeyword(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (onSearch && keyword.trim()) {
            onSearch({ keyword });
        }
    };

    return (
        <form onSubmit={handleSubmit} className="d-flex gap-2 align-items-center">
            <div className="position-relative flex-grow-1">
                <input
                    type="text"
                    name="keyword"
                    value={keyword}
                    onChange={handleChange}
                    className="form-control ps-4"
                    placeholder="Search"
                    aria-label="Search listings"
                />
                <span className="fa fa-search position-absolute top-50 start-0 translate-middle-y ps-2 text-muted"></span>
            </div>

            <button type="submit" className="btn btn-secondary">
                Search
            </button>
        </form>
    );
};

export default Search;
