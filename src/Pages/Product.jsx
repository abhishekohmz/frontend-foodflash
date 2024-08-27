import { React, useContext, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { ShopContext } from '../Context/ShopContext';
import { Link, useParams } from 'react-router-dom'
import './CSS/Product.css'
import Alert from 'react-bootstrap/Alert';

import fssai_log0 from '../Components/Assets/fssai-logo.webp'
import { serverUrl } from '../service/serverUrl';


function Product() {

  const { category, addToCart, showAlert } = useContext(ShopContext);
  const { productId } = useParams()

  let product = null;
  for (let cat of category) {
    if (cat.category_items) {
      product = cat.category_items.find(item => item.id === Number(productId));
      if (product) break;
    }
  }

  let initialValue = 0;
  if (product) {
    initialValue = product.pack_gram > 100 ? product.pack_gram / 1000 : product.pack_gram;
  }

  const [inputValue, setInputValue] = useState(initialValue);

  const handleIncrease = () => {
    setInputValue(prevValue => prevValue + (initialValue === 0.5 ? 0.5 : 1));
  };

  const handleDecrease = () => {
    setInputValue(prevValue => Math.max(initialValue, prevValue - (initialValue === 0.5 ? 0.5 : 1)));
  };

  const calculateTotalAmount = (quantity, offerPrice) => {
    let consideredValue;
    if (initialValue === 0.5) {
      consideredValue = quantity * 2; // Since 0.5 counts as 1, 1.0 counts as 2, etc.
    } else {
      consideredValue = quantity; // Normal calculation
    }
    return consideredValue * offerPrice;
  };

  const totalAmount = product ? calculateTotalAmount(inputValue, product.offer_price) : 0;

  const formatPackGram = (value) => {
    if (value === 1) {
      return 'pack';
    } else if (value === 500) {
      return '500g';
    } else {
      return `${value}g`;
    }
  };


  return (

    <div className='product'>
      <Container>
        
        {product ? (
          <div>
            {showAlert && (
                      <Alert className='alert'>
                        <h5><span>{product.product_name}</span> has been added to your cart</h5>
                        <div className='alert_btn'>
                       <Link to={`/`}> <button>Continue Shopping</button></Link>

                        </div>
                      </Alert>
                    )}
            <Row>
            <Col lg={7} sm={6} className='product-display'>
                <h1>{product.product_name}</h1>
                <div className="product-price">
                  <p className='product-oldprice'>₹{product.old_price}</p>
                  <div className='d-flex align-items-center'>
                    <p className='product-offerprice'>₹{product.offer_price}</p>
                    <p>/{formatPackGram(product.pack_gram)}</p>
                  </div>
                </div>

                <div className='product-cart'>
                  <div className='d-flex align-items-center'>
                    <button onClick={handleDecrease} className='buttonStyle'>-</button>
                    <input type="text" value={inputValue} readOnly className='inputStyle' />
                    <button onClick={handleIncrease} className='buttonStyle'>+</button>
                    <span style={{ marginLeft: '8px' }}>pack</span>
                  </div>
                  <div>
                    <button onClick={() => { addToCart(product.id) }} className='cart-btn'>Add to Cart</button>
                  </div>
                </div>
                <p>total amount: ₹ {totalAmount.toFixed(2)}</p>

                <p className='product_description'>{product.description}</p>

                <div className="storage-instruction">
                  <h5>Storage Instructions:</h5>
                  <p>Store under refrigeration at 4°C or below, in hygienic conditions</p>
                </div>

                <div className="marketed">
                  <h5>Marketed By:</h5>
                  <p>Food Flash Private Limited </p>
                  <img src={fssai_log0} alt="" />
                  <p>FSSAI Lic. No. xxxxxxxxxxxx</p>
                </div>
              </Col>
              <Col lg={5} sm={6} className='product-display'>
                <img src={`${serverUrl}/images/` + product.image} alt={product.product_name} />
              </Col>
              
            </Row>

          </div>
        ) : (
          <p>Product not found.</p>
        )}
      </Container>
    </div>
  )
}

export default Product