import React, {useState} from "react";
import Slider from "react-slick";
import MainSearch from "../search/MianSearch";

const images = [
    {
        image: 'https://img.lovepik.com/background/20211021/large/lovepik-real-estate-poster-background-image_401418395.jpg',
        text: 'Buy and Sell Amazing Places',
        bottomText:'EQUESTRIAL/HISTORIC/WATERFRRONT',
    },
    {
        image: 'https://images.squarespace-cdn.com/content/v1/57c65003197aea3e7a3d48b9/1578978004907-EP0EFWP5SOQPI34XRVVR/054--FULL-2.jpg',
        text: 'Explore Unique Life Style.',
        bottomText:'EQUESTRIAL/HISTORIC/WATERFRRONT',
    },
    {
        image: 'https://images.squarespace-cdn.com/content/v1/5704a9c9a3360c62ede27d0e/1581406433521-IAS67OX02A4RC12VIBO7/photoZ202.JPG',
        text: 'Discover Luxury Homes.',
        bottomText:'EQUESTRIAL/HISTORIC/WATERFRRONT',
    },
    {
        image: 'https://images.squarespace-cdn.com/content/v1/661638bd987ee1536de5725d/1718820629433-B1XERCWPWR4N5MTMYIUW/Real+Estate-72.jpg',
        text: 'Buy and Sell Amazing Places',
        bottomText:'EQUESTRIAL/HISTORIC/WATERFRRONT',
    },
    {
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTRcTwPPt-eQgmp4Ps4ReSNphb9xZ7hon7fDQ&s',
        text: 'Discover Luxury Homes.',
        bottomText:'EQUESTRIAL/HISTORIC/WATERFRRONT',    },
    {
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ3yCyRdKmwB0O-1n8ncQuU4bXUK6NSs5Inhg&s',
        text: 'Explore Unique Life Style.',
        bottomText:'EQUESTRIAL/HISTORIC/WATERFRRONT',    },
    {
        image: 'https://visengine.com/wp-content/uploads/2021/02/FullSizeRender-5-min1-1024x683.jpg',
        text: 'Buy and Sell Amazing Places',
        bottomText:'EQUESTRIAL/HISTORIC/WATERFRRONT',    },
    {
        image: 'https://preview.redd.it/youre-a-successful-real-estate-agent-and-a-father-of-3-what-v0-jmecmjkuvrfc1.jpg?width=640&crop=smart&auto=webp&s=4f80fa1125ecf16238db1101b6ff45ce33f07b2b',
        text: 'Discover Luxury Homes.',
        bottomText:'EQUESTRIAL/HISTORIC/WATERFRRONT',    },
    {
        image: 'https://media.istockphoto.com/id/1272163106/photo/large-house-with-steep-roof-and-side-entry-three-car-garage.jpg?s=612x612&w=0&k=20&c=zCHxziqhujITjR0IMoCPFxFDPypIs6fMgpKdYHKWzaA=',
        text: 'Buy and Sell Amazing Places',
        bottomText:'EQUESTRIAL/HISTORIC/WATERFRRONT',    },
    {
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQAEURuEr9OMi8v0A8WYzDvTp8U-bJOIFUqOw&s',
        text: 'Explore Unique Life Style.',
        bottomText:'EQUESTRIAL/HISTORIC/WATERFRRONT',    },
    {
        image: 'https://images.squarespace-cdn.com/content/v1/54286998e4b06d59c3ae0447/1648845004020-HX4KGGRVJM22Y9K6NIEO/Truckee+Reno+Tahoe+Real+Estate+Photography-2.jpg',
        text: 'Discover Luxury Homes.',
        bottomText:'EQUESTRIAL/HISTORIC/WATERFRRONT',    },

];



const Home = ()=> {
    const [currentSlide, setCurrentSlide] = useState(0);
    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        arrows: true,
        zoomChange:1000,
        afterChange: (current) => setCurrentSlide(current), // Update current slide index
    }
    return (
        <>
            <div className="slider-container">
                <Slider {...settings}>
                    {images.map((image, index) => (
                        <div key={index} className="slide">
                            <img src={image.image} alt={`Slide ${index}`}/>
                        </div>
                    ))}
                </Slider>
                <div className="text-center w-100 slider_subject">
                    <strong>{images[currentSlide].text}</strong>
                    <span>{images[currentSlide].bottomText}</span>
                </div>
            </div>
            <MainSearch />
        </>
    );

}

export default Home
