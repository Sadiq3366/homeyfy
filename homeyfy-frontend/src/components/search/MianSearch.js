import React, {useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";

const MainSearch = ()=>{
    const [activeTable, setActiveTab]= useState('Accommodations');
    const navigate = useNavigate();
    const location = useLocation();
    const queryParams  = new URLSearchParams(location.search);
    const [search, setSearch] = useState({
        location: queryParams.get('location') || '',
        arrival: queryParams.get('arrival') || '',
        departure: queryParams.get('departure') || '',
        guests: queryParams.get('guests') || '',
    });
    const changeActive=(tab)=>{
        setActiveTab(tab);
    }
    const handleSubmit=(event)=>{
        // event.preventDefault();
        const queryString = new URLSearchParams(search).toString();
        navigate('/search/?'+queryString);
    }
    const handleChange=(event)=>{
        const {name,value}=event.target;
        setSearch((prevSearch) => ({
            ...prevSearch,
            [name]: value,
        }));
    }

    return(
        <>
            <div className="container">
                <div className="row">
                    <div className="col-md-12 mb-3">
                        <div className="main-search text-center">
                            <div className="search-types">
                                <span className={activeTable ==='Accommodations'?'active':''} onClick={()=>changeActive('Accommodations')}>Accommodations</span>
                                <span className={activeTable ==='Experience'?'active':''} onClick={()=>changeActive('Experience')}>Experience</span>
                            </div>
                            <div className="search-area">
                                <div className="row">
                                    <div className='col-md-12'>
                                        <form onSubmit={handleSubmit}>
                                            <div className="d-flex justify-content-center search-setting">
                                                <div className="form-floating">
                                                    <input
                                                        type="text"
                                                        className="form-control "
                                                        id="location"
                                                        name="location"
                                                        placeholder="Search for a location"
                                                        value={search.location}
                                                        onChange={handleChange}
                                                    />
                                                    <label htmlFor="location">Location</label>
                                                </div>

                                                <div className="form-floating">
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        id="arrival"
                                                        name="arrival"
                                                        placeholder="When ?"
                                                        value={search.arrival}
                                                        onChange={handleChange}
                                                    />
                                                    <label htmlFor="arrival">Arrival</label>
                                                </div>

                                                <div className="form-floating">
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        id="departure"
                                                        name="departure"
                                                        placeholder="When ?"
                                                        value={search.departure}
                                                        onChange={handleChange}
                                                    />
                                                    <label htmlFor="user_name">Departure</label>
                                                </div>

                                                <div className="form-floating">
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        id="guests"
                                                        name="guests"
                                                        placeholder="Add guests"
                                                        value={search.guests}
                                                        onChange={handleChange}
                                                    />
                                                    <label htmlFor="email">Guests</label>
                                                </div>
                                                <div className="text-end">
                                                    <button type="submit"
                                                            className="btn btn-primary btn-full-width">Search
                                                    </button>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default MainSearch
