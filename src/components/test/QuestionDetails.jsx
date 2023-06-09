import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Pagination from '../pagination/Pagination';
import { toast } from "react-toastify";
import { primaryUrl } from '../../baseurl';
import { addExpiryDate } from '../../postdata/postdata';

const QuestionDetails = () => {
    const location = useLocation();
    // console.log(location)
    // const data = location.state.item;
    const navigate = useNavigate();
    const handleBack = () => {
        navigate('/all-tests');
        localStorage.removeItem('questionlist');
        localStorage.removeItem('item');
    }

    const data = JSON.parse(localStorage.getItem('item'))
    const questionlist = JSON.parse(localStorage.getItem('questionlist'))
    const [currentPage, setCurrentPage] = useState(1);
    const [recordsPerPage] = useState(5);
    const indexOfLastRecord = currentPage * recordsPerPage;
    const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
    const currentRecords = questionlist.slice(indexOfFirstRecord, indexOfLastRecord);
    const nPages = Math.ceil(questionlist.length / recordsPerPage);

    const date = new Date();
    date.setDate(date.getDate() + 2);
    const expiryDate = date.toString()

    console.log(expiryDate);

    const [showEnable, setShowEnable] = useState(data.hasOwnProperty('expiryDate'));

    // const copy = async (id) => {
    //     await navigator.clipboard.writeText(`${primaryUrl}/assessment-test/${id}`);
    //     // await navigator.clipboard.writeText(`http://localhost:3000/assessment-test/${id}`);
    //     toast.success("Test Link Copied", {
    //         position: "top-center",
    //         autoClose: 1000
    //     })
    // }

    const enableLink = (id) => {
        const payload = {
            expiryDate: expiryDate
        }
        addExpiryDate(id, payload)
            .then((response) => {
                toast.success(response.data.msg, {
                    position: "top-center",
                    autoClose: 1000
                })
                setShowEnable(true);
                // window.location.reload(false);
            })
            .catch((error) => {
                toast.success(error, {
                    position: "top-center",
                    autoClose: 1000
                })
            })
    }

    return (
        <div className="card">
            {/* <div className="d-flex justify-content-between">
                <p className='view-student-details-heading ps-2'>{data.testname}</p>
                <button className='view-student-details-back-button me-2' onClick={handleBack}>
                    <p className='view-student-details-back-button-text'>Back</p>
                </button>
            </div> */}
            <div className="d-flex align-items-start justify-content-between">
                <div className="d-flex justify-content-start">
                    <p className='studentlist-card-text'>{data.testname}</p>
                </div>
                <div className="d-flex justify-content-end">
                    <button className='view-student-details-back-button me-2' onClick={handleBack}>
                        <p className='view-student-details-back-button-text'>Back</p>
                    </button>
                    {/* <button className='add-student-button me-2' onClick={() => {
                        copy(data._id)
                    }}>
                        <p className='add-student-button-text'>Test Link</p>
                    </button> */}
                    {/* <button className={showEnable ? 'enable-link-button': 'disable-link-button'} onClick={() => {
                        enableLink(data._id)
                    }}>
                        <p className='add-student-button-text'>
                            Enable Link </p>
                    </button> */}
                </div>
            </div>

            {currentRecords.map((item) => {
                return (
                    <div className="ms-2 mt-2 mb-2" key={item._id}>
                        <p className='fw-bold'>Q{item.id}. {item.question}</p>
                        <ul>
                            <li>{item.option1}</li>
                            <li>{item.option2}</li>
                            <li>{item.option3}</li>
                            <li>{item.option4}</li>
                        </ul>
                        <p>Answer : {item.answer}</p>
                    </div>
                )
            })}
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

export default QuestionDetails;