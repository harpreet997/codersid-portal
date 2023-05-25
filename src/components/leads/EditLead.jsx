import { useState } from "react";
import { Modal } from "react-bootstrap";
import { toast } from "react-toastify";
import { editLead } from "../../postdata/postdata";
import '../../styles/leads/addlead.css';

const EditLead = ({ data, id, closeEditLeadModal }) => {
    const [editleaddata, setEditleadData] = useState({
        name: data.name,
        contactdetails: data.contactdetails,
        emailid: data.emailid,
        address: data.address,
        city: data.city,
        education: data.education,
        employementStatus: data.employementStatus,
        comments: data.comments,
        status: data.status,
        referralName: data.referralName
    })

    const employmentStatus = ['Student', 'Employee', 'Job Seeker', 'Other'];
    const Status = ['Followup', 'Cold Reach out', 'Converted', 'Not Interested/ Permanently Lost']

    const handleChange = (event) => {
        setEditleadData({ ...editleaddata, [event.target.name]: event.target.value })
    }

    // const previousdata = [editleaddata.comments]
    // previousdata.push('Test')

    // const previousdata = editleaddata.comments;
    // previousdata.push('test');
    // console.log(previousdata)


    const handleComment = (event) => {
        const previousdata = editleaddata.comments;
        previousdata.push(event.target.value);
        
    }

    const handleUpdateLead = (event) => {
        event.preventDefault();
        console.log(editleaddata)
        editLead(id, editleaddata)
            .then((response) => {
                toast.success(response.data.msg, {
                    position: "top-center",
                    autoClose: 3000
                })
                closeEditLeadModal();
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

    return (
        <>
            <Modal.Header closeButton>
                <Modal.Title className="text-black">
                    <p className='view-expense-details-modal-heading'>
                        Edit Lead
                    </p>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form onSubmit={handleUpdateLead}>
                    <div className='row'>
                        <div className="col-sm-4 mb-3">
                            <p className="text-start input-field-label">Name</p>
                            <input type="text" className="input-box-width w-100" id="name" name="name"
                                value={editleaddata.name} readOnly />
                        </div>
                        <div className="col-sm-4 mb-3">
                            <p className="text-start input-field-label">Contact Number</p>
                            <input type="tel" className="input-box-width w-100" id="contactdetails" name="contactdetails"
                                pattern="[0-9]{3}[0-9]{4}[0-9]{3}" value={editleaddata.contactdetails} readOnly />
                        </div>
                        <div className="col-sm-4 mb-3">
                            <p className="text-start input-field-label">Email Address</p>
                            <input type="email" className="input-box-width w-100" id="emailid" name="emailid"
                                value={editleaddata.emailid} readOnly />
                        </div>
                        <div className="col-sm-4 mb-3">
                            <p className="text-start input-field-label">Address</p>
                            <input type="text" className="input-box-width w-100" id="address" name="address"
                                value={editleaddata.address} readOnly />
                        </div>
                        <div className="col-sm-4 mb-3">
                            <p className="text-start input-field-label">City</p>
                            <input type="text" className="input-box-width w-100" id="city" name="city"
                                value={editleaddata.city} readOnly />
                        </div>
                        <div className="col-sm-4 mb-3">
                            <p className="text-start input-field-label">Education Details</p>
                            <input type="text" className="input-box-width w-100" id="education" name="education"
                                value={editleaddata.education} readOnly />
                        </div>
                        <div className="col-sm-4 mb-3">
                            <p className="text-start select-field-label">Employment Status</p>
                            <select className="input-box-width w-100" name="employementStatus" readOnly
                                value={editleaddata.employementStatus} >
                                <option value="">Select Employment</option>
                                {employmentStatus.map((item) => {
                                    return (
                                        <option value={item}>{item}</option>
                                    )
                                })}
                            </select>
                        </div>

                        {editleaddata.employementStatus === "Other" ?

                            <div className="col-sm-4 mb-3">
                                <p className="text-start input-field-label">Employee Status</p>
                                <input type="text" className="input-box-width w-100" id="employementStatus" name="employementStatus"
                                    onChange={handleChange}
                                    required />
                            </div>
                            : null}

                        <div className="col-sm-4 mb-3">
                            <p className="text-start select-field-label">Status</p>
                            <select className="input-box-width w-100" name="status" required
                                value={editleaddata.status} onChange={handleChange}>
                                <option value="">Select Status</option>
                                {Status.map((item) => {
                                    return (
                                        <option value={item}>{item}</option>
                                    )
                                })}
                            </select>
                        </div>


                        <div className="col-sm-4 mb-3">
                            <p className="text-start input-field-label">Referral Name</p>
                            <input type="text" className="input-box-width w-100" id="referralName" name="referralName"
                                value={editleaddata.referralName} readOnly />
                        </div>
                        <div className="col-sm-4 mb-3">
                            <p className="text-start input-field-label">Comments</p>
                            <textarea className="input-box-width" rows={5} cols={30} id="comments" name="comments"
                                value={editleaddata.comments} onChange={handleChange}
                                required />
                        </div>
                    </div>
                    <button className='add-student-form-button' type='submit'>
                        <p className='add-student-form-button-text'>Update</p>
                    </button>
                </form>
            </Modal.Body>

        </>
    );
}

export default EditLead;