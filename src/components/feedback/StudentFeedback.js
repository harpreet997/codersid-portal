import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllFeedback, getAllStudentFeedback } from '../../getdata/getdata';
import { headers } from '../../headers';
import Pagination from '../pagination/Pagination';
import { BallTriangle } from 'react-loader-spinner';
import '../../styles/assessment/assessmentlist.css';
import '../../styles/feedback/feedback.css';

const StudentFeedback = () => {
    const [alltestlist, setAllTestList] = useState([]);
    const [testlist, setTestList] = useState([]);
    const [studentfeedbacklist, setStudentFeedbackList] = useState([]);
    const [categoryType, setCategoryType] = useState("all");
    const [allCategory, setAllCategory] = useState([])
    const [loader, setLoader] = useState(false)
    const [currentPage, setCurrentPage] = useState(1);
    const [recordsPerPage] = useState(10);
    const indexOfLastRecord = currentPage * recordsPerPage;
    const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
    const nPages = Math.ceil(testlist.length / recordsPerPage);
    const currentRecords = testlist?.length > 0 ? testlist.slice(indexOfFirstRecord, indexOfLastRecord) : [];
    const navigate = useNavigate();

    useEffect(() => {
        setLoader(true);
        getAllFeedback(headers)
            .then((response) => {
                setAllTestList(response.data);
                setTestList(response.data);
                let allcategory = response.data.map(v => (v.category))
                setAllCategory([...new Set(allcategory)])
                setLoader(false)
            })
        getAllStudentFeedback(headers)
            .then((response) => {
                setStudentFeedbackList(response.data.StudentFeedbacks);
            })
            .catch((error) => {
                console.log(error);
            })

    }, []);

    const handleStudentDetails = (id) => {
        console.log(id);
        const data = studentfeedbacklist.filter((item) => {
            return item.feedbackid === id
        })
        console.log(data);
        localStorage.setItem('studentFeedbackRecords', JSON.stringify(data));
        navigate('/student-feedbacks', { state: { data } })
    }

    const filterFeedback = (type) => {
        if (type === "all") {
            setTestList(alltestlist)
            setCategoryType(type)
        }
        else {
            let test = alltestlist.filter(v => (v.category === type))
            setTestList(test)
            setCategoryType(type)
        }
    }

    return (
        <div className="card">
            <div className="d-flex">
                <div className="feedback-name-card" style={categoryType === "all" ? { backgroundColor: "#00B8C9", cursor: 'pointer' } : { cursor: 'pointer' }}
                    onClick={() => filterFeedback("all")}
                >
                    <div className="card-body text-center">
                        <p className="fs-5 fw-bold">All Feedback</p>
                    </div>
                </div>

                {
                    allCategory.map((name) => (
                        <div className="feedback-name-card" style={categoryType === name ? { backgroundColor: "#00B8C9", cursor: 'pointer' } : { cursor: 'pointer' }}
                            onClick={() => filterFeedback(name)}
                        >
                            <div className="card-body text-center">
                                <p className="fs-5 fw-bold ">{name}</p>

                            </div>
                        </div>
                    ))
                }
            </div>



            <>
                <table className="table">
                    <thead className='text-center'>
                        <tr>
                            <th scope="col">Feedback Name</th>
                            <th scope="col">Feedback Category</th>
                            <th scope="col">Action</th>
                        </tr>

                    </thead>
                    <tbody className='text-center'>
                        {currentRecords.map((item) => {
                            return (
                                <tr key={item._id}>
                                    <td>{item.name}</td>
                                    <td>{item.category}</td>
                                    <td><button className='feedback-link-button me-2' onClick={() => handleStudentDetails(item._id)}>
                                        <p className='feedback-link-button-text'>View Records</p>
                                    </button>

                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </>

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

            {allCategory && currentRecords.length > 0 ?
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

export default StudentFeedback;
