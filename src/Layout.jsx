import Header from './components/header/Header';
import { Outlet } from 'react-router';
import Footer from './components/footer/Footer';
import { CartProvider } from './ContextApi';
function Layout() {

    return (
     <>
         <CartProvider>
      <div className="app-container">
        {/* <Header /> */}
        <div className="main-content text-white">
          <Outlet />
        </div>
        <Footer />
      </div>
    </CartProvider>
     </>
    )
  }
  
  export default Layout