import React, { useEffect, useState } from 'react';
import Pagination from '../pagination/Pagination';
import NoRecord from '../../assets/NoRecord.png';
import { getAllStudents } from '../../getdata/getdata';
import { Modal } from 'react-bootstrap';
import { headers } from '../../headers';
import { getAllBatches } from '../../getdata/getdata';
import PaymentStudentDetails from './PaymentStudentDetails';
import PayFee from '../../assets/PayFee.png';
import '../../styles/payfee/payfee.css';


const Payment = () => {
    const [studentlist, setStudentList] = useState([]);
    const [allstudentlist, setAllStudentList] = useState([]);
    const [batchlist, setBatchList] = useState([])
    const [modal, setModal] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [recordsPerPage] = useState(10);
    const indexOfLastRecord = currentPage * recordsPerPage;
    const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
    const currentRecords = studentlist.slice(indexOfFirstRecord, indexOfLastRecord);
    const nPages = Math.ceil(studentlist.length / recordsPerPage)
    const [studentName, setSearchStudentName] = useState('');

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

    const handleModal = (id) => {
        setModal(id)
    };

    const handleClose = () => setModal(false);

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
        <div className="dashboardcard">
            <div>
                <p className='payfee-card-text'>Pay Fee</p>
                <img className='payfee-icon' src={PayFee} alt="PayFee" />
            </div>
            <div className="row mt-5">
                <div className="col-sm-6">
                    <p className="text-start">Batch Name</p>
                    <select className="form-select mb-2" name="batchName" style={{width: 410}} id="batchName" onChange={handleBatchSelect}>
                        <option value="All Batch">Select Batch</option>
                        {batchlist.map((item) => {
                            return (
                                <option value={item.batchName} >{item.batchName}</option>
                            )

                        })}
                    </select>
                </div>
                <div className="col-sm-6">
                    <p className="text-start">Student Name</p>
                    <input type="text" className="form-control w-30" style={{width: 410}} id="studentname" name="studentname" placeholder="Search Student Name"
                        onChange={(e) => setSearchStudentName(e.target.value)} />
                </div>

            </div>
            <div className='scroll'>
                <table className="table">
                    {/* <div className='th-line-1'></div> */}
                    <thead >
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

                    <tbody>
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
                                    <td><button className='details-button'>
                                        <p className='details-button-text'>Details</p>
                                    </button></td>

                                </tr>
                            )
                        })}
                    </tbody>

                </table>
            </div>
        </div>


    );
}

export default Payment;
