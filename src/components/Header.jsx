import { useState } from "react";
import Cart from "../assets/cart.svg";
import { useSelector } from "react-redux";
import { selectCartTotalItems } from "../features/cart/cartSlice";
import Search from "./Search";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import Swal from "sweetalert2";

const Header = ({ handleShowModalCart }) => {
  const totalItem = useSelector(selectCartTotalItems);
  const [showMenu, setShowMenu] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const navigate = useNavigate();
  const handleToggleMenu = () => {
    setShowMenu(!showMenu);
  };
  const destroyLogin = () => {
    Cookies.remove("token");
    Swal.fire({
      title: "Log Out Success!!",
      text: "Thank You!",
      icon: "success",
    });
    navigate("/login");
  };
  const toggleProfileDropdown = () => {
    setShowProfileDropdown(!showProfileDropdown);
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
          <div className="flex flex-row gap-5">
            <di className="sm:hidden">
              {Cookies.get("token") ? (
                <div className="relative ml-3">
                  <div>
                    <button
                      onClick={toggleProfileDropdown}
                      type="button"
                      className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                      id="user-menu-button"
                      aria-expanded="false"
                      aria-haspopup="true"
                    >
                      <span className="absolute -inset-1.5"></span>
                      <span className="sr-only">Open user menu</span>
                      <img
                        className="h-8 w-8 rounded-full"
                        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                        alt=""
                      />
                    </button>
                  </div>

                  {showProfileDropdown && (
                    <div
                      className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                      role="menu"
                      aria-orientation="vertical"
                      aria-labelledby="user-menu-button"
                      tabIndex="-1"
                    >
                      <button
                        onClick={destroyLogin}
                        className="block px-4 py-2 text-sm text-gray-700"
                        role="menuitem"
                        tabIndex="-1"
                        id="user-menu-item-2"
                      >
                        Sign out
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <Link to="/login">
                  <button className="bg-slate-200 max-h-[40px] mt-[20%]">
                    Login
                  </button>
                </Link>
              )}
            </di>

            <button
              onClick={handleToggleMenu}
              type="button"
              className="block md:hidden text-gray-100"
            >
              Menu
            </button>
            <div className="hidden md:flex gap-10 items-center">
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
              </button>
              {Cookies.get("token") ? (
                <div className="relative ml-3">
                  <div>
                    <button
                      onClick={toggleProfileDropdown}
                      type="button"
                      className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                      id="user-menu-button"
                      aria-expanded="false"
                      aria-haspopup="true"
                    >
                      <span className="absolute -inset-1.5"></span>
                      <span className="sr-only">Open user menu</span>
                      <img
                        className="h-8 w-8 rounded-full"
                        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                        alt=""
                      />
                    </button>
                  </div>

                  {showProfileDropdown && (
                    <div
                      className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                      role="menu"
                      aria-orientation="vertical"
                      aria-labelledby="user-menu-button"
                      tabIndex="-1"
                    >
                      <button
                        onClick={destroyLogin}
                        className="block px-4 py-2 text-sm text-gray-700"
                        role="menuitem"
                        tabIndex="-1"
                        id="user-menu-item-2"
                      >
                        Sign out
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <Link to="/login">
                  <button className="bg-slate-200 max-h-[40px] mt-[2%]">
                    Login
                  </button>
                </Link>
              )}
            </div>
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
      </div>
    </header>
  );
};
export default Header;
