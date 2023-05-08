import axios from "axios";
import { baseUrl } from "../baseurl";

export const getAllStudents = (headers) => {
    return axios.get(`${baseUrl}/api/students`, {headers})
}

export const getAllUsers = (headers) => {
    return axios.get(`${baseUrl}/api/user`, {headers})
}

export const getAllBatches = (headers) => {
    return axios.get(`${baseUrl}/api/batch`, {headers})
}

export const getAllCourses = (headers) => {
    return axios.get(`${baseUrl}/api/course`, {headers})
}

export const getAllPayments = (headers) => {
    return axios.get(`${baseUrl}/api/payment`, {headers})
}