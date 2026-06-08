import { searchingItems, ProductItems } from "../features/productlist/productSlice";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
const Search = () => {
  const dispatch = useDispatch();
  // const productItems = useSelector(ProductItems)
  const [searchTerm, setSearchTerm] = useState("");

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
    // dispatch(searchingItems(event.target.value));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(searchingItems(searchTerm));
  };

  return (
    <form onSubmit={handleSubmit} className='flex items-center gap-2 m-0'>
      <input
        type='text'
        placeholder='Search...'
        onChange={handleChange}
        className='border border-slate-300 dark:border-white/10 bg-white dark:bg-brand-secondary/50 text-slate-800 dark:text-gray-200 placeholder:text-slate-400 dark:placeholder:text-gray-400 rounded-xl py-2 px-4 focus:outline-none focus:ring-2 focus:ring-brand-primary transition-all w-full max-w-[200px] lg:max-w-[250px]'
      />
      <button
        type='submit'
        className='bg-slate-200 hover:bg-slate-300 dark:bg-white/10 dark:hover:bg-white/20 text-slate-800 dark:text-white font-medium py-2 px-4 rounded-xl border border-slate-300 dark:border-white/5 transition-colors'>
        Search
      </button>
    </form>
  );
};

export default Search;
