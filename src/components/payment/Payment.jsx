import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Pagination from '../pagination/Pagination';
import { getAllStudents } from '../../getdata/getdata';
import { headers } from '../../headers';
import { getAllBatches } from '../../getdata/getdata';
import { BallTriangle } from 'react-loader-spinner';
import PayFee from '../../assets/PayFee.png';
import '../../styles/payfee/payfee.css';


const Payment = () => {
    const [studentlist, setStudentList] = useState([]);
    const [allstudentlist, setAllStudentList] = useState([]);
    const [batchlist, setBatchList] = useState([])
    const [currentPage, setCurrentPage] = useState(1);
    const [recordsPerPage] = useState(10);
    const indexOfLastRecord = currentPage * recordsPerPage;
    const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
    const currentRecords = studentlist.slice(indexOfFirstRecord, indexOfLastRecord);
    const nPages = Math.ceil(studentlist.length / recordsPerPage)
    const [studentName, setSearchStudentName] = useState('');
    const navigate = useNavigate();

    const handleNavigate = (item) => {
        navigate('/make-payment', { state: { item } })
    }


    useEffect(() => {
        getAllStudents(headers)
            .then((response) => {
                setStudentList(response.data.Students);
                setAllStudentList(response.data.Students)
            })
            .catch((error) => {
                console.log(error);
            })

        getAllBatches(headers)
            .then((response) => {
                setBatchList(response.data.Batches);
            })
            .catch((error) => {
                console.log(error);
            })
    }, []);

    const handleBatchSelect = (event) => {
        const batchName = event.target.value;
        console.log(batchName)
        if (batchName === 'All Batch') {
            setStudentList(allstudentlist);
        }
        else {
            let data = allstudentlist.filter((item, i) => {
                return item.batchname === batchName;
            })
            console.log(data);
            if (data.length > 0) {
                setStudentList(data);
            }
            else {
                setStudentList([])
            }
        }
    }

    return (
        <div className="card">
            <div className='d-flex'>
                <p className='payfee-card-text'>Pay Fee</p>
                <img className='payfee-icon' src={PayFee} alt="PayFee" />
            </div>
            <div className="row">
                <div className="col-sm-6">
                    <p className="text-start select-field-label">Select Batch</p>
                    <select className="pay-fee-input-width mb-2 w-100" name="batchName" id="batchName" onChange={handleBatchSelect}>
                        <option value="All Batch"></option>
                        {batchlist.map((item) => {
                            return (
                                <option value={item.batchName} >{item.batchName}</option>
                            )

                        })}
                    </select>
                </div>
                <div className="col-sm-6">
                    <p className="text-start input-field-label">Student Name</p>
                    <input type="text" className="pay-fee-input-width w-100" id="studentname" name="studentname"
                        onChange={(e) => setSearchStudentName(e.target.value)} />
                </div>

            </div>
            <div className='scroll'>
                <table className="table">
                    <thead className='text-center'>
                        <tr>
                            <th scope="col">StudentID</th>
                            <th scope="col">Name</th>
                            <th scope="col">Batch Name</th>
                            <th scope="col">Course</th>
                            <th scope="col">Email ID</th>
                            <th scope="col">Contact Details</th>
                            <th scope="col">Admission Date</th>
                            <th scope="col">Action</th>
                        </tr>

                    </thead>

                    <tbody className='text-center'>
                        {currentRecords.filter((val) => {
                            if (studentName === "") {
                                return val;
                            }
                            else if (val.StudentName.toLowerCase().includes(studentName.toLowerCase())) {
                                return val;
                            }
                        }).map((item, i) => {
                            return (
                                <tr key={i}>
                                    <td>{`CODERSID-${item.id}`}</td>
                                    <td>{item.studentname}</td>
                                    <td>{item.batchname}</td>
                                    <td>{item.course}</td>
                                    <td>{item.emailid}</td>
                                    <td>{item.contactdetails}</td>
                                    <td>{item.createdAt.substring(0, 10)}</td>
                                    <td><button className='payfee-payment-button' onClick={() => {
                                        handleNavigate(item)
                                    }}>
                                        <p className='payfee-payment-button-text'>Make Payment</p>
                                    </button></td>
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

export default Payment;
