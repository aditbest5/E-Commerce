import Header from "./components/Header";
import ProductList from "./features/productlist/ProductList";
import "./App.css";
import { useState } from "react";
import CartModal from "./features/cart/cartModal";
import Footer from "./components/Footer";
function App() {
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
      <main className='max-w-7xl mx-auto px-4'>
        <ProductList />
      </main>
      <Footer />
    </>
  );
}

export default App;
