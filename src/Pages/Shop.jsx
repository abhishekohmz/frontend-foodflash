import React from 'react'
import './CSS/Shop.css'



import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import slider1 from '../Components/Assets/slider1.png'
import slider2 from '../Components/Assets/slider2.png'
import slider7 from '../Components/Assets/slider7.png'
import slider4 from '../Components/Assets/slider4.png'
import slider5 from '../Components/Assets/slider5.png'
import slider6 from '../Components/Assets/slider6.png'

import { Container } from 'react-bootstrap';
import DailyDeals from '../Components/DailyDeals/DailyDeals';
import FlashSale from '../Components/FlasSale/FlashSale';
import Category from '../Components/Category/Category';
import DealKerala from '../Components/Deal/Deal';


function Shop() {


    // slick carousel
    var settings = {
        dots: true,
        fade: true,
        autoplay: true,
        infinite: true,
        arrows: false,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        waitForAnimate: false,
        responsive: [
            {
                breakpoint: 576,
                settings: {
                    dots: false,
                    speed: 600
                }
            }
        ]
    };

    return (
        <>

            <div className="shop-container">
            <Container>
                    <div className='slick-ads'>
                        <Slider {...settings}>
                            <div className='slider-carousel d-flex justify-content-center align-items-center'>
                                <img src={slider1} alt="" />
                            </div>
                            <div className='slider-carousel d-flex justify-content-center align-items-center'>
                                <img src={slider2} alt="" />
                            </div>
                            <div className='slider-carousel d-flex justify-content-center align-items-center'>
                                <img src={slider7} alt="" />
                            </div>
                            <div className='slider-carousel d-flex justify-content-center align-items-center'>
                                <img src={slider4} alt="" />
                            </div>
                            <div className='slider-carousel d-flex justify-content-center align-items-center'>
                                <img src={slider5} alt="" />
                            </div>
                            <div className='slider-carousel d-flex justify-content-center align-items-center'>
                                <img src={slider6} alt="" />
                            </div>
                            
                        </Slider>
                    </div>
                </Container>

                <Container>
                <div>
                    <Category />
                </div>
                </Container>

                <Container>
                <div>
                    <DailyDeals />
                </div>
                </Container>

                <div className='flash-sale'>
                    <Container>
                    <FlashSale />
                    </Container>
                </div>

                
                
                <Container>
                <div>
                    <DealKerala />
                </div>
                </Container>


            </div>

        </>
    )
}

export default Shop