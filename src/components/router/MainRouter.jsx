import { Routes, Route } from 'react-router-dom';
import Dashboard from '../dashboard/Dashboard';
import AddStudent from '../student/AddStudent';
import ProtectedRoutes from '../protectedroutes/ProtectedRoutes';
import AddUser from '../user/AddUser';
import AddBatch from '../batch/AddBatch';
import Payment from '../payment/Payment';
import AddCourse from '../course/AddCourse';
import PaymentRecord from '../paymentrecord/PaymentRecord';
import StudentList from '../student/StudentList';
import AddExpense from '../expense/AddExpense';
import AddExpenseCategory from '../expense/AddExpenseCategory';
import MainPaymentReceipt from '../paymentrecord/MainPaymentReceipt';
import ExpenseManagement from '../expense/ExpenseManagement';
import StudentDetails from '../student/StudentDetails';
import ExpenseDetails from '../expense/ExpenseDetails';
import SignIn from '../login/SignIn';
import FinalMakePayment from '../payment/FinalMakePayment';
import UpdateStudent from '../student/UpdateStudent';
import UpdateExpense from '../expense/UpdateExpense';
import Finance from '../finance/Finance';
import FinanceRecord from '../finance/FinanceRecord';

const MainRouter = () => {
    return (
        <>
            <Routes>
                <Route element={<ProtectedRoutes />}>
                    <Route path='/dashboard' element={<Dashboard />} />
                    <Route path='/students-list' element={<StudentList />} />
                    <Route path='/students-details' element={<StudentDetails />} />
                    <Route path='/add-student' element={<AddStudent />} />
                    <Route path='/update-student' element={<UpdateStudent />} />
                    <Route path='/add-user' element={<AddUser />} />
                    <Route path='/add-batch' element={<AddBatch />} />
                    <Route path='/add-course' element={<AddCourse />} />
                    <Route path='/add-expense-category' element={<AddExpenseCategory />} />
                    <Route path='/manage-expense' element={<ExpenseManagement />} />
                    <Route path='/add-expense' element={<AddExpense />} />
                    <Route path='/update-expense' element={<UpdateExpense />} />
                    <Route path='/expense-details' element={<ExpenseDetails />} />
                    <Route path='/payment' element={<Payment/>} />
                    <Route path='/make-payment' element={<FinalMakePayment />} />
                    <Route path='/payment-receipt' element={<MainPaymentReceipt />} />
                    <Route path='/payment-records' element={<PaymentRecord />} />
                    <Route path='/manage-students' element={<Dashboard />} />
                    <Route path='/finance' element={<FinanceRecord />} />
                </Route>
                <Route path="/" element={<SignIn />} />
            </Routes>
        </>
    )
}

export default MainRouter;