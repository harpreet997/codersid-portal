import React, { useState, useEffect } from 'react';
import { addUser } from '../../postdata/postdata';
import { toast } from "react-toastify";
import { getAllUsers } from '../../getdata/getdata';
import Pagination from '../pagination/Pagination';
import { BallTriangle } from 'react-loader-spinner';
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
    }, []);

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
                <p className='add-user-card-text'>Add User</p>
                <img className='add-user-icon' src={AddUserLogo} alt="AddUserLogo" />
            </div>

            <form onSubmit={AddUser}>
                <div className="row mb-2">
                    <div className="col-sm-4">
                        <p className="text-start">Name</p>
                        <input type="text" className="add-user-input w-100" id="name" name="name"

                            onChange={handleChange} required />
                    </div>
                    <div className="col-sm-4">
                        <p className="text-start">Email Address</p>
                        <input type="email" className="add-user-input w-100" id="email" name="email"

                            onChange={handleChange} required />
                    </div>
                    <div className="col-sm-4">
                        <p className="text-start">Password</p>
                        <input type="password" className="add-user-input w-100" id="password" name="password"

                            onChange={handleChange} required />
                    </div>
                </div>
                <button className='add-user-button' type='submit'>
                    <p className='add-user-button-text'>Submit
                    </p></button>

            </form>
            <div className="scroll">
                <table className="table">
                    <thead className='text-center'>
                        <tr>
                            <th scope="col">Name</th>
                            <th scope="col">Email</th>
                            <th scope="col">Password</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody className='text-center'>
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

export default AddUser;
