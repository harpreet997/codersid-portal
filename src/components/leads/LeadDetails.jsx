import { Modal } from "react-bootstrap";
import '../../styles/expense/expensedetails.css';

const LeadDetails = ({ data }) => {

    return (
        <>
            <Modal.Header closeButton>
                <Modal.Title className="text-black">
                    <p className='view-expense-details-modal-heading'>
                        Lead Details
                    </p>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                    <div className="d-flex ">
                        <div className='view-expense-details-modal-box'>
                            <div className="d-flex justify-content-between">
                                <p className='view-student-details-list-heading-1'>
                                    Name</p>
                                <div className='view-line1'></div>
                                <p className='studentid-value'>{data.name}</p>
                            </div>
                            <div className='student-details-horizontal-line'></div>
                            <div className="d-flex justify-content-between">
                                <p className='view-student-details-list-heading-1'>Contact</p>
                                <div className='view-line1'></div>
                                <p className='studentid-value'>{data.contactdetails}</p>

                            </div>
                            <div className='student-details-horizontal-line'></div>
                            <div className="d-flex justify-content-between">
                                <p className='view-student-details-list-heading-1'>Email</p>
                                <div className='view-line1'></div>
                                <p className='studentid-value'>{data.emailid}</p>

                            </div>
                            <div className='student-details-horizontal-line'></div>
                            <div className="d-flex justify-content-between">
                                <p className='view-student-details-list-heading-1'>City</p>
                                <div className='view-line1'></div>
                                <p className='studentid-value'>{data.city}</p>

                            </div>
                            <div className='student-details-horizontal-line'></div>
                            <div className="d-flex justify-content-between">
                                <p className='view-student-details-list-heading-1'>Address</p>
                                <div className='view-line1'></div>
                                <p className='studentid-value'>{data.address}</p>

                            </div>
                            <div className='student-details-horizontal-line'></div>
                            <div className="d-flex justify-content-between">
                                <p className='view-student-details-list-heading-1'>Education</p>
                                <div className='view-line1'></div>
                                <p className='studentid-value'>{data.education}</p>

                            </div>
                            <div className='student-details-horizontal-line'></div>
                            <div className="d-flex justify-content-between">
                                <p className='view-student-details-list-heading-1'>Employment Status</p>
                                <div className='view-line1'></div>
                                <p className='studentid-value'>{data.employementStatus}</p>

                            </div>
                            <div className='student-details-horizontal-line'></div>
                            <div className="d-flex justify-content-between">
                                <p className='view-student-details-list-heading-1'>Status</p>
                                <div className='view-line1'></div>
                                <p className='studentid-value'>{data.status}</p>

                            </div>
                            <div className='student-details-horizontal-line'></div>
                            <div className="d-flex justify-content-between">
                                <p className='view-student-details-list-heading-1'>Source</p>
                                <div className='view-line1'></div>
                                <p className='studentid-value'>{data.source}</p>

                            </div>
                            <div className='student-details-horizontal-line'></div>
                            <div className="d-flex justify-content-between">
                                <p className='view-student-details-list-heading-1'>Comments</p>
                                <div className='view-line1'></div>
                                <p className='studentid-value'>{data.comments}</p>

                            </div>
                        </div>
                    </div>
                
            </Modal.Body>
        </>
    );
}

export default LeadDetails;