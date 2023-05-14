import { useEffect, useState } from 'react';
import ExpenseManageIcon from '../../assets/ExpenseManageIcon.png';
import '../../styles/expense/expensemanagement.css';
import { getAllExpenses } from '../../getdata/getdata';
import { headers } from '../../headers';
import { useNavigate } from 'react-router-dom';

const ExpenseManagement = () => {
    const [expensedata, setExpenseData] = useState([]);
    const navigate = useNavigate();

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
                        <th scope="col">Action</th>
                    </tr>

                </thead>
                <tbody>
                    {expensedata.map((item, i) => {
                        return (
                            <tr key={i}>
                                <td>{item.categoryName}</td>
                                <td>{item.expenseName}</td>
                                <td>{item.vendor}</td>
                                <td>{item.amount}</td>
                                <td><button className='expense-download-button'>
                                    <p className='expense-download-button-text'>Download</p>
                                </button></td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    );
}

export default ExpenseManagement;