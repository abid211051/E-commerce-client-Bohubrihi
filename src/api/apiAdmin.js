import { API } from '../utils/config';
import axios from 'axios';

export const createCategory = (token, data) => {
    return axios.post(`${API}/category`, data, {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    })
}

export const createProduct = (token, data) => {
    return axios.post(`${API}/product`, data, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    })
}

export const createCoupon = (token, data) => {
    return axios.post(`${API}/coupon`, data, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    })
}

export const getCoupon = (token) => {
    return axios.get(`${API}/coupon`, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    })
}
export const getCategories = () => {
    return axios.get(`${API}/category`)
}
