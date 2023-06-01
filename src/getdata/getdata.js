import axios from "axios";
import { baseUrl, secondbaseUrl } from "../baseurl";

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

export const getAllCategories = (headers) => {
    return axios.get(`${baseUrl}/api/category`, {headers})
}

export const getAllExpenses = (headers) => {
    return axios.get(`${baseUrl}/api/expense`, {headers})
}

export const getAllNewExpenses = () => {
    return axios.get(`${secondbaseUrl}/api/expenses`)
}

export const getAllPayments = (headers) => {
    return axios.get(`${baseUrl}/api/payment`, {headers})
}

export const getAllLeads = (headers) => {
    return axios.get(`${baseUrl}/api/leads`, {headers})
}

export const getAllWalkins = (headers) => {
    return axios.get('http://localhost:4000/api/walkins', {headers})
}