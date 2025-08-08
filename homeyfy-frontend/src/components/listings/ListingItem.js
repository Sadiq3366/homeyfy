import React, { useEffect, useState } from "react";
import http from "../../http";
import Slider from "react-slick";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Spinner from "../Spinner";
import InfiniteScroll from "react-infinite-scroll-component";
import { useAuth } from "../../context/AuthContext";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";

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
  }, [coords]);

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
  const pageSize = 3;

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
      progress(10);
      const nextPage = page + 1;
      const url = `/auth/listing/search-listing?page=${nextPage}&pagesize=${pageSize}&guests=${guests}&address=${address}&arrival=${arrival}&departure=${departure}`;

      const res = await http.get(url);
      progress(30);

      const data = res.data.listings;
      if (data.total > 0) {
        setListings(prev => [...prev, ...data.data]);
        setPage(nextPage);
      }

      progress(100);
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

  const sliderSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: false,
    arrows: true,
  };

  return (
    <div className="container-fluid">
      <div className="row">
        {/* LEFT: Listings */}
        <div className="col-lg-8 col-md-12">
          <div className="listing_heading mb-3">Search Results</div>
          <InfiniteScroll
            next={fetchMoreData}
            hasMore={listings.length < totalResults}
            dataLength={listings.length}
            loader={<Spinner />}
          >
            <div className="row" id="listing_item">
              {listings.length ? (
                listings.map((listing, index) => {
                  const gallery = listing.listing_gallery[0];
                  const galleryImages = gallery?.image_path ? JSON.parse(gallery.image_path) : [];
                  const allImages = listing.main_image ? [listing.main_image, ...galleryImages] : galleryImages;

                  return (
                    <div className="col-lg-4 col-md-6 mb-4" key={index}>
                      <div
                        className="card h-100"
                        onMouseEnter={() =>
                          listing.addresses[0] && listing.addresses[0].lat && listing.addresses[0].long &&
                          setHoverCoords([listing.addresses[0].lat, listing.addresses[0].long])
                        }
                        onMouseLeave={() => setHoverCoords(null)}
                      >
                        <div className="item-header position-relative">
                          <span className="label-featured label">Featured</span>
                          <span className="listing_favriout">
                            <i
                              onClick={() => toggleFavorite(listing.id)}
                              className={`fa ${favorites[listing.id] ? "fa-heart" : "fa-heart-o"}`}
                            ></i>
                          </span>
                          <ul className="item-price-wrap">
                            <li className="item-price">
                              ${listing.base_price}/{listing.price[0]?.price_postfix}
                            </li>
                          </ul>
                          <Slider {...sliderSettings}>
                            {allImages.map((img, i) => (
                              <div key={i}>
                                <Link to="">
                                  <img
                                    src={img}
                                    alt={`Slide ${i + 1}`}
                                    style={{ width: "100%", maxHeight: "250px", objectFit: "cover", height: "215px" }}
                                  />
                                </Link>
                              </div>
                            ))}
                          </Slider>
                        </div>
                        <div className="item-body p-3">
                          <h2 className="item-title fs-6">
                            <Link to="">{listing.listing_title}</Link>
                          </h2>
                          <address className="item-address small">{listing.addresses[0]?.address}</address>
                          <ul className="item-amenities list-unstyled small d-flex flex-wrap">
                            <li className="me-2"><i className="fa fa-bed-pulse me-1"></i> Beds: {listing.l_beds}</li>
                            <li className="me-2"><i className="fa fa-bath me-1"></i> Baths: {listing.baths}</li>
                            <li className="me-2"><i className="fa fa-people-group me-1"></i> Guests: {listing.guests}</li>
                            <li className="me-2"><i className="fa fa-ruler-combined me-1"></i> {listing.listing_size} {listing.listing_size_unit}</li>
                            <li><span>{listing.listing_type}</span></li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="col-12">
                  <div className="listing_not_found">Record Not Found</div>
                </div>
              )}
            </div>
          </InfiniteScroll>
        </div>

        {/* RIGHT: Map */}
        <div className="col-lg-4 d-none d-lg-block">
          <div style={{ position: "sticky", top: "80px", height: "calc(100vh - 100px)" }}>
            <MapContainer center={[25.276987, 55.296249]} zoom={8} style={{ height: "100%", width: "100%" }}>
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" attribution="© OpenStreetMap contributors" />
              {hoverCoords && <FlyToMap coords={hoverCoords} />}
              {listings.map((listing, idx) => (
                listing.addresses[0] && listing.addresses[0].lat && listing.addresses[0].long && (
                  <Marker key={idx} position={[listing.addresses[0].lat, listing.addresses[0].long]}>
                    <Popup>
                      <strong>{listing.listing_title}</strong><br />
                      {listing.addresses[0]?.address}
                    </Popup>
                  </Marker>
                )
              ))}
            </MapContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListingItem;
