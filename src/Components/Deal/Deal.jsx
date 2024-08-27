import React, { useContext } from 'react'
import { ShopContext } from '../../Context/ShopContext'
import Item from '../Item/Item';
import { serverUrl } from '../../service/serverUrl';
import './Deal.css'

import Slider from 'react-slick'

import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";



function DealKerala() {

  const { category } = useContext(ShopContext)


  const allItems = [];

  category.forEach(category => {
    category.category_items.forEach(item => {
      allItems.push(item);
    });
  });
  console.log(allItems);


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
    <div className='deal_kerala'>
      <h3>Food Flash Deals</h3>

      <div className="dealkerala_data">
        <div className="slick-slider">
          <Slider {...sliderSettings}>
            {
              allItems.map((item, i) => {
                return <Item key={i} id={item.id} description={item.description} productName={item.product_name} image={`${serverUrl}/images/` + item.image} offerPrice={item.offer_price} oldPrice={item.old_price} packGram={item.pack_gram} />
              })
            }
          </Slider>
        </div>

        <div className="dealkerala-grid">
          {
            allItems.map((item, i) => {
              return <Item key={i} id={item.id} description={item.description} productName={item.product_name} image={`${serverUrl}/images/` + item.image} offerPrice={item.offer_price} oldPrice={item.old_price} packGram={item.pack_gram} />
            })
          }
        </div>
      </div>

    </div>
  )
}

export default DealKerala