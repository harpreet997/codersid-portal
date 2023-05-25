import { useEffect, useState } from 'react';
import Pagination from '../pagination/Pagination';
import { getAllLeads } from '../../getdata/getdata';
import { headers } from '../../headers';
import StudentIcon from '../../assets/Studentlist.png';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import { BsInfoCircle } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import { Modal } from "react-bootstrap";
import { BallTriangle } from 'react-loader-spinner';
import { CSVLink } from "react-csv";
import '../../styles/student/studentlist.css';
import '../../styles/leads/lead.css';
import AddLead from './AddLead';
import EditLead from './EditLead';

const AllLeads = () => {
    const [leadList, setLeadList] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [recordsPerPage] = useState(10);
    const [addleadmodal, setAddLeadModal] = useState(false);
    const [editleadmodal, setEditLeadModal] = useState(false);
    const indexOfLastRecord = currentPage * recordsPerPage;
    const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
    const currentRecords = leadList.slice(indexOfFirstRecord, indexOfLastRecord);
    const nPages = Math.ceil(leadList.length / recordsPerPage)
    const [loader, setLoader] = useState(false);

    const handleAddLeadModal = () => {
        setAddLeadModal(true)
    };

    const handleEditLeadModal = (id) => {
        setEditLeadModal(id)
    };

    const closeAddLeadModal = () => setAddLeadModal(false);
    const closeEditLeadModal = () => setEditLeadModal(false);

    useEffect(() => {
        setLoader(true);
        getAllLeads(headers)
            .then((response) => {
                setLeadList(response.data.Leads);
                setLoader(false)
            })
            .catch((error) => {
                console.log(error);
            })
    }, []);


    const headers1 = [
        { label: "Name", key: 'name' },
        { label: "Contact Details", key: 'contactdetails' },
        { label: "Email ID", key: 'emailid' },
        { label: "City", key: 'city' },
        { label: "Address", key: 'address' },
        { label: "Education", key: 'education' },
        { label: "Employment Status", key: 'employementStatus' },
        { label: "Status", key: 'status' },
        { label: "Referral", key: 'referralName' },
    ]

    return (
        <div className="card">
            <div className="d-flex align-items-start justify-content-between">
                <div className="d-flex justify-content-start">
                    <p className='studentlist-card-text'>Leads<img className='studentlist-icon' src={StudentIcon} alt="StudentIcon" /></p>
                </div>
                <div className="d-flex justify-content-end">
                    <button className='add-student-button me-1'>
                        <CSVLink data={leadList} headers={headers1} filename='Leads_Records.csv'
                            className='add-student-button-text text-decoration-none'>Export Data</CSVLink>
                    </button>
                    <button className='add-student-button' onClick={() => {
                        handleAddLeadModal()
                    }}>
                        <p className='add-student-button-text'>Add Leads + </p>
                    </button>
                    <Modal show={addleadmodal ? true : false} onHide={closeAddLeadModal}>
                        <AddLead closeAddLeadModal={closeAddLeadModal} />
                    </Modal>
                </div>
            </div>

            <div className='scroll'>
                <table className="table">
                    <thead className='text-center'>
                        <tr>
                            <th scope="col">Name</th>
                            <th scope="col">Contact Details</th>
                            <th scope="col">Email ID</th>
                            <th scope="col">City</th>
                            <th scope="col">Address</th>
                            <th scope="col">Education</th>
                            <th scope="col">Employment Status</th>
                            <th scope="col">Status</th>
                            <th scope="col">Referral</th>
                            <th scope="col">Action</th>
                        </tr>

                    </thead>

                    <tbody className='text-center'>
                        {currentRecords.map((item, i) => {
                            return (
                                <tr key={item._id}>
                                    <td>{item.name}</td>
                                    <td>{item.contactdetails}</td>
                                    <td>{item.emailid}</td>
                                    <td>{item.city}</td>
                                    <td>{item.address}</td>
                                    <td>{item.education}</td>
                                    <td>{item.employementStatus}</td>
                                    <td>{item.status}</td>
                                    <td>{item.referralName}</td>
                                    <td>
                                        <div className="d-flex ms-4">
                                            <Tippy content={<span>{item.comments}</span>}>
                                                <button className='info-button'>
                                                    <BsInfoCircle className='info-button-icon' />
                                                </button>
                                            </Tippy>
                                            <button className='ms-2 details-button' onClick={() => {
                                                handleEditLeadModal(item._id)
                                            }}>
                                                <p className='details-button-text'>Update</p>
                                            </button>
                                        </div>
                                        <Modal show={editleadmodal === item._id ? true : false} onHide={closeEditLeadModal}>
                                            <EditLead data={item} id={item._id} closeEditLeadModal={closeEditLeadModal} />
                                        </Modal>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>

                {loader ?
                    <div className="d-flex justify-content-center">
                        <BallTriangle
                            height={250}
                            width={300}
                            radius={5}
                            color="#10D1E3"
                            ariaLabel="ball-triangle-loading"
                            wrapperClassName=''
                            wrapperStyle=""
                            visible={true}
                        />
                    </div> : null}

                {!loader && currentRecords.length === 0 ?
                    <div className='d-flex justify-content-center'>
                        <p className='fs-4'>No Data Found</p>
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

export default AllLeads;
