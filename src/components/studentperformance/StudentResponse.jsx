import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Pagination from '../pagination/Pagination';

const StudentResponse = () => {
    const data = JSON.parse(localStorage.getItem('response'))

    // console.log(data.testResponse)
    // console.log(data.testResponse.questionName)
    // const [currentPage, setCurrentPage] = useState(1);
    // const [recordsPerPage] = useState(5);
    // const indexOfLastRecord = currentPage * recordsPerPage;
    // const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
    // const currentRecords = testResponse.slice(indexOfFirstRecord, indexOfLastRecord);
    // const nPages = Math.ceil(testResponse.length / recordsPerPage);
    const navigate = useNavigate();

    const handleBack = () => {
        navigate('/test-records');
        // localStorage.removeItem('response');
    }

    return (
        <div className="card">
            <div className="d-flex align-items-start justify-content-between">
                <div className="d-flex justify-content-start">
                    <p className='studentlist-card-text'>Student Test Response</p>
                </div>
                <div className="d-flex justify-content-end">
                    <button className='view-student-details-back-button me-2' onClick={handleBack}>
                        <p className='view-student-details-back-button-text'>Back</p>
                    </button>
                </div>
            </div>
            {data.testResponse.questionName.length > 0
            ?
            <div className="ms-2 mt-2 mb-2" >
                {data.testResponse.questionName.map((question) => <p className='fw-bold'>Q. {question}</p>)}
                {data.testResponse.response.map((answer) => <p>Ans. {answer}</p>)}
            </div>
            : <div className='text-center'>
                <p className='fs-4'>No Data Found</p>
            </div>}




            {/* {currentRecords.length > 0 ?
                <div className="text-center">
                    <Pagination
                        nPages={nPages}
                        currentPage={currentPage}
                        setCurrentPage={setCurrentPage}
                    />
                </div>
                : null} */}
        </div>
    );
}

export default StudentResponse;