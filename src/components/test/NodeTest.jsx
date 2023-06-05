import { useState, useEffect } from "react";
import { getAllTests } from "../../getdata/getdata";
import { headers } from "../../headers";

const NodeTest = () => {
    const [testlist, setTestList] = useState([]);

    useEffect(() => {
        getAllTests(headers)
            .then((response) => {
                const categoryName = response.data.Tests.filter((item) => {
                    return item.category === "Node JS"
                })
                setTestList(categoryName[0].questionslist);

            })

    }, []);

    return (
        <div className="card">
            <div className="d-flex align-items-start justify-content-between">
                <div className="d-flex justify-content-start">
                    <p className='studentlist-card-text'>Node Assessment</p>
                </div>
            </div>

            {testlist.map((item) => {
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

        </div >
    );
}

export default NodeTest;