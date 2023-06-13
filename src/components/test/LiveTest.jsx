import { useState, useEffect } from 'react';
import { getSingleTest, getAllTestPerformance, getAllStudents } from '../../getdata/getdata';
import { addStudentPerformanceRecord } from '../../postdata/postdata';
import { headers } from '../../headers';
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Pagination from '../pagination/Pagination';

const LiveTest = () => {
    const { id } = useParams();
    const [testperformancelist, setTestPerformanceList] = useState([]);
    const [questionslist, setQuestionsList] = useState([]);
    const [studentlist, setStudentList] = useState([]);
    const [showquestions, setShowQuestions] = useState(false);
    const [studentdata, setStudentData] = useState([]);
    const [testname, setTestName] = useState('');
    const [category, setTestCategory] = useState('');
    const [studentid, setStudentId] = useState('');
    const [generatedid, setGeneratedId] = useState('');
    const [studentname, setStudentName] = useState('');
    const [batchname, setBatchName] = useState('');
    const [result, setResult] = useState(false);
    let [score, setScore] = useState(0);  
    const [currentPage, setCurrentPage] = useState(1);
    const [recordsPerPage] = useState(10);
    const indexOfLastRecord = currentPage * recordsPerPage;
    const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
    const currentRecords = questionslist.slice(indexOfFirstRecord, indexOfLastRecord);
    const nPages = Math.ceil(questionslist.length / recordsPerPage)
    let value = '';

    useEffect(() => {
        getAllTestPerformance(headers)
            .then((response) => {
                setTestPerformanceList(response.data.TestPerformances);
            })
            .catch((error) => {
                console.log(error);
            })
        getAllStudents(headers)
            .then((response) => {
                setStudentList(response.data.Students);
            })
            .catch((error) => {
                console.log(error);
            })
    }, []);


    const ShowTest = (event) => {
        event.preventDefault();
        if (studentdata[0].testRecords.some((item) => item.testId === id)) {
            toast.error("Test already given", {
                position: "top-center",
                autoClose: 2000
            })
            window.location.reload(false);
        }
        else {
            getSingleTest(id)
                .then((response) => {
                    const date = new Date();
                    console.log(date);
                    console.log(response.data.id.expiryDate);
                    if (date < new Date(response.data.id.expiryDate)) {
                        setQuestionsList(response.data.id.questionslist);
                        setTestName(response.data.id.testname);
                        setTestCategory(response.data.id.category);
                        setShowQuestions(true);
                    }
                    else {
                        toast.error("Test link Invalid", {
                            position: "top-center",
                            autoClose: 2000
                        })
                        window.location.reload(false);
                    }

                })
                .catch((error) => {
                    console.log(error);
                })
        }
    }

    const addScore = (value, answer) => {
        if (value === answer) {
            setScore((score) => score + 1);
        }
    }

    // console.log(studentdata[0].testRecords);

    const generateScore = (event) => {
        event.preventDefault();
        setResult(true);
    
        const performancePayload = {
            testId: id,
            testname: testname,
            category: category,
            score: score,
            totalMarks: questionslist.length
        }

        const testRecords = studentdata[0].testRecords
        testRecords.push(performancePayload)

        const payload = {
            ...studentdata,
            testRecords: testRecords
        }

        addStudentPerformanceRecord(generatedid, payload)
                .then((response) => {
                    toast.success("Test submitted successfully", {
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
                window.location.reload(false);
            }, 3000)
        
    }

    const handleFindStudent = (event) => {
        setTimeout(() => {
            const data = studentlist.filter((item) => {
                return item.id === Number(event.target.value);
            })
            console.log(data);
            setStudentData(data);
            if (data.length > 0) {
                toast.success("Details Fetched successfully", {
                    position: "top-center",
                    autoClose: 1000
                })
                setGeneratedId(data[0]._id);
                setStudentId(data[0].id);
                setStudentName(data[0].studentname);
                setBatchName(data[0].batchname)
            }
            else {
                toast.error("Invalid ID", {
                    position: "top-center",
                    autoClose: 1000
                })
                setTimeout(() => {
                    window.location.reload(false);
                }, 0)
                
            }
        }, 1000)

        

    }



    return (
        <div>
            <div className="d-flex justify-content-between">
                <p className='studentlist-card-text ps-3'>Assessment</p>
            </div>
            <form onSubmit={ShowTest}>
                <div className='ms-2 me-2 mt-5 row'>
                    <div className="col-sm-4 mb-3">
                        <p className="text-start input-field-label">Student ID</p>
                        <input type="number" className="input-box-width w-100" min={1} id="studentid" name="studentid"
                            onChange={handleFindStudent} required />
                    </div>
                    <div className="col-sm-4 mb-3">
                        <p className="text-start input-field-label">Student Name</p>
                        <input type="text" className="input-box-width w-100" id="Studentname" name="Studentname"
                            value={studentname} readOnly />
                    </div>
                    <div className="col-sm-4 mb-3">
                        <p className="text-start input-field-label">Batch Name</p>
                        <input type="text" className="input-box-width w-100" id="Studentname" name="Studentname"
                            value={batchname} readOnly />
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