import { useState, useEffect } from 'react';
import { getAllBatches, getSingleTest, getAllTestPerformance } from '../../getdata/getdata';
import { addTestPerformance } from '../../postdata/postdata';
import { headers } from '../../headers';
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Pagination from '../pagination/Pagination';

const LiveTest = () => {
    const [batchlist, setBatchList] = useState([]);
    const [testperformancelist, setTestPerformanceList] = useState([]);
    const [questionslist, setQuestionsList] = useState([]);
    const { id } = useParams();
    const [showquestions, setShowQuestions] = useState(false);
    const [testname, setTestName] = useState('');
    const [category, setTestCategory] = useState('');
    const [result, setResult] = useState(false);
    let [score, setScore] = useState(0);
    let value = '';
    const [testPerformancedata, setTestPerformanceData] = useState({
        studentid: "",
        Studentname: "",
        batchname: "",
        testname: testname,
        category: category,
        score: score
    })
    const navigate = useNavigate();
    const [currentPage, setCurrentPage] = useState(1);
    const [recordsPerPage] = useState(10);
    const indexOfLastRecord = currentPage * recordsPerPage;
    const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
    const currentRecords = questionslist.slice(indexOfFirstRecord, indexOfLastRecord);
    const nPages = Math.ceil(questionslist.length / recordsPerPage)

    useEffect(() => {
        getAllBatches(headers)
            .then((response) => {
                setBatchList(response.data.Batches);
            })
            .catch((error) => {
                console.log(error);
            })
        getAllTestPerformance(headers)
            .then((response) => {
                setTestPerformanceList(response.data.TestPerformances);
            })
            .catch((error) => {
                console.log(error);
            })
    }, []);


    const handleChange = (event) => {
        setTestPerformanceData({
            ...testPerformancedata,
            [event.target.name]: event.target.value
        })
    }

    const ShowTest = (event) => {
        event.preventDefault();
        getSingleTest(id)
            .then((response) => {
                setQuestionsList(response.data.id.questionslist);
                setTestName(response.data.id.testname);
                setTestCategory(response.data.id.category);
                setShowQuestions(true);
            })
            .catch((error) => {
                console.log(error);
            })

    }

    const addScore = (value, answer) => {
        if (value === answer) {
            score++;
        }
        localStorage.setItem('score', score);
    }

    const generateScore = (event) => {
        event.preventDefault();
        setResult(true);
        setScore(JSON.parse(localStorage.getItem('score')));
        const payload = {
            ...testPerformancedata,
            testname: testname,
            category: category,
            score: score
        }
        
        if (testperformancelist.some(item => item.Studentname === testPerformancedata.Studentname)) {
            toast.error("Test already given", {
                position: "top-center",
                autoClose: 2000
            })
            setTimeout(() => {
                navigate('/assessment-list')
            }, 2000)
        }
        else {
            addTestPerformance(payload)
                .then((response) => {
                    toast.success(response.data.msg, {
                        position: "top-center",
                        autoClose: 3000
                    })
                }
                )
                .catch((error) => {
                    toast.error(error.response.data.msg, {
                        position: "top-center",
                        autoClose: 2000
                    })
                })
            setTimeout(() => {
                localStorage.removeItem('score');
                toast.success("Thank you for giving the test", {
                    position: "top-center",
                    autoClose: 3000
                })
            }, 2000)
            setTimeout(() => {
                navigate('/assessment-list')
            }, 3000)
        }
    }

    const handleBack = () => {
        navigate('/assessment-list');
    }

    // console.log(currentRecords.length);
    // console.log(questionslist.length);

    return (
        <div>
            <div className="d-flex justify-content-between">
                <p className='studentlist-card-text ps-3'>Assessment</p>
                <button className='view-student-details-back-button me-2' onClick={handleBack}>
                    <p className='view-student-details-back-button-text'>Back</p>
                </button>
            </div>
            <form onSubmit={ShowTest}>
                <div className='ms-2 me-2 mt-5 row'>
                    <div className="col-sm-4 mb-3">
                        <p className="text-start input-field-label">Student ID</p>
                        <input type="number" className="input-box-width w-100" min={1} id="studentid" name="studentid"
                            onChange={handleChange} required />
                    </div>
                    <div className="col-sm-4 mb-3">
                        <p className="text-start input-field-label">Student Name</p>
                        <input type="text" className="input-box-width w-100" id="Studentname" name="Studentname"
                            onChange={handleChange} required />
                    </div>
                    <div className="col-sm-4 mb-3">
                        <p className="text-start select-field-label">Select Batch</p>
                        <select className="input-box-width w-100" name="batchname"
                            onChange={handleChange} required >
                            <option value="">Select Batch</option>
                            {batchlist.map((item) => {
                                return (
                                    <option value={item.batchName}>{item.batchName}</option>
                                )
                            })}
                        </select>
                    </div>
                </div>
                <button className='ms-2 add-student-form-button' type='submit'>
                    <p className='add-student-form-button-text'>Submit</p>
                </button>
            </form>

            {showquestions ?
                <div className='ms-2'>
                    <div className="mt-2">
                        <p className='fs-5'>Assessment Name : {testname}</p>
                        <p className='fs-5'>Assessment Category : {category}</p>
                    </div>
                    <form onSubmit={generateScore}>
                        {
                            currentRecords.map((item) => {
                                return (

                                    <div className="ms-2 mt-2 mb-2" key={item._id}>
                                        <p className='fw-bold'>Q{item.id}. {item.question}</p>
                                        <input type="radio" id={item.option1} name={item.question} value={item.option1} required
                                            onClick={() => {
                                                value = item.option1;
                                                addScore(value, item.answer);
                                            }} />
                                        <label className='ms-2 text-start fs-6' htmlFor="option1">{item.option1}</label><br />
                                        <input type="radio" id={item.option2} name={item.question} value={item.option2} required
                                            onClick={() => {
                                                value = item.option2;
                                                addScore(value, item.answer);
                                            }} />
                                        <label className='ms-2 text-start fs-6' htmlFor="option2">{item.option2}</label><br />
                                        <input type="radio" id={item.option3} name={item.question} value={item.option3} required
                                            onClick={() => {
                                                value = item.option3;
                                                addScore(value, item.answer);
                                            }} />
                                        <label className='ms-2 text-start fs-6' htmlFor="option3">{item.option3}</label><br />
                                        <input type="radio" id={item.option4} name={item.question} value={item.option4} required
                                            onClick={() => {
                                                value = item.option4;
                                                addScore(value, item.answer);
                                            }} />
                                        <label className='ms-2 text-start fs-6' htmlFor="option4">{item.option4}</label>
                                    </div>
                                )
                            })
                        }
                        <button className="ms-2 generate-score-button" type='submit'>
                            <p className='generate-score-button-text'>Generate Score</p>
                        </button>
                    </form>
                </div>
                : null}

            {result ? <p className='ms-2 fs-5'>Your score is {score} out of {questionslist.length}</p> : null}

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

export default LiveTest;