import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  FaStar, FaHeart, FaRegHeart, FaShare, FaWifi, FaParking, 
  FaSwimmingPool, FaDumbbell, FaTv, FaSnowflake, FaCar,
  FaBed, FaBath, FaUsers, FaHome, FaChevronLeft, FaChevronRight,
  FaCheck, FaTimes, FaMapMarkerAlt, FaCalendarAlt, FaUserFriends
} from 'react-icons/fa';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';

// Fix leaflet icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
});

const ListingDetailPage = () => {
  const { id } = useParams();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  const [showAllPhotos, setShowAllPhotos] = useState(false);
  const [checkIn, setCheckIn] = useState('2025-08-15');
  const [checkOut, setCheckOut] = useState('2025-08-17');
  const [guests, setGuests] = useState(2);
  const [showBookingCard, setShowBookingCard] = useState(true);

  // Mock data - replace with actual API call
  const listing = {
    id: 1,
    title: "Stunning Modern Villa with Ocean View",
    location: "Malibu, California, United States",
    rating: 4.87,
    reviewCount: 142,
    hostName: "Sarah",
    hostImage: "https://images.unsplash.com/photo-1494790108755-2616c3e341f0?w=150&h=150&fit=crop&crop=face",
    hostJoinDate: "2018",
    isSuperhost: true,
    images: [
      "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1200&h=800&fit=crop",
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=1200&h=800&fit=crop",
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200&h=800&fit=crop",
      "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=1200&h=800&fit=crop",
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1200&h=800&fit=crop",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1200&h=800&fit=crop"
    ],
    price: 450,
    priceType: "night",
    beds: 3,
    bathrooms: 2,
    guests: 6,
    propertyType: "Entire villa",
    amenities: [
      { icon: FaWifi, name: "Wifi", available: true },
      { icon: FaParking, name: "Free parking", available: true },
      { icon: FaSwimmingPool, name: "Pool", available: true },
      { icon: FaTv, name: "TV", available: true },
      { icon: FaSnowflake, name: "Air conditioning", available: true },
      { icon: FaDumbbell, name: "Gym", available: false },
      { icon: FaCar, name: "EV charger", available: true }
    ],
    description: `Escape to this breathtaking modern villa perched on the cliffs of Malibu, offering unparalleled ocean views and luxurious amenities. This stunning 3-bedroom, 2-bathroom retreat is perfect for those seeking a premium coastal experience.

The space features floor-to-ceiling windows that frame the endless Pacific Ocean, an infinity pool that seems to merge with the horizon, and elegantly designed interiors with high-end furnishings throughout.

Wake up to the sound of waves and enjoy your morning coffee on the expansive deck while watching surfers ride the perfect Malibu waves. The fully equipped gourmet kitchen makes dining in a pleasure, while the outdoor BBQ area is perfect for evening gatherings.`,
    coordinates: [34.0259, -118.7798],
    checkInTime: "3:00 PM",
    checkOutTime: "11:00 AM",
    cancellationPolicy: "Free cancellation for 48 hours",
    cleaningFee: 75,
    serviceFee: 89
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % listing.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + listing.images.length) % listing.images.length);
  };

  const calculateNights = () => {
    const start = new Date(checkIn);
    const end = new Date(checkOut);
    const diffTime = Math.abs(end - start);
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const nights = calculateNights();
  const subtotal = listing.price * nights;
  const total = subtotal + listing.cleaningFee + listing.serviceFee;

  return (
    <>
      <div className="detail-page">
        <div className="detail-container">
          {/* Header */}
          <header className="header">
            <h1 className="title">{listing.title}</h1>
            <div className="subtitle-row">
              <div className="rating-badge">
                <FaStar className="star-icon" />
                <span>{listing.rating}</span>
                <span>({listing.reviewCount} reviews)</span>
              </div>
              <div className="location">{listing.location}</div>
              <div className="action-buttons">
                <button className="action-btn">
                  <FaShare />
                  Share
                </button>
                <button 
                  className="action-btn"
                  onClick={() => setIsFavorite(!isFavorite)}
                >
                  {isFavorite ? <FaHeart style={{ color: '#ff385c' }} /> : <FaRegHeart />}
                  Save
                </button>
              </div>
            </div>
          </header>

          {/* Photo Gallery */}
          <section className="photo-section">
            <div className="photo-grid">
              <div className="photo-item main-photo" onClick={() => setShowAllPhotos(true)}>
                <img 
                  src={listing.images[0]} 
                  alt="Main property view"
                  className="photo-image"
                />
              </div>
              {listing.images.slice(1, 5).map((image, index) => (
                <div key={index} className="photo-item" onClick={() => setShowAllPhotos(true)}>
                  <img 
                    src={image} 
                    alt={`Property view ${index + 2}`}
                    className="photo-image"
                  />
                </div>
              ))}
            </div>
            <button className="show-all-btn" onClick={() => setShowAllPhotos(true)}>
              Show all {listing.images.length} photos
            </button>
          </section>

          {/* Main Content */}
          <div className="main-content">
            <div className="content-left">
              {/* Property Info */}
              <section className="content-section">
                <div className="property-header">
                  <div className="property-info">
                    <h2>{listing.propertyType} hosted by {listing.hostName}</h2>
                    <div className="property-details">
                      {listing.guests} guests · {listing.beds} beds · {listing.bathrooms} bathrooms
                    </div>
                  </div>
                  <div className="host-info">
                    <img 
                      src={listing.hostImage} 
                      alt={listing.hostName}
                      className="host-avatar"
                    />
                    <div className="host-details">
                      <h3>{listing.hostName}</h3>
                      {listing.isSuperhost && <span className="host-badge">Superhost</span>}
                    </div>
                  </div>
                </div>
              </section>

              {/* Description */}
              <section className="content-section">
                <h3 className="section-title">About this place</h3>
                <p className="description">{listing.description}</p>
              </section>

              {/* Amenities */}
              <section className="content-section">
                <h3 className="section-title">What this place offers</h3>
                <div className="amenities-grid">
                  {listing.amenities.map((amenity, index) => {
                    const IconComponent = amenity.icon;
                    return (
                      <div 
                        key={index} 
                        className={`amenity-item ${!amenity.available ? 'unavailable' : ''}`}
                      >
                        <IconComponent className="amenity-icon" />
                        <span className="amenity-text">{amenity.name}</span>
                        {!amenity.available && <FaTimes style={{ marginLeft: 'auto', color: '#717171' }} />}
                      </div>
                    );
                  })}
                </div>
              </section>

              {/* Map */}
              <section className="content-section">
                <h3 className="section-title">Where you'll be</h3>
                <div className="map-container">
                  <MapContainer 
                    center={listing.coordinates} 
                    zoom={13} 
                    style={{ height: "100%", width: "100%" }}
                  >
                    <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                    <Marker position={listing.coordinates}>
                      <Popup>{listing.location}</Popup>
                    </Marker>
                  </MapContainer>
                </div>
                <p style={{ marginTop: '16px', color: '#717171' }}>
                  {listing.location}
                </p>
              </section>
            </div>

            {/* Booking Card */}
            <div className="booking-card">
              <div className="booking-header">
                <span className="price-display">${listing.price}</span>
                <span className="price-period">night</span>
                <div className="booking-rating">
                  <FaStar style={{ color: '#ff385c' }} />
                  <span>{listing.rating}</span>
                  <span style={{ color: '#717171' }}>({listing.reviewCount})</span>
                </div>
              </div>

              <div className="date-section">
                <div className="date-row">
                  <div className="date-input-group">
                    <label className="date-label">Check-in</label>
                    <input 
                      type="date" 
                      className="date-input"
                      value={checkIn}
                      onChange={(e) => setCheckIn(e.target.value)}
                    />
                  </div>
                  <div className="date-input-group">
                    <label className="date-label">Check-out</label>
                    <input 
                      type="date" 
                      className="date-input"
                      value={checkOut}
                      onChange={(e) => setCheckOut(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              <div className="guests-section">
                <div className="guests-label">Guests</div>
                <div className="guests-value">{guests} guests</div>
              </div>

              <button className="reserve-btn">Reserve</button>
              <p className="no-charge-text">You won't be charged yet</p>

              <div className="price-breakdown">
                <div className="price-row">
                  <span className="price-label">${listing.price} x {nights} nights</span>
                  <span className="price-value">${subtotal}</span>
                </div>
                <div className="price-row">
                  <span className="price-label">Cleaning fee</span>
                  <span className="price-value">${listing.cleaningFee}</span>
                </div>
                <div className="price-row">
                  <span className="price-label">Service fee</span>
                  <span className="price-value">${listing.serviceFee}</span>
                </div>
                <div className="price-row">
                  <span className="price-label">Total</span>
                  <span className="price-value">${total}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ListingDetailPage;