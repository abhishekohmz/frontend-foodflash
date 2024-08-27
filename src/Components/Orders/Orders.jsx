import React, { useEffect, useState } from 'react';
import './Orders.css';
import { Link } from 'react-router-dom';
import { serverUrl } from '../../service/serverUrl';

function Orders() {
  const [userOrders, setUserOrders] = useState([]);
  const [productMap, setProductMap] = useState(new Map());

  // Fetch orders from the backend
  const fetchOrders = async () => {
    try {
      const response = await fetch(`${serverUrl}/userorder`, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'auth-token': sessionStorage.getItem('auth-token'),
        },
      });
      const data = await response.json();
      setUserOrders(data.orders || []);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  // Fetch products and build product map
  const fetchProducts = async () => {
    try {
      const response = await fetch(`${serverUrl}/allcategory`);
      const data = await response.json();

      const tempProductMap = new Map();
      data.forEach(cat => {
        cat.category_items.forEach(item => {
          tempProductMap.set(item.id, {
            product_name: item.product_name,
            image: item.image
          });
        });
      });

      setProductMap(tempProductMap);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  useEffect(() => {
    fetchOrders();
    fetchProducts();
  }, []);

  return (
    <div className='orders_data'>
      <h1>My Orders</h1>
      {userOrders.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Order date</th>
              <th>Product Image</th>
              <th>Product Name</th>
              <th>Quantity</th>
              <th>Total Amount</th>
              <th>Payment Method</th>
            </tr>
          </thead>
          <tbody>
            {userOrders.map((order, index) => (
              <React.Fragment key={index}>
                {order.order_items.map((item, itemIndex) => {
                  const product = productMap.get(item.product);
                  return (
                    <tr key={itemIndex}>
                      {
                        itemIndex === 0 && (
                          <>
                            <td rowSpan={order.order_items.length}>
                              {new Date(order.date).toLocaleDateString()}
                            </td>
                          </>
                        )
                      }

                      <td>
                        {product ? (
                          <img
                            src={`${serverUrl}/images/${product.image}`}
                            alt={product.product_name}
                            style={{ width: '50px', height: '50px' }}
                          />
                        ) : (
                          <span>No Image</span>
                        )}
                      </td>
                      <td>
                        {product ? product.product_name : 'Product Details Not Available'}
                      </td>
                      <td>{item.quantity}</td>
                      {itemIndex === 0 && (
                        <>
                          <td rowSpan={order.order_items.length}>
                            ₹{order.total_amount}
                          </td>
                          <td rowSpan={order.order_items.length}>
                            {order.payment_method}
                          </td>
                        </>
                      )}
                    </tr>
                  );
                })}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      ) : (
        <p>You have placed no orders</p>
      )}
      <Link to='/customer/account'>Back</Link>
    </div>
  );
}

export default Orders;
