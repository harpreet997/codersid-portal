import { Modal } from "react-bootstrap";
import { useState } from "react";
import ReceiptHeader from '../../assets/ReceiptHeader.png';
import ReceiptFooterLogo from '../../assets/ReceiptFooterLogo.png';
import ReceiptLogo from '../../assets/ReceiptLogo.png';
import MailIcon from '../../assets/MailIcon.png';
import PhoneIcon from '../../assets/PhoneIcon.png';
import LocationIcon from '../../assets/CompanyAddressIcon.png';
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import '../../styles/payment-receipt/main-receipt.css';
import { useLocation } from 'react-router-dom';


const MainPaymentReceipt = () => {
    const location = useLocation();
    const data = location.state.item;
    const id = location.state.item.id;

    const [showdownload, setShowDownload] = useState(true);

    const gstAmount = (data.Amount * 18) / 100;
    const downloadPDF = () => {
        setShowDownload(false);
        const capture = document.querySelector(".main-receipt-card");
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
        <div className="card">
            <div className="main-receipt-card">
                <img className='receipt-header-logo' src={ReceiptHeader} alt="ReceiptHeader" />
                <div className="d-flex flex-column">
                    <img className='receipt-logo' src={ReceiptLogo} alt="ReceiptLogo" />
                    <p className="receipt-tag-line">A Unit of GraffersID</p>
                    {/* {showdownload ? <div className="download-container">
                        <button className="download-button" onClick={downloadPDF}>
                            <p className="download-button-text">Download</p>
                        </button>
                    </div>: null} */}
                </div>
                <div className="d-flex">
                    <p className="main-receipt-date-text">Date of Receipt:</p>
                    <p className="main-receipt-date-value">{data.createdAt.substring(0, 10)}</p>
                </div>
                <div className="main-first-receipt-box">
                    <div className="d-flex">
                        <p className="main-receipt-no">Receipt No :</p>
                        <p className="main-receipt-no-value">CI/{data._id.slice(-3, -1)}</p>
                        <div className="main-receipt-vertical-line"></div>
                        <p className="main-receipt-student-id">Student ID :</p>
                        <p className="main-receipt-student-id-value">{`CODERSID-${id}`}</p>
                    </div>
                    <div className="main-receipt-horizontal-line-1"></div>
                    <div className="d-flex">
                        <p className="main-receipt-student-name">Name :</p>
                        <p className="main-receipt-student-value">{data.StudentName}</p>
                        <div className="main-receipt-vertical-line-2"></div>
                        <p className="main-receipt-contact-number">Contact No.</p>
                        <p className="main-receipt-contact-value">{data.contactdetails}</p>
                    </div>
                </div>
                <div className="main-second-receipt-box">
                    <div className="d-flex">
                        <p className="main-receipt-payment-mode">Mode of Payment :</p>
                        <div className="main-receipt-vertical-line-3"></div>
                        <p className="main-receipt-payment-mode-value">{data.PaymentMode}</p>
                    </div>
                    <div className="main-receipt-horizontal-line-2"></div>
                    <div className="d-flex">
                        <p className="main-receipt-payment-mode">Type of Payment :</p>
                        <div className="main-receipt-vertical-line-4"></div>
                        <p className="main-receipt-payment-mode-value">{data.PaymentType}</p>
                    </div>
                </div>

                <div className="main-third-receipt-box">
                    <div className="d-flex">
                        <p className="ps-3 pt-1">Email Address :</p>
                        <p className="ps-2 pt-1">{data.Email}</p>
                    </div>
                </div>

                <div className="main-fourth-receipt-box">
                    <div className="d-flex">
                        <p className="main-receipt-description">Description</p>
                        <p className="main-receipt-amount">Amount</p>
                    </div>
                    <div className="main-receipt-horizontal-line-3"></div>
                    <div className="d-flex">
                        <p className="main-receipt-course-name">Course Name :</p>

                        <p className="main-receipt-course-value">{data.course}</p>

                        <p className="main-receipt-amount-1">Amount :</p>
                        <p className="main-receipt-amount-value">{data.Amount - gstAmount}</p>
                    </div>
                    <div className="main-receipt-horizontal-line-4"></div>
                    <div className="d-flex">
                        <p className="main-receipt-batch-name">Batch Name</p>
                        <p className="main-receipt-batch-value">{data.batchname}</p>
                        <p className="main-receipt-gst-amount">GST - 18%</p>
                        <p className="main-receipt-gst-amount-value">{gstAmount}</p>
                    </div>
                    <div className="main-receipt-horizontal-line-4"></div>
                    <div className="d-flex">
                        <p className="main-receipt-total-amount">Total Amount</p>
                        <p className="main-receipt-total-amount-value">&#8377; {data.Amount}</p>
                    </div>
                </div>


                <p className="main-receipt-note">
                    This document contains confidential information. If you are not the intended recipient,
                    you are not authorized to use or disclose it in any form.If you have received this in error,
                    please destroy it along with any copies and notify the sender immediately.
                </p>

                <div className="d-flex">
                    <img className='main-receipt-email-icon' src={MailIcon} alt="MailIcon" />
                    <p className="ms-2 main-receipt-email-value">Placement@codersid.com</p>
                    <img className='main-receipt-phone-icon' src={PhoneIcon} alt="PhoneIcon" />
                    <p className="ms-2 main-receipt-phone-value">+91 910919221</p>
                    <img className='main-receipt-location-icon' src={LocationIcon} alt="LocationIcon" />
                    <p className="ms-2 main-receipt-location-value">716 Shekhar Central Palasia, Square, Manorama Ganj,
                        Indore, Madhya Pradesh 452010,</p>
                </div>
                <img className='receipt-header-logo' src={ReceiptFooterLogo} alt="ReceiptFooterLogo" />
                {/* <button className="mt-2 mb-2 btn btn-primary" onClick={downloadPDF}>Print Receipt</button> */}
            </div>
            <div className="text-center">
                <button className="mt-2 mb-2 btn btn-primary" onClick={downloadPDF}>Print Receipt</button>
            </div>
        </div>
    );
}

export default MainPaymentReceipt;