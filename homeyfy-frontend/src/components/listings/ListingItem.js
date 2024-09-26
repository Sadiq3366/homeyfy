import React, {useEffect, useState} from "react";
import http from "../../http";
import Slider from "react-slick";
import {Link, useLocation, useNavigate} from "react-router-dom";
import Spinner from "../Spinner";
import InfiniteScroll from "react-infinite-scroll-component";
import data from "bootstrap/js/src/dom/data";
import {useAuth} from "../../context/AuthContext";

const ListingItem =(props)=>{
    const location = useLocation();
    const queryParams  = new URLSearchParams(location.search);

    const address = queryParams.get('location') || '';
    const arrival = queryParams.get('arrival') || '';
    const departure = queryParams.get('departure') || '';
    const guests = queryParams.get('guests') || '';

    const [listings, setListings] = useState([]);
    const [page, setPage] = useState(1);
    const [totalresult, setTotalresult] = useState(0);
    const [AddFavorite,setAddFavorite]= useState('');

    const {loginUserType, loginUserId, functionAction}= useAuth();
    const navigate = useNavigate();

    const pageSize= 3;

    useEffect( () => {
        fetchListings();
    }, []);
    const fetchListings = async ()=>{

        try{
            props.progress(10);
            let url = '/auth/listing/search-listing?page='+page+'&pagesize='+pageSize+'&guests='+guests+'&address='+address+'&arrival='+arrival+'&departure='+departure;
            props.progress(30);
            let listings_record= await http.get(url);
            props.progress(50);
            if(listings_record.data.listings.length > 0){
                setTotalresult(listings_record.data.pagination.total);
                setListings(listings_record.data.listings);
            } else{
                setListings('');
            }
            props.progress(100);

        } catch (error){
            console.log(error);
        }
    }

    const fetchmoredata = async ()=>{
        try{
            props.progress(10);
            let url = `/auth/listing/search-listing?page=${page+1}&pagesize=${pageSize}&guests=${guests}&address=${address}&arrival=${arrival}&departure=${departure}`;
            setPage(page + 1);
            props.progress(30);
            let listings_record= await http.get(url);
            props.progress(50);
            if(listings_record.data.listings.length > 0){
                setTotalresult(listings_record.data.pagination.total);
                setListings(listings.concat(listings_record.data.listings) );
            } else{
                setListings('');
            }

            props.progress(100);

        } catch (error){
            console.log(error);
        }
    }

    const checkFavorite = async (userId)=>{
        try {
            const token = localStorage.getItem('authToken');
            const allFavorite = await http.get('/getFavorite?user_id='+userId,{
                headers: {
                  Authorization: `Bearer ${token}`,
                },
            });
            if(allFavorite){
                allFavorite.data.map((listingId,index)=>(
                    setAddFavorite(prevFavorite=>({
                        ...prevFavorite,
                        [listingId.listing_id]: true
                    }))
                ));

            }
        }catch (error){
            console.log(error);
        }
    }

    useEffect(() => {
        if (loginUserId) {
            checkFavorite(loginUserId);
        }
    }, [loginUserId]);


    const favoriteHandle= async (id)=>{
        if(loginUserType && loginUserId){
            try {
              const token = localStorage.getItem('authToken');
              const favorite = await http.post('/favorite?user_id='+loginUserId+'&listing_id='+id,null,{
                  headers: {
                      Authorization: `Bearer ${token}`,
                  },
              });
              if(favorite)
              {
                 setAddFavorite(prevFavorites =>({
                     ...prevFavorites,
                     [id]: favorite.data.Added ? true : false,
                 }));
              }
            }catch (error){
                console.log(error);
            }

        } else{
            navigate('/login');
        }
    }

    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: false,
        autoplaySpeed: 3000,
        arrows: true,
        zoomChange:1000,
    }

    return(
        <>
        <div className="container">
            <div className="row">
                <div className="list-items">
                    <div>
                        <div className="listing_heading">
                            Search Results
                        </div>
                        <InfiniteScroll
                            next={fetchmoredata}
                            hasMore={listings.length!== totalresult}
                            dataLength={listings.length}
                            loader={<Spinner />}
                        >
                        <div className="listing_item_content" id="listing_item">
                            {listings ? (
                             listings.map((listing, index) => (

                                <div className="card" key={index}>
                                    <div className="item-header">
                                        <span className="label-featured label">Featured</span>
                                        <span className="listing_favriout"><i onClick={() => favoriteHandle(listing.ID)} className={`fa ${AddFavorite[listing.ID] ? 'fa-heart' : 'fa-heart-o'}`}  aria-hidden="true"></i></span>
                                        <ul className="item-price-wrap">
                                            <li className="item-price">${listing.base_price}/{listing.price_mode}</li>
                                        </ul>

                                        <Slider {...settings}>
                                            {JSON.parse(listing.image_path).map((image, imgIndex) => (
                                                <div key={imgIndex} className="slide">
                                                    <Link to="">
                                                        <img width="592" height="444"
                                                             src={`http://localhost:8000${image}`}
                                                             alt={`Slide ${imgIndex + 1}`}/></Link>

                                                </div>
                                            ))}

                                        </Slider>
                                    </div>
                                    <div className="item-body flex-grow-1">
                                        <h2 className="item-title"><Link to="">{listing.Title}</Link></h2>
                                        <address className="item-address">{listing.address}</address>
                                        <ul className="item-amenities item-amenities-with-icons">
                                            <li className="h-beds"><i
                                                className="fa fa-bed-pulse mr-1"></i><span
                                                className="item-amenities-text">Beds:</span> <span
                                                className="hz-figure">{listing.l_beds}</span></li>
                                            <li className="h-baths"><i
                                                className="fa fa-bath mr-1"></i><span
                                                className="item-amenities-text">Baths:</span> <span
                                                className="hz-figure">{listing.baths}</span></li>
                                            <li className="h-guest"><i className="fa fa-people-group mr-1"></i><span
                                                className="item-amenities-text">Guests:</span> <span
                                                className="hz-figure">{listing.guests}</span></li>
                                            <li className="h-area"><i
                                                className="fa fa-ruler-combined mr-1"></i><span
                                                className="hz-figure">{listing.listing_size}</span> <span
                                                className="hz-figure area_postfix">{listing.listing_size_unit
                                            }</span>
                                            </li>
                                            <li className="h-type"><span>{listing.listing_type}</span></li>
                                        </ul>
                                    </div>
                                </div>
                                ))
                            ): (
                                <div className="listing_not_found">
                                    Record Not Found
                                </div>
                            )}
                        </div>
                        </InfiniteScroll>
                    </div>
                </div>
            </div>
        </div>

        </>
    );
}
export default ListingItem
