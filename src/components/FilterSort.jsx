import {
    filteringItems,
    sortingList,
    CategoryItems,
    ProductItems,
  } from "../features/productlist/productSlice";
import { useDispatch, useSelector } from "react-redux";

const FilterSort = ()=>{
    const categories = useSelector(CategoryItems)
    // const productItems = useSelector(ProductItems);
    const handleChangeFilter = (e) => {
        const selectCategory = e.target.value;
        dispatch(filteringItems(selectCategory));
      };
      const handleChangeSorting = (e) => {
        const selectSort = e.target.value;
        dispatch(sortingList(selectSort));
      };
      // const resetButton = (product)=>{
      //   dispatch(resetList(product))
      //   document.getElementById('dropdown-filter').value = '00'
      //   document.getElementById('dropdown-sorting').value = '00'
      // }
    const dispatch = useDispatch();
    return (
        <div className='relative mt-4 flex flex-col sm:flex-row gap-6 glass-panel p-4 rounded-2xl'>
            <div className="flex flex-col gap-2 w-full sm:w-1/3">
              <label className="text-sm font-semibold text-slate-700 dark:text-gray-300 ml-1">Filter by Category</label>
              <div className="relative">
                <select
                  id='dropdown-filter'
                  onChange={handleChangeFilter}
                  className='block w-full appearance-none bg-white dark:bg-brand-secondary/50 border border-slate-300 dark:border-white/10 hover:border-brand-primary/50 text-slate-800 dark:text-gray-200 px-4 py-3 rounded-xl shadow-sm leading-tight focus:outline-none focus:ring-2 focus:ring-brand-primary transition-all cursor-pointer'>
                  <option value='00' className="bg-white dark:bg-brand-dark text-slate-800 dark:text-gray-200">All Categories</option>
                  {categories.map((category) => {
                    return (
                        <option key={category} value={category} className="bg-white dark:bg-brand-dark text-slate-800 dark:text-gray-200">{category}</option>
                    );
                  })}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-500 dark:text-gray-400">
                  <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-2 w-full sm:w-1/3">
              <label className="text-sm font-semibold text-slate-700 dark:text-gray-300 ml-1">Sort Products</label>
              <div className="relative">
                <select
                  id='dropdown-sorting'
                  onChange={handleChangeSorting}
                  className='block w-full appearance-none bg-white dark:bg-brand-secondary/50 border border-slate-300 dark:border-white/10 hover:border-brand-primary/50 text-slate-800 dark:text-gray-200 px-4 py-3 rounded-xl shadow-sm leading-tight focus:outline-none focus:ring-2 focus:ring-brand-primary transition-all cursor-pointer'>
                  <option value='00' hidden className="bg-white dark:bg-brand-dark text-slate-800 dark:text-gray-200">--Sort By--</option>
                  <option value='ascending' className="bg-white dark:bg-brand-dark text-slate-800 dark:text-gray-200">A-Z</option>
                  <option value='descending' className="bg-white dark:bg-brand-dark text-slate-800 dark:text-gray-200">Z-A</option>
                  <option value='highest' className="bg-white dark:bg-brand-dark text-slate-800 dark:text-gray-200">Highest Price</option>
                  <option value='lowest' className="bg-white dark:bg-brand-dark text-slate-800 dark:text-gray-200">Lowest Price</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-500 dark:text-gray-400">
                  <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                </div>
              </div>
            </div>
          </div>
    )
}

export default FilterSort;