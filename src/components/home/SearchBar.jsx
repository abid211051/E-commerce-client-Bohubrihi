import React from 'react'
import { getProducts } from '../../api/apiProduct';

const SearchBar = (props) => {
    const { handleSearch, sortBy, order, limit, skip } = props;
    const handleform = (e) => {
        e.preventDefault();
        const search = e.target.search.value;

        getProducts(sortBy, order, limit, skip, search)
            .then(response => {
                handleSearch(response.data.product, search)
            })
            .catch(err => {
                console.log(err.message);
            })
    }
    return (
        <div className='mb-5 flex justify-content-center'>
            <form action="" className='flex flex-wrap gap-2 md-w-50' onSubmit={handleform}>
                <input onChange={(e) => handleSearch(null, e.target.value)}
                    name='search' type="search"
                    className='p-1 inp' placeholder='Search Products' />
                <button type='submit'>Search</button>
            </form>
        </div>
    )
}

export default SearchBar