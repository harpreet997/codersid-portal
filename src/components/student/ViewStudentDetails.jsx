import { useLocation } from 'react-router-dom';
import '../../styles/studentdetails/studentdetails.css';

const ViewStudentDetails = () => {
    const location = useLocation();
    const data = location.state.item;
    

    return (
        < div className="dashboardcard" >
            <p className='student-details-heading'>CodersID Students Details</p>
            <div className='student-details-primary-box'>
                <p className='student-details-list-heading-1'>StudentID</p>
                {/* <div className='line1'></div> */}
                <p className='studentid'>{`CODERSID-${data.id}`}</p>
                <div className='vertical-line-1'></div>
                <p className='student-details-list-heading-2'>Batch Name</p>
                {/* <div className='line2'></div> */}
                <p className='batchname'>{data.batchname}</p>
                <div className='vertical-line-2'></div>
                <p className='student-details-list-heading-3'>Email ID</p>
                {/* <div className='line3'></div> */}
                <p className='emailid'>{data.emailid}</p>
                <div className='vertical-line-3'></div>
                <p className='student-details-list-heading-4'>Address</p>
                {/* <div className='line4'></div> */}
                <p className='address'>{data.address}</p>
                <div className='vertical-line-4'></div>
                <p className='student-details-list-heading-5'>Admission Date</p>
                {/* <div className='line5'></div> */}
                <p className='admission-date'>{data.createdAt.substring(0, 10)}</p>
                <p className='student-details-list-heading-6'>Name</p>
                {/* <div className='line6'></div> */}
                <p className='name'>{data.studentname}</p>
                <p className='student-details-list-heading-7'>Course</p>
                {/* <div className='line7'></div> */}
                <p className='course'>{data.course}</p>
                <p className='student-details-list-heading-8'>Contact Details</p>
                {/* <div className='line8'></div> */}
                <p className='contact-details'>{data.contactdetails}</p>
                <p className='student-details-list-heading-9'>Total Fees</p>
                {/* <div className='line9'></div> */}
                <p className='totalfees'>{data.totalfees}</p>

            </div>
            <div className='horizontal-line-box1'></div>
            <div className='student-details-secondary-box'>
                <p className='student-details-list-heading-10'>Registration Fees</p>
                {/* <div className='line10'></div> */}
                <p className='registration-fees'>{data.registration.registrationfees}/-</p>
                <div className='vertical-line-6'></div>
                <p className='student-details-list-heading-11'>1st Installment Fees</p>
                {/* <div className='line11'></div> */}
                <p className='first-installment-fees'>{data.secondInstallment.secondInstallmentfees}/-</p>
                <div className='vertical-line-7'></div>
                <p className='student-details-list-heading-12'>2nd Installment Fees</p>
                {/* <div className='line12'></div> */}
                <p className='second-installment-fees'>{data.thirdInstallment.thirdInstallmentfees}/-</p>
                <div className='vertical-line-8'></div>
                <p className='student-details-list-heading-13'>3rd Installment Fees</p>
                {/* <div className='line13'></div> */}
                <p className='third-installment-fees'>{data.thirdInstallment.thirdInstallmentfees}/-</p>
                <div className='vertical-line-9'></div>
                
                <div className='horizontal-line-box2'></div>
                <p className='student-details-list-heading-14'>Registration Date</p>
                {/* <div className='line14'></div> */}
                <p className='registration-date'>{data.registration.registrationDate}</p>
                <p className='student-details-list-heading-15'>1st Installment Date</p>
                {/* <div className='line15'></div> */}
                <p className='first-installment-date'>{data.secondInstallment.secondInstallmentDate}</p>
                <p className='student-details-list-heading-16'>2nd Installment Date</p>
                {/* <div className='line16'></div> */}
                <p className='second-installment-date'>{data.thirdInstallment.thirdInstallmentDate}</p>
                <p className='student-details-list-heading-17'>3rd Installment Date</p>
                {/* <div className='line17'></div> */}
                <p className='third-installment-date'>{data.BalanceAmount ? data.fourthInstallment.fourthInstallmentDate: "NA"}</p>
                <p className='student-details-list-heading-18'>Registration Payment Status</p>
                {/* <div className='line18'></div> */}
                <p className='registration-payment-status'>{data.registration.registrationPaymentStatus}</p>
                <p className='student-details-list-heading-19'>1st Installment Payment Status</p>
                {/* <div className='line19'></div> */}
                <p className='first-installment-payment-status'>{data.secondInstallment.secondInstallmentPaymentStatus}</p>
                <p className='student-details-list-heading-20'>2nd Installment Payment Status</p>
                {/* <div className='line20'></div> */}
                <p className='second-installment-payment-status'>{data.thirdInstallment.thirdInstallmentPaymentStatus}</p>
                <p className='student-details-list-heading-21'>3rd Installment Payment Status</p>
                {/* <div className='line21'></div> */}
                <p className='third-installment-payment-status'>{data.BalanceAmount ? data.fourthInstallment.fourthInstallmentPaymentStatus: "NA"}</p>
                <div className='horizontal-line-box3'></div>
            </div>
        </div >





    );
}

export default ViewStudentDetails;