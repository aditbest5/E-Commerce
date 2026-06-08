import CartModal from "../features/cart/cartModal";
import Header from "../components/Header";

import Footer from "../components/Footer";
import { useState } from "react";

const Layout = (props) => {
  const [isOpenModalCart, setIsOpenModalCart] = useState(false);
  const handleShowModalCart = () => {
    setIsOpenModalCart(true);
  };
  const handleHideModalCart = () => {
    setIsOpenModalCart(false);
  };
  return (
    <div className="flex flex-col min-h-screen">
      {isOpenModalCart ? (
        <CartModal handleHideModalCart={handleHideModalCart} />
      ) : null}
      <Header handleShowModalCart={handleShowModalCart} />
      <main className='flex-grow max-w-7xl mx-auto px-4 w-full animate-fade-in-up pt-8 pb-12'>
        {props.children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
