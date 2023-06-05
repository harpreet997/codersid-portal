import axios from "axios";
import { baseUrl, secondbaseUrl } from "../baseurl";


export const login = (logindata) => {
    return axios.post(`${baseUrl}/login`, logindata)
} 

export const addStudent = (leavedata) => {
    return axios.post(`${baseUrl}/api/students`, leavedata)
} 

export const updateStudent = (id, studentdata) => {
    return axios.patch(`${baseUrl}/api/students/${id}`, studentdata)
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

export const addExpense = (expensedata) => {
    return axios.post(`${baseUrl}/api/expense`, expensedata)
} 

export const addNewExpense = (formdata) => {
    return axios.post(`${secondbaseUrl}/api/expenses`, formdata)
} 

export const updateExpense = (id, expensedata) => {
    return axios.patch(`${baseUrl}/api/expense/${id}`, expensedata)
} 

export const updateNewExpense = (id, formdata) => {
    return axios.patch(`${secondbaseUrl}/api/expenses/${id}`, formdata)
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

export const addLead = (leaddata) => {
    return axios.post(`${baseUrl}/api/leads`, leaddata)
} 

export const editLead = (id, editleaddata) => {
    return axios.patch(`${baseUrl}/api/leads/${id}`, editleaddata)
} 


export const addWalkin = (walkindata) => {
    return axios.post(`${baseUrl}/api/walkins`, walkindata)
} 

export const addQuestion = (questiondata) => {
    return axios.post(`${baseUrl}/api/questions`, questiondata)
} 

export const addTest = (testdata) => {
    return axios.post(`${baseUrl}/api/tests`, testdata)
} 

export const deleteAllQuestions = () => {
    return axios.delete(`${baseUrl}/api/questions`)
} 


