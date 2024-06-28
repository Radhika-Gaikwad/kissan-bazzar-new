import React, { useState } from "react"
import Navbar from "./components/Navbar/Navbar"
import { Route, Routes } from "react-router-dom"
import Home from "./pages/Home/Home"
import Cart from "./pages/Cart/Cart"
import Verify from "./pages/verify/Verify"
import PlaceOrder from "./pages/PlaceOrder/PlaceOrder"
import Footer from "./components/Footer/Footer"
import LoginPopup from "./components/LoginPopUp/LoginPopup"
import MyOrders from "./pages/MyOrders/MyOrders"
import ExploreMenu from "./components/ExploreMenu/ExploreMenu"
import AppDownload from "./components/AppDownload/AppDownload"


function App () {
const[showLogin,setShowLogin] = useState(false);

  return (
    <>
    {
      
      showLogin ? <LoginPopup setShowLogin={setShowLogin}/>:<></>
    }
      <div className="app">
        <Navbar setShowLogin={setShowLogin} />

        <Routes>
          <Route path='/' element={<Home />} />
          <Route path="/explore-menu" element={<ExploreMenu />} />
          <Route path="/app-download" element={<AppDownload />} />
        <Route path="/footer" element={<Footer/>} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/order' element={<PlaceOrder />} />
          <Route path="/verify" element={<Verify/>}/>
          <Route path="/myorders" element={<MyOrders/>}/>

        
        </Routes>
      </div>
      <Footer />
    </>
  )
}

export default App
