import { useState } from "react";
import Cart from "../assets/cart.svg";
import { useSelector } from "react-redux";
import {
  selectCartItems,
  selectCartTotalItems,
} from "../features/cart/cartSlice";
import Search from "./Search";
import { Link } from "react-router-dom";

const Header = ({ handleShowModalCart }) => {
  const cartItem = useSelector(selectCartItems);
  const totalItem = useSelector(selectCartTotalItems);
  const [showMenu, setShowMenu] = useState(false);

  const handleToggleMenu = () => {
    setShowMenu(!showMenu);
  };
  console.log(cartItem);
  const [hide, setHide] = useState(true);
  const dropDown = () => {
    if (hide) {
      setHide(false);
    } else {
      setHide(true);
    }
  };
  return (
    <header className="bg-blue-700">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          <h1 className="text-3xl font-bold text-gray-100">
            <Link to={"/"}>
              <span className="text-yellow-300">Toko</span>Kita
            </Link>
          </h1>
          <button
            onClick={handleToggleMenu}
            type="button"
            className="block md:hidden text-gray-100"
          >
            Menu
          </button>
          <div className="hidden md:flex gap-5 items-center">
            <Search />
            <button
              onClick={handleShowModalCart}
              type="button"
              className="relative rounded-full bg-blue-800 p-2 text-gray-100 flex flex-row gap-3"
            >
              <img src={Cart} alt="cart" className="w-6 h-6" />
              {totalItem ? (
                <>
                  <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-red-600 text-white text-sm flex items-center justify-center">
                    {" "}
                    {totalItem}{" "}
                  </span>
                </>
              ) : (
                ""
              )}
              {/* {totalItem} */}
            </button>
          </div>
        </div>
        {showMenu && (
          <div className="md:hidden">
            <Search />
            <button
              onClick={handleShowModalCart}
              type="button"
              className="relative rounded-full bg-blue-800 p-2 text-gray-100 flex flex-row gap-3"
            >
              <img src={Cart} alt="cart" className="w-6 h-6" />
              <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-red-600 text-white text-sm flex items-center justify-center">
                {totalItem}
              </span>
            </button>
          </div>
        )}
        {hide ? (
          ""
        ) : (
          <div className="absolute right-0 z-10 mt-2 w-3/12 mr-5 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            {cartItem.map((cart) => {
              return (
                <div key={cart.id} className="flex flex-row gap-3 p-2">
                  <img src={cart.image} alt="product" className="w-1/6" />
                  <p className="font-xs overflow-hidden whitespace-nowrap w-5/12 overflow-ellipsis">
                    {cart.title}
                  </p>
                  <p>{cart.quantity}</p>
                  <p>${cart.price}</p>
                  <button className="bg-gray-500 text-gray-50 p-2 w-max-sm max-h-fit font-light text-sm h-3/4">
                    Detail
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </header>
  );
};
export default Header;
