import axios from "axios";
import { baseUrl } from "../baseurl";


export const login = (logindata) => {
    return axios.post(`${baseUrl}/login`, logindata)
} 

export const addStudent = (leavedata) => {
    return axios.post(`${baseUrl}/api/students`, leavedata)
} 

export const addUser = (userdata) => {
    return axios.post(`${baseUrl}/api/user`, userdata)
} 

export const deleteUser = (id) => {
    return axios.delete(`${baseUrl}/api/user/${id}`)
} 

export const addBatch = (batchdata) => {
    return axios.post(`${baseUrl}/api/batch`, batchdata)
} 

export const deleteBatch = (id) => {
    return axios.delete(`${baseUrl}/api/batch/${id}`)
} 


export const addCourse = (coursedata) => {
    return axios.post(`${baseUrl}/api/course`, coursedata)
} 

export const deleteCourse = (id) => {
    return axios.delete(`${baseUrl}/api/course/${id}`)
} 

export const addCategory = (categorydata) => {
    return axios.post(`${baseUrl}/api/category`, categorydata)
} 

export const deleteCategory = (id) => {
    return axios.delete(`${baseUrl}/api/category/${id}`)
} 

export const updatePaymentStatus = (id, paymentdata) => {
    return axios.patch(`${baseUrl}/api/students/${id}`, paymentdata)
} 

export const addPaymentRecord = (paymentrecord) => {
    return axios.post(`${baseUrl}/api/payment`, paymentrecord)
} 
