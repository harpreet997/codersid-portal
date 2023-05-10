import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import SidebarLogo from '../../assets/SidebarLogo.png';
import DashboardIcon from '../../assets/DashboardIcon.png';
import StudentIcon from '../../assets/Studentlist.png';
import MasterIcon from '../../assets/MasterIcon.png';
import MasterArrowIcon from '../../assets/MasterArrowIcon.png';
import PaymentIcon from '../../assets/PaymentIcon.png';
import '../../styles/sidebar/sidebar.css';

const Sidebar = () => {
    const [showManage, setShowManage] = useState(false);
    const [showMaster, setShowMaster] = useState(true);
    const [showPayment, setShowPayment] = useState(false);
    const role = localStorage.getItem('role');

    const handleManage = () => {
        setShowManage(!showManage)
    }

    // const handleMaster = () => {
    //     setShowMaster(!showMaster)
    // }

    // const handlePayment = () => {
    //     setShowPayment(!showPayment)
    // }

    return (
        <div className="sidebarCard">
                <div className='sidebar-logo'>
                    <img src={SidebarLogo} alt="SidebarLogo" />
                </div>
                <p className='sidebar-text'>Welcome Admin</p>
                <div className='sidebar-line'></div>
                <div>
                    <NavLink to='/dashboard'><p className='sidebar-item-1'>Dashboard</p></NavLink>
                    <img className='dashboard-text-icon' src={DashboardIcon} alt="DashboardIcon" />
                </div>
                <div>
                <NavLink to='/students-list'><p className='sidebar-item-2'>CodersID Students</p></NavLink>
                    <img className='codersid-students-text-icon' src={StudentIcon} alt="StudentIcon" />
                </div>
                
                {role === 'admin' ?
                    <>
                        <div>
                            <p className='sidebar-item-3 mb-3' style={{cursor: 'pointer'}} >Master</p>
                            <img className='master-text-icon' src={MasterIcon} alt="MasterIcon" />
                            <img className='master-arrow-icon' src={MasterArrowIcon} alt="MasterArrowIcon" />
                        </div>

                        <div>
                            {
                                showMaster ?
                                    <>
                                        <NavLink to='/add-batch'><p className='add-batch-text'>Add Batch</p></NavLink>
                                        <NavLink to='/add-user'><p className='add-user-text'>Add User</p></NavLink>
                                        <NavLink to='/add-course'><p className='add-course-text'>Add Course</p></NavLink>
                                        <NavLink to='/add-expense'><p className='add-expense-text'>Add Expense Category</p></NavLink>
                                    </>
                                    : null
                            }
                        </div>
                    </>
                    : null}
                <div>
                    <p className='payment-text' style={{cursor: 'pointer'}}>Payment</p>
                    <img className='payment-icon' src={PaymentIcon} alt="PaymentIcon" />
                    <img className='payment-arrow-icon' src={MasterArrowIcon} alt="MasterArrowIcon" />
                </div>
                <div>
                <NavLink to='/payment-records'><p className='payment-records'>Payment Records</p></NavLink>
                <NavLink to='/payment'> <p className='payfee'>Pay Fee</p></NavLink>

                </div>    
                <p className='expense-management' style={{cursor: 'pointer'}}>Expense Management</p>
        </div>
    );
}

export default Sidebar
