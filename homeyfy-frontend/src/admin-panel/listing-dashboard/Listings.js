import React, { useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import SideBar from "../SideBar";
import { useAuth } from "../../context/AuthContext";
import Search from "../../components/search/Search";
import SortBy from "../../components/listings/SortBy";
import ListingList from "../../components/listings/ListingList";
import Pagination from "../../components/Pagination";
import http from "../../http";

const Listings = ({ active }) => {
    const { loginUserType, loginUserId, checkAuthStatus } = useAuth();
    const [listings, setListings] = useState([]);
    const [page, setPage] = useState(1);
    const [totalResults, setTotalResults] = useState(0);
    const [keyword, setKeyword] = useState('');
    const [sortOrder, setSortOrder] = useState('');
    const [loading, setLoading] = useState(false);

    const pageSize = 4;
    const totalPages = Math.ceil(totalResults / pageSize);

    const fetchListings = useCallback(async () => {
        if (!loginUserId) return;

        setLoading(true);

        try {
            const token = localStorage.getItem("authToken");
            const { data } = await http.get(
                `listing/view-listing`,
                {
                    params: {
                        user_id: loginUserId,
                        user_type: loginUserType,
                        page,
                        pagesize: pageSize,
                        search: keyword,
                        sort: sortOrder
                    },
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                }
            );

            setListings(data?.listings?.data || []);
            setTotalResults(data?.listings?.total || 0);
        } catch (error) {
            console.error("Error fetching listings:", error);
        } finally {
            setLoading(false);
        }
    }, [loginUserId, loginUserType, page, keyword, sortOrder]);

    useEffect(() => {
        fetchListings();
    }, [fetchListings]);

    const handlePageChange = (newPage) => {
        setPage(newPage);
    };

    const handleSearch = ({ keyword }) => {
        setKeyword(keyword);
        setPage(1);
    };

    const handleSortOrderChange = (e) => {
        setSortOrder(e.target.value);
        setPage(1);
    };

    return (
        <>
            <SideBar
                active={active}
                loginUserType={loginUserType}
                loginUserId={loginUserId}
                checkAuthStatus={checkAuthStatus}
            />

            <header className="header-main-wrap dashboard-header-main-wrap">
                <div className="dashboard-header-wrap d-flex align-items-center">
                    <div className="dashboard-header-left flex-grow-1">
                        <h1>Properties</h1>
                    </div>
                    <div className="dashboard-header-right">
                        <Link className="btn btn-primary" to="/create-listings">
                            Create Listing
                        </Link>
                    </div>
                </div>
            </header>

            <section className="dashboard-content-wrap">
                <div className="dashboard-content-inner-wrap">
                    <div className="dashboard-content-block-wrap">

                        {/* Search and Sort */}
                        <div className="dashboard-property-search-wrap d-flex">
                            <div className="flex-grow-1 dashboard-property-search">
                                <Search onSearch={handleSearch} />
                            </div>
                            <div className="dashboard-property-sort-by">
                                <SortBy sortOrderChange={handleSortOrderChange} />
                            </div>
                        </div>

                        {/* Loader / Table / Not Found */}
                        {loading ? (
                            <div className="d-flex justify-content-center align-items-center py-5">
                                <div className="spinner-border text-primary" role="status" style={{ width: "3rem", height: "3rem" }}>
                                    <span className="visually-hidden">Loading...</span>
                                </div>
                            </div>
                        ) : listings.length > 0 ? (
                            <table className="dashboard-table dashboard-table-properties table-lined table-hover responsive-table">
                                <thead>
                                    <tr>
                                        <th>Thumbnail</th>
                                        <th>Title</th>
                                        <th>Type</th>
                                        <th>Status</th>
                                        <th>Price</th>
                                        <th>Posted</th>
                                        <th className="action-col">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {listings.map((listing, index) => (
                                        <ListingList key={index} listing={listing} />
                                    ))}
                                </tbody>
                            </table>
                        ) : (
                            <div className="listing_not_found text-center py-5">
                                <i className="fas fa-search-minus fa-2x mb-2 text-muted"></i>
                                <p className="text-muted">No listings found</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Pagination */}
                {!loading && totalPages > 1 && (
                    <Pagination
                        page={page}
                        onPageChange={handlePageChange}
                        TotalRecord={totalPages}
                    />
                )}
            </section>
        </>
    );
};

export default Listings;
    