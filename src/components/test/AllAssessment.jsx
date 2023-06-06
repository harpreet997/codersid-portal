import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllTests } from '../../getdata/getdata';
import { headers } from '../../headers';
import { BallTriangle } from 'react-loader-spinner';
import JsLogo from '../../assets/JsLogo.png';
import MernLogo from '../../assets/MernLogo.png';
import NodeJSLogo from '../../assets/NodeJSLogo.jpg';
import ReactLogo from '../../assets/ReactLogo.png';
import '../../styles/assessment/assessmentlist.css';

const AllAssessment = () => {
    const [alltestlist, setAllTestList] = useState([]);
    const [alltests, setAllTests] = useState(true);
    const [reacttest, setReactTest] = useState(false);
    const [nodetest, setNodeTest] = useState(false);
    const [javascripttest, setJavascriptTest] = useState(false);
    const [loader, setLoader] = useState(false);
    const navigate = useNavigate();

    const reacttestlist = alltestlist.filter((item) => {
        return item.category === "React JS"
    })

    const nodetestlist = alltestlist.filter((item) => {
        return item.category === "Node JS"
    })
    const javascripttestlist = alltestlist.filter((item) => {
        return item.category === "Javascript"
    })

    useEffect(() => {
        setLoader(true);
        getAllTests(headers)
            .then((response) => {
                setAllTestList(response.data.Tests);
                setLoader(false)
            })
    }, []);

    const handleQuestionDetails = (item) => {
        console.log(item);
        console.log(item.questionslist)
        navigate('/question-details', { state: { item } })
    }

    return (
        <div className="card">
            <div className="d-flex">
                <div className="finance-card" style={alltests ? { backgroundColor: "#00B8C9", cursor: 'pointer' } : { cursor: 'pointer' }}
                    onClick={() => {
                        setAllTests(true);
                        setReactTest(false);
                        setNodeTest(false);
                        setJavascriptTest(false);
                    }}>
                    <div className="card-body">
                        <p className="fs-5 fw-bold text-center">All Assessments</p>
                        <div className='text-center'><img src={MernLogo} alt="MernLogo" style={{ width: 70, borderRadius: "50%" }} /></div>
                    </div>
                </div>
                <div className="finance-card" style={reacttest ? { backgroundColor: "#00B8C9", cursor: 'pointer' } : { cursor: 'pointer' }}
                    onClick={() => {
                        setAllTests(false);
                        setReactTest(true);
                        setNodeTest(false);
                        setJavascriptTest(false);
                    }}>
                    <div className="card-body">
                        <p className="fs-5 fw-bold text-center">React Assessment</p>
                        <div className='text-center'><img src={ReactLogo} alt="ReactLogo" style={{ width: 70, borderRadius: "50%" }} /></div>
                    </div>
                </div>
                <div className="finance-card" style={nodetest ? { backgroundColor: "#00B8C9", cursor: 'pointer' } : { cursor: 'pointer' }}
                    onClick={() => {
                        setAllTests(false);
                        setReactTest(false);
                        setNodeTest(true);
                        setJavascriptTest(false);
                    }}>
                    <div className="card-body">
                        <p className="fs-5 fw-bold text-center">Node Assessment</p>
                        <div className='text-center'><img src={NodeJSLogo} alt="NodeJSLogo" style={{ width: 70, borderRadius: "50%" }} /></div>
                    </div>
                </div>
                <div className="finance-card" style={javascripttest ? { backgroundColor: "#00B8C9", cursor: 'pointer' } : { cursor: 'pointer' }}
                    onClick={() => {
                        setAllTests(false);
                        setReactTest(false);
                        setNodeTest(false);
                        setJavascriptTest(true);
                    }}>
                    <div className="card-body">
                        <p className="fs-5 fw-bold text-center">Javascript Assessment</p>
                        <div className='text-center'><img src={JsLogo} alt="JsLogo" style={{ width: 70, borderRadius: "50%" }} /></div>
                    </div>
                </div>
            </div>

            {alltests ?
                <>
                    {/* {alltestlist.map((item, index) => {
                        return (
                            <div key={index}>
                                {item.questionslist.map((question) => {
                                    return (
                                        <div className="mt-2 mb-2" key={question._id}>
                                            <p className='fw-bold'>Q. {question.question}</p>
                                            <ul>
                                                <li>{question.option1}</li>
                                                <li>{question.option2}</li>
                                                <li>{question.option3}</li>
                                                <li>{question.option4}</li>
                                            </ul>
                                            <p>Answer : {question.answer}</p>
                                        </div>
                                    );
                                })}
                            </div>
                        );
                    })} */}
                    <div className="row">
                        {alltestlist.map((item) => {
                            return (
                                <div className="col-sm-3">
                                    <div className="assessment-name-card pointer" key={item._id} onClick={() => {
                                        handleQuestionDetails(item)
                                    }}>
                                        <div className="card-body">
                                            <p className="fs-5 fw-bold text-center">{item.testname}</p>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>


                </>
                : null}


            {reacttest ?
                <>
                    <div className="row">
                        {reacttestlist.map((item) => {
                            return (
                                <div className="col-sm-3">
                                    <div className="assessment-name-card pointer" key={item._id} onClick={() => {
                                        handleQuestionDetails(item)
                                    }}>
                                        <div className="card-body">
                                            <p className="fs-5 fw-bold text-center">{item.testname}</p>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </>
                : null}


            {nodetest ?
                <>
                    <div className="row">
                        {nodetestlist.map((item) => {
                            return (
                                <div className="col-sm-3">
                                    <div className="assessment-name-card pointer" key={item._id} onClick={() => {
                                        handleQuestionDetails(item)
                                    }}>
                                        <div className="card-body">
                                            <p className="fs-5 fw-bold text-center">{item.testname}</p>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>

                </>
                : null}

            {javascripttest ?
                <>
                    {/* {javascripttestlist[0].questionslist.map((item) => {
                        return (
                            <div className="mt-2 mb-2" key={item._id}>
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
                    })} */}
                    <div className="row">
                        {javascripttestlist.map((item) => {
                            return (
                                <div className="col-sm-3">
                                    <div className="assessment-name-card pointer" key={item._id} onClick={() => {
                                        handleQuestionDetails(item)
                                    }}>
                                        <div className="card-body">
                                            <p className="fs-5 fw-bold text-center">{item.testname}</p>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </>
                : null}

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

            {/* {!loader && currentRecords.length === 0 ?
                <div className='d-flex justify-content-center'>
                    <p className='fs-4'>No Data Found</p>
                </div>
                : null} */}
        </div>
    );
}

export default AllAssessment;