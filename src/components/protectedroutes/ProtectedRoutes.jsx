import { Outlet, Navigate } from "react-router-dom";
import Sidebar from "../sidebar/Sidebar";
import Header from "../header/Header";
const ProtectedRoutes = () => {
    const token = localStorage.getItem('token')
    
    return (
        token !== null ? 
        <>
        <Header/>   
        <Sidebar/>
        <Outlet /> 
        </>: 
        <Navigate to='/' />
    );
}

export default ProtectedRoutes;