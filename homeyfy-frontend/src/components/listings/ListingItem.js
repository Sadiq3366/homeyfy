import React, { useEffect, useState } from "react";
import http from "../../http";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Spinner from "../Spinner";
import InfiniteScroll from "react-infinite-scroll-component";
import { useAuth } from "../../context/AuthContext";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import { FaHeart, FaRegHeart, FaBed, FaBath, FaUsers, FaRuler, FaStar, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import ImageSlider from "./gallery/ModernImageSlider"
// Fix leaflet icon issue
import "leaflet/dist/leaflet.css";
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
});

const FlyToMap = ({ coords }) => {
  const map = useMap();
  useEffect(() => {
    if (coords) map.flyTo(coords, 14, { duration: 1 });
  }, [coords, map]);
  return null;
};

const ListingItem = ({ progress }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);

  const address = queryParams.get("location") || "";
  const arrival = queryParams.get("arrival") || "";
  const departure = queryParams.get("departure") || "";
  const guests = queryParams.get("guests") || "";

  const [listings, setListings] = useState([]);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [favorites, setFavorites] = useState({});
  const [hoverCoords, setHoverCoords] = useState(null);

  const { loginUserType, loginUserId } = useAuth();
  const pageSize = 6;

  useEffect(() => {
    fetchListings();
  }, []);

  const fetchListings = async () => {
    try {
      progress(10);
      const url = `/auth/listing/search-listing?page=${page}&pagesize=${pageSize}&guests=${guests}&address=${address}&arrival=${arrival}&departure=${departure}`;
      progress(30);
      const res = await http.get(url);
      progress(50);

      const data = res.data.listings;
      setListings(data.total > 0 ? data.data : []);
      setTotalResults(data.total);
      progress(100);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchMoreData = async () => {
    try {
      const nextPage = page + 1;
      const url = `/auth/listing/search-listing?page=${nextPage}&pagesize=${pageSize}&guests=${guests}&address=${address}&arrival=${arrival}&departure=${departure}`;
      const res = await http.get(url);
      const data = res.data.listings;
      
      if (data.total > 0) {
        setListings(prev => [...prev, ...data.data]);
        setPage(nextPage);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const checkFavorites = async () => {
    try {
      const token = localStorage.getItem("authToken");
      const res = await http.get(`/getFavorite?user_id=${loginUserId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const favMap = res.data.reduce((acc, fav) => {
        acc[fav.listing_id] = true;
        return acc;
      }, {});
      setFavorites(favMap);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (loginUserId) checkFavorites();
  }, [loginUserId]);

  const toggleFavorite = async id => {
    if (!loginUserId || !loginUserType) return navigate("/login");

    try {
      const token = localStorage.getItem("authToken");
      const res = await http.post(
        `/favorite?user_id=${loginUserId}&listing_id=${id}`,
        null,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setFavorites(prev => ({ ...prev, [id]: res.data.Added }));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className="listings-container">
        <div className="listings-layout">
          {/* Listings Section */}
          <div className="listings-section">
            <div className="results-header">
              <h1 className="results-count">
                {totalResults > 0 ? `${totalResults} stays` : 'Search results'}
              </h1>
              {totalResults > 0 && (
                <p className="results-subtitle">
                  {address && `in ${address}`} {arrival && departure && `• ${arrival} - ${departure}`}
                </p>
              )}
            </div>

            <InfiniteScroll
              next={fetchMoreData}
              hasMore={listings.length < totalResults}
              dataLength={listings.length}
              loader={<Spinner />}
            >
              <div className="listings-grid">
                {listings.length ? (
                  listings.map((listing, index) => {
                    const gallery = listing.listing_gallery[0];
                    const galleryImages = gallery?.image_path ? JSON.parse(gallery.image_path) : [];
                    const allImages = listing.main_image ? [listing.main_image, ...galleryImages] : galleryImages;

                    return (
                      <div
                        key={index}
                        className="listing-card"
                        onMouseEnter={() =>
                          listing.addresses[0] && listing.addresses[0].lat && listing.addresses[0].long &&
                          setHoverCoords([listing.addresses[0].lat, listing.addresses[0].long])
                        }
                        onMouseLeave={() => setHoverCoords(null)}
                      >
                        <div className="card-image-container">
                          <span className="featured-badge">Featured</span>
                          
                          <button 
                            className="favorite-btn"
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleFavorite(listing.id);
                            }}
                          >
                            {favorites[listing.id] ? 
                              <FaHeart className="favorite-icon" /> : 
                              <FaRegHeart className="favorite-icon" />
                            }
                          </button>

                          <div className="price-badge">
                            ${listing.base_price}
                            <span className="price-period">/{listing.price[0]?.price_postfix}</span>
                          </div>

                          <ImageSlider
                            images={allImages}
                            title={listing.listing_title}
                          />
                        </div>

                        <Link to={`/listing/${listing.id}`} className="card-link">
                          <div className="card-content">
                            <h3 className="listing-title">
                              {listing.listing_title}
                            </h3>
                          
                          <p className="listing-address">
                            {listing.addresses[0]?.address}
                          </p>

                          <div className="amenities-grid">
                            <div className="amenity-item">
                              <FaBed className="amenity-icon" />
                              <span>{listing.l_beds} beds</span>
                            </div>
                            <div className="amenity-item">
                              <FaBath className="amenity-icon" />
                              <span>{listing.baths} baths</span>
                            </div>
                            <div className="amenity-item">
                              <FaUsers className="amenity-icon" />
                              <span>{listing.guests} guests</span>
                            </div>
                            <div className="amenity-item">
                              <FaRuler className="amenity-icon" />
                              <span>{listing.listing_size} {listing.listing_size_unit}</span>
                            </div>
                          </div>

                          <div className="card-footer">
                            <span className="listing-type">{listing.listing_type}</span>
                            <div className="rating-section">
                              <FaStar className="rating-stars" />
                              <span className="rating-text">4.8 (24)</span>
                            </div>
                          </div>
                          </div>
                        </Link>
                      </div>
                    );
                  })
                ) : (
                  <div className="no-results">
                    <div className="no-results-icon">🏠</div>
                    <h2 className="no-results-title">No stays found</h2>
                    <p className="no-results-subtitle">
                      Try adjusting your search filters or dates
                    </p>
                  </div>
                )}
              </div>
            </InfiniteScroll>
          </div>

          {/* Map Section - Fixed on the right */}
          <div className="map-section d-none d-lg-block">
            <div className="map-wrapper">
              <MapContainer 
                center={[25.276987, 55.296249]} 
                zoom={8} 
                style={{ height: "100%", width: "100%" }}
              >
                <TileLayer 
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" 
                  attribution="© OpenStreetMap contributors" 
                />
                {hoverCoords && <FlyToMap coords={hoverCoords} />}
                {listings.map((listing, idx) => (
                  listing.addresses[0] && listing.addresses[0].lat && listing.addresses[0].long && (
                    <Marker key={idx} position={[listing.addresses[0].lat, listing.addresses[0].long]}>
                      <Popup>
                        <div style={{ minWidth: '200px' }}>
                          <strong>{listing.listing_title}</strong><br />
                          <span style={{ color: '#666', fontSize: '13px' }}>
                            {listing.addresses[0]?.address}
                          </span><br />
                          <strong style={{ color: '#ff385c', fontSize: '16px' }}>
                            ${listing.base_price}/{listing.price[0]?.price_postfix}
                          </strong>
                        </div>
                      </Popup>
                    </Marker>
                  )
                ))}
              </MapContainer>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ListingItem;