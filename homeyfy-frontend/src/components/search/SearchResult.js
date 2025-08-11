import React from "react";
import MainSearch from "./MainSearch";
import ListingItem from "../listings/ListingItem";

const SearchResult = (prop) => {
  return (
    <>
      <div className="search-results-page">
        {/* Sticky search header */}
        <div className="search-header-sticky">
          <div className="container-fluid px-4">
            <MainSearch />
          </div>
        </div>

        {/* Main content */}
        <div className="search-content-modern">
          <ListingItem progress={prop.setProgress} />
        </div>
      </div>

      <style jsx>{`
        .search-header-sticky {
          position: sticky;
          top: 0;
          z-index: 1000;
          background: white;
          padding: 16px 0;
          border-bottom: 1px solid #e0e0e0;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
        }

        .search-results-page {
          min-height: 100vh;
          background: #f8f9fa;
        }

        .search-content-modern {
          padding-top: 0;
        }
      `}</style>
    </>
  );
};

export default SearchResult;