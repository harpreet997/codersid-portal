import { useState, useEffect } from "react";
import { getAllPayments, getAllExpenses } from "../../getdata/getdata";
import { headers } from "../../headers";
import FinanceChart from "./FinanceChart";
import '../../styles/finance/finance.css';

const Finance = () => {
    const [studentlist, setStudentList] = useState([]);
    const [expensedata, setExpenseData] = useState([]);
    const [fromdate, setfromDate] = useState();
    let sales = 0;
    let expenses = 0;
    const totalSales = studentlist.map((item) => {
        return sales = sales + parseInt(item.Amount);

    })
    const grandtotalSales = totalSales[studentlist.length - 1]
    const totalExpenses = expensedata.map((item) => {
        return expenses = expenses + parseInt(item.Amount);

    })
    const grandtotalExpenses = totalExpenses[expensedata.length - 1];
    const profit = grandtotalSales - grandtotalExpenses;


    useEffect(() => {
        getAllPayments(headers)
            .then((response) => {
                setStudentList(response.data.Payments);
            })
            .catch((error) => {
                console.log(error);
            })
        getAllExpenses(headers)
            .then((response) => {
                setExpenseData(response.data.Expenses)
            })
            .catch((error) => {
                console.log(error);
            })
    }, []);

    const handleFromDate = (event) => {
        const fromDate = event.target.value
        setfromDate(fromDate)
        let salesdata = studentlist.filter((item, i) => {
            return item.createdAt.substring(0, 10) >= fromDate;
        })
        let expenserecords = expensedata.filter((item, i) => {
            return item.createdAt.substring(0, 10) >= fromDate;
        })
        setStudentList(salesdata);
        setExpenseData(expenserecords);
    }

    console.log(expensedata)
    console.log(studentlist)

    const handleToDate = (event) => {
        const toDate = event.target.value
        let salesdata = studentlist.filter((item, i) => {
            return item.createdAt.substring(0, 10) >= fromdate && item.createdAt.substring(0, 10) <= toDate;
        })
        let expenserecords = expensedata.filter((item, i) => {
            return item.createdAt.substring(0, 10) >= fromdate && item.createdAt.substring(0, 10) <= toDate;
        })
        setStudentList(salesdata);
        setExpenseData(expenserecords);
    }

    const ClearFilter = () => {
        window.location.reload(false);
    }

    return (
        <div className="card">
            <div className="row">
                <div className="col-sm-5">
                    <p className="text-start select-field-label">Select From Date</p>
                    <input type="date" className="payment-records-input-width w-100" id="fromDate" name="fromDate"
                        onChange={handleFromDate} />
                </div>
                <div className="col-sm-5">
                    <p className="text-start select-field-label">Select To Date</p>
                    <input type="date" className="payment-records-input-width w-100" id="toDate" name="toDate"
                        onChange={handleToDate} />
                </div>
                <div className="col-sm-2">
                    <button className='add-student-button clear-filter-button' onClick={ClearFilter}>
                        <p className="add-student-button-text">Clear Filter</p>
                    </button>
                </div>
            </div>
            <div className="d-flex">
                <div className="finance-card">
                    <div className="card-body">
                        <p className="fs-4 fw-bold">&#x20B9; {studentlist.length === 0 ? 0: grandtotalSales}/-</p>
                        <p className="fs-5">Sales</p>
                    </div>
                </div>
                <div className="finance-card">
                    <div className="card-body">
                        <p className="fs-4 fw-bold">&#x20B9; {expensedata.length === 0 ? 0: grandtotalExpenses}/-</p>
                        <p className="fs-5">Expenses</p>
                    </div>
                </div>
                <div className="finance-card">
                    <div className="card-body">
                        <p className="fs-4 fw-bold">&#x20B9; {studentlist.length === 0 || expensedata.length === 0 ? 0: profit}/-</p>
                        <p className="fs-5">{profit < 0 ? "Loss" : "Profits"}</p>
                    </div>
                </div>
            </div>

            <FinanceChart/>

        </div>
    );
}

export default Finance;