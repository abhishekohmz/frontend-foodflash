import React from 'react'
import { useContext } from 'react'
import { ShopContext } from '../../Context/ShopContext'
import Item from '../Item/Item'
import { serverUrl } from '../../service/serverUrl'
import './FlashSale.css'
import Slider from 'react-slick'

import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";





function FlashSale() {

  const { flashsale } = useContext(ShopContext)

  // console.log(flashsale);

  const sliderSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 4,
          slidesToScroll:1,
          infinite: true,
          dots: false
        }
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 2,
          slidesToScroll:1,
          infinite: true,
          dots: false
        }
      }
    ]
  };


  return (
    <div>
      <div className='flashsale'>
        {flashsale.length > 0 && (
          <h3>Food Flash sale</h3>
        )}

        <div className="flashsale-data">

        <div className="slick-slider">
        <Slider {...sliderSettings}>

          {flashsale.map((item) => (
            <Item
              key={item.id}
              id={item.id}
              description={item.description}
              productName={item.product_name}
              image={`${serverUrl}/images/${item.image}`}
              offerPrice={item.offer_price}
              oldPrice={item.old_price}
              packGram={item.pack_gram}
            />
          ))}
          </Slider>
          </div>

          <div className="flashsale-grid">
          {flashsale.map((item) => (
            <Item
              key={item.id}
              id={item.id}
              description={item.description}
              productName={item.product_name}
              image={`${serverUrl}/images/${item.image}`}
              offerPrice={item.offer_price}
              oldPrice={item.old_price}
              packGram={item.pack_gram}
            />
          ))}
          </div>
        </div>
      </div>    </div>
  )
}

export default FlashSale