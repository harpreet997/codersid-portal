import { useState, useEffect } from 'react';
import { getAllTests } from '../../getdata/getdata';
import { headers } from '../../headers';


const AllAssessment = () => {
    const [alltestlist, setAllTestList] = useState([]);
    const [alltests, setAllTests] = useState(true);
    const [reacttest, setReactTest] = useState(false);
    const [nodetest, setNodeTest] = useState(false);
    const [javascripttest, setJavascriptTest] = useState(false);

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
        getAllTests(headers)
            .then((response) => {
                setAllTestList(response.data.Tests);
            })
    }, []);

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
                    </div>
                </div>
            </div>

            {alltests ?
                <>
                    {alltestlist.map((item, index) => {
                        return (
                            <div key={index}>
                                {item.questionslist.map((question) => {
                                    return (
                                        <div className="mt-2 mb-2" key={question._id}>
                                            <p className='fw-bold'>Q. {question.question}</p>
                                            <input type="radio" id={question.option1} name={question.question} value={question.option1}
                                            />
                                            <label className='ms-2 text-start fs-6' htmlFor="option1">{question.option1}</label><br />
                                            <input type="radio" id={question.option2} name={question.question} value={question.option2}
                                            />
                                            <label className='ms-2 text-start fs-6' htmlFor="option2">{question.option2}</label><br />
                                            <input type="radio" id={question.option3} name={question.question} value={question.option3}
                                            />
                                            <label className='ms-2 text-start fs-6' htmlFor="option3">{question.option3}</label><br />
                                            <input type="radio" id={question.option4} name={question.question} value={question.option4}
                                            />
                                            <label className='ms-2 text-start fs-6' htmlFor="option4">{question.option4}</label>
                                        </div>
                                    );
                                })}
                            </div>
                        );
                    })}
                </>
                : null}


            {reacttest ?
                <>
                    {reacttestlist[0].questionslist.map((item) => {
                        return (
                            <div className="mt-2 mb-2" key={item._id}>
                                <p className='fw-bold'>Q{item.id}. {item.question}</p>
                                <input type="radio" id={item.option1} name={item.question} value={item.option1}
                                />
                                <label className='ms-2 text-start fs-6' htmlFor="option1">{item.option1}</label><br />
                                <input type="radio" id={item.option2} name={item.question} value={item.option2}
                                />
                                <label className='ms-2 text-start fs-6' htmlFor="option2">{item.option2}</label><br />
                                <input type="radio" id={item.option3} name={item.question} value={item.option3}
                                />
                                <label className='ms-2 text-start fs-6' htmlFor="option3">{item.option3}</label><br />
                                <input type="radio" id={item.option4} name={item.question} value={item.option4}
                                />
                                <label className='ms-2 text-start fs-6' htmlFor="option4">{item.option4}</label>
                            </div>
                        )
                    })}
                </>
                : null}


            {nodetest ?
                <>
                    {nodetestlist[0].questionslist.map((item) => {
                        return (
                            <div className="mt-2 mb-2" key={item._id}>
                                <p className='fw-bold'>Q{item.id}. {item.question}</p>
                                <input type="radio" id={item.option1} name={item.question} value={item.option1}
                                />
                                <label className='ms-2 text-start fs-6' htmlFor="option1">{item.option1}</label><br />
                                <input type="radio" id={item.option2} name={item.question} value={item.option2}
                                />
                                <label className='ms-2 text-start fs-6' htmlFor="option2">{item.option2}</label><br />
                                <input type="radio" id={item.option3} name={item.question} value={item.option3}
                                />
                                <label className='ms-2 text-start fs-6' htmlFor="option3">{item.option3}</label><br />
                                <input type="radio" id={item.option4} name={item.question} value={item.option4}
                                />
                                <label className='ms-2 text-start fs-6' htmlFor="option4">{item.option4}</label>
                            </div>
                        )
                    })}
                </>
                : null}

            {javascripttest ?
                <>
                    {javascripttestlist[0].questionslist.map((item) => {
                        return (
                            <div className="mt-2 mb-2" key={item._id}>
                                <p className='fw-bold'>Q{item.id}. {item.question}</p>
                                <input type="radio" id={item.option1} name={item.question} value={item.option1}
                                />
                                <label className='ms-2 text-start fs-6' htmlFor="option1">{item.option1}</label><br />
                                <input type="radio" id={item.option2} name={item.question} value={item.option2}
                                />
                                <label className='ms-2 text-start fs-6' htmlFor="option2">{item.option2}</label><br />
                                <input type="radio" id={item.option3} name={item.question} value={item.option3}
                                />
                                <label className='ms-2 text-start fs-6' htmlFor="option3">{item.option3}</label><br />
                                <input type="radio" id={item.option4} name={item.question} value={item.option4}
                                />
                                <label className='ms-2 text-start fs-6' htmlFor="option4">{item.option4}</label>
                            </div>
                        )
                    })}
                </>
                : null}
        </div>
    );
}

export default AllAssessment;