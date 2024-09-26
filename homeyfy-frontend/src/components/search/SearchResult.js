import React from "react";
import MainSearch from "./MianSearch";
import ListingItem from "../listings/ListingItem";

const SearchResult = (prop)=>{
    return(
        <div className="search_result">
            <MainSearch />
            <ListingItem progress={prop.setProgress} />
        </div>

    );
}
export default SearchResult
