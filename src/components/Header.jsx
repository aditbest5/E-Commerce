import { useState } from "react";
import Cart from "../assets/cart.svg";
import { useSelector } from "react-redux";
import { selectCartTotalItems } from "../features/cart/cartSlice";
import Search from "./Search";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import Swal from "sweetalert2";

import { ThemeContext } from "../context/ThemeContext";
import { useContext } from "react";

const Header = ({ handleShowModalCart }) => {
  const { isDarkMode, toggleTheme } = useContext(ThemeContext);
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
    <header className="sticky top-0 z-50 glass-panel border-b border-white/40 dark:border-white/10 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          <h1 className="text-3xl font-extrabold tracking-tight">
            <Link to={"/"} className="flex items-center gap-1 hover:opacity-80 transition-opacity">
              <span className="bg-gradient-to-r from-brand-primary to-brand-accent bg-clip-text text-transparent">Toko</span>
              <span className="text-slate-900 dark:text-white transition-colors duration-300">Kita</span>
            </Link>
          </h1>
          <div className="flex flex-row gap-5">
            <div className="sm:hidden flex items-center gap-2">
              <button
                onClick={toggleTheme}
                className="p-2 rounded-full bg-slate-200 dark:bg-white/5 border border-slate-300 dark:border-white/10 text-slate-700 dark:text-gray-100 transition-all hover:scale-105"
              >
                {isDarkMode ? (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>
                ) : (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path></svg>
                )}
              </button>
              {Cookies.get("token") ? (
                <div className="relative ml-3">
                  <div>
                    <button
                      onClick={toggleProfileDropdown}
                      type="button"
                      className="relative flex rounded-full bg-slate-200 dark:bg-brand-secondary text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary focus:ring-offset-2 focus:ring-offset-brand-dark"
                      id="user-menu-button"
                      aria-expanded="false"
                      aria-haspopup="true"
                    >
                      <span className="absolute -inset-1.5"></span>
                      <span className="sr-only">Open user menu</span>
                      <img
                        className="h-8 w-8 rounded-full border border-slate-300 dark:border-white/10"
                        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                        alt=""
                      />
                    </button>
                  </div>

                  {showProfileDropdown && (
                    <div
                      className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-xl glass-panel py-1 shadow-2xl ring-1 ring-slate-200 dark:ring-white/10 focus:outline-none overflow-hidden"
                      role="menu"
                      aria-orientation="vertical"
                      aria-labelledby="user-menu-button"
                      tabIndex="-1"
                    >
                      <button
                        onClick={destroyLogin}
                        className="block w-full text-left px-4 py-2 text-sm text-slate-800 dark:text-gray-200 hover:bg-slate-200 dark:hover:bg-white/10 transition-colors"
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
                  <button className="bg-slate-200 dark:bg-white/10 hover:bg-slate-300 dark:hover:bg-white/20 text-slate-800 dark:text-white px-4 py-2 rounded-lg font-medium transition-colors border border-slate-300 dark:border-white/5">
                    Login
                  </button>
                </Link>
              )}
            </div>

            <button
              onClick={handleToggleMenu}
              type="button"
              className="block md:hidden text-slate-800 dark:text-gray-300 hover:text-slate-600 dark:hover:text-white transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path></svg>
            </button>
            <div className="hidden md:flex gap-6 items-center">
              <Search />
              <button
                onClick={toggleTheme}
                className="p-2.5 rounded-full bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-700 dark:text-gray-100 transition-all hover:scale-105 shadow-sm"
              >
                {isDarkMode ? (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>
                ) : (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path></svg>
                )}
              </button>
              <button
                onClick={handleShowModalCart}
                type="button"
                className="relative rounded-full bg-white dark:bg-white/5 hover:bg-slate-100 dark:hover:bg-white/10 border border-slate-200 dark:border-white/10 p-2.5 text-slate-800 dark:text-gray-100 transition-all duration-200 hover:scale-105 shadow-sm group"
              >
                <img src={Cart} alt="cart" className="w-5 h-5 opacity-80 group-hover:opacity-100 transition-opacity invert dark:invert-0" />
                {totalItem ? (
                  <>
                    <span className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-brand-primary text-white text-xs font-bold flex items-center justify-center shadow-[0_0_10px_rgba(99,102,241,0.6)] border border-white dark:border-brand-dark">
                      {totalItem}
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
                      className="relative flex rounded-full bg-brand-secondary text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary focus:ring-offset-2 focus:ring-offset-brand-dark transition-transform hover:scale-105"
                      id="user-menu-button"
                      aria-expanded="false"
                      aria-haspopup="true"
                    >
                      <span className="absolute -inset-1.5"></span>
                      <span className="sr-only">Open user menu</span>
                      <img
                        className="h-9 w-9 rounded-full border border-white/10"
                        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                        alt=""
                      />
                    </button>
                  </div>

                  {showProfileDropdown && (
                    <div
                      className="absolute right-0 z-10 mt-3 w-48 origin-top-right rounded-xl glass-panel py-1 shadow-2xl ring-1 ring-white/10 focus:outline-none overflow-hidden animate-fade-in-up"
                      style={{ animationDuration: '0.2s' }}
                      role="menu"
                      aria-orientation="vertical"
                      aria-labelledby="user-menu-button"
                      tabIndex="-1"
                    >
                      <button
                        onClick={destroyLogin}
                        className="block w-full text-left px-4 py-2.5 text-sm text-gray-200 hover:bg-white/10 transition-colors"
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
                  <button className="bg-gradient-to-r from-brand-primary to-brand-accent hover:opacity-90 text-white px-6 py-2 rounded-lg font-medium transition-all shadow-[0_0_15px_rgba(99,102,241,0.4)] hover:shadow-[0_0_25px_rgba(99,102,241,0.6)]">
                    Login
                  </button>
                </Link>
              )}
            </div>
          </div>
        </div>
        {showMenu && (
          <div className="md:hidden py-4 border-t border-slate-200 dark:border-white/10 animate-fade-in-up" style={{ animationDuration: '0.2s' }}>
            <div className="flex flex-col gap-4 items-center">
                <Search />
                <button
                onClick={handleShowModalCart}
                type="button"
                className="relative rounded-full bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 p-2.5 text-slate-800 dark:text-gray-100 flex flex-row gap-3 items-center w-full justify-center shadow-sm"
                >
                <img src={Cart} alt="cart" className="w-5 h-5 invert dark:invert-0" />
                <span className="font-medium">View Cart</span>
                {totalItem ? (
                    <span className="ml-2 w-6 h-6 rounded-full bg-brand-primary text-white text-xs font-bold flex items-center justify-center">
                    {totalItem}
                    </span>
                ) : null}
                </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
export default Header;
