import { useState, useEffect } from "react";
import { updatePaymentStatus, addPaymentRecord } from "../../postdata/postdata";
import { toast } from "react-toastify";
import { useNavigate, useLocation } from "react-router-dom";
import '../../styles/payfee/makepayment.css';


const MakePayment = () => {
    const location = useLocation();
    const data = location.state.item;
    const id = location.state.item._id;

    const [paymentdata, setPaymentData] = useState({
        registration: {
            registrationfees: data.registration.registrationfees,
            registrationDate: data.registration.registrationDate,
            registrationPaymentStatus: data.registration.registrationPaymentStatus
        },
        secondInstallment: {
            secondInstallmentfees: data.secondInstallment.secondInstallmentfees,
            secondInstallmentDate: data.secondInstallment.secondInstallmentDate,
            secondInstallmentPaymentStatus: data.secondInstallment.secondInstallmentPaymentStatus
        },
        thirdInstallment: {
            thirdInstallmentfees: data.thirdInstallment.thirdInstallmentfees,
            thirdInstallmentDate: data.thirdInstallment.thirdInstallmentDate,
            thirdInstallmentPaymentStatus: data.thirdInstallment.thirdInstallmentPaymentStatus
        },
        fourthInstallment: {
            fourthInstallmentfees: data.fourthInstallment.fourthInstallmentfees,
            fourthInstallmentDate: "",
            fourthInstallmentPaymentStatus: data.fourthInstallment.fourthInstallmentPaymentStatus
        },
        BalanceAmount: data.BalanceAmount
    })


    const [paymentrecord, setPaymentRecord] = useState({
        id: data.id,
        StudentName: data.studentname,
        batchname: data.batchname,
        course: data.course,
        Email: data.emailid,
        contactdetails: data.contactdetails,
        Amount: "",
        PaymentType: "",
        PaymentMode: ""
    })

    const [thirdfees, setThirdfees] = useState();
    const [mindate, setMinimumDate] = useState();
    const navigate = useNavigate();


    useEffect(() => {
        disableDates();
    }, [])

    console.log(paymentdata.registration.registrationPaymentStatus);

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

    const handlePaymentStatus = (event) => {
        setPaymentData({
            ...paymentdata,
            registration: {
                ...paymentdata.registration,
                [event.target.name]: event.target.value
            },
            secondInstallment: {
                ...paymentdata.secondInstallment,
                [event.target.name]: event.target.value
            },
            thirdInstallment: {
                ...paymentdata.thirdInstallment,
                [event.target.name]: event.target.value
            },
            fourthInstallment: {
                ...paymentdata.fourthInstallment,
                [event.target.name]: event.target.value
            },

        })
    }

    const handleRegistrationChange = (event) => {
        const registrationfee = event.target.value;
        const difference = (paymentdata.registration.registrationfees - registrationfee);
        paymentdata.secondInstallment.secondInstallmentfees += difference

        setPaymentData({
            ...paymentdata,
            registration: {
                ...paymentdata.registration,
                [event.target.name]: event.target.value
            }
        })
    }

    const handleSecondInstallmentChange = (event) => {
        const secondInstallmentFees = event.target.value;
        const difference = (paymentdata.secondInstallment.secondInstallmentfees - secondInstallmentFees);
        paymentdata.thirdInstallment.thirdInstallmentfees += difference
        setPaymentData({
            ...paymentdata,
            secondInstallment: {
                ...paymentdata.secondInstallment,
                [event.target.name]: event.target.value
            }
        })
    }

    const handleThirdInstallmentChange = (event) => {
        setThirdfees(event.target.value)
        setPaymentData({
            ...paymentdata,
            thirdInstallment: {
                ...paymentdata.thirdInstallment,
                [event.target.name]: event.target.value
            }
        })

    }

    const handleFourthInstallmentChange = (event) => {
        setPaymentData({
            ...paymentdata,
            fourthInstallment: {
                ...paymentdata.fourthInstallment,
                [event.target.name]: event.target.value
            }
        })
    }


    const handleFourthInstallmentDate = (event) => {
        setPaymentData({
            ...paymentdata,
            fourthInstallment: {
                ...paymentdata.fourthInstallment,
                [event.target.name]: event.target.value
            }
        })
    }

    const handlePaymentType = (event) => {
        setPaymentRecord({
            ...paymentrecord,
            [event.target.name]: event.target.value
        })
    }

    const handlePaymentMode = (event) => {
        setPaymentRecord({
            ...paymentrecord,
            [event.target.name]: event.target.value
        })
    }

    console.log(data.thirdInstallment.thirdInstallmentPaymentStatus)
    console.log(paymentdata.thirdInstallment.thirdInstallmentPaymentStatus)

    const handlePayment = (event) => {
        event.preventDefault();
        if ((paymentdata.registration.registrationPaymentStatus === "Not Paid" &&
            paymentdata.secondInstallment.secondInstallmentPaymentStatus === "Not Paid") ||
            (paymentdata.secondInstallment.secondInstallmentPaymentStatus === "Not Paid"
                && paymentdata.thirdInstallment.thirdInstallmentPaymentStatus === "Paid")) {
            toast.error("Pay Previous Installments first", {
                position: "top-center",
                autoClose: 2000
            })

        }
        else if (paymentdata.registration.registrationPaymentStatus === "Not Paid" &&
            paymentdata.secondInstallment.secondInstallmentPaymentStatus === "Paid") {
            toast.error("Pay Previous Installments first", {
                position: "top-center",
                autoClose: 2000
            })

        }
        else if (paymentdata.registration.registrationPaymentStatus === "Not Paid" &&
            paymentdata.thirdInstallment.thirdInstallmentPaymentStatus === "Not Paid") {
            toast.error("Pay Previous Installments first", {
                position: "top-center",
                autoClose: 2000
            })

        }
        else {
            if (thirdfees < data.thirdInstallment.thirdInstallmentfees) {
                const totalfees = data.totalfees;
                const sumofThreeInstallments = Number(data.registration.registrationfees) + Number(data.secondInstallment.secondInstallmentfees) + Number(thirdfees);
                console.log(sumofThreeInstallments);
                const pendingAmount = Number(totalfees) - sumofThreeInstallments;

                if (pendingAmount > 0) {
                    paymentdata.fourthInstallment.fourthInstallmentfees = pendingAmount;
                    paymentdata.BalanceAmount = true;

                    updatePaymentStatus(id, paymentdata)
                        .then((response) => {
                            toast.success(response.data.msg, {
                                position: "top-center",
                                autoClose: 2000
                            })

                            navigate("/payment-records")
                        })
                        .catch((error) => {
                            toast.error(error.response.data.msg, {
                                position: "top-center",
                                autoClose: 2000
                            })
                        })
                }
            }

            else {
                updatePaymentStatus(id, paymentdata)
                    .then((response) => {
                        toast.success(response.data.msg, {
                            position: "top-center",
                            autoClose: 2000
                        })

                        navigate("/payment-records")
                    })
                    .catch((error) => {
                        toast.error(error.response.data.msg, {
                            position: "top-center",
                            autoClose: 2000
                        })
                    })
            }

            if (paymentrecord.PaymentType === "Registration fee") {
                paymentrecord.Amount = paymentdata.registration.registrationfees;
            }
            else if (paymentrecord.PaymentType === "Installment 1") {
                paymentrecord.Amount = paymentdata.secondInstallment.secondInstallmentfees;
            }
            else if (paymentrecord.PaymentType === "Installment 2") {
                paymentrecord.Amount = paymentdata.thirdInstallment.thirdInstallmentfees;
            }
            else {
                paymentrecord.Amount = paymentdata.fourthInstallment.fourthInstallmentfees;
            }

            console.log(paymentrecord);
            addPaymentRecord(paymentrecord)
                .then((response) => {
                    toast.success(response.data.msg, {
                        position: "top-center",
                        autoClose: 2000
                    })

                    navigate("/payment-records")
                })
                .catch((error) => {
                    toast.error(error.response.data.msg, {
                        position: "top-center",
                        autoClose: 2000
                    })
                })
        }
    }

    return (
        <div className='dashboardcard'>
            <p className='make-payment-title'>Payment Details</p>
            <form onSubmit={handlePayment}>
                <div className="row">
                    <div className="col-sm-4">
                        <p className='make-payment-student-name'>Student Name</p>
                        <input className='student-name-input-field form-control' type="text" id="studentname" name="studentname"
                            value={data.studentname} readOnly />
                    </div>
                    <div className="col-sm-4">
                        <p className='make-payment-student-name'>Select Batch</p>
                        <select className="student-name-input-field form-select" name="batchname" readOnly>
                            <option value={data.batchname}>{data.batchname}</option>
                        </select>
                    </div>
                    <div className="col-sm-4">
                        <p className='make-payment-student-name'>Course Name</p>
                        <select className="student-name-input-field form-select" name="course" readOnly>
                            <option value={data.course}>{data.course}</option>
                        </select>
                    </div>
                    <div className="col-sm-4">
                        <p className='make-payment-email-address'>Email Address</p>
                        <input className='student-name-input-field form-control' type="email" name="emailid" readOnly
                            value={data.emailid} />
                    </div>
                    <div className="col-sm-4">
                        <p className='make-payment-email-address'>Contact Number</p>
                        <input className='student-name-input-field form-control' type="text"
                            name="contactdetails" value={data.contactdetails} readOnly />
                    </div>
                    <div className="col-sm-4">
                        <p className='make-payment-email-address'>Address</p>
                        <input className='student-name-input-field form-control' type="text" name="address"
                            value={data.address} readOnly />
                    </div>
                    <div className="col-sm-4">
                        <p className='make-payment-email-address'>Total Fees</p>
                        <input className='student-name-input-field form-control' type="text" name="totalfees"
                            value={data.totalfees} readOnly />
                    </div>
                    <div className="col-sm-4">
                        <p className='make-payment-email-address'>Registration Fees</p>
                        <input className='student-name-input-field form-control' type="number"
                            value={paymentdata.registration.registrationfees} max={data.totalfees} id="registrationfees"
                            name="registrationfees" onChange={handleRegistrationChange}
                            readOnly={data.registration.registrationPaymentStatus === "Paid" ? true : false} />
                    </div>
                    <div className="col-sm-4">
                        <p className='make-payment-email-address'>Registration Date</p>
                        <input className='student-name-input-field form-control' type="date"
                            name="registrationDate" value={paymentdata.registration.registrationDate} readOnly />
                    </div>
                    <div className="col-sm-4">
                        <p className='make-payment-email-address'>Registration Status</p>
                        <select className="student-name-input-field form-select" name="registrationPaymentStatus"
                            value={paymentdata.registration.registrationPaymentStatus} onChange={handlePaymentStatus}
                            readOnly={data.registration.registrationPaymentStatus === "Paid" ? true : false}>
                            <option value={paymentdata.registration.registrationPaymentStatus}>
                                {paymentdata.registration.registrationPaymentStatus}
                            </option>
                            <option value="Paid">Paid</option>
                        </select>
                    </div>
                    <div className="col-sm-4">
                        <p className='make-payment-email-address'>1st Installment Fees</p>
                        <input className='student-name-input-field form-control' type="number"
                            value={paymentdata.secondInstallment.secondInstallmentfees}
                            min={data.registration.registrationfees} max={data.totalfees} id="secondInstallmentfees"
                            name="secondInstallmentfees"
                            onChange={handleSecondInstallmentChange} placeholder='Enter 1st Installment Fees' required
                            readOnly={data.secondInstallment.secondInstallmentPaymentStatus === "Paid" ? true : false} />
                    </div>
                    <div className="col-sm-4">
                        <p className='make-payment-email-address'>1st Installment Date</p>
                        <input className='student-name-input-field form-control' type="date"
                            name="secondfeesDate"
                            value={paymentdata.secondInstallment.secondInstallmentDate} readOnly />
                    </div>
                    <div className="col-sm-4">
                        <p className='make-payment-email-address'>1st Installment Status</p>
                        <select className="student-name-input-field form-select" name="secondInstallmentPaymentStatus"
                            value={paymentdata.secondInstallment.secondInstallmentPaymentStatus} onChange={handlePaymentStatus}
                            readOnly={data.registration.registrationPaymentStatus === "Paid" ? true : false}>
                            <option value={paymentdata.secondInstallment.secondInstallmentPaymentStatus}>
                                {paymentdata.secondInstallment.secondInstallmentPaymentStatus}
                            </option>
                            <option value="Paid">Paid</option>
                        </select>
                    </div>
                    <div className="col-sm-4">
                        <p className='make-payment-email-address'>2nd Installment Fees</p>
                        <input className='student-name-input-field form-control' type="number"
                            value={paymentdata.thirdInstallment.thirdInstallmentfees} min={data.registration.registrationfees}
                            max={data.totalfees} id="thirdInstallmentfees" name="thirdInstallmentfees"
                            onChange={handleThirdInstallmentChange} placeholder='Enter 3rd Installment Fees' required
                            readOnly={data.thirdInstallment.thirdInstallmentPaymentStatus === "Paid" ? true : false} />
                    </div>
                    <div className="col-sm-4">
                        <p className='make-payment-email-address'>2nd Installment Date</p>
                        <input className='student-name-input-field form-control' type="date"
                            name="thirdfeesDate"
                            value={paymentdata.thirdInstallment.thirdInstallmentDate} readOnly />
                    </div>
                    <div className="col-sm-4">
                        <p className='make-payment-email-address'>2nd Installment Status</p>
                        <select className="student-name-input-field form-select" name="thirdInstallmentPaymentStatus"
                            value={paymentdata.thirdInstallment.thirdInstallmentPaymentStatus} onChange={handlePaymentStatus}
                            readOnly={data.thirdInstallment.thirdInstallmentPaymentStatus === "Paid" ? true : false}>
                            <option value={paymentdata.thirdInstallment.thirdInstallmentPaymentStatus}>
                                {paymentdata.thirdInstallment.thirdInstallmentPaymentStatus}
                            </option>
                            <option value="Paid">Paid</option>
                        </select>
                    </div>
                    {paymentdata.BalanceAmount ?
                        <>
                            <div className="col-sm-4">
                                <p className='make-payment-email-address'>3rd Installment Fees</p>
                                <input className='student-name-input-field form-control' type="text"
                                    value={paymentdata.fourthInstallment.fourthInstallmentfees} min={data.registration.registrationfees}
                                    max={data.totalfees} id="fourthInstallmentfees" name="fourthInstallmentfees"
                                    onChange={handleFourthInstallmentChange} placeholder='Enter 4th Installment Fees' required
                                    readOnly />
                            </div>
                            <div className="col-sm-4">
                                <p className='make-payment-email-address'>3rd Installment Date</p>
                                <input className='student-name-input-field form-control' type="date"
                                    min={mindate}
                                    id="fourthInstallmentDate" name="fourthInstallmentDate"
                                    onChange={handleFourthInstallmentDate} required
                                    value={data.fourthInstallment.fourthInstallmentPaymentStatus === "Paid" ?
                                        data.fourthInstallment.fourthInstallmentDate :
                                        paymentdata.fourthInstallment.fourthInstallmentDate}
                                    readOnly={data.fourthInstallment.fourthInstallmentPaymentStatus === "Paid" ? true : false} />
                            </div>
                            <div className="col-sm-4">
                                <p className='make-payment-email-address'>3rd Installment Status</p>
                                <select className="make-payment-third-installment-status-input-field form-select"
                                    name="fourthInstallmentPaymentStatus"
                                    value={paymentdata.fourthInstallment.fourthInstallmentPaymentStatus}
                                    onChange={handlePaymentStatus}
                                    readOnly={paymentdata.fourthInstallment.fourthInstallmentPaymentStatus === "Paid" ? true : false}>
                                    <option value={paymentdata.fourthInstallment.fourthInstallmentPaymentStatus}>
                                        {paymentdata.fourthInstallment.fourthInstallmentPaymentStatus}
                                    </option>
                                    <option value="Paid">Paid</option>
                                </select>
                            </div>
                        </>
                        : null}
                    {(data.BalanceAmount === false && data.thirdInstallment.thirdInstallmentPaymentStatus === "Paid") ||
                        (data.BalanceAmount === true && data.fourthInstallment.fourthInstallmentPaymentStatus === "Paid")
                        ? null :
                        <>
                            <div className="col-sm-4">
                                <p className='make-payment-email-address'>Payment Type</p>
                                <select className="make-payment-third-installment-status-input-field form-select" name="PaymentType" required
                                    onChange={handlePaymentType}>
                                    <option value="">Select Payment Type</option>
                                    <option value="Registration fee">Registration fee</option>
                                    <option value="Installment 1">Installment 1</option>
                                    <option value="Installment 2">Installment 2</option>
                                    {paymentdata.BalanceAmount ? <option value="Installment 3">Installment 3</option> : null}
                                </select>
                            </div>
                            <div className="col-sm-4">
                                <p className='make-payment-email-address'>Payment Mode </p>
                                <select className="make-payment-third-installment-status-input-field form-select" name="PaymentMode" required
                                    onChange={handlePaymentMode}>
                                    <option value="">Select Payment Mode</option>
                                    <option value="Online Payment">Online Payment</option>
                                    <option value="Cash Payment">Cash Payment</option>
                                </select>
                            </div>
                        </>}


                    {(data.BalanceAmount === false && data.thirdInstallment.thirdInstallmentPaymentStatus === "Paid") ||
                        (data.BalanceAmount === true && data.fourthInstallment.fourthInstallmentPaymentStatus === "Paid")
                        ? null : (
                            <div className="text-center">
                                <button type="submit" className="mb-3 btn btn-primary">Make Payment</button>
                            </div>
                        )}
                </div>
            </form>
            {/* <div className='make-payment-rectangular-box'>
                <div className="d-flex">
                    <p className='make-payment-total-fees'>Total Fees</p>
                    <div className='make-payment-horizontal-line'></div>
                    <p className='make-payment-total-fees-value'>25000</p>
                </div>
                <div className='make-payment-horizontal-line-2'></div>
                <div className="d-flex">
                    <p className='make-payment-registration-fees'>Registration Fees</p>
                    <div className='make-payment-horizontal-line-3'></div>
                    <p className='make-payment-registration-fees-value'>25000</p>
                    <p className='make-payment-registration-fees'>Registration Date</p>
                    <div className='make-payment-horizontal-line-3'></div>
                    <p className='make-payment-registration-fees-value'>2023-05-09</p>
                    <p className='make-payment-registration-fees'>Registration Payment Status</p>
                    <div className='make-payment-horizontal-line-3'></div>
                    <p className='make-payment-registration-fees-value'>Paid</p>
                </div>
                <div className="d-flex">
                    <p className='make-payment-registration-fees'>1st Installment Fees</p>
                    <div className='make-payment-horizontal-line-3'></div>
                    <p className='make-payment-registration-fees-value'>25000</p>
                    <p className='make-payment-registration-fees'>1st Installment Date</p>
                    <div className='make-payment-horizontal-line-3'></div>
                    <p className='make-payment-registration-fees-value'>2023-05-09</p>
                    <p className='make-payment-registration-fees'>1st Installment Payment Status</p>
                    <div className='make-payment-horizontal-line-3'></div>
                    <p className='make-payment-registration-fees-value'>Paid</p>
                </div>
                <div className="d-flex">
                    <p className='make-payment-registration-fees'>2nd Installment Fees</p>
                    <div className='make-payment-horizontal-line-3'></div>
                    <p className='make-payment-registration-fees-value'>25000</p>
                    <p className='make-payment-registration-fees'>2nd Installment Date</p>
                    <div className='make-payment-horizontal-line-3'></div>
                    <p className='make-payment-registration-fees-value'>2023-05-09</p>
                    <p className='make-payment-registration-fees'>2nd Installment Payment Status</p>
                    <div className='make-payment-horizontal-line-3'></div>
                    <p className='make-payment-registration-fees-value'>Paid</p>
                </div>
                <div className="d-flex">
                    <p className='make-payment-registration-fees'>Registration Fees</p>
                    <div className='make-payment-horizontal-line-3'></div>
                    <p className='make-payment-registration-fees-value'>25000</p>
                    <p className='make-payment-registration-fees'>Registration Date</p>
                    <div className='make-payment-horizontal-line-3'></div>
                    <p className='make-payment-registration-fees-value'>2023-05-09</p>
                    <p className='make-payment-registration-fees'>Registration Payment Status</p>
                    <div className='make-payment-horizontal-line-3'></div>
                    <p className='make-payment-registration-fees-value'>Paid</p>
                </div>
                <div className="d-flex">
                    <p className='make-payment-registration-fees'>Registration Fees</p>
                    <div className='make-payment-horizontal-line-3'></div>
                    <p className='make-payment-registration-fees-value'>25000</p>
                    <p className='make-payment-registration-fees'>Registration Date</p>
                    <div className='make-payment-horizontal-line-3'></div>
                    <p className='make-payment-registration-fees-value'>2023-05-09</p>
                    <p className='make-payment-registration-fees'>Registration Payment Status</p>
                    <div className='make-payment-horizontal-line-3'></div>
                    <p className='make-payment-registration-fees-value'>Paid</p>
                </div>
            </div> */}
        </div>
    )
}

export default MakePayment