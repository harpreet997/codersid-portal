import { Modal } from "react-bootstrap";
import '../../styles/studentdetails/studentdetails.css';

const ViewStudentDetails = ({ data }) => {
    return (
        <>
            <Modal.Header closeButton>
                <Modal.Title className="text-white">Student Details</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <table className="table table-striped">
                    <tr>
                        <th>StudentID</th>
                        <td>{`CODERSID-${data.id}`}</td>
                    </tr>
                    <tr>
                        <th>Name</th>
                        <td>{data.studentname}</td>
                    </tr>
                    <tr>
                        <th>Batch Name</th>
                        <td>{data.batchname}</td>
                    </tr>
                    <tr>
                        <th>Course</th>
                        <td>{data.course}</td>
                    </tr>
                    <tr>
                        <th>Email ID</th>
                        <td>{data.emailid}</td>
                    </tr>
                    <tr>
                        <th>Contact Details</th>
                        <td>{data.contactdetails}</td>
                    </tr>
                    <tr>
                        <th>Address</th>
                        <td>{data.address}</td>
                    </tr>
                    <tr>
                        <th>Total Fees</th>
                        <td>{data.totalfees}/-</td>
                    </tr>
                    <tr>
                        <th>Admission Date</th>
                        <td>{data.createdAt.substring(0, 10)}</td>
                    </tr>
                    <tr>
                        <th>Registration Fees</th>
                        <td>{data.registration.registrationfees}/-</td>
                    </tr>
                    <tr>
                        <th>Registration Date</th>
                        <td>{data.registration.registrationDate}</td>
                    </tr>
                    <tr>
                        <th>Registration Payment Status</th>
                        <td>{data.registration.registrationPaymentStatus}</td>
                    </tr>
                    <tr>
                        <th>1st Installment Fees</th>
                        <td>{data.secondInstallment.secondInstallmentfees}/-</td>
                    </tr>
                    <tr>
                        <th>1st Installment Date</th>
                        <td>{data.secondInstallment.secondInstallmentDate}</td>
                    </tr>
                    <tr>
                        <th>1st Installment Payment Status</th>
                        <td>{data.secondInstallment.secondInstallmentPaymentStatus}</td>
                    </tr>

                    <tr>
                        <th>2nd Installment Fees</th>
                        <td>{data.thirdInstallment.thirdInstallmentfees}/-</td>
                    </tr>
                    <tr>
                        <th>2nd Installment Date</th>
                        <td>{data.thirdInstallment.thirdInstallmentDate}</td>
                    </tr>
                    <tr>
                        <th>2nd Installment Payment Status</th>
                        <td>{data.thirdInstallment.thirdInstallmentPaymentStatus}</td>
                    </tr>
                    {data.BalanceAmount ?
                        (
                            <>
                                <tr>
                                    <th>3rd Installment Fees</th>
                                    <td>{data.fourthInstallment.fourthInstallmentfees}/-</td>
                                </tr>
                                <tr>
                                    <th>3rd Installment Date</th>
                                    <td>{data.fourthInstallment.fourthInstallmentDate}</td>
                                </tr>
                                <tr>
                                    <th>3rd Installment Payment Status</th>
                                    <td>{data.fourthInstallment.fourthInstallmentPaymentStatus}</td>
                                </tr>
                            </>
                        ) : null}
                </table>
            </Modal.Body>
        </>
    );
}

export default ViewStudentDetails;