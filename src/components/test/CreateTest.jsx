import { useState, useEffect } from 'react';
import { Modal } from 'react-bootstrap';
import { getAllQuestions } from '../../getdata/getdata';
import { headers } from '../../headers';
import AddQuestion from '../test/AddQuestion';
import { addTest, deleteAllQuestions } from '../../postdata/postdata';
import { toast } from "react-toastify";


const CreateTest = () => {
    const [questionlist, setQuestionList] = useState([]);
    const [testmodal, setTestModal] = useState(false);
    const [testdata, setTestData] = useState({
        testname: "",
        questionslist: []
    })

    useEffect(() => {
        getAllQuestions(headers)
            .then((response) => {
                setQuestionList(response.data.Questions);
            })
            .catch((error) => {
                console.log(error);
            })
    }, []);

    const OpenTestModal = () => {
        setTestModal(true);
    }

    const CloseTestModal = () => {
        setTestModal(false);
    }

    const handleChange = (event) => {
        setTestData({
            ...testdata,
            [event.target.name]: event.target.value
        })
    }

    const AddTest = (event) => {
        event.preventDefault();
        const payload = {
            ...testdata,
            questionslist: questionlist
        }
        console.log(payload);
        addTest(payload)
            .then((response) => {
                toast.success(response.data.msg, {
                    position: "top-center",
                    autoClose: 3000
                })
                // window.location.reload(false);
            }
            )
            .catch((error) => {
                toast.error(error.response.data.msg, {
                    position: "top-center",
                    autoClose: 2000
                })
            })
            deleteAllQuestions()
            .then((response) => {
                toast.success(response.data.msg, {
                    position: "top-center",
                    autoClose: 3000
                })
            })
            .catch((error) => {
                toast.error(error.response.data.msg, {
                    position: "top-center",
                    autoClose: 2000
                })
            })
            window.location.reload(false);
    }




    return (
        <div className="card">
            <div className="d-flex align-items-start justify-content-between">
                <div className="d-flex justify-content-start">
                    <p className='studentlist-card-text'>Create Test</p>
                </div>
                <div className="d-flex justify-content-end">
                    <button className='add-student-button' onClick={OpenTestModal}>
                        <p className='add-student-button-text'>Add Question + </p>
                    </button>
                    <Modal show={testmodal ? true : false} onHide={CloseTestModal}>
                        <AddQuestion CloseTestModal={CloseTestModal} />
                    </Modal>
                </div>
            </div>
            {questionlist.length > 0
                ?
                <form onSubmit={AddTest}>
                    <div className='d-flex'>
                        <div>
                            <p className="text-start">Test Name</p>
                            <input type="text" className="add-batch-input"
                                id="testname" name="testname"
                                onChange={handleChange} required />
                        </div>
                        <div>
                            <button className='add-batch-button' type='submit'>
                                <p className='add-batch-button-text'>Submit</p>
                            </button>
                        </div>
                    </div>
                </form>
                : <div className="text-center">
                    <p className='fs-4'>No Test Found</p>
                </div>
                }

            {questionlist.map((item) => {
                return (
                    <div className='mt-4'>
                        <p>Q{item.id}. {item.question}</p>
                        <input type="checkbox" name="option1" id="option1" value={item.option1} />
                        <label className='ms-2 text-start fs-6' for="option1">{item.option1}</label><br />
                        <input type="checkbox" name="option2" id="option2" value={item.option2} />
                        <label className='ms-2 text-start fs-6' for="option2">{item.option2}</label><br />
                        <input type="checkbox" name="option3" id="option3" value={item.option3} />
                        <label className='ms-2 text-start fs-6' for="option3">{item.option3}</label><br />
                        <input type="checkbox" name="option4" id="option4" value={item.option4} />
                        <label className='ms-2 text-start fs-6' for="option4">{item.option4}</label>
                    </div>
                )
            })}

        </div>
    );
}

export default CreateTest;