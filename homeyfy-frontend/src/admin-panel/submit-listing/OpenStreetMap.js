import React, { useState } from 'react';
import Location from './Location';

const OpenStreetMap = ({fieldData,onChange}) => {
    const [query, setQuery] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [position, setPosition] = useState([37.7749, -122.4194]); // Default center (San Francisco)

    return (
        <div id="prices" className="dashboard-content-block-wrap">
            <h2>Location</h2>
            <div className="dashboard-content-block">
                <div className="col-md-12 col-sm-12">
                    <Location
                        query={query}
                        setQuery={setQuery}
                        suggestions={suggestions}
                        setSuggestions={setSuggestions}
                        position={position}
                        setPosition={setPosition}
                        formData={fieldData}
                        changeLocation={onChange}
                    />
                </div>
            </div>
        </div>
    );
};

export default OpenStreetMap;
