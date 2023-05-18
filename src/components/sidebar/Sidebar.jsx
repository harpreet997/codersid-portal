import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import SidebarLogo from '../../assets/SidebarLogo.png';
import DashboardIcon from '../../assets/DashboardIcon.png';
import StudentIcon from '../../assets/Studentlist.png';
import MasterIcon from '../../assets/MasterIcon.png';
import MasterArrowIcon from '../../assets/MasterArrowIcon.png';
import ListIcon from '../../assets/ListIcon.png';
import PaymentIcon from '../../assets/PaymentIcon.png';
import ExpenseManageIcon from '../../assets/ExpenseManageIcon.png';
import '../../styles/sidebar/sidebar.css';

const Sidebar = () => {
    const [showMaster, setShowMaster] = useState(true);
    const [showPayment, setShowPayment] = useState(true);
    const role = localStorage.getItem('role');

    const handleMaster = () => {
        setShowMaster(!showMaster)
    }

    const handlePayment = () => {
        setShowPayment(!showPayment)
    }

    return (
        <div className="sidebar ">
            <div className="d-flex">
                <img className='sidebar-logo' src={SidebarLogo} alt="SidebarLogo" />
                <p className='sidebar-text'>{role === 'admin' ? "Welcome Admin" : "Welcome User"}</p>
            </div>
            <div className='sidebar-line'></div>
            <div className='d-flex'>
                <NavLink className='sidebar-item-1' to='/dashboard'>Dashboard</NavLink>
                <img className='dashboard-text-icon' src={DashboardIcon} alt="DashboardIcon" />
            </div>
            <div className='d-flex'>
                <NavLink className='sidebar-item-2' to='/students-list'>CodersID Students</NavLink>
                <img className='codersid-students-icon' src={StudentIcon} alt="StudentIcon" />
            </div>

            {role === 'admin' ?
                <>
                    <div className='d-flex'>
                        <p className='sidebar-item-3' onClick={handleMaster}>Master</p>
                        <img className='master-text-icon' src={MasterIcon} alt="MasterIcon" />
                        <img className='master-arrow-icon' src={MasterArrowIcon} alt="MasterArrowIcon" />
                    </div>

                    {
                        showMaster ?
                            <>
                                <div className="d-flex">
                                    <img className='list-icon' src={ListIcon} alt="ListIcon" />
                                    <NavLink className='add-batch-text' to='/add-batch'>Add Batch</NavLink>
                                </div>
                                <div className="d-flex">
                                    <img className='list-icon-2' src={ListIcon} alt="ListIcon" />
                                    <NavLink className='add-user-text' to='/add-user'>Add User</NavLink>
                                </div>
                                <div className="d-flex">
                                    <img className='list-icon-3' src={ListIcon} alt="ListIcon" />
                                    <NavLink className='add-course-text' to='/add-course'>Add Course</NavLink>
                                </div>
                                <div className="d-flex">
                                    <img className='list-icon-4' src={ListIcon} alt="ListIcon" />
                                    <NavLink className='add-expense-text' to='/add-expense-category'>Add Expense Category</NavLink>
                                </div>
                            </>
                            : null
                    }

                </>
                : null}
            <div className='d-flex'>
                <p className='payment-text' onClick={handlePayment}>Payment</p>
                <img className='payment-icon' src={PaymentIcon} alt="PaymentIcon" />
                <img className='payment-arrow-icon' src={MasterArrowIcon} alt="MasterArrowIcon" />
            </div>
            {
                showPayment ?
                    <>
                        <div className="d-flex">
                            <img className='list-icon-5' src={ListIcon} alt="ListIcon" />
                            <NavLink className='payment-records' to='/payment-records'>Payment Records</NavLink>
                        </div>
                        <div className="d-flex">
                            <img className='list-icon-6' src={ListIcon} alt="ListIcon" />
                            <NavLink className='payfee' to='/payment'>Pay Fee</NavLink>
                        </div>
                    </>
                    : null
            }
            <div className="d-flex">
            <NavLink className='expense-management' to='/manage-expense'>Manage Expense</NavLink>
            <img className='sidebar-expense-manage-icon' src={ExpenseManageIcon} alt="ExpenseManageIcon" />
            </div>
        </div>
    );
}

export default Sidebar
