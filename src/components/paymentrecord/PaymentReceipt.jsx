import { Modal } from "react-bootstrap";
import '../../styles/studentdetails/studentdetails.css';
import CodersID from '../../assets/Codersid.PNG';
import Address from '../../assets/Address.PNG';
import html2canvas from "html2canvas";
import jsPDF from "jspdf";


const PaymentReceipt = ({ data, id }) => {
    const gstAmount = (data.Amount * 18) / 100;
    const downloadPDF = () => {
        const capture = document.querySelector(".actual-receipt");
        html2canvas(capture)
        .then((canvas) => {
            const imgData = canvas.toDataURL('img/png');
            const doc = new jsPDF('p', 'mm', 'a4');
            const componentWidth = doc.internal.pageSize.getWidth();
            const componentHeight = doc.internal.pageSize.getHeight();
            doc.addImage(imgData, 'PNG', 0, 0, componentWidth, componentHeight);
            doc.save('payment-receipt.pdf');
        })
    }

    return (
        <>
            <Modal.Header closeButton>
            </Modal.Header>
            <Modal.Body className='border border-secondary m-1 borderWidth' >
                <div className="actual-receipt">


                    <div className="d-flex justify-content-start">
                        <img src={CodersID} alt="CodersIDLogo" width={150} height={50} />
                        <div className="ms-4 mb-4 me-1 mt-4 vr"></div>
                        <img src={Address} alt="CodersIDLogo" className='address-image' />
                    </div>

                    <div className="scroll">
                        <table className="table table-striped">
                            {/* <i className="ms-2 fw-bold">* Date Format : yyyy-mm-dd</i> */}
                            <div className="d-flex justify-content-end ms-2 me-2  mt-4 mb-4">
                                <tr>
                                    <th>Date of Receipt:</th>
                                    <td>{data.createdAt.substring(0, 10)}</td>
                                </tr>
                            </div>
                            <div className="ms-2 me-2  mt-4 mb-4">
                                <tr>
                                    <th style={{ width: "20%" }}>Receipt No :</th>
                                    <td style={{ width: "20%" }}>CI/{data._id.slice(-3, -1)}</td>
                                    <th style={{ width: "50%" }}>Student ID :</th>
                                    <td style={{ width: "60%" }}>{`CODERSID-${id}`}</td>
                                </tr>
                            </div>

                            <div className="ms-2 me-2 mt-4 mb-4">
                                <tr>
                                    <th style={{ width: "40%" }}>Name :</th>
                                    <td style={{ width: "40%" }}>{data.StudentName}</td>
                                    <th style={{ width: "40%" }}>Contact No.</th>
                                    <td style={{ width: "40%" }}>{data.contactdetails}</td>
                                </tr>
                            </div>
                            <div className="ms-2 me-2 mt-4 mb-4">
                                <tr>
                                    <th style={{ width: "40%" }}>Type of Payment :</th>
                                    <td style={{ width: "40%" }}>{data.PaymentType}</td>
                                    <th style={{ width: "40%" }}>Mode of Payment :</th>
                                    <td style={{ width: "40%" }}>{data.PaymentMode}</td>
                                </tr>
                            </div>
                            <div className="ms-2 me-2 mt-4 mb-4">
                                <tr>
                                    <th style={{ width: "100%" }}>Email Address :</th>
                                    <td style={{ width: "100%" }}>{data.Email}</td>
                                </tr>
                            </div>
                            <div className="ms-2 mt-4 me-2">
                                <tr>
                                    <th colspan={3}>Description</th>
                                    <th style={{ width: "1%" }}>Amount</th>
                                </tr>
                                <tr>
                                    <th >Course Name</th>
                                    <td>{data.course}</td>
                                    <th>Amount</th>
                                    <td>{data.Amount - gstAmount}</td>
                                </tr>
                                <tr>
                                    <th >Batch Name</th>
                                    <td>{data.batchname}</td>
                                    <th>GST - 18%</th>
                                    <td>{gstAmount}</td>
                                </tr>
                                <tr>
                                    <th colspan={3}>Total Amount</th>
                                    <td className="fw-bold">&#8377; {data.Amount}</td>
                                </tr>
                            </div>


                        </table>
                    </div>
                    <p className="ms-2 text-justify"><i>This document contains confidential information. If you are not the intended recipient, you are not authorized
                        to use or disclose it in any form.If you have received this in error, please destroy it along with any copies and
                        notify the sender immediately. </i></p>
                </div>
            </Modal.Body>
            <div className="text-center">
                <button className="mt-2 mb-2 btn btn-primary" onClick={downloadPDF}>Print Receipt</button>
            </div>
        </>
    );
}

export default PaymentReceipt;