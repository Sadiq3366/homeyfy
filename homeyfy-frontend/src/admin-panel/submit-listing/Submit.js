import React, {useEffect, useState} from "react";
import SideBar from "../SideBar";
import {useAuth} from "../../context/AuthContext";
import EditNave from "./EditNave";
import Description from "./Description";
import Price from "./Price";
import Media from "./Media";
import {useLocation , useNavigate } from "react-router-dom";
import http from "../../http";
import Features from "./Features";
import OpenStreetMap from "./OpenStreetMap";
import Virtual from "./Virtual";
import Bedrooms from "./Bedrooms";
import Contact from "./Contact"; 
import Private from "./PrivateNote";
import Setting from "./Setting";

const Submit = (props)=>{
    const {loginUserType,loginUserId,checkAuthStatus}= useAuth();
    const [Tabs, setTabs] = useState('description');
    const urlParameter =useLocation();
    const queryParams  = new URLSearchParams(urlParameter.search);
    const listing_id =queryParams.get('listing-id');
    const [formData, setFormData] = useState({
        listing_title:'',
        listing_bedrooms:'',
        guests:'',
        l_beds:'',
        baths:'',
        listing_rooms:'',
        listing_size:'',
        listing_size_unit:'',
        affiliate_booking_link:'',
        base_price:'',
        price_postfix:'',
        weekends_price:'',
        weekends_days:'',
        priceWeek:'',
        priceMonthly:'',
        additional_guests_price:'',
        num_additional_guests:'',
        is_instance:'',
        allow_additional_guests:'',
        cleaning_fee:'',
        security_deposit:'',
        cleaning_fee_type:'',
        city_fee_type:'',
        city_fee:'',
        contact_info:'',
        amenities: [],
        facilities:[],
        images:[],
        featured_image: '',
        is_feature:'',
        view_login:'',
        map_address: '',
        city: '',
        state: '',
        zipCode: '',
        area: '',
        country: '',
        latitude: '',
        longitude: '',
        virtual_tour:'',
        private_note:''
    });

   const [formDataDesc,setFormDataDesc] = useState({
       description: "",
   });
    const [formDataSer,setFormDataSer] = useState(
        [{ id: 0, name: '', price: '', type: '' }]
    );
    const [formDataBed,setFormDataBed] = useState(
        [{ id: 0, acc_bedroom_name: '', acc_guests: '', acc_no_of_beds: '',acc_bedroom_type:'' }]
    );

    const [message, setMessage] = useState('');
    const [messageType, setMessageType] = useState('');

    const payload = {
        ...formData,
        description: formDataDesc.description,
        extra: formDataSer,
        homeyfy_accomodation: formDataBed,
    };

    const navigate = useNavigate();

    const [isDataFetched, setIsDataFetched] = useState(false);
    const  singleListing =async (listing_id)=>{
        try {
           const token = localStorage.getItem("authToken");
           const listing =await http.get('listing/edit-listing/?listing_id='+listing_id,{
               headers: {
                   Authorization: `Bearer ${token}`,
               },
           });
          
           if (listing) {
                const raw = listing.data.listings;
                // Extract and parse amenities/facilities
                const amenities = raw.feature?.[0]?.amenities ? JSON.parse(raw.feature[0].amenities) : [];
                const facilities = raw.feature?.[0]?.facilities ? JSON.parse(raw.feature[0].facilities) : [];

                // Flatten price[0] + features into listing
                const listingData = {
                    ...raw,
                    ...(raw.price?.[0] || {}),
                    amenities,
                    facilities,
                };

                const servicesFromDB = raw.extra.flatMap((service) => {
                    const names = JSON.parse(service.name);
                    const prices = JSON.parse(service.price);
                    const types = JSON.parse(service.type);

                    return names.map((_, index) => ({
                        id: index,
                        name: names[index],
                        price: prices[index],
                        type: types[index]
                    }));
                });
 
                const bedFromDB = raw.beds.flatMap((bed) => {
                    const acc_bedroom_name = JSON.parse(bed.name);
                    const acc_bedroom_type = JSON.parse(bed.type);
                    const acc_guests = JSON.parse(bed.guests);
                    const acc_no_of_beds = JSON.parse(bed.beds);

                    return acc_bedroom_name.map((_, index) => ({
                        id: index,
                        acc_bedroom_name: acc_bedroom_name[index],
                        acc_bedroom_type: acc_bedroom_type[index],
                        acc_guests: acc_guests[index],
                        acc_no_of_beds: acc_no_of_beds[index]
                    }));
                });
                setFormDataBed(bedFromDB);
                setFormDataSer(servicesFromDB);
                setFormData(listingData);
                setFormDataDesc(listingData);
                setIsDataFetched(true);
            }

        }catch (error){
            // console.log(error);
        }
    }
    useEffect(() => {
        if (!isDataFetched) {
            singleListing(listing_id);
        }
    }, [listing_id, isDataFetched]);

    const handleChangeAction =(tab)=>{
        setTabs(tab);
    }

    const handleInputChange = (e) => {
        // Check if e is an event or an object containing location data
        if (e.target) {
            // Extract the usual data from the event
            const { name, type, value, checked } = e.target;

            if (type === 'checkbox' && name === 'amenities[]') {
                setFormData((prevFormData) => {
                    const amenities = Array.isArray(prevFormData.amenities)
                        ? [...prevFormData.amenities]
                        : [];

                    if (checked) {
                        if (!amenities.includes(value)) {
                            amenities.push(value);
                        }
                    } else {
                        const index = amenities.indexOf(value);
                        if (index > -1) amenities.splice(index, 1);
                    }

                    return { ...prevFormData, amenities: amenities };
                });

            } else if (type === 'checkbox' && name === 'facilities[]') {
                setFormData((prevFormData) => {
                    const facilities = Array.isArray(prevFormData.facilities)
                        ? [...prevFormData.facilities]
                        : [];

                    if (checked) {
                        if (!facilities.includes(value)) {
                            facilities.push(value);
                        }
                    } else {
                        const index = facilities.indexOf(value);
                        if (index > -1) facilities.splice(index, 1);
                    }

                    return { ...prevFormData, facilities: facilities };
                });
 
            } else if ((type === 'checkbox' && name === 'contact_info') || name === 'is_feature' || name === 'view_login') {
                const newValue = type === 'checkbox' ?  value : (checked ? 1 : 0);
                setFormData((prevFormData) => ({
                    ...prevFormData,
                    [name]: newValue
                }));
            } else {
                const newValue = type === 'checkbox' ? (checked ? 1 : 0) : value;
                setFormData((prevFormData) => ({
                    ...prevFormData,
                    [name]: newValue
                }));
            }
        } else {
            setFormData((prevFormData) => ({
                ...prevFormData,
                ...e 
            }));
        }
    };

    const handleDescriptionChange = (value) => {
        setFormDataDesc({ ...formDataDesc, description: value });
    };

    const handleServiceChange = (index, event) => {
        const updatedServices = [...formDataSer];
        updatedServices[index][event.target.name.split('[')[2].replace(']', '')] = event.target.value;
        setFormDataSer(updatedServices);
    };

    const handlebedroomChange = (index, event) => {
        const updatedBedroom = [...formDataBed];
        updatedBedroom[index][event.target.name.split('[')[2].replace(']', '')] = event.target.value;
        setFormDataBed(updatedBedroom);
    };

    const addService = (serviceID) => {
        const newService = {
            id: serviceID , // unique identifier
            name: '', // default empty value for name
            price: '', // default empty value for price
            type: '' // default type
        };
        setFormDataSer([...formDataSer, newService]);
    };

    const addBedroom = (serviceID) => {
        const newBerooms = {
            id: serviceID , // unique identifier
            acc_bedroom_name: '', // default empty value for name
            acc_guests: '', // default empty value for price
            acc_no_of_beds: '', // default type
            acc_bedroom_type:''
        };

        setFormDataBed([...formDataBed, newBerooms]);
    };


    const removeService = (idToRemove) => {
        setFormDataSer(formDataSer.filter((service) => service.id !== idToRemove));
    };
    const removeBedroom = (idToRemove) => {
        setFormDataBed(formDataBed.filter((service) => service.id !== idToRemove));
    };

    const handleSubmit = async (listing_id)=>{
        try {

         if(listing_id){
            const token = localStorage.getItem("authToken");
            const update_listing = await http.post('listing/update-listing/?listing_id='+listing_id,
            payload,{
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            if(update_listing){
                setMessage(update_listing.data.Message);
                setMessageType('success');
            }
         } else {
            const token = localStorage.getItem("authToken");
            const add_listing = await http.post('listing/add-new/',
            payload,{
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            if(add_listing){
                setMessage(add_listing.data.Message);
                setMessageType('success');
                const newListingId = add_listing.data.listing_id;
                navigate(`/create-listings/?listing-id=${newListingId}`);
            }
         }   
        
        } catch (error) {
            console.log(error); // Will show 'Network Error' if CORS or URL issue
            if (error.response) {
                // Server responded with a status other than 2xx
                setMessage(error.response.data.message || 'Server error.');
            } else if (error.request) {
                // Request was made but no response received
                setMessage('No response from server.');
            } else {
                // Error setting up the request
                setMessage('Request error: ' + error.message);
            }
            setMessageType('error');
        }
    }

    useEffect(() => {
        if (message) {
        const timer = setTimeout(() => {
            setMessage('');
            setMessageType('');
        }, 10000); // 10 seconds

        return () => clearTimeout(timer); // cleanup on re-render
        }
    }, [message]);

    return(
        <div className="dashboard-submit-wrap">
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
                            <h1>{listing_id ? ('Edit Properties') : ('Add Properties')}</h1>
                        </div>
                    </div>
                </div>
            </header>

            <section className="dashboard-content-wrap">
                <div className="dashboard-content-inner-wrap">
                    <div className="d-flex">
                        <EditNave handleOnchange={handleChangeAction}/>

                        <div className="dashboard-content-block-wrap order-1 flex-grow-1">
                            <div
                                id="error-dash-prop-msg"
                                className={
                                message
                                    ? messageType === 'error'
                                    ? 'error-msg'
                                    : 'success-msg'
                                    : 'hidden-msg'
                                }
                            >
                                {message}
                            </div>
                            <div className="dashboard-content-inner-wrap">
                                <form method="post" encType="multipart/form-data" >
                                    {Tabs === 'description' ? (
                                        <Description fieldData={formData} onChange={handleInputChange} decs={formDataDesc} handleDescriptionChange={handleDescriptionChange}  />
                                    ) : Tabs === 'price' ? (
                                        <Price fieldData={formData} onChange={handleInputChange} removeService={removeService} addService={addService} services={formDataSer} handleServiceChange={handleServiceChange} />
                                    ) : Tabs === 'media' ? (
                                        <Media fieldData={formData} onChange={handleInputChange} />
                                    ) : Tabs === 'features' ? (
                                        <Features fieldData={formData} onChange={handleInputChange} />
                                    ) : Tabs === 'location' ? (
                                        <OpenStreetMap fieldData={formData} onChange={handleInputChange} />
                                    )  : Tabs === 'virtual' ? (
                                        <Virtual fieldData={formData} onChange={handleInputChange} />
                                    )  : Tabs === 'Bedrooms' ? (
                                        <Bedrooms fieldData={formData} onChange={handleInputChange} removeBedroom={removeBedroom} addBedroom={addBedroom} services={formDataBed} handlebedroomChange={handlebedroomChange} />
                                    ) : Tabs === 'contact' ? (
                                        <Contact fieldData={formData} onChange={handleInputChange}/>
                                    ) : Tabs === 'note' ? (
                                        <Private fieldData={formData} onChange={handleInputChange}/>
                                    ) : Tabs === 'setting' ? (
                                        <Setting fieldData={formData} onChange={handleInputChange}/>
                                    ) :(
                                        <>Another</>
                                    )}
                                    <div className="d-flex add-new-listing-bottom-nav-wrap justify-content-end">
                                        <button
                                            type="button"
                                            className="btn btn-success"
                                            onClick={() => handleSubmit(listing_id)}
                                        >
                                            <span className="btn-loader houzez-loader-js"></span>
                                            {listing_id ? 'Save Changes' : 'Submit'}
                                        </button>
                                    </div>

                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}
export default Submit
