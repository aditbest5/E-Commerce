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
        <div className='relative mt-4 flex flex-row gap-3'>
            <div className="flex flex-col justify-end">
              <h1>Filtering:</h1>
              <select
                id='dropdown-filter'
                onChange={handleChangeFilter}
                className='block appearance-none bg-white border border-gray-400 hover:border-gray-600 px-4 py-1 rounded shadow leading-tight focus:outline-none focus:border-blue-500'>
                <option value='00'>All Categories</option>
                {categories.map((category) => {
                  return (
                    <>
                      <option value={category}>{category}</option>
                    </>
                  );
                })}
              </select>
            </div>
            <div className="flex flex-col justify-end">
              <h1>Sorting:</h1>
              <select
                id='dropdown-sorting'
                onChange={handleChangeSorting}
                className='block appearance-none bg-white border border-gray-400 hover:border-gray-600 px-4 py-1 rounded shadow leading-tight focus:outline-none focus:border-blue-500'>
                <option value='00' hidden>--Sort By--</option>
                <option value='ascending'>A-Z</option>
                <option value='descending'>Z-A</option>
                <option value='highest'>Highest Price</option>
                <option value='lowest'>Lowest Price</option>
              </select>
            </div>
            <div className="flex flex-col justify-end">
              {/* <button onClick={()=> resetButton(productItems)} className="block appearance-none bg-amber-200 border border-gray-400 hover:border-gray-600 px-4 py-1 rounded shadow leading-tight focus:outline-none focus:border-blue-500">Reset</button> */}
            </div>
          </div>
    )
}

export default FilterSort;