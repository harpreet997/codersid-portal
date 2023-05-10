import React, { useEffect, useState } from 'react';
import { headers } from '../../headers';
import '../../styles/dashboard/dashboard.css';
import { getAllBatches, getAllCourses } from '../../getdata/getdata';
import { useNavigate } from 'react-router-dom';
import { addStudent } from '../../postdata/postdata';
import { toast } from "react-toastify";
import '../../styles/student/addstudent.css';

const AddStudent = () => {
    const [studentdata, setStudentdata] = useState({
        studentname: "",
        batchname: "",
        course: "",
        emailid: "",
        contactdetails: "",
        address: "",
        totalfees: "",
        registration: {
            registrationfees: "",
            registrationDate: "",
            registrationPaymentStatus: "Not Paid"
        },
        secondInstallment: {
            secondInstallmentfees: "",
            secondInstallmentDate: "",
            secondInstallmentPaymentStatus: "Not Paid"
        },
        thirdInstallment: {
            thirdInstallmentfees: "",
            thirdInstallmentDate: "",
            thirdInstallmentPaymentStatus: "Not Paid"
        },
    });
    const [batchlist, setBatchList] = useState([]);
    const [courselist, setCourseList] = useState([]);
    const [mindate, setMinimumDate] = useState();
    const [totalfees, setTotalfees] = useState();
    const navigate = useNavigate();

    useEffect(() => {
        disableDates();
        getAllBatches(headers)
            .then((response) => {
                setBatchList(response.data.Batches);
            })
            .catch((error) => {
                console.log(error);
            })
        getAllCourses(headers)
            .then((response) => {
                setCourseList(response.data.Courses);
            })
            .catch((error) => {
                console.log(error);
            })
    }, [])

    const handleTotalFees = (event) => {
        const totalfees = event.target.value
        setTotalfees(totalfees)
        let registrationfees = (totalfees * 25) / 100
        let secondfees = (totalfees * 75 / 2) / 100
        let thirdfees = (totalfees * 75 / 2) / 100
        studentdata.registration.registrationfees = registrationfees
        studentdata.secondInstallment.secondInstallmentfees = secondfees
        studentdata.thirdInstallment.thirdInstallmentfees = thirdfees
        setStudentdata({
            ...studentdata,
            [event.target.name]: totalfees
        })
    }

    const handleChange = (event) => {
        setStudentdata({
            ...studentdata,
            [event.target.name]: event.target.value
        })
    }

    const AddStudent = (event) => {
        event.preventDefault();
        addStudent(studentdata)
            .then((response) => {
                toast.success(response.data.msg, {
                    position: "top-center",
                    autoClose: 3000
                })
                navigate("/students-list");
            }
            )
            .catch((error) => {
                toast.error(error.response.data.msg, {
                    position: "top-center",
                    autoClose: 2000
                })
            })

    }


    const handleRegistrationFees = (event) => {
        const registrationfee = event.target.value;
        const difference = (totalfees - registrationfee) / 2;
        studentdata.secondInstallment.secondInstallmentfees = difference
        studentdata.thirdInstallment.thirdInstallmentfees = difference
        setStudentdata({
            ...studentdata,
            registration: {
                ...studentdata.registration,
                [event.target.name]: event.target.value
            }
        })
    }

    const handleSecondInstallmentFees = (event) => {
        const secondInstallmentFees = event.target.value;
        const difference = (totalfees - secondInstallmentFees) / 2;
        studentdata.registration.registrationfees = difference
        studentdata.thirdInstallment.thirdInstallmentfees = difference
        setStudentdata({
            ...studentdata,
            secondInstallment: {
                ...studentdata.secondInstallment,
                [event.target.name]: event.target.value
            }
        })
    }

    const handleThirdInstallmentFees = (event) => {
        const thirdInstallmentFees = event.target.value;
        const difference = (totalfees - thirdInstallmentFees) / 2;
        studentdata.registration.registrationfees = difference
        studentdata.secondInstallment.secondInstallmentfees = difference
        setStudentdata({
            ...studentdata,
            thirdInstallment: {
                ...studentdata.thirdInstallment,
                [event.target.name]: event.target.value
            }
        })
    }

    const handleRegistrationDate = (event) => {
        const registrationDate = event.target.value
        studentdata.registration.registrationDate = registrationDate

    }

    const handleSecondInstallmentDate = (event) => {
        const secondInstallmentDate = event.target.value
        studentdata.secondInstallment.secondInstallmentDate = secondInstallmentDate

    }

    const handleThirdInstallmentDate = (event) => {
        const thirdInstallmentDate = event.target.value
        studentdata.thirdInstallment.thirdInstallmentDate = thirdInstallmentDate
    }

    const disableDates = () => {
        var today, dd, mm, yyyy;
        today = new Date();
        dd = today.getDate();
        mm = today.getMonth() + 1;
        yyyy = today.getFullYear();
        if (dd < 10) {
            setMinimumDate(`${yyyy}-0${mm}-0${dd}`);
        }
        else {
            setMinimumDate(`${yyyy}-0${mm}-${dd}`);
        }
    }

    return (
        <div className="dashboardcard">
            <p className='add-student-heading-text'>CodersID Students</p>

            <form onSubmit={AddStudent}>
                <div className='mt-5 row'>
                    <div className="col-sm-4 mb-3">
                        <p className="text-start">Student Name</p>
                        <input type="text" className="input-box-width form-control w-60" id="studentname" name="studentname"
                            placeholder="Enter Student Name"
                            onChange={handleChange} required />
                    </div>
                    <div className="col-sm-4 mb-3">
                        <p className="text-start">Select Batch</p>
                        <select className="input-box-width form-select w-60" name="batchname" onChange={handleChange} required>
                            <option value="">Select Batch</option>
                            {batchlist.map((item) => {
                                return (
                                    <option value={item.batchName}>{item.batchName}</option>
                                )
                            })}
                        </select>
                    </div>
                    <div className="col-sm-4 mb-3">
                        <p className="text-start">Course Name</p>
                        <select className="input-box-width form-select w-60" name="course" onChange={handleChange} required>
                            <option value="">Select Course</option>
                            {courselist.map((item) => {
                                return (
                                    <option value={item.courseName}>{item.courseName}</option>
                                )
                            })}
                        </select>
                    </div>
                    <div className="col-sm-4 mb-3">
                        <p className="text-start">Email Address</p>
                        <input type="email" className="input-box-width form-control w-60" id="emailid" name="emailid"
                            placeholder="Enter Email Address"
                            onChange={handleChange} required />
                    </div>
                    <div className="col-sm-4 mb-3">
                        <p className="text-start">Contact Number</p>
                        <input type="tel" className="input-box-width form-control w-60" id="contactdetails" name="contactdetails"
                            placeholder="Enter Contact Number"
                            pattern="[0-9]{3}[0-9]{4}[0-9]{3}" onChange={handleChange} required />
                    </div>
                    <div className="col-sm-4 mb-3">
                        <p className="text-start">Address</p>
                        <input type="text" className="input-box-width form-control w-60" id="address" name="address"
                            placeholder="Enter Address"
                            onChange={handleChange} required />
                    </div>
                    <div className="col-sm-4 mb-3">
                        <p className="text-start">Total Fees</p>
                        <input type="number" className="input-box-width form-control w-60" min={1} id="totalfees" name="totalfees"
                            placeholder='Enter Total Fees'
                            onChange={handleTotalFees} required />
                    </div>
                    <div className="col-sm-4 mb-3">
                        <p className="text-start">Registration Fees</p>
                        <input type="number" className="input-box-width form-control w-60"
                            value={studentdata.registration.registrationfees} max={studentdata.totalfees}
                            id="registrationfees" name="registrationfees"
                            placeholder='Enter Registration Fees' onChange={handleRegistrationFees} required />
                    </div>
                    <div className="col-sm-4 mb-3">
                        <p className="text-start">Registration Date</p>
                        <input type="date" className="input-box-width form-control w-60" min={mindate} id="registrationDate"
                            name="registrationDate"
                            onChange={handleRegistrationDate} required />
                    </div>
                    <div className="col-sm-4 mb-3">
                        <p className="text-start">1st Installment Fees</p>
                        <input type="number" className="input-box-width form-control w-60"
                            value={studentdata.secondInstallment.secondInstallmentfees}
                            min={studentdata.registration.registrationfees}
                            max={studentdata.totalfees} id="secondInstallmentfees" name="secondInstallmentfees"
                            placeholder='Enter 1st Installment Fees' onChange={handleSecondInstallmentFees} required />
                    </div>
                    <div className="col-sm-4 mb-3">
                        <p className="text-start">1st Installment Date</p>
                        <input type="date" className="input-box-width form-control w-60" min={mindate} id="secondfeesDate"
                            name="secondfeesDate"
                            onChange={handleSecondInstallmentDate} required />
                    </div>
                    <div className="col-sm-4 mb-3">
                        <p className="text-start">2nd Installment Fees</p>
                        <input type="number" className="input-box-width form-control w-60"
                            value={studentdata.thirdInstallment.thirdInstallmentfees}
                            min={studentdata.registration.registrationfees}
                            max={studentdata.totalfees} id="thirdInstallmentfees" name="thirdInstallmentfees"
                            placeholder='Enter 2nd Installment Fees' onChange={handleThirdInstallmentFees} required />
                    </div>
                    <div className="col-sm-4 mb-3">
                        <p className="text-start">2nd Installment Date</p>
                        <input type="date" className="input-box-width form-control w-60" min={mindate} id="thirdfeesDate"
                            name="thirdfeesDate"
                            onChange={handleThirdInstallmentDate} required />
                    </div>
                </div>
                <button className='add-student-form-button' type='submit'>
                    <p className='add-student-form-button-text'>Submit</p>
                    </button>
            </form>

        </div>


    );
}

export default AddStudent;