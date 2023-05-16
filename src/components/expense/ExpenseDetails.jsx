import { useLocation } from 'react-router-dom';
import '../../styles/expense/expensedetails.css';

const ExpenseDetails = () => {
    const location = useLocation();
    const data = location.state.item;


    return (
        <div className="dashboardcard">
            <p className='view-student-details-heading'>Expense Details</p>
            <div className="d-flex ">
                <div className='view-student-details-primary-box'>
                    <div className="d-flex justify-content-between">
                        <p className='view-student-details-list-heading-1'>
                            Expense Category</p>
                        <div className='view-line1'></div>
                        <p className='studentid-value'>{data.categoryName}</p>
                    </div>
                    <div className='student-details-horizontal-line'></div>
                    <div className="d-flex justify-content-between">
                        <p className='view-student-details-list-heading-1'>Name of Expense</p>
                        <div className='view-line1'></div>
                        <p className='studentid-value'>{data.expenseName}</p>

                    </div>
                    <div className='student-details-horizontal-line'></div>
                    <div className="d-flex justify-content-between">
                        <p className='view-student-details-list-heading-1'>Vendor</p>
                        <div className='view-line1'></div>
                        <p className='studentid-value'>{data.vendor}</p>

                    </div>
                    <div className='student-details-horizontal-line'></div>
                    <div className="d-flex justify-content-between">
                        <p className='view-student-details-list-heading-1'>Amount</p>
                        <div className='view-line1'></div>
                        <p className='studentid-value'>{data.amount}</p>

                    </div>
                </div>

            </div>
        </div>
    );
}

export default ExpenseDetails;