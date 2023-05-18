import { useLocation } from 'react-router-dom';
import '../../styles/student/studentdetails.css';

const StudentDetails = () => {
    const location = useLocation();
    const data = location.state.item;
    

    return (
        <div className="card" >
            <p className='view-student-details-heading ps-2'>CodersID Students Details</p>
            <div className="d-flex scroll">
                <div className='view-student-details-primary-box'>
                    <div className="d-flex justify-content-between">
                        <p className='view-student-details-list-heading-1'>Student ID</p>
                        <div className='view-line1'></div>
                        <p className='studentid-value'>{`CODERSID-${data.id}`}</p>
                    </div>
                    <div className='student-details-horizontal-line'></div>
                    <div className="d-flex justify-content-between">
                        <p className='view-student-details-list-heading-1'>Batch Name</p>
                        <div className='view-line1'></div>
                        <p className='studentid-value'>{data.batchname}</p>

                    </div>
                    <div className='student-details-horizontal-line'></div>
                    <div className="d-flex justify-content-between">
                        <p className='view-student-details-list-heading-1'>Email Address</p>
                        <div className='view-line1'></div>
                        <p className='studentid-value'>{data.emailid}</p>

                    </div>
                    <div className='student-details-horizontal-line'></div>
                    <div className="d-flex justify-content-between">
                        <p className='view-student-details-list-heading-1'>Address</p>
                        <div className='view-line1'></div>
                        <p className='studentid-value'>{data.address}</p>

                    </div>
                </div>
                <div className='view-student-details-primary-box'>
                    <div className="d-flex justify-content-between">
                        <p className='view-student-details-list-heading-1'>Student Name</p>
                        <div className='view-line1'></div>
                        <p className='studentid-value'>{data.studentname}</p>

                    </div>
                    <div className='student-details-horizontal-line'></div>
                    <div className="d-flex justify-content-between">
                        <p className='view-student-details-list-heading-1'>Course Name</p>
                        <div className='view-line1'></div>
                        <p className='studentid-value'>{data.course}</p>

                    </div>
                    <div className='student-details-horizontal-line'></div>
                    <div className="d-flex justify-content-between">
                        <p className='view-student-details-list-heading-1'>Contact Details</p>
                        <div className='view-line1'></div>
                        <p className='studentid-value'>{data.contactdetails}</p>

                    </div>
                    <div className='student-details-horizontal-line'></div>
                    <div className="d-flex justify-content-between">
                        <p className='view-student-details-list-heading-1'>Admission Date</p>
                        <div className='view-line1'></div>
                        <p className='studentid-value'>{data.createdAt.substring(0, 10)}</p>
                    </div>
                </div>
            </div>

            <div className="view-student-details-middle-box">
                <div className="d-flex justify-content-between">
                <p className='view-student-details-middle-heading'>Total Fees</p>
                        <div className='view-line1'></div>
                        <p className='studentid-value'>{data.totalfees}/-</p>
                </div>
            </div>

            <div className="d-flex scroll">
                <div className='view-student-details-secondary-box'>
                    <div className="d-flex justify-content-between">
                        <p className='view-student-details-list-heading-1'>Registration Fees</p>
                        <div className='view-line1'></div>
                        <p className='studentid-value'>{data.registration.registrationfees}/-</p>
                    </div>
                    <div className='student-details-horizontal-line'></div>
                    <div className="d-flex justify-content-between">
                        <p className='view-student-details-list-heading-1'>1st Installment Fees</p>
                        <div className='view-line1'></div>
                        <p className='studentid-value'>{data.secondInstallment.secondInstallmentfees}/-</p>

                    </div>
                    <div className='student-details-horizontal-line'></div>
                    <div className="d-flex justify-content-between">
                        <p className='view-student-details-list-heading-1'>2nd Installment Fees</p>
                        <div className='view-line1'></div>
                        <div className='d-flex justify-content-end'>
                            <p className='studentid-value'>{data.thirdInstallment.thirdInstallmentfees}/-</p></div>

                    </div>
                    <div className='student-details-horizontal-line'></div>
                    <div className="d-flex justify-content-between">
                        <p className='view-student-details-list-heading-1'>3rd Installment Fees</p>
                        <div className='view-line1'></div>
                        <p className='studentid-value'>{data.BalanceAmount ? `${data.fourthInstallment.fourthInstallmentfees}/-` : "NA"}</p>
                    </div>
                    
                </div>
                <div className='view-student-details-secondary-box'>
                    <div className="d-flex justify-content-between">
                        <p className='view-student-details-list-heading-1'>Registration Date</p>
                        <div className='view-line1'></div>
                        <p className='studentid-value'>{data.registration.registrationDate}</p>

                    </div>
                    <div className='student-details-horizontal-line'></div>
                    <div className="d-flex justify-content-between">
                        <p className='view-student-details-list-heading-1'>1st Installment Date</p>
                        <div className='view-line1'></div>
                        <p className='studentid-value'>{data.secondInstallment.secondInstallmentDate}</p>

                    </div>
                    <div className='student-details-horizontal-line'></div>
                    <div className="d-flex justify-content-between">
                        <p className='view-student-details-list-heading-1'>2nd Installment Date</p>
                        <div className='view-line1'></div>
                        <p className='studentid-value'>{data.thirdInstallment.thirdInstallmentDate}</p>

                    </div>
                    <div className='student-details-horizontal-line'></div>
                    <div className="d-flex justify-content-between">
                        <p className='view-student-details-list-heading-1'>3rd Installment Date</p>
                        <div className='view-line1'></div>
                        <p className='studentid-value'>{data.BalanceAmount ? data.fourthInstallment.fourthInstallmentDate : "NA"}</p>
                    </div>
                    <div className='student-details-horizontal-line'></div>
                    

                </div>
                <div className='view-student-details-secondary-box'>
                <div className='student-details-horizontal-line'></div>
                    <div className="d-flex justify-content-between">
                        <p className='view-student-details-list-heading-1'>Registration Status</p>
                        <div className='view-line1'></div>
                        <p className='studentid-value'>{data.registration.registrationPaymentStatus}</p>
                    </div>
                    <div className='student-details-horizontal-line'></div>
                    <div className="d-flex justify-content-between">
                        <p className='view-student-details-list-heading-1'>1st Installment Status</p>
                        <div className='view-line1'></div>
                        <p className='studentid-value'>{data.secondInstallment.secondInstallmentPaymentStatus}</p>
                    </div>
                    
                    <div className='student-details-horizontal-line'></div>
                    <div className="d-flex justify-content-between">
                        <p className='view-student-details-list-heading-1'>2nd Installment Status</p>
                        <div className='view-line1'></div>
                        <p className='studentid-value'>{data.thirdInstallment.thirdInstallmentPaymentStatus}</p>
                    </div>
                    <div className='student-details-horizontal-line'></div>
                    <div className="d-flex justify-content-between">
                        <p className='view-student-details-list-heading-1'>3rd Installment Status</p>
                        <div className='view-line1'></div>
                        <p className='studentid-value'>{data.BalanceAmount ? data.fourthInstallment.fourthInstallmentPaymentStatus : "NA"}</p>
                    </div>

                </div>
            </div>

        </div >





    );
}

export default StudentDetails;