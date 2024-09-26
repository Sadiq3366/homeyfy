import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SideBar from "../SideBar";
import { useAuth } from "../../context/AuthContext";
import Search from "../../components/search/Search";
import SortBy from "../../components/listings/SortBy";
import ListingList from "../../components/listings/ListingList";
import http from "../../http";
import Pagination from "../../components/Pagination";

const Listings = (props) => {
    const { loginUserType, loginUserId, checkAuthStatus } = useAuth();
    const [Listings, setListings] = useState([]);
    const [page, setPage] = useState(1);
    const [totalResults, setTotalResults] = useState(0);

    const pageSize = 4;

    useEffect(() => {
        if (loginUserId) {
            fetchListings(loginUserId, page);
        }
    }, [loginUserId, page]);

    const fetchListings = async (loginUserId, page) => {
        try {
            const token = localStorage.getItem("authToken");
            const response = await http.get(
                `listing/view-listing?user_id=${loginUserId}&user_type=${loginUserType}&page=${page}&pagesize=${pageSize}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            if (response) {
                setListings(response.data.listings);
                setTotalResults(response.data.pagination.total);
            }
        } catch (error) {
            //console.log(error);
        }
    };
    const handlePageChange = (pages) => {
            setPage(pages);
            if(pages > 1){
                fetchListings();
            }

    };
    const totalPages = Math.ceil(totalResults / pageSize);

    return (
        <>
            <SideBar
                active={props.active}
                loginUserType={loginUserType}
                loginUserId={loginUserId}
                checkAuthStatus={checkAuthStatus}
            />
            <header className="header-main-wrap dashboard-header-main-wrap">
                <div className="dashboard-header-wrap">
                    <div className="d-flex align-items-center">
                        <div className="dashboard-header-left flex-grow-1">
                            <h1>Properties</h1>
                        </div>
                        <div className="dashboard-header-right">
                            <Link className="btn btn-primary" to="/create-listing">
                                Create Listing
                            </Link>
                        </div>
                    </div>
                </div>
            </header>
            <section className="dashboard-content-wrap">
                <div className="dashboard-content-inner-wrap">
                    <div className="dashboard-content-block-wrap">
                        <div className="dashboard-property-search-wrap">
                            <div className="d-flex">
                                <div className="flex-grow-1">
                                    <div className="dashboard-property-search">
                                        <Search />
                                    </div>
                                </div>
                                <div className="dashboard-property-sort-by">
                                    <SortBy />
                                </div>
                            </div>
                        </div>
                        <div id="dash-prop-msg"></div>

                        <table className="dashboard-table dashboard-table-properties table-lined table-hover responsive-table">
                            {Listings && Listings.length > 0 ? (
                                <table>
                                    <thead>
                                    <tr>
                                        <th>Thumbnail</th>
                                        <th>Title</th>
                                        <th>Type</th>
                                        <th>Status</th>
                                        <th>Price</th>
                                        {/*<th>Featured</th>*/}
                                        <th>Posted</th>
                                        <th className="action-col">Actions</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {Listings.map((listing, index) => (
                                        <ListingList key={index} listing={listing} />
                                    ))}
                                    </tbody>
                                </table>
                            ) : (
                                <div className="listing_not_found">Record Not Found</div>
                            )}
                        </table>
                    </div>
                </div>
                {Listings && totalResults > pageSize && (
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
