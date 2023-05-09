import React, { useState, useEffect } from 'react';
import { addBatch } from '../../postdata/postdata';
import { toast } from "react-toastify";
import { getAllBatches } from '../../getdata/getdata';
import Pagination from '../pagination/Pagination';
import NoRecord from '../../assets/NoRecord.png';
import { headers } from '../../headers';
import { deleteBatch } from '../../postdata/postdata';
import AddBatchIcon from '../../assets/AddBatch.png'
import '../../styles/user/user.css';
import '../../styles/batch/batch.css';

const AddBatch = () => {
    const [batchlist, setBatchList] = useState([])
    const [batchdata, setBatchdata] = useState({
        batchName: "",
    });
    const [currentPage, setCurrentPage] = useState(1);
    const [recordsPerPage] = useState(10);
    const indexOfLastRecord = currentPage * recordsPerPage;
    const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
    const currentRecords = batchlist.slice(indexOfFirstRecord, indexOfLastRecord);
    const nPages = Math.ceil(batchlist.length / recordsPerPage)

    useEffect(() => {
        getAllBatches(headers)
            .then((response) => {
                setBatchList(response.data.Batches);
            })
            .catch((error) => {
                console.log(error);
            })
    }, [batchlist]);

    const handleChange = (event) => {
        setBatchdata({
            ...batchdata,
            [event.target.name]: event.target.value
        })
    }

    const AddBatch = (event) => {
        event.preventDefault();
        addBatch(batchdata)
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

    const DeleteBatch = (id) => {
        deleteBatch(id)
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
        <div className="dashboardcard">
            <div className='mb-4'>
                <p className='add-batch-card-text'>Add Batch</p>
                <img className='add-batch-icon' src={AddBatchIcon} alt="AddBatchIcon" />
            </div>

            <form className='mt-4' onSubmit={AddBatch}>
                <div className='d-flex row'>
                    <div className="col-sm-6">
                        <p className="text-start">Batch Name</p>
                        <input type="text" className="add-batch-input form-control"
                            id="batchName" name="batchName"
                            placeholder="Enter Batch Name"
                            onChange={handleChange} required />
                    </div>

                    <div className='col-sm-6'>
                        <button className='add-batch-button' type='submit'>
                            <p className='add-batch-button-text'>Submit</p>
                        </button>
                    </div>
                </div>
            </form>

            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">Batch Name</th>
                        <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {currentRecords.map((item, i) => {
                        return (
                            <tr key={i}>
                                <td>{item.batchName}</td>
                                <td>
                                    <button className='delete-button' onClick={() => DeleteBatch(item._id)}>
                                        <p className='delete-button-text'>Delete</p>
                                    </button></td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
            {currentRecords.length === 0 ?
                <div className='noRecordImage'>
                    <img src={NoRecord} alt='NoRecord' className='w-10' />
                </div>
                : null}
            {currentRecords.length > 0 ?
                <div className="pagination-button">
                    <Pagination
                        nPages={nPages}
                        currentPage={currentPage}
                        setCurrentPage={setCurrentPage}
                    />
                </div>

                : null}
        </div>


    );
}

export default AddBatch;
