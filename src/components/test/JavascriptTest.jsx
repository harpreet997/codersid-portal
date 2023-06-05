import { useState, useEffect } from "react";
import { getAllTests } from "../../getdata/getdata";
import { headers } from "../../headers";
import { BallTriangle } from 'react-loader-spinner';

const JavascriptTest = () => {
    const [testlist, setTestList] = useState([]);
    const [loader, setLoader] = useState(false);

    useEffect(() => {
        setLoader(true);
        getAllTests(headers)
            .then((response) => {
                const categoryName = response.data.Tests.filter((item) => {
                    return item.category === "Javascript"
                })
                setTestList(categoryName[0].questionslist);
                setLoader(false);

            })

    }, []);

    return (
        <div className="card">
            <div className="d-flex align-items-start justify-content-between">
                <div className="d-flex justify-content-start">
                    <p className='studentlist-card-text'>Javascript Assessment</p>
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

        </div >
    );
}

export default JavascriptTest;