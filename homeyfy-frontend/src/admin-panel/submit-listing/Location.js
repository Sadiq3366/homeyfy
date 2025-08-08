import React, { useRef,useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
const ChangeMapCenter = ({ position }) => {
    const map = useMap();
    map.setView(position, map.getZoom());
    return null;
};

const Location = ({ query, setQuery, suggestions, setSuggestions, position, setPosition, formData, changeLocation }) => {
   
    useEffect(() => { 
        if (formData.map_address) {
            setQuery(formData.map_address);
        }
    }, [formData.map_address, setQuery]);

    useEffect(() => {
        if (formData.latitude && formData.longitude) {
            setPosition([parseFloat(formData.latitude), parseFloat(formData.longitude)]);
            setQuery(formData.map_address || "");
        }
    }, [formData.latitude, formData.longitude, formData.map_address, setPosition, setQuery]);


    const debounceRef = useRef();
    const handleSearch = (e) => {
        const input = e.target.value;
        setQuery(input);

        if (debounceRef.current) clearTimeout(debounceRef.current);

        debounceRef.current = setTimeout(async () => {
            if (input.length > 2) {
            try {
                const response = await fetch(
                `https://nominatim.openstreetmap.org/search?format=json&q=${input}`
                );
                const data = await response.json();
                setSuggestions(data);
            } catch (error) {
                console.error("Debounced fetch error:", error);
            }
            } else {
            setSuggestions([]);
            }
        }, 300); // 300ms debounce
    };


    const handleAddressSelect = async (location) => {
        const lat = parseFloat(location.lat);
        const lon = parseFloat(location.lon);
        setPosition([lat, lon]);
        setQuery(location.display_name);
        setSuggestions([]);

        const reverseResponse = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`
        );
        const reverseData = await reverseResponse.json();
        const address = reverseData.address || {};

        const newLocation = {
            map_address:location.display_name || '',
            city: address.city || address.town || address.village || '',
            state: address.state || '',
            zipCode: address.postcode || '',
            area: address.neighbourhood || address.suburb || '',
            country: address.country || '',
            latitude: lat,
            longitude: lon
        };
        // Update formData in OpenStreetMap component
        changeLocation(newLocation);
    };

    return (
        <div className="row">
            <div className="col-sm-12">
                <label>Address</label>
                <input
                    type="text"
                    value={query}
                    name="map_address"
                    onChange={handleSearch}
                    placeholder="Search for an address"
                    className="form-control"
                />

                <ul style={{ listStyleType: 'none', padding: 0, maxHeight: '150px', overflowY: 'auto' }}>
                    {suggestions.map((suggestion) => (
                        <li
                            key={suggestion.place_id}
                            onClick={() => handleAddressSelect(suggestion)}
                            style={{ cursor: 'pointer', padding: '5px', borderBottom: '1px solid #ddd' }}
                        >
                            {suggestion.display_name}
                        </li>
                    ))}
                </ul>
            </div>
            <div className="col-sm-4">
                <div className="form-group">
                    <label>City: </label>
                    <input type="text" name="city" onChange={changeLocation} className="form-control" value={formData.city || ""} />
                </div>
            </div>
            <div className="col-sm-4">
                <div className="form-group">
                    <label>State: </label>
                    <input type="text" name="state" onChange={changeLocation} className="form-control" value={formData.state || ""} />
                </div>
            </div>
            <div className="col-sm-4">
                <div className="form-group">
                    <label>Zip Code: </label>
                    <input type="text" name="zipCode" onChange={changeLocation} className="form-control" value={formData.zipCode || ""} />
                </div>
            </div>
            <div className="col-sm-4">
                <div className="form-group">
                    <label>Area: </label>
                    <input type="text" name="area" onChange={changeLocation} className="form-control" value={formData.area || ""} />
                </div>
            </div>
            <div className="col-sm-4">
                <div className="form-group">
                    <label>Country: </label>
                    <input className="form-control" onChange={changeLocation} name="country" type="text" value={formData.country || ""} />
                </div>
            </div>

            {/* Hidden Fields for Lat and Long */}
            <input type="hidden" name="latitude" value={formData.latitude || ""} />
            <input type="hidden" name="longitude" value={formData.longitude || ""} />
            <MapContainer center={position} zoom={13} style={{ width: '100%', height: '400px' }}>
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
                />
                <Marker position={position}>
                    <Popup>{query || 'Selected Location'}</Popup>
                </Marker>
                <ChangeMapCenter position={position} />
            </MapContainer>
        </div>
    );
};

export default Location;
