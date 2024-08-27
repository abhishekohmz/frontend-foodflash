import React, { useContext, useEffect, useState } from 'react';
import './CSS/Checkout.css';
import { Col, Container, Row } from 'react-bootstrap';
import { ShopContext } from '../Context/ShopContext';
import { serverUrl } from '../service/serverUrl';

function Checkout() {
  const [activeTab, setActiveTab] = useState(0);
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    address: "",
    telephone: "",
    landmark: "",
    postal_code: "",
  });
  const [paymentMethod, setPaymentMethod] = useState('');

  const { category, cartItems, userData } = useContext(ShopContext);

  useEffect(() => {
    if (userData && userData.user) {
      setFormData({
        first_name: userData.user.first_name || "",
        last_name: userData.user.last_name || "",
        address: userData.user.address || "",
        telephone: userData.user.telephone || "",
        landmark: userData.user.landmark || "",
        postal_code: userData.user.postal_code || "",
      });
    }
  }, [userData]);

  const allItems = [];
  category.forEach(cat => {
    cat.category_items.forEach(item => {
      allItems.push(item);
    });
  });

  // Calculate item subtotals and total
  const itemSubtotals = allItems.map(item => cartItems[item.id] > 0 ? cartItems[item.id] * item.offer_price : 0);
console.log(itemSubtotals);


  const totalItemSubtotal = itemSubtotals.reduce((acc, curr) => acc + curr, 0);

  const shippingCost = 0.00;


  // Calculate grand total
  const grandTotal = totalItemSubtotal + shippingCost;

  const hasItemsInCart = allItems.some(item => cartItems[item.id] > 0);


  const handleTab1 = async (e) => {
    e.preventDefault(); // Prevent default form submission

    let responseData;
    await fetch(`${serverUrl}/updateuser`, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'auth-token': `${sessionStorage.getItem('auth-token')}`
      },
      body: JSON.stringify(formData)
    })
      .then((resp) => resp.json())
      .then((data) => responseData = data);

    if (responseData.message) {
      setActiveTab(1);
    }
  };

  const handleClick2 = async (e) => {
    e.stopPropagation();
    setActiveTab(2);
  };

  const handleInput = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };



  const handlePaymentMethodChange = (e) => {
    setPaymentMethod(e.target.value);
  };

  const handlePlaceOrder = async () => {
    try {
      const response = await fetch(`${serverUrl}/createorder`, {
          method: 'POST',
          headers: {
            Accept:'application/json',
              'Content-Type': 'application/json',
              'auth-token':`${sessionStorage.getItem('auth-token')}`
          },
          body: JSON.stringify({
              total_amount: grandTotal,
              payment_method: paymentMethod,
          }),
      });

      if (!response.ok) {
          throw new Error('Network response was not ok');
      }
      else{
        window.location.replace('/')
      }

      const result = await response.json();
      console.log(result.message);
  } catch (error) {
      console.error('Error placing order:', error);
  }
  }

  return (
    <div className='checkout'>
      <Container>
        <h1>Checkout</h1>
        <div className="tabs">
          <form onSubmit={handleTab1}>
            <div className="tab">
              <div className='heading_h5'>
                <h5>1. <span>Shipping / Billing Information</span></h5>
              </div>
              {activeTab === 0 && (
                <div className="tab_content">
                  <Row>
                    <Col lg={4}>
                      <div className='first_name'>
                        <label htmlFor="first_name">First Name *</label>
                        <input
                          required
                          onChange={handleInput}
                          value={formData.first_name}
                          type="text"
                          id='first_name'
                          name='first_name'
                        />
                      </div>
                      <div className="telephone">
                        <label htmlFor="telephone">Telephone *</label>
                        <input
                          required
                          type="tel"
                          id='telephone'
                          maxLength="10"
                          name='telephone'
                          onChange={handleInput}
                          value={formData.telephone}
                        />
                      </div>
                    </Col>
                    <Col lg={4}>
                      <div className='last_name'>
                        <label htmlFor="last_name">Last Name *</label>
                        <input
                          required
                          type="text"
                          onChange={handleInput}
                          value={formData.last_name}
                          id='last_name'
                          name='last_name'
                        />
                      </div>

                      <div className='postal-code'>
                        <label htmlFor="postal_code">Postal Code *</label>
                        <input
                          required
                          type="tel"
                          onChange={handleInput}
                          value={formData.postal_code}
                          id='postal_code'
                          name='postal_code'
                          maxLength={6}
                        />
                      </div>
                    </Col>
                  </Row>
                  <Row>
                    <Col lg={8}>
                      <div className='address'>
                        <div className='address-data'>
                          <label htmlFor="address"> Address *</label>
                          <input
                            required
                            type="text"
                            onChange={handleInput}
                            value={formData.address}
                            id='address'
                            name='address'
                          />
                        </div>
                      </div>
                    </Col>
                    <Col lg={4}>
                      <div className='land-mark'>
                        <label htmlFor="landmark">Land Mark</label>
                        <input
                          type="text"
                          onChange={handleInput}
                          value={formData.landmark}
                          id='landmark'
                          name='landmark'
                        />
                      </div>
                    </Col>
                  </Row>
                  
                  <div className="tab_btn">
                    <button type="submit">Continue</button>
                  </div>
                </div>
              )}
            </div>
          </form>

          <div className="tab">
            <div className='heading_h5'>
              <h5>2. <span>Delivery Info</span></h5>
            </div>
            {activeTab === 1 && (
              <div className="tab_content">
                <Row>
                  <Col lg={5}>
                    
                    <div className="delivery_data">
                      <p>{userData.user.first_name} {userData.user.last_name}</p>
                      <p>{userData.user.address}</p>
                      {/* <p>Address</p> */}
                      <p>{userData.user.postal_code}</p>
                      <p>India</p>
                      <p>{userData.user.telephone}</p>
                      <p>{userData.user.landmark}</p>
                    </div>
                  </Col>
                </Row>
                <div className="tab_btn">
                  <button onClick={handleClick2}>Continue</button>
                </div>
              </div>
            )}
          </div>

          <div className="tab">
            <div className='heading_h5'>
              <h5>3. <span>Order Review</span></h5>
            </div>
            {activeTab === 2 && (
              <div className="tab_content3">
                <div className="product_details">
                  <h6 className='product_title'>PRODUCT NAME</h6>
                  <h6>PRICE</h6>
                  <h6>QTY</h6>
                  <h6>SUBTOTAL</h6>
                </div>
                {hasItemsInCart ? (
                  allItems.map((item) => {
                    if (cartItems[item.id] > 0) {
                      const subtotal = cartItems[item.id] * item.offer_price;
                      return (
                        <div key={item.id} className="product_details_data">
                          <h6 className='product_title'>{item.product_name} </h6>
                          <h6><span>{item.old_price}</span> {item.offer_price}</h6>
                          <h6>{cartItems[item.id]}</h6>
                          <h6 className='sub-total'>{subtotal}</h6>
                        </div>
                      );
                    }
                    return null;
                  })
                ) : <></>}
                <div className="sub_total">
                  <h6>ITEM-SUBTOTAL</h6>
                  <h6>{totalItemSubtotal}</h6>
                </div>
                <div className="shipping">
                  <h6>SHIPPING</h6>
                  <h6>{shippingCost.toFixed(2)}</h6>
                </div>
                
                <div className="grand_total">
                  <h6>GRAND TOTAL</h6>
                  <h6>{grandTotal.toFixed(2)}</h6>
                </div>
                <div className="amount_to_pay">
                  <h6>AMOUNT TO PAY</h6>
                  <h6>{grandTotal.toFixed(2)}</h6>
                </div>
                <div className="payment_method">
                  <h6>SELECT A PAYMENT METHOD:</h6>
                  <div className='pay_online'>
                    <input
                      type="radio"
                      id='pay_online'
                      name="payment_method"
                      value="pay_online"
                      checked={paymentMethod === "pay_online"}
                      onChange={handlePaymentMethodChange}
                    />
                    <label htmlFor="pay_online">PAY ONLINE</label>
                  </div>
                  <div className='cod'>
                    <input
                      type="radio"
                      id='cod'
                      name="payment_method"
                      value="cod"
                      checked={paymentMethod === "cod"}
                      onChange={handlePaymentMethodChange}
                    />
                    <label htmlFor="cod">CASH ON DELIVERY</label>
                  </div>
                </div>

                <Row>
                  <Col lg={3}>
                    <div className="_code">
                      <div className="_fields">
                        <input type="text" placeholder='REDEEM COUPON CODE' />
                        <button>Apply</button>
                      </div>
                      <p>* Only one offer/coupon can be applied</p>
                      <p>* Use coupon HAPPY for Free Shipping</p>
                    </div>
                  </Col>
                  
                  <Col lg={9}>
                    <button className='place_order' onClick={handlePlaceOrder}>PLACE ORDER</button>
                  </Col>
                </Row>
              </div>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
}

export default Checkout;
