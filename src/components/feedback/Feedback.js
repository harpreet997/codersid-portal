import { useState, useEffect } from 'react';
import { getSingleFeedback, getAllTestPerformance, getAllStudents } from '../../getdata/getdata';
import { addStudentPerformanceRecord } from '../../postdata/postdata';
import { headers } from '../../headers';
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Pagination from '../pagination/Pagination';
import { Rating } from 'react-simple-star-rating'

const Feedback = () => {
    const { id } = useParams();
    const [rating, setRating] = useState(0)
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
    let [studentResponse, setStudentResponse] = useState([]);
    let [responseQuestionList, setResponseQuestionList] = useState([]);
    let [answerlist, setAnswerlist] = useState([]);
    let flag = 0;

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
            getSingleFeedback(id)
                .then((response) => {
                    const date = new Date();
                    if (date < new Date(response.data.id.expiryDate)) {
                        setQuestionsList(response.data.id.questionslist);
                        setTestName(response.data.id.name);
                        setTestCategory(response.data.id.category);
                        setShowQuestions(true);
                        // for (let i = 0; i <= response.data.id.questionslist.length; i++) {
                        //     console.log(response.data.id.questionslist)
                        //     responseQuestionList.push(response.data.id.questionslist[i].question)
                        // }
                        // {
                        //     response.data.id.questionslist.map((item) => {
                        //         answerlist.push(item.answer)
                        //     })
                        // }
                    }
                    else {
                        toast.error("Feedback link Invalid", {
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

    const handleRating = (rate) => {
        setRating(rate+1);
        console.log(rating);
    }


    const onPointerEnter = () => setRating(rating + 1)
    const onPointerLeave = () => setRating(rating-1);
    

    const addScore = (value, answer, index, question) => {
        console.log("Index", index);
        // if (value === answer ) {
        //     console.log("first condition");
        //     responseQuestionList.splice(index, 0, question);
        //     studentResponse.splice(index, 0, value);

        // }
        // else if (value !== answer) {
        //     console.log("second condition"); 
        //     responseQuestionList.splice(index, 0, question);
        //     studentResponse.splice(index, 0, value);

        // }
        // else {
        //     console.log("third condition");
        //     responseQuestionList.splice(index, 0, question);
        //     studentResponse.splice(index, 0, value);
        // }

        responseQuestionList.splice(index, 0, question);
        studentResponse.splice(index, 0, value);
        answerlist.splice(index, 0, answer)
        console.log(responseQuestionList)
        console.log(studentResponse);
        console.log(answerlist);

    }



    const generateScore = (event) => {
        event.preventDefault();

        let finalresult = studentResponse.filter((data) => answerlist
            .includes(data));
        console.log(finalresult.length);
        setScore(finalresult.length)
        setResult(true);

        const responsePayload = {
            questionName: responseQuestionList,
            response: studentResponse
        }


        console.log(responsePayload);

        const performancePayload = {
            testId: id,
            testname: testname,
            category: category,
            score: score,
            totalMarks: questionslist.length,
            testResponse: responsePayload
        }

        const testRecords = studentdata[0].testRecords
        testRecords.push(performancePayload)


        const payload = {
            ...studentdata,
            testRecords: testRecords,
        }

        // console.log(payload)

        // addStudentPerformanceRecord(generatedid, payload)
        //     .then((response) => {
        //         toast.success("Test submitted successfully", {
        //             position: "top-center",
        //             autoClose: 3000
        //         })
        //     }
        //     )
        //     .catch((error) => {
        //         toast.error(error.response.data.msg, {
        //             position: "top-center",
        //             autoClose: 2000
        //         })
        //     })

        // setTimeout(() => {
        //     toast.success("Thank you for giving the test", {
        //         position: "top-center",
        //         autoClose: 3000
        //     })
        // }, 2000)
        // setTimeout(() => {
        //     window.location.reload(false);
        // }, 3000)

    }

    const handleFindStudent = (event) => {
        setTimeout(() => {
            const data = studentlist.filter((item) => {
                return item.id === Number(event.target.value);
            })
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
                <p className='studentlist-card-text ps-3'>Feedbacks</p>
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
                        <p className='fs-5'>Feedback Name : {testname}</p>
                        <p className='fs-5'>Feedback Category : {category}</p>
                    </div>
                    <form onSubmit={generateScore}>
                        {
                            currentRecords.map((item, index) => {
                                return (

                                    <div className="ms-2 mt-2 mb-2" key={item._id}>
                                        <p className='fw-bold'>Q{item.id}. {item.question}</p>
                                        <p>Rating</p>
                                        <Rating
                                            onClick={handleRating}
                                            onPointerEnter={onPointerEnter}
                                            onPointerLeave={onPointerLeave}
                                        /* Available Props */
                                        />
                                        <p htmlFor="comment">Comment</p>
                                        <textarea name="comment" id="comment" cols="30" rows="10"></textarea>
                                    </div>
                                )
                            })
                        }
                        <button className="ms-2 generate-score-button" type='submit'>
                            <p className='generate-score-button-text'>Submit Feedback</p>
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

export default Feedback;