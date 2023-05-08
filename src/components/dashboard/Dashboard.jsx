import React, { useEffect, useState } from 'react';
import Pagination from '../pagination/Pagination';
import NoRecord from '../../assets/NoRecord.png';
import { getAllStudents } from '../../getdata/getdata';
import { Modal } from 'react-bootstrap';
import ViewStudentDetails from '../student/ViewStudentDetails';
import { headers } from '../../headers';
import '../../styles/dashboard/dashboard.css';
import PaymentRecordLogo from '../../assets/PaymentRecordLogo.png';
import { getAllBatches } from '../../getdata/getdata';
import FirstImage from '../../assets/Dashboard1.png';
import SecondImage from '../../assets/Dashboard2.png';
import ThirdImage from '../../assets/Dashboard3.png';
import FourthImage from '../../assets/Dashboard4.png';
import FifthImage from '../../assets/Dashboard5.png';
import SixthImage from '../../assets/Dashboard6.png';
import SeventhImage from '../../assets/Dashboard7.png';

const Dashboard = () => {
    const [studentlist, setStudentList] = useState([]);
    const [allstudentlist, setAllStudentList] = useState([]);
    const [batchlist, setBatchList] = useState([]);
    const [studentName, setSearchStudentName] = useState('');
    const [modal, setModal] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [recordsPerPage] = useState(10);
    const indexOfLastRecord = currentPage * recordsPerPage;
    const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
    const currentRecords = studentlist.slice(indexOfFirstRecord, indexOfLastRecord);
    const nPages = Math.ceil(studentlist.length / recordsPerPage)

    useEffect(() => {
        getAllStudents(headers)
            .then((response) => {
                setStudentList(response.data.Students);
                setAllStudentList(response.data.Students)
            })
            .catch((error) => {
                console.log(error);
            })
        getAllBatches(headers)
            .then((response) => {
                setBatchList(response.data.Batches);
            })
            .catch((error) => {
                console.log(error);
            })
    }, []);

    const handleModal = (id) => {
        setModal(id)
    };

    const handleClose = () => setModal(false);

    const handleBatchSelect = (event) => {
        const batchName = event.target.value;
        console.log(batchName)
        if (batchName === 'All Batch') {
            setStudentList(allstudentlist);
        }
        else {
            let data = allstudentlist.filter((item, i) => {
                return item.batchname === batchName;
            })
            console.log(data);
            if (data.length > 0) {
                setStudentList(data);
            }
            else {
                setStudentList([])
            }
        }
    }

    return (
        <div className="dashboardcard">
            <img className='dashboard-image1' src={FirstImage} alt="FirstImage" />
            <img className='dashboard-image2' src={SecondImage} alt="SecondImage" />
            <img className='dashboard-image3' src={ThirdImage} alt="ThirdImage" />
            <img className='dashboard-image4' src={FourthImage} alt="FourthImage" />
            <img className='dashboard-image5' src={FifthImage} alt="FifthImage" />
            <img className='dashboard-image6' src={SixthImage} alt="SixthImage" />
            <img className='dashboard-image7' src={SeventhImage} alt="SeventhImage" />
        </div>


    );
}

export default Dashboard;
