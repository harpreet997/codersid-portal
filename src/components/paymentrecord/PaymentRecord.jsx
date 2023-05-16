import React, { useEffect, useState } from 'react';
import Pagination from '../pagination/Pagination';
import NoRecord from '../../assets/NoRecord.png';
import { getAllPayments } from '../../getdata/getdata';
import { headers } from '../../headers';
import { getAllBatches } from '../../getdata/getdata';
import PaymentRecordLogo from '../../assets/PaymentRecordLogo.png';
import { useNavigate } from 'react-router-dom';
import '../../styles/paymentrecords/paymentrecords.css';

const PaymentRecord = () => {
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
        navigate('/payment-receipt', { state: { item } })
    }


    useEffect(() => {
        getAllPayments(headers)
            .then((response) => {
                setStudentList(response.data.Payments);
                setAllStudentList(response.data.Payments);
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

    const handleFromDate = (event) => {
        const fromDate = event.target.value
        let data = allstudentlist.filter((item, i) => {
            return item.createdAt.substring(0, 10) >= fromDate;
        })
        setStudentList(data);
    }

    const handleToDate = (event) => {
        const toDate = event.target.value
        let data = allstudentlist.filter((item, i) => {
            return item.createdAt.substring(0, 10) <= toDate;
        })
        setStudentList(data);
    }

    return (
        <div className="dashboardcard">
            <div className='d-flex'>
                <p className='payment-records-card-text'>Payment Records</p>
                <img className='payment-records-icon' src={PaymentRecordLogo} alt="PaymentRecordLogo" />
            </div>
            <div className="row">
                <div className="col-sm-3">
                    <p className="text-start select-field-label">Select Batch</p>
                    <select className="payment-records-input-width mb-2" name="batchName" id="batchName" onChange={handleBatchSelect}>
                        <option value="All Batch"></option>
                        {batchlist.map((item) => {
                            return (
                                <option value={item.batchName} >{item.batchName}</option>
                            )

                        })}
                    </select>
                </div>
                <div className="col-sm-3">
                    <p className="text-start input-field-label">Enter Student Name</p>
                    <input type="text" className="payment-records-input-width" id="studentname" name="studentname"
                        placeholder=""
                        onChange={(e) => setSearchStudentName(e.target.value)} />
                </div>
                <div className="col-sm-3">
                    <p className="text-start input-field-label">Select From Date</p>
                    <input type="date" className="payment-records-input-width" id="fromDate" name="fromDate"
                        onChange={handleFromDate} />
                </div>
                <div className="col-sm-3">
                    <p className="text-start input-field-label">Select To Date</p>
                    <input type="date" className="payment-records-input-width" id="toDate" name="toDate"
                        onChange={handleToDate} />
                </div>
            </div>
            
                <table className="table">
                    <thead >
                        <tr>
                            <th scope="col">Receipt No.</th>
                            <th scope="col">Receipt Date</th>
                            <th scope="col">StudentID</th>
                            <th scope="col">Name</th>
                            <th scope="col">Batch Name</th>
                            <th scope="col">Course</th>
                            <th scope="col">Amount</th>
                            <th scope="col">GST - 18%</th>
                            <th scope="col">Total Amount</th>
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
                                    <td>{`CI/${item._id.slice(-3, -1)}`}</td>
                                    <td>{item.createdAt.substring(0, 10)}</td>
                                    <td>{`CODERSID-${item.id}`}</td>
                                    <td>{item.StudentName}</td>
                                    <td>{item.batchname}</td>
                                    <td>{item.course}</td>
                                    <td>{item.Amount - (item.Amount * 18) / 100}</td>
                                    <td>{(item.Amount * 18) / 100}</td>
                                    <td>{item.Amount}</td>
                                    <td><button className='details-button' onClick={() => {
                                        handleNavigate(item)
                                    }}>
                                        <p className='details-button-text'>Details</p>
                                    </button></td>
                                    {/* <Modal show={modal === item._id ? true : false} onHide={handleClose} >
                                    <MainPaymentReceipt data={item} id={item.id} index={i} handleClose={handleClose} nPages={nPages}
                                        indexOfFirstRecord={indexOfFirstRecord} />
                                </Modal> */}
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

export default PaymentRecord;
