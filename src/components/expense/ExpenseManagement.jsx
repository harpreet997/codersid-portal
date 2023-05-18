import { useEffect, useState } from 'react';
import { Modal } from 'react-bootstrap';
import ExpenseManageIcon from '../../assets/ExpenseManageIcon.png';
import ExpenseDetails from '../../components/expense/ExpenseDetails';
import { BallTriangle } from 'react-loader-spinner';
import Pagination from '../pagination/Pagination';
import { getAllExpenses } from '../../getdata/getdata';
import { headers } from '../../headers';
import { useNavigate } from 'react-router-dom';
import '../../styles/expense/expensemanagement.css';

const ExpenseManagement = () => {
    const [expensedata, setExpenseData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [recordsPerPage] = useState(10);
    const [modal, setModal] = useState(false);
    const indexOfLastRecord = currentPage * recordsPerPage;
    const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
    const currentRecords = expensedata.slice(indexOfFirstRecord, indexOfLastRecord);
    const nPages = Math.ceil(expensedata.length / recordsPerPage)

    const navigate = useNavigate();

    const handleModal = (id) => {
        setModal(id)
    };

    const handleClose = () => setModal(false);

    useEffect(() => {
        getAllExpenses(headers)
            .then((response) => {
                setExpenseData(response.data.Expenses)
            })
            .catch((error) => {
                console.log(error);
            })
    }, [])

    const handleAddExpense = () => {
        navigate("/add-expense")
    }

    return (
        <div className='card'>
            <div className='d-flex justify-content-between'>
                <p className='expense-management-text'>Expense Management
                    <img className='expense-manage-icon' src={ExpenseManageIcon} alt="ExpenseManageIcon" /></p>
                <button className='add-expense-button ml-auto' onClick={handleAddExpense}>
                    <p className='add-expense-button-text'>Add Expense + </p>
                </button>
            </div>
            <div className='expense-line-1'></div>
            <div className="scroll">
                <table className="table">
                    <thead className='text-center'>
                        <tr>
                            <th scope="col">Expense Category</th>
                            <th scope="col">Name of Expense</th>
                            <th scope="col">Vendor</th>
                            <th scope="col">Amount</th>
                            <th scope="col">Invoice Number</th>
                            <th scope="col">Action</th>
                        </tr>

                    </thead>
                    <tbody className='text-center'>
                        {currentRecords.map((item, i) => {
                            return (
                                <tr key={i}>
                                    <td>{item.categoryName}</td>
                                    <td>{item.expenseName}</td>
                                    <td>{item.vendor}</td>
                                    <td>{item.amount}</td>
                                    <td>{item.invoiceNumber}</td>
                                    <td><button className='details-button' onClick={() => {
                                        handleModal(item._id)
                                    }}>
                                        <p className='details-button-text'>Details</p>
                                    </button></td>
                                    <Modal show={modal === item._id ? true : false} onHide={handleClose}>
                                        <ExpenseDetails data={item} />
                                    </Modal>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>

                {currentRecords.length === 0 ?
                    <div className='d-flex justify-content-center'>
                        <BallTriangle
                            height={300}
                            width={300}
                            radius={5}
                            color="#10D1E3"
                            ariaLabel="ball-triangle-loading"
                            wrapperClassName=''
                            wrapperStyle=""
                            visible={true}
                        />
                    </div>
                    : null}

            </div>
            {currentRecords.length > 0 ?
                <div className="text-center">
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