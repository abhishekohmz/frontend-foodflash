import './App.css';
import Navbar from './Components/Navbar/NavbarMain';
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Shop from './Pages/Shop';
import ShopTab from './Components/ShopTabs/ShopTab';
import CategoryDisplay from './Components/CategoryDisplay/CategoryDisplay';
import Product from './Pages/Product';
import LoginSignup from './Pages/LoginSignup';
import User from './Pages/User';
import Dashboard from './Components/Dashboard/Dashboard';
import Information from './Components/Information/Information';
import Addressbook from './Components/Addressbook/Addressbook';
import Orders from './Components/Orders/Orders';
import Cart from './Pages/Cart';
import Checkout from './Pages/Checkout';
import Footer from './Components/Footer/Footer';


function App() {
  return (
    <div className="App">

      <BrowserRouter>
      <Navbar/>
      <ShopTab/>
      <Routes>
        <Route path='/' element={<Shop/>} />
        <Route path='/customer/account/login' element={<LoginSignup/>} />
        <Route path='/customer/account' element={<User />}>
          <Route index element={<Dashboard />} />
          <Route path='dashboard' element={<Dashboard />} />
          <Route path='edit' element={<Information />} />
          <Route path='address' element={<Addressbook />} />
          <Route path='orders' element={<Orders />} />
        </Route>        
        <Route path='/:categoryName' element={<CategoryDisplay />} />
        <Route path='/:categoryName' element={<CategoryDisplay />} />
        <Route path='/:categoryName' element={<CategoryDisplay />} />
        <Route path='/:categoryName' element={<CategoryDisplay />} />
        <Route path='/:categoryName' element={<CategoryDisplay />} />

        <Route path='/:categoryName' element={<CategoryDisplay/>} />
        <Route path='/product/:productId' element={<Product/>} />
        <Route path='/cart' element={<Cart/>} />
        <Route path='/checkout' element={<Checkout/>} />
      </Routes>
      <Footer/>
      </BrowserRouter>
    </div>
  );
}

export default App;
