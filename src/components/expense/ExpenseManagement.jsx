import { useEffect, useState } from 'react';
import ExpenseManageIcon from '../../assets/ExpenseManageIcon.png';
import NoRecord from '../../assets/NoRecord.png';
import Pagination from '../pagination/Pagination';
import { getAllExpenses } from '../../getdata/getdata';
import { headers } from '../../headers';
import { useNavigate } from 'react-router-dom';
import '../../styles/expense/expensemanagement.css';

const ExpenseManagement = () => {
    const [expensedata, setExpenseData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [recordsPerPage] = useState(10);
    const indexOfLastRecord = currentPage * recordsPerPage;
    const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
    const currentRecords = expensedata.slice(indexOfFirstRecord, indexOfLastRecord);
    const nPages = Math.ceil(expensedata.length / recordsPerPage)
    const navigate = useNavigate();

    const handleNavigate = (item) => {
        navigate('/expense-details', {state:{item}})
    }

    useEffect(() => {
        getAllExpenses(headers)
            .then((response) => {
                setExpenseData(response.data.Expenses)
            })
            .catch((error) => {
                console.log(error);
            })
    })

    const handleAddExpense = () => {
        navigate("/add-expense")
    }
    
    return (
        <div className='dashboardcard'>
            <div className='d-flex'>
                <p className='expense-management-text'>Expense Management</p>
                <img className='expense-manage-icon' src={ExpenseManageIcon} alt="ExpenseManageIcon" />
                <div className='d-flex'>
                    <button className='add-expense-button ml-auto' onClick={handleAddExpense}>
                        <p className='add-expense-button-text'>Add Expense + </p>
                    </button>
                </div>
            </div>
            <div className='expense-line-1'></div>
            <table className="table">
                <thead >
                    <tr>
                        <th scope="col">Expense Category</th>
                        <th scope="col">Name of Expense</th>
                        <th scope="col">Vendor</th>
                        <th scope="col">Amount</th>
                        <th scope="col">Bill</th>
                        <th scope="col">Action</th>
                    </tr>

                </thead>
                <tbody>
                    {currentRecords.map((item, i) => {
                        return (
                            <tr key={i}>
                                <td>{item.categoryName}</td>
                                <td>{item.expenseName}</td>
                                <td>{item.vendor}</td>
                                <td>{item.amount}</td>
                                <td><img src={item.bill} alt={"Bill"} /></td>
                                <td><button className='details-button' onClick={() => {
                                    handleNavigate(item)
                                }}>
                                    <p className='details-button-text'>Details</p>
                                </button></td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>

            {currentRecords.length === 0 ?
                <div className='noRecordImage'>
                    <img src={NoRecord} alt='NoRecord' className='w-10' />
                </div>
                : null}
            {currentRecords.length > 0 ?
                <div className="pagination-button">
                    <Pagination
                        nPages={nPages}
                        currentPage={currentPage}
                        setCurrentPage={setCurrentPage}
                    />
                </div>

                : null}
        </div>
    );
}

export default ExpenseManagement;