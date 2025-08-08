import React from "react";
import MainSearch from "./MainSearch";
import ListingItem from "../listings/ListingItem";

const SearchResult = (prop) => {
  return (
    <div className="search-results-page">
      {/* Top search bar */}
      <div className="search-bar-wrap">
        <MainSearch />
      </div>

      {/* Content */}
      <div className="search-results-content">
        <ListingItem progress={prop.setProgress} />
      </div>
    </div>
  );
};

export default SearchResult;
