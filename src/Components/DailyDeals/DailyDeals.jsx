import React from 'react'
import './DailyDeals.css'
import { useContext } from 'react'
import { ShopContext } from '../../Context/ShopContext'
import Item from '../Item/Item'
import { serverUrl } from '../../service/serverUrl'
import Slider from 'react-slick'

import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";


function DailyDeals() {
  const { showDailydeals } = useContext(ShopContext)

  // Settings for React Slick
  const sliderSettings = {
    dots: false,
    infinite: false,
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
      <div className='dailydeals'>
        {showDailydeals.length > 0 && (
          <h3>Daily Deal</h3>
        )}

        <div className="dailydeals-data">
          {/* Slider for screens <= 576px */}
          <div className="slick-slider">
            <Slider {...sliderSettings}>
              {showDailydeals.map((item) => (
                <div className="slick-slide-item" key={item.id}>
                  <Item 
                    id={item.id} 
                    description={item.description} 
                    productName={item.product_name} 
                    image={`${serverUrl}/images/${item.image}`} 
                    offerPrice={item.offer_price} 
                    oldPrice={item.old_price} 
                    packGram={item.pack_gram}
                  />
                </div>
              ))}
            </Slider>
          </div>
          
          {/* Grid for screens > 576px */}
          <div className="dailydeals-grid">
            {showDailydeals.map((item) => (
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
      </div>
    </div>
  )
}

export default DailyDeals
