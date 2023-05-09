import React, { useState, useEffect } from 'react';
import { addUser } from '../../postdata/postdata';
import { toast } from "react-toastify";
import { getAllUsers } from '../../getdata/getdata';
import Pagination from '../pagination/Pagination';
import NoRecord from '../../assets/NoRecord.png';
import { headers } from '../../headers';
import { deleteUser } from '../../postdata/postdata';
import AddUserLogo from '../../assets/AddUser.png'
import '../../styles/user/user.css';

const AddUser = () => {
    const [userlist, setUserList] = useState([])
    const [userdata, setUserdata] = useState({
        name: "",
        email: "",
        password: ""
    });

    const [currentPage, setCurrentPage] = useState(1);
    const [recordsPerPage] = useState(10);
    const indexOfLastRecord = currentPage * recordsPerPage;
    const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
    const currentRecords = userlist.slice(indexOfFirstRecord, indexOfLastRecord);
    const nPages = Math.ceil(userlist.length / recordsPerPage)

    useEffect(() => {
        getAllUsers(headers)
            .then((response) => {
                setUserList(response.data.Users);
            })
            .catch((error) => {
                console.log(error);
            })
    }, [userlist]);

    const handleChange = (event) => {
        setUserdata({
            ...userdata,
            [event.target.name]: event.target.value
        })
    }

    const AddUser = (event) => {
        event.preventDefault();
        addUser(userdata)
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

    const DeleteUser = (id) => {
        deleteUser(id)
            .then((response) => {
                toast.success(response.data.msg, {
                    position: "top-center",
                    autoClose: 2000
                })
            })
            .catch((error) => {
                toast.error(error.response.data.msg, {
                    position: "top-center",
                    autoClose: 2000
                })
            })
    }

    return (
        <div className="dashboardcard">
            <div className='mb-4'>
                <p className='add-user-card-text'>Add User</p>
                <img className='add-user-icon' src={AddUserLogo} alt="AddUserLogo" />
            </div>

            <form className='mt-4' onSubmit={AddUser}>
                <div className="row">
                    <div className="col-sm-4 mb-3">
                        <p className="text-start">Name</p>
                        <input type="text" className="form-input-box form-control w-80" id="name" name="name"
                            placeholder="Enter Name"
                            onChange={handleChange} required />
                    </div>
                    <div className="col-sm-4 mb-3">
                        <p className="text-start">Email Address</p>
                        <input type="email" className="form-input-box form-control w-80" id="email" name="email"
                            placeholder="Enter Email Address"
                            onChange={handleChange} required />
                    </div>
                    <div className="col-sm-4 mb-3">
                        <p className="text-start">Password</p>
                        <input type="password" className="form-input-box form-control w-80" id="password" name="password"
                            placeholder="Enter Password"
                            onChange={handleChange} required />
                    </div>
                </div>
                <button className='mt-4 add-user-button' type='submit'>
                    <p className='add-user-button-text'>Submit
                    </p></button>

            </form>
            {/* <div className='user-list-card'> */}
            <table className="table user-table">
                <thead>
                    <tr>
                        <th scope="col">Name</th>
                        <th scope="col">Email</th>
                        <th scope="col">Password</th>
                        <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {currentRecords.map((item, i) => {
                        return (
                            <tr key={i}>
                                <td>{item.name}</td>
                                <td>{item.email}</td>
                                <td>{item.password}</td>
                                <td>
                                    <button className='delete-button' onClick={() => DeleteUser(item._id)}>
                                        <p className='delete-button-text'>Delete</p>
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

export default AddUser;
