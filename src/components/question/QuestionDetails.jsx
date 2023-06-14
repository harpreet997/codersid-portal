import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Pagination from '../pagination/Pagination';

const QuestionDetails = () => {
    const data = JSON.parse(localStorage.getItem('item'))
    const questionlist = JSON.parse(localStorage.getItem('questionlist'))
    const [currentPage, setCurrentPage] = useState(1);
    const [recordsPerPage] = useState(5);
    const indexOfLastRecord = currentPage * recordsPerPage;
    const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
    const currentRecords = questionlist.slice(indexOfFirstRecord, indexOfLastRecord);
    const nPages = Math.ceil(questionlist.length / recordsPerPage);
    const navigate = useNavigate();

    const handleBack = () => {
        navigate('/all-tests');
        localStorage.removeItem('questionlist');
        localStorage.removeItem('item');
    }

    return (
        <div className="card">
            <div className="d-flex align-items-start justify-content-between">
                <div className="d-flex justify-content-start">
                    <p className='studentlist-card-text'>{data.testname}</p>
                </div>
                <div className="d-flex justify-content-end">
                    <button className='view-student-details-back-button me-2' onClick={handleBack}>
                        <p className='view-student-details-back-button-text'>Back</p>
                    </button>
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