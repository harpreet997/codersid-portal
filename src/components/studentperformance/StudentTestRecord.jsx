import { useState } from 'react';
import StudentIcon from '../../assets/Studentlist.png';
import { useNavigate } from 'react-router-dom';
import { BallTriangle } from 'react-loader-spinner';
import '../../styles/student/studentlist.css';
import '../../styles/studentperformance/studentperformance.css';

const StudentTestRecord = () => {
    const data = JSON.parse(localStorage.getItem('testRecords'))
    const testRecords = data.testRecords;
    const [currentPage, setCurrentPage] = useState(1);
    const [recordsPerPage] = useState(5);
    const indexOfLastRecord = currentPage * recordsPerPage;
    const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
    const currentRecords = testRecords.slice(indexOfFirstRecord, indexOfLastRecord);
    const nPages = Math.ceil(testRecords.length / recordsPerPage);
    const navigate = useNavigate();

    const handleDetails = (item) => {
        localStorage.setItem('response', JSON.stringify(item));
        navigate('/student-response', { state: { item } })
    }

    const handleBack = () => {
        navigate('/performance');
        // localStorage.removeItem('testRecords');
        // localStorage.removeItem('response');
    }

    

    return (
        <div className="card">
            <div className="d-flex align-items-start justify-content-between">
                <div className="d-flex justify-content-start">
                    <p className='studentlist-card-text'>Student Test Records<img className='studentlist-icon' src={StudentIcon} alt="StudentIcon" /></p>
                </div>
                <div className="d-flex justify-content-end">
                    <button className='view-student-details-back-button me-2' onClick={handleBack}>
                        <p className='view-student-details-back-button-text'>Back</p>
                    </button>
                </div>
            </div>

            
            <div className='scroll'>
                <table className="table">
                    <thead className='text-center'>
                        <tr>
                            <th scope="col">Assessment Name</th>
                            <th scope="col">Assessment Category</th>
                            <th scope="col">Action</th>
                        </tr>

                    </thead>

                    <tbody className='text-center'>
                        {currentRecords.map((item, i) => {
                            return (
                                <tr key={i}>
                                    <td className='pointer'>{item.testname}</td>
                                    <td className='pointer'>{item.category}</td>
                                    <td><button className='score-card-button' onClick={() => {
                                        handleDetails(item)
                                    }}>
                                        <p className='score-card-button-text'>View Response</p>
                                    </button>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>

                {/* {currentRecords.length === 0 ?
                    <div className='d-flex justify-content-center'>
                        {allstudentlist.length !== 0 ?
                            <p className='fs-4'>No Data Found</p>
                            :
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
                        }
                    </div>
                    : null} */}

            </div>
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

export default StudentTestRecord;
