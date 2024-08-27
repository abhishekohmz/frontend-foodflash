import { createContext, useEffect, useState } from "react";
import { serverUrl } from "../service/serverUrl"; 


export const ShopContext = createContext(null);

const getDefaultCart = () => {
    let cart = {};
    for (let index = 0; index < 3000; index++) {
        cart[index] = 0;
    }
    return cart;
};

const ShopContextProvider = (props) => {
    const [category, setCategory] = useState([]);
    const [showDailydeals, setShowDailydeals] = useState([]);
    const [userData, setUserData] = useState(null); 
    const [cartItems, setCartItems] = useState(getDefaultCart());
    const [showAlert, setShowAlert] = useState(false);

    const [flashsale,setFlashsale]=useState([])
    const [error, setError] = useState(null);
  



    const fetchCategory = async () => {
        try {
            const response = await fetch(`${serverUrl}/allcategory`);
            const data = await response.json();
            setCategory(data);
        } catch (error) {
            console.error("Error fetching categories:", error);
        }
    };

    const fetchDailyDeals = async () => {
        try {
            const response = await fetch(`${serverUrl}/daily-deals`);
            const data = await response.json();
            if (response.ok) {
                setShowDailydeals(data.dailyDeals || []);
            }
        } catch (error) {
            console.error("Error fetching daily deals:", error);
        }
    };

    const fetchFlashsale=async()=>{
        try{
            const response=await fetch(`${serverUrl}/getflashsale`,{
                method:'GET',
                headers:{
                    Accept:'application/json',
                    'Content-Type':'aplication/json'
                }
            })
    
            const data= await response.json()
    
            if(response.ok){
                setFlashsale(data.flashsale)
            }else {
                setError(data.message || 'Failed to fetch daily deals');
              }
        }catch (err) {
            setError('Error fetching daily deals');
          }
    }
    

    const getuser=async()=>{
        const token=sessionStorage.getItem('auth-token')

        if(token){
            await fetch(`${serverUrl}/getuser`,{
                method:'GET',
                headers:{
                    Accept:'application/json',
                    'Content-Type':'application/json',
                    'auth-token':token
                }
            })
            .then((resp)=>resp.json())
            .then((data)=>setUserData(data))
        }
    }

    useEffect(() => {
        const fetchInitialData = async () => {
            // setUserData(JSON.parse(sessionStorage.getItem('user-details')));

            await fetchCategory();
            await fetchDailyDeals();
            await fetchFlashsale()

            if (sessionStorage.getItem('auth-token')) {
                try {
                    const response = await fetch(`${serverUrl}/getcart`, {
                        method: 'POST',
                        headers: {
                            Accept: 'application/json',
                            'auth-token': `${sessionStorage.getItem('auth-token')}`,
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({})
                    });
                    const data = await response.json();
                    setCartItems(data);
                } catch (error) {
                    console.error("Error fetching cart items:", error);
                }
            }
        };

        fetchInitialData();
        getuser()
    }, []);

    const addToCart = (itemId) => {
        setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));

        if (sessionStorage.getItem('auth-token')) {
            fetch(`${serverUrl}/addtocart`, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'auth-token': `${sessionStorage.getItem('auth-token')}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ "itemId": itemId })
            }).then((resp) => resp.json()).then((data) => console.log(data))
            .catch((error) => console.error("Error adding to cart:", error));
        }
        setShowAlert(true);
        setTimeout(() => setShowAlert(false), 3000);
    };

    const removeCart = (itemId) => {
        setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));

        if (sessionStorage.getItem('auth-token')) {
            fetch(`${serverUrl}/removefromcart`, {
                method: 'DELETE',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    'auth-token': `${sessionStorage.getItem('auth-token')}`
                },
                body: JSON.stringify({ "itemId": itemId }),
            }).then((resp) => resp.json()).then((data) => console.log(data))
            .catch((error) => console.error("Error removing from cart:", error));
        }
    };

    const getTotalCartItems = () => {
        return Object.values(cartItems).reduce((total, quantity) => total + (quantity > 0 ? quantity : 0), 0);
    };

    const contextValue = { category,flashsale, showDailydeals, userData, cartItems, removeCart, addToCart, getTotalCartItems,showAlert,setCartItems,getDefaultCart};

    return (
        <ShopContext.Provider value={contextValue}>
            {props.children}
        </ShopContext.Provider>
    );
};

export default ShopContextProvider;
