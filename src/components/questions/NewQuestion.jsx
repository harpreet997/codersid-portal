import { useState } from 'react';
import { toast } from "react-toastify";
import { addQuestion } from "../../postdata/postdata";

const NewQuestions = () => {
    const [questiondata, setQuestionData] = useState({
        question: "",
        options: [
            {
                option1: "",
            }
        ],
        option1: "",
        option2: "",
        option3: "",
        option4: "",
        answer: ""
    })

    const handleChange = (event) => {
        setQuestionData({
            ...questiondata,
            [event.target.name]: event.target.value
        })
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        addQuestion(questiondata)
            .then((response) => {
                toast.success(response.data.msg, {
                    position: "top-center",
                    autoClose: 3000
                })
                window.location.reload(false);
            }
            )
            .catch((error) => {
                toast.error(error.response.data.msg, {
                    position: "top-center",
                    autoClose: 2000
                })
            })
    }

    return (
        <div className="card">
            <form onSubmit={handleSubmit}>
                <div>
                    <p className='make-payment-email-address'>Question</p>
                    <input className='student-name-input-field form-control' type="text"
                        id="question"
                        name="question" onChange={handleChange}
                        required />
                    <p className='make-payment-email-address'>Option 1</p>
                    <input className='student-name-input-field form-control' type="text"
                        id="option1"
                        name="option1" onChange={handleChange}
                        required />
                    <p className='make-payment-email-address'>Option 2</p>
                    <input className='student-name-input-field form-control' type="text"
                        id="option2"
                        name="option2" onChange={handleChange}
                        required />
                    <p className='make-payment-email-address'>Option 3</p>
                    <input className='student-name-input-field form-control' type="text"
                        id="option3"
                        name="option3" onChange={handleChange}
                        required />
                    <p className='make-payment-email-address'>Option 4</p>
                    <input className='student-name-input-field form-control' type="text"
                        id="option4"
                        name="option4" onChange={handleChange}
                        required />
                    <p className='make-payment-email-address'>Answer</p>

                    <select className="student-name-input-field form-control w-100" name="answer" onChange={handleChange} required>
                        <option value="">Select Answer</option>
                        {questiondata.option1 === '' || questiondata.option2 === '' || questiondata.option3 === '' ||
                            questiondata.option4 === '' ?
                            <option value="No answer found">No Answer Found</option>
                            :
                            <>
                                <option value={questiondata.option1}>{questiondata.option1}</option>
                                <option value={questiondata.option2}>{questiondata.option2}</option>
                                <option value={questiondata.option3}>{questiondata.option3}</option>
                                <option value={questiondata.option4}>{questiondata.option4}</option>
                            </>
                        }
                        {/* {answerlist.map((item) => {
                                return (
                                    <option value={item}>{item}</option>
                                )
                            })} */}
                    </select>
                    <div className="text-center">
                        <button type="submit" className="mt-3 mb-3 btn btn-primary">Add Question</button>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default NewQuestions;