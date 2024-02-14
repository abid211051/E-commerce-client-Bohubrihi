import axios from "axios"
import { API } from "../utils/config"

export const postReview = (token, review) => {
    return axios.post(`${API}/review`, review, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    })
}

export const getReview = (id) => {
    return axios.get(`${API}/review/${id}`)
}