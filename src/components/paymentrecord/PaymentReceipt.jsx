import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { useLocation } from 'react-router-dom';
import '../../styles/studentdetails/studentdetails.css';
import '../../styles/payment-receipt/payment-receipt.css';
import ReceiptHeader from '../../assets/ReceiptHeader.png';
import ReceiptLogo from '../../assets/ReceiptLogo.png';
import MailIcon from '../../assets/MailIcon.png';
import PhoneIcon from '../../assets/PhoneIcon.png';
import LocationIcon from '../../assets/CompanyAddressIcon.png';

const PaymentReceipt = () => {
    const location = useLocation();
    const data = location.state.item;
    const id = location.state.item.id;

    const gstAmount = (data.Amount * 18) / 100;
    const downloadPDF = () => {
        const capture = document.querySelector(".dashboardcard");
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
            <div className="dashboardcard">
                <img className='receipt-header-logo' src={ReceiptHeader} alt="ReceiptHeader" />
                <img className='receipt-logo' src={ReceiptLogo} alt="ReceiptLogo" />
                <p className="receipt-date-text">Date of Receipt:</p>
                <p className="receipt-date-body">{data.createdAt.substring(0, 10)}</p>
                <div className="first-receipt-box">
                    <p className="receipt-no">Receipt No</p>
                    <p className="receipt-value">CI/{data._id.slice(-3, -1)}</p>
                    <div className="receipt-vertical-line-1"></div>
                    <p className="student-id">Student ID</p>
                    <p className="student-id-value">{`CODERSID-${id}`}</p>
                    <div className="receipt-horizontal-line-1"></div>
                    <p className="receipt-student-name">Name</p>
                    <p className="receipt-student-value">{data.StudentName}</p>
                    <div className="receipt-vertical-line-2"></div>
                    <p className="contact-number">Contact No.</p>
                    <p className="contact-number-value">{data.contactdetails}</p>
                </div>
                <div className="second-receipt-box">
                    <p className="receipt-payment-mode">Mode of Payment :</p>
                    <div className="receipt-horizontal-line-2"></div>
                    <p className="receipt-payment-type">Type of Payment :</p>
                    <div className="receipt-vertical-line-3"></div>
                    <p className="receipt-payment-mode-value">{data.PaymentMode}</p>
                    <p className="receipt-payment-type-value">{data.PaymentType}</p>
                </div>
                <div className="third-receipt-box">
                    <p className="receipt-email-address">Email Address :</p>
                    <p className="receipt-email-address-value">{data.Email}</p>
                </div>
                <div className="fourth-receipt-box">
                    <p className="receipt-description">Description</p>
                    <p className="receipt-amount">Amount</p>
                    <div className="receipt-horizontal-line-3"></div>
                    <p className="receipt-course-name">Course Name</p>
                    <div className="receipt-horizontal-line-4"></div>
                    <div className="receipt-vertical-line-4"></div>
                    <p className="receipt-course-value">{data.course}</p>
                    <p className="receipt-batch-name">Batch Name</p>
                    <div className="receipt-horizontal-line-5"></div>
                    <p className="receipt-batch-value">{data.batchname}</p>
                    <div className="receipt-vertical-line-5"></div>
                    <div className="receipt-vertical-line-6"></div>
                    <p className="receipt-amount-2">Amount</p>
                    <p className="receipt-gst">GST - 18%</p>
                    <p className="receipt-total-amount-2">{data.Amount - gstAmount}</p>
                    <p className="receipt-gst-value">{gstAmount}</p>
                    <p className="receipt-total-amount">Total Amount</p>
                    <p className="receipt-actual-amount">&#8377;{gstAmount}</p>
                </div>
                <p className="receipt-note">
                    This document contains confidential information. If you are not the intended recipient,
                    you are not authorized to use or disclose it in any form.If you have received this in error,
                    please destroy it along with any copies and notify the sender immediately.</p>
                <img className='mail-icon' src={MailIcon} alt="MailIcon" />
                <p className="placement-email">Placement@codersid.com</p>
                <img className='phone-icon' src={PhoneIcon} alt="PhoneIcon" />
                <p className="phone-details">+91 910919221</p>
                <img className='location-icon' src={LocationIcon} alt="LocationIcon" />
                <p className="location-details">Address: 716 Shekhar Central Palasia, Square, Manorama Ganj, Indore, Madhya Pradesh 452010,</p>
            </div>
            <div className="text-center">
                <button className="mt-2 mb-2 btn btn-primary" onClick={downloadPDF}>Print Receipt</button>
            </div>
        </>
    );
}

export default PaymentReceipt;