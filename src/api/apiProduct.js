import { API } from '../utils/config';
import axios from 'axios';

export const getProducts = (sortBy, order, limit, skip, search) => {
    return axios.get(`${API}/product?sortBy=${sortBy}&order=${order}&limit=${limit}&skip=${skip}&search=${search}`)
}

export const getProductDetails = (id) => {
    return axios.get(`${API}/product/${id}`)
}

export const getCategories = () => {
    return axios.get(`${API}/category`)
}

export const getFilteredProducts = (skip, limit, filters = {}, order, sortBy, search) => {
    const data = {
        order: order,
        sortBy: sortBy,
        limit: limit,
        skip: skip,
        search: search,
        filters: { ...filters }
    }

    return axios.post(`${API}/product/filter`, data, {
        headers: {
            "Content-Type": "application/json"
        }
    })
}