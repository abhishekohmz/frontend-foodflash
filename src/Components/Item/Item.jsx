import React from 'react'
import './Item.css'
import { Link } from 'react-router-dom'


function Item(props) {

  const formatPackGram = (value) => {
    if (value === 1) {
      return 'pack';
    } else if (value === 500) {
      return '500g';
    } else {
      return `${value}g`; // Default case for other values
    }
  };
  return (
    <>
    <div className="item">
      <Link to={`/product/${props.id}`} onClick={window.scrollTo(0,0)} style={{ textDecoration: 'none' }}>
        <img onClick={window.scrollTo(0, 0)} src={props.image} alt="" />
        <div className='item-details'>
        <p>{props.productName}</p>
        <div className="item-prices">
          <div className="item-price-old">
            ₹{props.oldPrice}.00
          </div>
          <div className="item-price-new">
            ₹{props.offerPrice}.00 <span> /{formatPackGram(props.packGram)}</span>
          </div>
        </div>
        </div>
      </Link>
    </div>
    </>
  )
}

export default Item