import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllFeedback } from '../../getdata/getdata';
import { headers } from '../../headers';
import { BallTriangle } from 'react-loader-spinner';
import { updateFeedback } from '../../postdata/postdata';
import { toast } from "react-toastify";
import { primaryUrl } from '../../baseurl';
import { Switch } from 'antd';
import Pagination from '../pagination/Pagination';
import '../../styles/assessment/assessmentlist.css';
import '../../styles/feedback/feedback.css';

const AllFeddback = () => {
    const [alltestlist, setAllTestList] = useState([]);
    const [testlist, setTestList] = useState([]);
    const [categoryType, setCategoryType] = useState("all");
    const [allCategory, setAllCategory] = useState([])
    const [loader, setLoader] = useState(false)
    const [currentPage, setCurrentPage] = useState(1);
    const [recordsPerPage] = useState(10);
    const indexOfLastRecord = currentPage * recordsPerPage;
    const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
    const currentRecords = testlist?.length > 0 ? testlist.slice(indexOfFirstRecord, indexOfLastRecord) : [];
    const navigate = useNavigate();
    const date = new Date();
    date.setDate(date.getDate() + 2);
    const expiryDate = date.toString()



    useEffect(() => {
        // setLoader(true);
        getAllFeedback(headers)
            .then((response) => {
                setAllTestList(response.data);
                setTestList(response.data);
                let allcategory = response.data.map(v => (v.category))
                // setAllCategory(allcategory)
                setAllCategory([...new Set(allcategory)])
                // setLoader(false)
            })
    }, []);

    const handleQuestionDetails = (item) => {
        console.log(item);
        console.log(item.questionslist)
        localStorage.setItem('item', JSON.stringify(item));
        localStorage.setItem('questionlist', JSON.stringify(item.questionslist))
        navigate('/feedback-question-details', { state: { item } })
    }

    const copy = async (id) => {
        await navigator.clipboard.writeText(`${primaryUrl}/feedback-link/${id}`);
        toast.success("Feedback Link Copied", {
            position: "top-center",
            autoClose: 1000
        })
    }

    const enableLink = (id) => {
        const payload = {
            expiryDate: expiryDate
        }
        updateFeedback(id, payload)
            .then((response) => {
                toast.success("Feedback Link Enabled Successfully", {
                    position: "top-center",
                    autoClose: 1000
                })
                window.location.reload(false);
            })
            .catch((error) => {
                toast.success(error, {
                    position: "top-center",
                    autoClose: 1000
                })
            })
    }

    const disableLink = (id) => {
        const payload = {
            expiryDate: ""
        }
        updateFeedback(id, payload)
            .then((response) => {
                toast.success("Feedback Link Disabled Successfully", {
                    position: "top-center",
                    autoClose: 1000
                })
                window.location.reload(false);
            })
            .catch((error) => {
                toast.success(error, {
                    position: "top-center",
                    autoClose: 1000
                })
            })
    }

    const filterFeedback = (type) => {
        if (type === "all") {
            setTestList(alltestlist)
            setCategoryType(type)
        }
        else {
            let test = alltestlist.filter(v => (v.category === type))
            setTestList(test)
            setCategoryType(type)
        }
    }

    return (
        <div className="card">
            <div className="d-flex">
                <div className="feedback-name-card" style={categoryType === "all" ? { backgroundColor: "#00B8C9", cursor: 'pointer' } : { cursor: 'pointer' }}
                    onClick={() => filterFeedback("all")}
                >
                    <div className="card-body text-center">
                        <p className="fs-5 fw-bold">All Feedback</p>

                    </div>
                </div>

                {
                    allCategory.map((name) => (
                        <div className="feedback-name-card" style={categoryType === name ? { backgroundColor: "#00B8C9", cursor: 'pointer' } : { cursor: 'pointer' }}
                            onClick={() => filterFeedback(name)}
                        >
                            <div className="card-body text-center">
                                <p className="fs-5 fw-bold ">{name}</p>

                            </div>
                        </div>
                    ))
                }
            </div>



            <>
                <table className="table">
                    <thead className='text-center'>
                        <tr>
                            <th scope="col">Feedback Name</th>
                            <th scope="col">Feedback Category</th>
                            <th scope="col">Action</th>
                        </tr>

                    </thead>
                    <tbody className='text-center'>
                        {currentRecords.map((item) => {
                            return (
                                <tr key={item._id}>
                                    <td className='pointer' onClick={() => handleQuestionDetails(item)}>{item.name}</td>
                                    <td>{item.category}</td>
                                    <td><button className='feedback-link-button me-2' onClick={() => {
                                        copy(item._id)
                                    }}>
                                        <p className='feedback-link-button-text'>Feedback Link</p>
                                    </button>
                                        {/* {item.hasOwnProperty('expiryDate') ? <Switch defaultChecked={!(item.expiryDate === "")} 
                                            onChange={() => disableLink(item._id)} />
                                                : <Switch onChange={() => enableLink(item._id)} />} */}
                                        {!(item.expiryDate === "") ? <Switch defaultChecked={!(item.expiryDate === "")}
                                            onChange={() => disableLink(item._id)} />
                                            : <Switch defaultChecked={!(item.expiryDate === "")} onChange={() => enableLink(item._id)} />}
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </>



        </div>
    );
}

export default AllFeddback;
