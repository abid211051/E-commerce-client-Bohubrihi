import { useState, useEffect } from 'react';
import Layout from '../Layout';
import Card from './Card';
import CheckBox from './CheckBox';
import RadioBox from './RadioBox';
import { prices } from '../../utils/prices';
import { ShowError, ShowSuccess } from '../../utils/messages';
import { getCategories, getProducts, getFilteredProducts } from '../../api/apiProduct';
import { addToCart } from '../../api/apiOrder';
import { authenticate, isAuthenticated, userInfo } from '../../utils/auth';
import SortBy from './SortBy';
import LoadMoreLess from './LoadMoreLess';
import SearchBar from './SearchBar';

const Home = () => {
    const que = new URLSearchParams(window.location.search);
    const [products, setProducts] = useState([]);
    const [search, setSearch] = useState('');
    const [categories, setCategories] = useState([]);
    const [limit, setLimit] = useState(6);
    const [skip, setSkip] = useState(0);
    const [order, setOrder] = useState('desc');
    const [sortBy, setSortBy] = useState('sold');
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);
    const [filters, setFilters] = useState({
        category: [],
        price: []
    })

    useEffect(() => {
        getProducts(sortBy, order, limit, skip, search)
            .then(response => {
                setProducts(response.data.product);
                if (response.data.count <= skip || skip < 0) {
                    setSkip(0);
                }
            })
            .catch(err => setError("Failed to load products!"));

    }, [order, sortBy, skip])

    useEffect(() => {
        getCategories()
            .then(response => setCategories(response.data.category))
            .catch(err => setError("Failed to load categories!"));
        if (que.size > 0) {
            authenticate(que.get('token'), () => { })
        }
    }, [])

    const handleAddToCart = product => () => {
        if (isAuthenticated()) {
            setError(false);
            setSuccess(false);
            const user = userInfo();
            const cartItem = {
                user: user._id,
                product: product._id,
                price: product.price,
            }
            addToCart(user.token, cartItem)
                .then(reponse => setSuccess(true))
                .catch(err => {
                    if (err.response) setError(err.response.data);
                    else setError("Adding to cart failed!");
                })
        } else {
            setSuccess(false);
            setError("Please Login First!");
        }
    }

    const handleFilters = (myfilters, filterBy) => {
        const newFilters = { ...filters };
        if (filterBy === 'category') {
            newFilters[filterBy] = myfilters;
        }

        if (filterBy === 'price') {
            const data = prices;
            let arr = [];
            for (let i in data) {
                if (data[i].id === parseInt(myfilters)) {
                    arr = data[i].arr;
                }
            }
            newFilters[filterBy] = arr;
        }
        setFilters(newFilters);

        getFilteredProducts(skip, limit, newFilters, order, sortBy, search)
            .then(response => setProducts(response.data.product))
            .catch(err => setError("Failed to load products!"));
    }

    const handleSortAndOrder = (val) => {
        if (Object.keys(val)[0] === 'asc_desc') {
            setOrder(Object.values(val)[0]);
        }
        if (Object.keys(val)[0] === 'prod_cond') {
            setSortBy(Object.values(val)[0])
        }
    }

    const handlemoreAndLess = (val) => {
        if (val === 'prev') {
            setSkip(prev => prev - 5);
        }
        else if (val === 'next') {
            setSkip(prev => prev + 5);
        }
    }

    const handleSearch = (prod, searchval) => {
        if (prod === null) {
            setSearch(searchval);
        }
        else {
            setProducts(prod);
            setSearch(searchval);
        }
    }
    const showFilters = () => {
        return (
            <>
                <div className="col">
                    <div className="mb-4">
                        <h5>Filter By Categories:</h5>
                        <div className='align'>
                            <CheckBox
                                categories={categories}
                                handleFilters={myfilters => handleFilters(myfilters, 'category')}
                            />
                        </div>
                    </div>
                    <div className="mb-4">
                        <h5>Filter By Price:</h5>
                        <div className="col">
                            <RadioBox
                                prices={prices}
                                handleFilters={myfilters => handleFilters(myfilters, 'price')}
                            />
                        </div>
                    </div>
                    <div className="mb-4">
                        <SortBy handleSortAndOrder={handleSortAndOrder} />
                    </div>
                </div>
            </>
        )
    }

    return (
        <Layout title="Home Page" className="container-fluid row itemCenter mb-5">
            <SearchBar handleSearch={handleSearch} sortBy={sortBy} order={order} limit={limit} skip={skip} />
            {showFilters()}
            <div className='col-lg-10'>
                <div style={{ width: "100%" }}>
                    <ShowError error={error} />
                    <ShowSuccess success={success} msg={"Added to cart successfully!"} />
                </div>
                <div className="row mb-5">
                    {products?.length > 0 ? products.map(product => {
                        return (<Card product={product} key={product._id}
                            handleAddToCart={handleAddToCart(product)} />)
                    }) : <ShowError error={"No Product is Found"} />}
                </div>
                <div>
                    <LoadMoreLess handlemoreAndLess={handlemoreAndLess} />
                </div>
            </div>
        </Layout>
    )
}

export default Home;