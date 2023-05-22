import React, { useState, useEffect } from 'react';
import { addCategory } from '../../postdata/postdata';
import { toast } from "react-toastify";
import { getAllCategories } from '../../getdata/getdata';
import Pagination from '../pagination/Pagination';
import { BallTriangle } from 'react-loader-spinner';
import { headers } from '../../headers';
import { deleteCategory } from '../../postdata/postdata';
import ExpenseLogo from '../../assets/ExpenseIcon.png';
import '../../styles/expense/expense.css';

const AddExpenseCategory = () => {
    const [categorylist, setCategoryList] = useState([])
    const [categorydata, setCategorydata] = useState({
        categoryName: "",
    });
    const [currentPage, setCurrentPage] = useState(1);
    const [recordsPerPage] = useState(10);
    const indexOfLastRecord = currentPage * recordsPerPage;
    const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
    const currentRecords = categorylist.slice(indexOfFirstRecord, indexOfLastRecord);
    const nPages = Math.ceil(categorylist.length / recordsPerPage)

    useEffect(() => {
        getAllCategories(headers)
            .then((response) => {
                setCategoryList(response.data.Categories);
            })
            .catch((error) => {
                console.log(error);
            })
    }, []);

    const handleChange = (event) => {
        setCategorydata({
            ...categorydata,
            [event.target.name]: event.target.value
        })
    }

    const AddCategory = (event) => {
        event.preventDefault();
        addCategory(categorydata)
            .then((response) => {
                toast.success(response.data.msg, {
                    position: "top-center",
                    autoClose: 3000
                })
                window.location.reload(false);
            }
            )
            .catch((error) => {
                toast.error(error.response.data.msg, {
                    position: "top-center",
                    autoClose: 2000
                })
            })
    }

    const DeleteCategory = (id) => {
        deleteCategory(id)
            .then((response) => {
                toast.success(response.data.msg, {
                    position: "top-center",
                    autoClose: 2000
                })
                window.location.reload(false);
            })
            .catch((error) => {
                toast.error(error.response.data.msg, {
                    position: "top-center",
                    autoClose: 2000
                })
            })
    }

    return (
        <div className="card">
            <div className='d-flex'>
                <p className='expense-card-text'>Add Expense Category</p>
                <img className='expense-card-icon' src={ExpenseLogo} alt="ExpenseLogo" />
            </div>

            <form onSubmit={AddCategory}>
                <div className='d-flex'>
                    <div>
                        <p className="text-start">Category Name</p>
                        <input type="text" className="add-expense-input"
                            id="categoryName" name="categoryName"
                            onChange={handleChange} required />
                    </div>
                    <div>
                        <button className='add-expense-category-button' type='submit'>
                            <p className='add-expense-category-button-text'>Submit</p>
                        </button>
                    </div>
                </div>
            </form >

            <table className="table batch-table">
                <thead>
                    <tr>
                        <th scope="col">Category Name</th>
                        <th className='ps-3' scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {currentRecords.map((item, i) => {
                        return (
                            <tr key={i}>
                                <td className='ps-3'>{item.categoryName}</td>
                                <td>
                                    <button className='delete-button' onClick={() => DeleteCategory(item._id)}>
                                        <p className='delete-button-text'>Delete</p>
                                    </button></td>
                            </tr>
                        )
                    })}
                </tbody>

            </table>
            {
                currentRecords.length === 0 ?
                    <div className='d-flex justify-content-center'>
                        <BallTriangle
                            height={250}
                            width={300}
                            radius={5}
                            color="#10D1E3"
                            ariaLabel="ball-triangle-loading"
                            wrapperClassName=''
                            wrapperStyle=""
                            visible={true}
                        />
                    </div>
                    : null
            }
            {
                currentRecords.length > 0 ?
                    <div className="text-center">
                        <Pagination
                            nPages={nPages}
                            currentPage={currentPage}
                            setCurrentPage={setCurrentPage}
                        />
                    </div>

                    : null
            }
        </div >


    );
}

export default AddExpenseCategory;
