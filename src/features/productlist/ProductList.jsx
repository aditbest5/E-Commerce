import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addItemToCart } from "../cart/cartSlice";
import {
  addItemToList,
  ProductItems,
  FilterItems,
  addCategoryList,
  resetList
} from "./productSlice";
import FilterSort from "../../components/FilterSort";
const ProductList = () => {
  const [isLoading, setLoading] = useState(false);
  const products = useSelector(ProductItems);
  const filterProduct = useSelector(FilterItems);
  const dispatch = useDispatch();
  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await fetch("https://fakestoreapi.com/products");
      const data = await response.json();
      const Categories = [
        ...new Set(data.map((product) => product.category)),
      ];
      dispatch(addCategoryList(Categories))
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
    dispatch(addItemToCart(product));
  };
  const resetButton= (product)=>{
    dispatch(resetList(product))
    fetchProducts();
    document.getElementById('dropdown-filter').value = '00'
    document.getElementById('dropdown-sorting').value = '00'
  }
  {
    if (isLoading) {
      return (
        <>
          <FilterSort />
          <div className="mt-5 flex flex-col justify-end">
              <button onClick={()=> resetButton(products)} className="block appearance-none bg-indigo-500 text-lime-100 border border-gray-400 hover:border-gray-600 px-4 py-1 rounded shadow leading-tight focus:outline-none focus:border-blue-500 w-[10%]">Reset</button>
            </div>
          <div className='flex items-center flex-row justify-center mt-10 mb-36 py-24'>
            <h1>Waiting..</h1>
          </div>
        </>
      );
    } else {
      if (filterProduct.length > 0) {
        return (
          <>
            <FilterSort/>
            <div className="mt-5 flex flex-col justify-end">
              <button onClick={()=> resetButton(products)} className="block appearance-none bg-indigo-500 text-lime-100 border border-gray-400 hover:border-gray-600 px-4 py-1 rounded shadow leading-tight focus:outline-none focus:border-blue-500 w-[10%]">Reset</button>
            </div>
            <div className='w-full h-full grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 my-10 py-5'>
              {filterProduct.map((product) => {
                return (
                  <div
                    key={product.id}
                    className='bg-white rounded-xl border shadow p-4 group'>
                    <div className=' relative w-[80%] h-[250px] mx-auto overflow-hidden'>
                      <img
                        src={product.image}
                        alt={product.title}
                        className='w-full h-full object-contain group-hover:scale-110 transition-all duration-500 ease-in-out'
                      />
                    </div>
                    <div className='flex flex-col gap-6 mt-8'>
                      <button
                        onClick={() => handleClickBuy(product)}
                        type='button'
                        className='bg-blue-700 text-white hover:bg-blue-800 rounded-lg text-sm py-3 px-8'>
                        BUY NOW
                      </button>
                      <h1 className='font-bold'>{product.title}</h1>
                      <p className='text-sm font-thin text-justify line-clamp-3'>
                        {product.description}
                      </p>

                      <div className='flex items-center'>
                        <svg
                          className='w-4 h-4 text-yellow-300 me-1'
                          aria-hidden='true'
                          xmlns='http://www.w3.org/2000/svg'
                          fill='currentColor'
                          viewBox='0 0 22 20'>
                          <path d='M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z' />
                        </svg>
                        <p className='ms-2 text-sm font-bold text-gray-900 dark:text-white'>
                          {product.rating.rate}
                        </p>
                        <span className='w-1 h-1 mx-1.5 bg-gray-500 rounded-full dark:bg-gray-400'></span>
                        <a
                          href='#'
                          className='text-sm font-medium text-gray-900 underline hover:no-underline dark:text-white'>
                          {product.rating.count} reviews
                        </a>
                      </div>

                      <p className='text-sm font-bold'>${product.price}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        );
      } else if (products.length < 1) {
        return (
          <>
            <FilterSort/>
            <div className="mt-5 flex flex-col justify-end">
              <button onClick={()=> resetButton(products)} className="block appearance-none bg-indigo-500 text-lime-100 border border-gray-400 hover:border-gray-600 px-4 py-1 rounded shadow leading-tight focus:outline-none focus:border-blue-500 w-[10%]">Reset</button>
            </div>
            <div className='flex items-center flex-row justify-center mt-10 mb-36 py-24'>
              <h1>Tidak Ada Data</h1>
            </div>
          </>
        );
      } else {
        return (
          <>
            <FilterSort/>
            <div className="mt-5 flex flex-col justify-end">
              <button onClick={()=> resetButton(products)}  className="block appearance-none bg-indigo-500 text-lime-100 border border-gray-400 hover:border-gray-600 px-4 py-1 rounded shadow leading-tight focus:outline-none focus:border-blue-500 w-[10%]">Reset</button>
            </div>
            <div className='w-full h-full grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 my-10 py-5'>
              {products.map((product) => {
                return (
                  <div
                    key={product.id}
                    className='bg-white rounded-xl border shadow p-4 group'>
                    <div className=' relative w-[80%] h-[250px] mx-auto overflow-hidden'>
                      <img
                        src={product.image}
                        alt={product.title}
                        className='w-full h-full object-contain group-hover:scale-110 transition-all duration-500 ease-in-out'
                      />
                    </div>
                    <div className='flex flex-col gap-10 mt-8'>
                      <button
                        onClick={() => handleClickBuy(product)}
                        type='button'
                        className='bg-blue-700 text-white hover:bg-blue-800 rounded-lg text-sm py-3 px-8'>
                        BUY NOW
                      </button>
                      <h1 className='font-bold'>{product.title}</h1>
                      <p className='text-sm font-thin text-justify line-clamp-3'>
                        {product.description}
                      </p>

                      <div className='flex items-center'>
                        <svg
                          className='w-4 h-4 text-yellow-300 me-1'
                          aria-hidden='true'
                          xmlns='http://www.w3.org/2000/svg'
                          fill='currentColor'
                          viewBox='0 0 22 20'>
                          <path d='M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z' />
                        </svg>
                        <p className='ms-2 text-sm font-bold text-gray-900 dark:text-white'>
                          {product.rating.rate}
                        </p>
                        <span className='w-1 h-1 mx-1.5 bg-gray-500 rounded-full dark:bg-gray-400'></span>
                        <a
                          href='#'
                          className='text-sm font-medium text-gray-900 underline hover:no-underline dark:text-white'>
                          {product.rating.count} reviews
                        </a>
                      </div>

                      <p className='text-sm font-bold'>${product.price}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        );
      }
    }
  }
};

export default ProductList;
