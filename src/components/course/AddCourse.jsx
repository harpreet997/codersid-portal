import { useState, useEffect } from 'react';
import { addCourse } from '../../postdata/postdata';
import { toast } from "react-toastify";
import { getAllCourses } from '../../getdata/getdata';
import Pagination from '../pagination/Pagination';
import NoRecord from '../../assets/NoRecord.png';
import LoadingImage from '../../assets/LoadingImage.gif';
import { headers } from '../../headers';
import { deleteCourse } from '../../postdata/postdata';
import AddCourseLogo from '../../assets/AddCourse.png';
import '../../styles/course/course.css';

const AddCourse = () => {
    const [courselist, setCourseList] = useState([])
    const [coursedata, setCoursedata] = useState({
        courseName: "",
    });
    const [currentPage, setCurrentPage] = useState(1);
    const [recordsPerPage] = useState(10);
    const indexOfLastRecord = currentPage * recordsPerPage;
    const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
    const currentRecords = courselist.slice(indexOfFirstRecord, indexOfLastRecord);
    const nPages = Math.ceil(courselist.length / recordsPerPage)

    useEffect(() => {
        getAllCourses(headers)
            .then((response) => {
                setCourseList(response.data.Courses);
            })
            .catch((error) => {
                console.log(error);
            })
    }, [courselist]);

    const handleChange = (event) => {
        setCoursedata({
            ...coursedata,
            [event.target.name]: event.target.value
        })
    }

    const AddCourse = (event) => {
        event.preventDefault();
        addCourse(coursedata)
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

    const DeleteCourse = (id) => {
        deleteCourse(id)
            .then((response) => {
                toast.success(response.data.msg, {
                    position: "top-center",
                    autoClose: 2000
                })
            })
            .catch((error) => {
                toast.error(error.response.data.msg, {
                    position: "top-center",
                    autoClose: 2000
                })
            })
    }

    return (
        <div className="card">
            <div className='d-flex'>
                <p className='add-course-card-text'>Add Course</p>
                <img className='add-course-icon' src={AddCourseLogo} alt="AddCourseLogo" />
            </div>

            <form onSubmit={AddCourse}>
                <div className='d-flex'>
                    <div>
                    <p className="text-start">Course Name</p>
                        <input type="text" className="add-course-input"
                            id="courseName" name="courseName"
                            onChange={handleChange} required />
                    </div>
                    <div>
                        <button className='add-course-button' type='submit'>
                            <p className='add-course-button-text'>Submit</p>
                        </button>
                    </div>
                </div>

            </form >

            <table className="table">
                <thead>
                    <tr>
                        <th className='ps-3' scope="col">Course List</th>
                        <th className='ps-3' scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {currentRecords.map((item, i) => {
                        return (
                            <tr key={i}>
                                <td className='ps-3'>{item.courseName}</td>
                                <td>
                                    <button className='delete-button' onClick={() => DeleteCourse(item._id)}>
                                        <p className='delete-button-text'>Delete</p>
                                    </button></td>
                            </tr>
                        )
                    })}
                </tbody>

            </table>
            {
                currentRecords.length === 0 ?
                    <div className='text-center'>
                        <img src={LoadingImage} alt='LoadingImage'/>
                    </div>
                    : null
            }
            {
                currentRecords.length > 0 ?
                    <div className="text-center">
                        <Pagination
                            nPages={nPages}
                            currentPage={currentPage}
                            setCurrentPage={setCurrentPage}
                        />
                    </div>

                    : null
            }
        </div >


    );
}

export default AddCourse;
