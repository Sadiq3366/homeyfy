import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaSearch, FaMapMarkerAlt, FaCalendarAlt, FaUser } from "react-icons/fa";

const MainSearch = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const [search, setSearch] = useState({
    location: queryParams.get("location") || "",
    arrival: queryParams.get("arrival") || "",
    departure: queryParams.get("departure") || "",
    guests: queryParams.get("guests") || "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const queryString = new URLSearchParams(search).toString();
    navigate("/search/?" + queryString);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSearch((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <form className="main-search-form" onSubmit={handleSubmit}>
      <div className="search-input">
        <FaMapMarkerAlt className="icon" />
        <input
          type="text"
          name="location"
          placeholder="Where are you going?"
          value={search.location}
          onChange={handleChange}
        />
      </div>

      <div className="search-input">
        <FaCalendarAlt className="icon" />
        <input
          type="date"
          name="arrival"
          value={search.arrival}
          onChange={handleChange}
        />
      </div>

      <div className="search-input">
        <FaCalendarAlt className="icon" />
        <input
          type="date"
          name="departure"
          value={search.departure}
          onChange={handleChange}
        />
      </div>

      <div className="search-input">
        <FaUser className="icon" />
        <input
          type="number"
          name="guests"
          placeholder="Guests"
          min="1"
          value={search.guests}
          onChange={handleChange}
        />
      </div>

      <button type="submit" className="search-btn">
        <FaSearch /> Search
      </button>
    </form>
  );
};

export default MainSearch;
