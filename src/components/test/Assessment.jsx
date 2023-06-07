import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllTests } from '../../getdata/getdata';
import { headers } from '../../headers';
import { BallTriangle } from 'react-loader-spinner';
import { getAllAssessmentCategory } from '../../getdata/getdata';
import JsLogo from '../../assets/JsLogo.png';
import MernLogo from '../../assets/MernLogo.png';
import NodeJSLogo from '../../assets/NodeJSLogo.jpg';
import ReactLogo from '../../assets/ReactLogo.png';
import '../../styles/assessment/assessmentlist.css';

const Assessment = () => {
    const [assessmentcategorylist, setAssessmentCategoryList] = useState([]);
    const [alltestlist, setAllTestList] = useState([]);
    const [alltests, setAllTests] = useState(true);
    const [loader, setLoader] = useState(false);
    const [active, setIsActive] = useState(false);
    const navigate = useNavigate();
    const [testlist, setTestlist] = useState([]);
    const [allcategory, setAllCategory] = useState(true);
    const [category, setCategory] = useState(false);

    const handleActive = (categoryname) => {
        setAllTests(false);
        const testlist = alltestlist.filter((item) => {
            return item.category === categoryname
        })
        setTestlist(testlist);
        setIsActive(true);
    }

    const handleCategory = (id) => {
        setCategory(id)
    };

    useEffect(() => {
        setLoader(true);
        getAllTests(headers)
            .then((response) => {
                setAllTestList(response.data.Tests);
                setLoader(false)
            })
        getAllAssessmentCategory(headers)
            .then((response) => {
                setAssessmentCategoryList(response.data.AssessmentCategories);
                setLoader(false);
            })
            .catch((error) => {
                console.log(error);
            })

    }, []);

    const handleQuestionDetails = (item) => {
        // console.log(item);
        // console.log(item.questionslist)
        localStorage.setItem('item', JSON.stringify(item));
        localStorage.setItem('questionlist', JSON.stringify(item.questionslist))
        navigate('/question-details', { state: { item } })
        
    }

    return (
        <div className="card">
            <div className="d-flex">
                <div className="assessment-category-card pointer" style={allcategory ? { backgroundColor: "#00B8C9", cursor: 'pointer' } : { cursor: 'pointer' }}
                    onClick={() => {
                        setAllTests(true);
                        setIsActive(false);
                        setCategory(false);
                        setAllCategory(true);
                    }}>
                    <div className="card-body">
                        <p className="fs-5 fw-bold text-center">All Assessments</p>
                        {/* <div className='text-center'><img src={MernLogo} alt="MernLogo" style={{ width: 70, borderRadius: "50%" }} /></div> */}
                    </div>
                </div>
                {assessmentcategorylist.map((item) => {
                    return (
                        <div className="assessment-category-card pointer" style={category === item._id ? { backgroundColor: "#00B8C9", cursor: 'pointer' } : { cursor: 'pointer' }}
                            onClick={() => {
                                handleActive(item.assessmentcategoryName)
                                handleCategory(item._id);
                                setAllCategory(false);
                            }}>
                            <div className="card-body">
                                <p className="fs-5 fw-bold text-center">{item.assessmentcategoryName} Assessment</p>
                                {/* <div className='text-center'><img src={MernLogo} alt="MernLogo" style={{ width: 70, borderRadius: "50%" }} /></div> */}
                            </div>
                        </div>
                    )
                })}
            </div>

            {alltests ?
                <>
                    <div className="row">
                        {alltestlist.map((item) => {
                            return (
                                <div className="col-sm-3">
                                    <div className="assessment-name-card pointer" key={item._id} onClick={() => {
                                        handleQuestionDetails(item)
                                    }}>
                                        <div className="card-body">
                                            <p className="fs-5 text-center">{item.testname}</p>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </>
                : null}


            {active ?
                <>
                    <div className="row">
                        {testlist.map((item) => {
                            return (
                                <div className="col-sm-3">
                                    <div className="assessment-name-card pointer" key={item._id} onClick={() => {
                                        handleQuestionDetails(item)
                                    }}>
                                        <div className="card-body">
                                            <p className="fs-5 text-center">{item.testname}</p>
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

            {active && testlist.length === 0 ?
                <div className='text-center'>
                    <p className='mt-4 fs-4'>No Assessment Found</p>
                </div>
                : null}
        </div>
    );
}

export default Assessment;