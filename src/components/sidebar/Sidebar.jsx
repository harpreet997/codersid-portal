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
import FinanceIcon from '../../assets/FinanceIcon.png';
import LeadImage from '../../assets/LeadImage.png';
import '../../styles/sidebar/sidebar.css';

const Sidebar = () => {
    const [showMaster, setShowMaster] = useState(false);
    const [showPayment, setShowPayment] = useState(false);
    const [showLeads, setShowLeads] = useState(false);
    const [showTest, setShowTest] = useState(false);
    const role = localStorage.getItem('role');
    const user = JSON.parse(localStorage.getItem('user'));

    const handleMaster = () => {
        setShowMaster(!showMaster)
    }

    const handlePayment = () => {
        setShowPayment(!showPayment)
    }

    const handleLeads = () => {
        setShowLeads(!showLeads)
    }

    const handleTest = () => {
        setShowTest(!showTest)
    }

    return (
        <div className="sidebar ">
            <div className="d-flex">
                <img className='sidebar-logo' src={SidebarLogo} alt="SidebarLogo" />
                <p className='sidebar-text'>{role === 'admin' ? "Welcome Admin" : "Welcome User"}</p>
            </div>
            <div className='sidebar-line'></div>
            <div className='d-flex'>
                <img className='dashboard-text-icon' src={DashboardIcon} alt="DashboardIcon" />
                <NavLink className='sidebar-item-1' to='/dashboard'>Dashboard</NavLink>

            </div>
            {role === 'admin' || user[0].permission.includes('CodersID Students') ?
                <div className='d-flex'>
                    <img className='codersid-students-icon' src={StudentIcon} alt="StudentIcon" />
                    <NavLink className='sidebar-item-2' to='/students-list'>CodersID Students</NavLink>
                </div>
                : null}

            {role === 'admin' || user[0].permission.includes('Master') ?
                <>
                    <div className='d-flex'>
                        <img className='master-text-icon' src={MasterIcon} alt="MasterIcon" />
                        <p className='sidebar-item-3' onClick={handleMaster}>Master</p>
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
                                    <NavLink className='add-user-text' to='/user-list'>Add User</NavLink>
                                </div>
                                <div className="d-flex">
                                    <img className='list-icon-3' src={ListIcon} alt="ListIcon" />
                                    <NavLink className='add-course-text' to='/add-course'>Add Course</NavLink>
                                </div>
                                <div className="d-flex">
                                    <img className='list-icon-4' src={ListIcon} alt="ListIcon" />
                                    <NavLink className='add-expense-text' to='/add-expense-category'>Add Expense Category</NavLink>
                                </div>
                                <div className="d-flex">
                                    <img className='list-icon-4' src={ListIcon} alt="ListIcon" />
                                    <NavLink className='add-expense-text' to='/add-assessment-category'>Add Assessment Category</NavLink>
                                </div>
                            </>
                            : null
                    }

                </>
                : null}

            {role === 'admin' || user[0].permission.includes('Leads') ?
                <>
                    <div className='d-flex'>
                        <img className='lead-icon' src={LeadImage} alt="LeadImage" />
                        <p className='sidebar-item-3' onClick={handleLeads}>Leads</p>
                        <img className='master-arrow-icon' src={MasterArrowIcon} alt="MasterArrowIcon" />
                    </div>
                    {
                        showLeads ?
                            <>
                                <div className="d-flex">
                                    <img className='list-icon' src={ListIcon} alt="ListIcon" />
                                    <NavLink className='add-batch-text' to='/all-leads'>All Leads</NavLink>
                                </div>
                                <div className="d-flex">
                                    <img className='list-icon-2' src={ListIcon} alt="ListIcon" />
                                    <NavLink className='add-user-text' to='/followup'>Followup</NavLink>
                                </div>
                                <div className="d-flex">
                                    <img className='list-icon-3' src={ListIcon} alt="ListIcon" />
                                    <NavLink className='add-course-text' to='/cold-reach-out'>Cold Reach out</NavLink>
                                </div>
                                <div className="d-flex">
                                    <img className='list-icon-4' src={ListIcon} alt="ListIcon" />
                                    <NavLink className='add-expense-text' to='/convered-leads'>Converted</NavLink>
                                </div>
                                <div className="d-flex">
                                    <img className='list-icon-4' src={ListIcon} alt="ListIcon" />
                                    <NavLink className='add-expense-text' to='/lost-leads'>Not Interested/ Permanently Lost.</NavLink>
                                </div>
                                <div className="d-flex">
                                    <img className='list-icon-4' src={ListIcon} alt="ListIcon" />
                                    <NavLink className='add-expense-text' to='/walk-in'>Walk-Ins</NavLink>
                                </div>
                            </>
                            : null
                    }
                </>
                : null}



            {role === 'admin' || user[0].permission.includes('Payment') ?
                <>
                    <div className='d-flex'>
                        <img className='payment-icon' src={PaymentIcon} alt="PaymentIcon" />
                        <p className='payment-text' onClick={handlePayment}>Payment</p>
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
                </>
                : null}

            {role === 'admin' || user[0].permission.includes('Manage Expense') ?
                <div className="d-flex">
                    <img className='sidebar-expense-manage-icon' src={ExpenseManageIcon} alt="ExpenseManageIcon" />
                    <NavLink className='expense-management' to='/manage-expense'>Manage Expense</NavLink>
                </div>
                : null}

            {role === "admin" || user[0].permission.includes('Finance') ?
                <div className="d-flex">
                    <img className='sidebar-expense-manage-icon' src={FinanceIcon} alt="FinanceIcon" />
                    <NavLink className='expense-management' to='/finance'>Finance</NavLink>
                </div> : null}

            {role === 'admin' || user[0].permission.includes('Assessment') ?
                <>
                    <div className='d-flex'>
                        <img className='payment-icon' src={PaymentIcon} alt="PaymentIcon" />
                        <p className='payment-text' onClick={handleTest}>Assessment</p>
                        <img className='payment-arrow-icon' src={MasterArrowIcon} alt="MasterArrowIcon" />
                    </div>
                    {
                        showTest ?
                            <>
                                <div className="d-flex">
                                    <img className='list-icon-5' src={ListIcon} alt="ListIcon" />
                                    <NavLink className='payment-records' to='/create-test'>Create Assessment</NavLink>
                                </div>
                                <div className="d-flex">
                                    <img className='list-icon-5' src={ListIcon} alt="ListIcon" />
                                    <NavLink className='payment-records' to='/all-tests'>All Assessments</NavLink>
                                </div>
                                <div className="d-flex">
                                    <img className='list-icon-5' src={ListIcon} alt="ListIcon" />
                                    <NavLink className='payment-records' to='/performance'>Performance</NavLink>
                                </div>
                                {/* <div className="d-flex">
                                    <img className='list-icon-5' src={ListIcon} alt="ListIcon" />
                                    <NavLink className='payment-records' to='/react-test'>React Assessment</NavLink>
                                </div>
                                <div className="d-flex">
                                    <img className='list-icon-5' src={ListIcon} alt="ListIcon" />
                                    <NavLink className='payment-records' to='/node-test'>Node Assessment</NavLink>
                                </div>
                                <div className="d-flex">
                                    <img className='list-icon-5' src={ListIcon} alt="ListIcon" />
                                    <NavLink className='payment-records' to='/javascript-test'>Javascript Assessment</NavLink>
                                </div> */}
                            </>
                            : null
                    }
                </>
                : null}
        </div>
    );
}

export default Sidebar
