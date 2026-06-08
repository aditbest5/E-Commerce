import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addItemToCart } from "../cart/cartSlice";
import {
  addItemToList,
  ProductItems,
  FilterItems,
  addCategoryList,
  resetList,
} from "./productSlice";
import FilterSort from "../../components/FilterSort";
import Swal from "sweetalert2";
import Cookies from "js-cookie";

const ProductList = () => {
  const [isLoading, setLoading] = useState(false);
  const products = useSelector(ProductItems);
  const filterProduct = useSelector(FilterItems);
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(6);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems =
    filterProduct.length > 0
      ? filterProduct.slice(indexOfFirstItem, indexOfLastItem)
      : products.slice(indexOfFirstItem, indexOfLastItem);

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const isLoggedIn = () => {
    const userToken = Cookies.get("token");
    return !!userToken;
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const totalPages = Math.ceil(
    filterProduct.length > 0
      ? filterProduct.length / itemsPerPage
      : products.length / itemsPerPage
  );

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await fetch("https://fakestoreapi.com/products");
      const data = await response.json();
      const Categories = [...new Set(data.map((product) => product.category))];
      dispatch(addCategoryList(Categories));
      dispatch(addItemToList(data));
    } catch (error) {
      console.log(error);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [dispatch]);

  const handleClickBuy = (product) => {
    if (isLoggedIn()) {
      dispatch(addItemToCart(product));
    } else {
      // Handle the case where the user is not logged in (e.g., show a login modal)
      Swal.fire({
        title: "Login First!!",
        text: "You must log in to buy this product",
        icon: "error",
      });
    }
  };

  const resetButton = (product) => {
    dispatch(resetList(product));
    fetchProducts();
    document.getElementById("dropdown-filter").value = "00";
    document.getElementById("dropdown-sorting").value = "00";
  };

  {
    if (isLoading) {
      return (
        <div className="animate-pulse">
          <FilterSort />
          <div className="mt-8 flex flex-col justify-end items-end w-full">
            <button
              onClick={() => resetButton(products)}
              className="bg-slate-200 dark:bg-brand-secondary text-slate-800 dark:text-gray-200 hover:bg-slate-300 dark:hover:bg-brand-primary px-5 py-2 rounded-lg shadow-md transition-all border border-slate-300 dark:border-white/10"
            >
              Reset Filters
            </button>
          </div>
          <div className="w-full h-full grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 my-10 py-5">
            {[1,2,3,4,5,6].map((n) => (
                <div key={n} className="glass-panel rounded-2xl p-6 h-[400px] flex flex-col gap-4">
                    <div className="w-full h-[200px] bg-white/10 rounded-xl"></div>
                    <div className="w-3/4 h-6 bg-white/10 rounded"></div>
                    <div className="w-1/2 h-4 bg-white/10 rounded"></div>
                    <div className="w-full h-10 bg-white/10 rounded-lg mt-auto"></div>
                </div>
            ))}
          </div>
        </div>
      );
    } else {
      if (products.length < 1) {
        return (
          <div className="animate-fade-in-up">
            <FilterSort />
            <div className="mt-8 flex flex-col justify-end items-end w-full">
              <button
                onClick={() => resetButton(products)}
                className="bg-slate-200 dark:bg-brand-secondary text-slate-800 dark:text-gray-200 hover:bg-slate-300 dark:hover:bg-brand-primary px-5 py-2 rounded-lg shadow-md transition-all border border-slate-300 dark:border-white/10"
              >
                Reset Filters
              </button>
            </div>
            <div className="flex flex-col items-center justify-center mt-20 mb-36 py-24 glass-panel rounded-3xl border border-slate-300 dark:border-white/10">
              <svg className="w-20 h-20 text-slate-400 dark:text-gray-500 mb-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 002-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
              <h1 className="text-2xl font-semibold text-slate-800 dark:text-gray-300">No Products Found</h1>
              <p className="text-slate-500 dark:text-gray-500 mt-2">Try adjusting your filters or search criteria.</p>
            </div>
          </div>
        );
      } else {
        return (
          <div className="animate-fade-in-up">
            <FilterSort />
            <div className="mt-8 flex flex-col justify-end items-end w-full">
              <button
                onClick={() => resetButton(products)}
                className="bg-slate-200 dark:bg-brand-secondary text-slate-800 dark:text-gray-200 hover:bg-slate-300 dark:hover:bg-brand-primary hover:text-slate-900 dark:hover:text-white px-5 py-2 rounded-lg shadow-[0_0_15px_rgba(0,0,0,0.05)] dark:shadow-[0_0_15px_rgba(0,0,0,0.2)] transition-all border border-slate-300 dark:border-white/10 font-medium"
              >
                Reset Filters
              </button>
            </div>
            <div className="w-full h-full grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 my-10 py-5">
              {currentItems.map((product) => {
                return (
                  <div
                    key={product.id}
                    className="glass-panel rounded-2xl p-6 group hover:-translate-y-2 hover:shadow-[0_20px_40px_-15px_rgba(99,102,241,0.3)] transition-all duration-300 flex flex-col relative overflow-hidden"
                  >
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-brand-primary to-brand-accent transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
                    <div className="relative w-full h-[220px] mx-auto overflow-hidden rounded-xl bg-white p-4 mb-6 shadow-inner">
                      <img
                        src={product.image}
                        alt={product.title}
                        className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-700 ease-out"
                      />
                    </div>
                    <div className="flex flex-col gap-3 flex-grow">
                      <div className="flex justify-between items-start gap-2">
                          <h1 className="font-bold text-lg text-slate-800 dark:text-gray-100 line-clamp-2 leading-tight">{product.title}</h1>
                          <p className="text-xl font-extrabold text-brand-primary whitespace-nowrap">${product.price}</p>
                      </div>
                      <p className="text-sm text-slate-500 dark:text-gray-400 text-justify line-clamp-2 font-light">
                        {product.description}
                      </p>

                      <div className="flex items-center mt-2 mb-4">
                        <svg className="w-4 h-4 text-yellow-400 me-1 drop-shadow-[0_0_5px_rgba(250,204,21,0.5)]" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                          <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                        </svg>
                        <p className="ms-1.5 text-sm font-bold text-slate-700 dark:text-gray-200">
                          {product.rating.rate}
                        </p>
                        <span className="w-1 h-1 mx-2 bg-slate-300 dark:bg-gray-500 rounded-full"></span>
                        <span className="text-xs font-medium text-slate-500 dark:text-gray-400">
                          {product.rating.count} reviews
                        </span>
                      </div>
                      
                      <div className="mt-auto pt-4">
                          <button
                            onClick={() => handleClickBuy(product)}
                            type="button"
                            className="w-full bg-gradient-to-r from-brand-primary to-brand-accent text-white hover:opacity-90 rounded-xl font-medium py-3 px-8 shadow-[0_0_15px_rgba(99,102,241,0.3)] hover:shadow-[0_0_25px_rgba(99,102,241,0.5)] transition-all transform active:scale-95"
                          >
                            Add to Cart
                          </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="flex justify-center items-center mt-10 gap-2">
              <button
                onClick={prevPage}
                className={`px-4 py-2 rounded-xl font-medium transition-colors ${currentPage === 1 ? 'bg-slate-100 dark:bg-white/5 text-slate-400 dark:text-gray-500 cursor-not-allowed' : 'bg-slate-200 dark:bg-brand-secondary text-slate-800 dark:text-gray-200 hover:bg-slate-300 dark:hover:bg-white/10 border border-slate-300 dark:border-white/5'}`}
                disabled={currentPage === 1}
              >
                Prev
              </button>
              <div className="flex gap-2">
                  {Array.from({ length: totalPages }).map((_, index) => (
                    <button
                      key={index}
                      onClick={() => paginate(index + 1)}
                      className={`w-10 h-10 rounded-xl font-medium transition-all ${
                        currentPage === index + 1
                          ? "bg-gradient-to-r from-brand-primary to-brand-accent text-white shadow-[0_0_15px_rgba(99,102,241,0.4)]"
                          : "bg-white dark:bg-brand-secondary text-slate-600 dark:text-gray-400 hover:bg-slate-100 dark:hover:bg-white/10 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-white/5"
                      }`}
                    >
                      {index + 1}
                    </button>
                  ))}
              </div>
              <button
                onClick={nextPage}
                className={`px-4 py-2 rounded-xl font-medium transition-colors ${currentPage === totalPages ? 'bg-slate-100 dark:bg-white/5 text-slate-400 dark:text-gray-500 cursor-not-allowed' : 'bg-slate-200 dark:bg-brand-secondary text-slate-800 dark:text-gray-200 hover:bg-slate-300 dark:hover:bg-white/10 border border-slate-300 dark:border-white/5'}`}
                disabled={currentPage === totalPages}
              >
                Next
              </button>
            </div>
          </div>
        );
      }
    }
  }
};

export default ProductList;
