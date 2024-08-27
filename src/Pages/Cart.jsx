import React, { useContext } from 'react'
import { ShopContext } from '../Context/ShopContext'
import { Container } from 'react-bootstrap';
import './CSS/Cart.css'
import { serverUrl } from '../service/serverUrl';
import { Link } from 'react-router-dom';



function Cart() {

  
  const { category, cartItems, removeCart,setCartItems,getDefaultCart } = useContext(ShopContext)

  const allItems = [];

  category.forEach(category => {
    category.category_items.forEach(item => {
      allItems.push(item);
    });
  });

    const itemSubtotals = allItems.map(item => cartItems[item.id] > 0 ? cartItems[item.id] * item.offer_price : 0);

    const totalItemSubtotal = itemSubtotals.reduce((acc, curr) => acc + curr, 0);
  

  const hasItemsInCart = allItems.some(item => cartItems[item.id] > 0);
console.log(hasItemsInCart);



const clearCart = async (event) => {
  try {
    const token = sessionStorage.getItem('auth-token'); 

    const response = await fetch(`${serverUrl}/clearcart`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': `${token}`
      }
    });

    if (!response.ok) {
      throw new Error('Failed to clear cart');
    }
    setCartItems(getDefaultCart());
    console.log('Cart cleared successfully');
  
  } catch (error) {
    console.error('Error clearing cart:', error);
  }
};





  return (
    <div className='cart'>
      <Container>
        <div>
          {
            hasItemsInCart ?
              <div>
                <h1>Shopping Cart</h1>


                <div className="cart-data-itemfield-main">
                  <h5 className='cart-product'>PRODUCT</h5>
                  <h5>UNIT PRICE</h5>
                  <h5>QTY</h5>
                  <h5>SUBTOTAL</h5>
                </div>
                {
                  hasItemsInCart ? (
                    allItems.map((item) => {
                      if (cartItems[item.id] > 0) {
                        const subtotal = cartItems[item.id] * item.offer_price;
                        return (
                          <div key={item.id} className="cart-data-itemfield">
                            <div className='data'>
                              <img src={`${serverUrl}/images/${item.image}`} alt="" />
                              <h5>{item.product_name} </h5>
                            </div>
                            <p>₹{item.offer_price}</p>
                            <p>{cartItems[item.id]}</p>
                            <p>₹{subtotal}</p>
                            <div className='cart-btn'>
                              <button onClick={() => removeCart(item.id)}><i className="fa-solid fa-trash"></i></button>
                            </div>
                          </div>
                        );
                      }
                      return null;
                    })
                  ) : <></>
                }
                <div className="cart_submition">
                  <div className="redeem_code">
                    <div className="redeem_fields">
                      <input type="text" placeholder='REDEEM COUPON CODE' />
                      <button>Apply</button>
                    </div>
                    <p>* Only one offer/coupon can be applied</p>
                    <p>* Use  coupon HAPPY for Free Shipping</p>
                  </div>

                  <div className="checkout">
                    <div className="cart_butttons">
                      <button onClick={clearCart}>Clear Cart</button>
                     <Link to={'/'}> <button>Continue Shopping</button></Link>
                    </div>

                    <div className="subtotal">
                      <h5>Item subtotal</h5>
                      <h5>₹{totalItemSubtotal}</h5>
                    </div>
                    <div className="grand_total">
                      <h5>Grand Total</h5>
                      <h5>₹{totalItemSubtotal}</h5>
                    </div>
                    <div className="amount_to_pay">
                      <h5>Amount to Pay</h5>
                      <h5>₹{totalItemSubtotal}</h5>
                    </div>
                    <div className="checkout_btn">

                      <Link to={'/checkout'}>
                      <button>Proceed to Checkout</button>
                      </Link>
                    </div>

                  </div>
                </div>
              </div>
              :
              <div>
                <h1 className='heading_2'>Shopping Cart is Empty</h1>
                <p>You have no items in your shopping cart. <br />
                  Click here to continue shopping.</p>
              </div>
          }
        </div>



      </Container>

    </div>
  )
}

export default Cart