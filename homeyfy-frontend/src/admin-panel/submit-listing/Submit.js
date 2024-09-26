import React, {useEffect, useState} from "react";
import SideBar from "../SideBar";
import {useAuth} from "../../context/AuthContext";
import EditNave from "./EditNave";
import Description from "./Description";
import Price from "./Price";
import Media from "./Media";
import {useLocation} from "react-router-dom";
import http from "../../http";

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
        priceWeek:'',
        priceMonthly:'',
        additional_guests_price:'',
        num_additional_guests:'',
    });
   const [formDataDesc,setFormDataDesc] = useState({
       description: "",
   });
    const [formDataSer,setFormDataSer] = useState(
        [{ id: 0, name: '', price: '', type: '' }]
    );
    const [isDataFetched, setIsDataFetched] = useState(false);
    const  singleListing =async (listing_id)=>{
        try {
           const token = localStorage.getItem("authToken");
           const listing =await http.get('listing/edit-listing/?listing_id='+listing_id,{
               headers: {
                   Authorization: `Bearer ${token}`,
               },
           });
           if(listing){
               const servicesFromDB = listing.data.listings.extra.map((service ,index) => ({
                   id: index,
                   name: JSON.parse(service.name)[0],
                   price: JSON.parse(service.price)[0],
                   type: JSON.parse(service.type)[0],
               }));

               setFormDataSer(servicesFromDB);
               setFormData(listing.data.listings);
               setFormDataDesc(listing.data.listings);
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
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleDescriptionChange = (value) => {
        setFormDataDesc({ ...formDataDesc, description: value });
    };

    const handleServiceChange = (index, event) => {
        const updatedServices = [...formDataSer];
        updatedServices[index][event.target.name.split('[')[2].replace(']', '')] = event.target.value;
        setFormDataSer(updatedServices);
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

    const removeService = (idToRemove) => {
        setFormDataSer(formDataSer.filter((service) => service.id !== idToRemove));
    };

    return(
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
                            <h1>Add Properties</h1>
                        </div>
                    </div>
                </div>
            </header>
            <section className="dashboard-content-wrap">
                <div className="dashboard-content-inner-wrap">
                    <div className="d-flex">
                        {listing_id && (<EditNave handleOnchange={handleChangeAction}/>)   }

                        <div className="dashboard-content-block-wrap order-1 flex-grow-1">
                            <div id="error-dash-prop-msg"></div>
                            <div className="dashboard-content-inner-wrap">
                                <form method="post" encType="multipart/form-data" >
                                    {Tabs === 'description' ? (
                                        <Description fieldData={formData} onChange={handleInputChange} decs={formDataDesc} handleDescriptionChange={handleDescriptionChange}  />
                                    ) : Tabs === 'price' ? (
                                        <Price fieldData={formData} onChange={handleInputChange} removeService={removeService} addService={addService} services={formDataSer} handleServiceChange={handleServiceChange} />
                                    ) : Tabs === 'media' ? (
                                        <Media fieldData={formData} onChange={handleInputChange} />
                                    ) : (
                                        <>Another</>
                                    )}
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
export default Submit
