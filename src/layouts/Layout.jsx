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
    <>
      {isOpenModalCart ? (
        <CartModal handleHideModalCart={handleHideModalCart} />
      ) : null}
      <Header handleShowModalCart={handleShowModalCart} />
      <main className='max-w-7xl mx-auto px-4'>{props.children}</main>
      <Footer />
    </>
  );
};

export default Layout;
