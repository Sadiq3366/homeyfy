import React, { useState, useRef, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { 
  FaSearch, 
  FaMapMarkerAlt, 
  FaCalendarAlt, 
  FaUser, 
  FaTimes,
  FaMapMarker
} from "react-icons/fa";

const MainSearch = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const [focusedField, setFocusedField] = useState(null);
  const [showGuestDropdown, setShowGuestDropdown] = useState(false);
  const searchFormRef = useRef(null);

  const [search, setSearch] = useState({
    location: queryParams.get("location") || "",
    arrival: queryParams.get("arrival") || "",
    departure: queryParams.get("departure") || "",
    guests: queryParams.get("guests") || "1",
  });

  const [guestDetails, setGuestDetails] = useState({
    adults: 1,
    children: 0,
    infants: 0
  });

  // Popular destinations for suggestions
  const popularDestinations = [
    "New York, NY",
    "Los Angeles, CA",
    "Miami, FL",
    "Chicago, IL",
    "San Francisco, CA",
    "Las Vegas, NV"
  ];

  const [locationSuggestions, setLocationSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  useEffect(() => {
    if (search.location.length > 0) {
      const filtered = popularDestinations.filter(dest =>
        dest.toLowerCase().includes(search.location.toLowerCase())
      );
      setLocationSuggestions(filtered);
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
  }, [search.location]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!search.location.trim()) {
      setFocusedField('location');
      return;
    }
    
    const queryString = new URLSearchParams({
      ...search,
      guests: guestDetails.adults + guestDetails.children + guestDetails.infants
    }).toString();
    navigate("/search/?" + queryString);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSearch((prev) => ({ ...prev, [name]: value }));
  };

  const handleLocationSelect = (destination) => {
    setSearch(prev => ({ ...prev, location: destination }));
    setShowSuggestions(false);
    setFocusedField(null);
  };

  const updateGuests = (type, operation) => {
    setGuestDetails(prev => {
      const newValue = operation === 'increment' 
        ? prev[type] + 1 
        : Math.max(0, prev[type] - 1);
      
      if (type === 'adults' && newValue === 0) return prev;
      
      return { ...prev, [type]: newValue };
    });
  };

  const getTotalGuests = () => {
    return guestDetails.adults + guestDetails.children + guestDetails.infants;
  };

  const getGuestText = () => {
    const total = getTotalGuests();
    if (total === 1) return "1 Guest";
    return `${total} Guests`;
  };

  // Get today's date for min date validation
  const today = new Date().toISOString().split('T')[0];

  return (
    <div className="modern-search-container">
      <form className="modern-search-form" onSubmit={handleSubmit} ref={searchFormRef}>
        {/* Location Input */}
        <div className={`search-field location-field ${focusedField === 'location' ? 'focused' : ''}`}>
          <label className="field-label">Where</label>
          <div className="input-container">
            <FaMapMarkerAlt className="field-icon" />
            <input
              type="text"
              name="location"
              placeholder="Search destinations"
              value={search.location}
              onChange={handleChange}
              onFocus={() => {
                setFocusedField('location');
                setShowSuggestions(search.location.length > 0);
              }}
              onBlur={() => {
                // Delay hiding suggestions to allow for clicks
                setTimeout(() => {
                  setShowSuggestions(false);
                  setFocusedField(null);
                }, 150);
              }}
              required
            />
            {search.location && (
              <FaTimes 
                className="clear-icon" 
                onClick={() => setSearch(prev => ({ ...prev, location: '' }))}
              />
            )}
          </div>
          
          {/* Location Suggestions */}
          {showSuggestions && locationSuggestions.length > 0 && (
            <div className="suggestions-dropdown">
              {locationSuggestions.map((destination, index) => (
                <div 
                  key={index}
                  className="suggestion-item"
                  onClick={() => handleLocationSelect(destination)}
                >
                  <FaMapMarker className="suggestion-icon" />
                  <span>{destination}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Check-in Date */}
        <div className={`search-field date-field ${focusedField === 'arrival' ? 'focused' : ''}`}>
          <label className="field-label">Check in</label>
          <div className="input-container">
            <FaCalendarAlt className="field-icon" />
            <input
              type="date"
              name="arrival"
              value={search.arrival}
              min={today}
              onChange={handleChange}
              onFocus={() => setFocusedField('arrival')}
              onBlur={() => setFocusedField(null)}
              required
            />
          </div>
        </div>

        {/* Check-out Date */}
        <div className={`search-field date-field ${focusedField === 'departure' ? 'focused' : ''}`}>
          <label className="field-label">Check out</label>
          <div className="input-container">
            <FaCalendarAlt className="field-icon" />
            <input
              type="date"
              name="departure"
              value={search.departure}
              min={search.arrival || today}
              onChange={handleChange}
              onFocus={() => setFocusedField('departure')}
              onBlur={() => setFocusedField(null)}
              required
            />
          </div>
        </div>

        {/* Guests Selector */}
        <div className={`search-field guests-field ${focusedField === 'guests' ? 'focused' : ''}`}>
          <label className="field-label">Who</label>
          <div className="input-container">
            <FaUser className="field-icon" />
            <div 
              className="guests-display"
              onClick={() => {
                setShowGuestDropdown(!showGuestDropdown);
                setFocusedField('guests');
              }}
            >
              {getGuestText()}
            </div>
          </div>

          {/* Guest Dropdown */}
          {showGuestDropdown && (
            <div className="guests-dropdown">
              <div className="guest-type">
                <div className="guest-info">
                  <span className="guest-title">Adults</span>
                  <span className="guest-subtitle">Ages 13 or above</span>
                </div>
                <div className="guest-controls">
                  <button 
                    type="button"
                    className="guest-btn"
                    onClick={() => updateGuests('adults', 'decrement')}
                    disabled={guestDetails.adults <= 1}
                  >
                    −
                  </button>
                  <span className="guest-count">{guestDetails.adults}</span>
                  <button 
                    type="button"
                    className="guest-btn"
                    onClick={() => updateGuests('adults', 'increment')}
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="guest-type">
                <div className="guest-info">
                  <span className="guest-title">Children</span>
                  <span className="guest-subtitle">Ages 2-12</span>
                </div>
                <div className="guest-controls">
                  <button 
                    type="button"
                    className="guest-btn"
                    onClick={() => updateGuests('children', 'decrement')}
                    disabled={guestDetails.children <= 0}
                  >
                    −
                  </button>
                  <span className="guest-count">{guestDetails.children}</span>
                  <button 
                    type="button"
                    className="guest-btn"
                    onClick={() => updateGuests('children', 'increment')}
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="guest-type">
                <div className="guest-info">
                  <span className="guest-title">Infants</span>
                  <span className="guest-subtitle">Under 2</span>
                </div>
                <div className="guest-controls">
                  <button 
                    type="button"
                    className="guest-btn"
                    onClick={() => updateGuests('infants', 'decrement')}
                    disabled={guestDetails.infants <= 0}
                  >
                    −
                  </button>
                  <span className="guest-count">{guestDetails.infants}</span>
                  <button 
                    type="button"
                    className="guest-btn"
                    onClick={() => updateGuests('infants', 'increment')}
                  >
                    +
                  </button>
                </div>
              </div>

              <button 
                type="button"
                className="close-dropdown"
                onClick={() => {
                  setShowGuestDropdown(false);
                  setFocusedField(null);
                }}
              >
                Done
              </button>
            </div>
          )}
        </div>

        {/* Search Button */}
        <button type="submit" className="search-submit-btn">
          <FaSearch />
          <span className="btn-text">Search</span>
        </button>
      </form>

      {/* Backdrop for dropdowns */}
      {(showGuestDropdown || showSuggestions) && (
        <div 
          className="search-backdrop"
          onClick={() => {
            setShowGuestDropdown(false);
            setShowSuggestions(false);
            setFocusedField(null);
          }}
        />
      )}
    </div>
  );
};

export default MainSearch;