import { Routes, Route } from 'react-router-dom';
import Dashboard from '../dashboard/Dashboard';
import AddStudent from '../student/AddStudent';
import ProtectedRoutes from '../protectedroutes/ProtectedRoutes';
import Signin from '../signin/Signin';
import AddUser from '../user/AddUser';
import AddBatch from '../batch/AddBatch';
import Payment from '../payment/Payment';
import AddCourse from '../course/AddCourse';
import PaymentRecord from '../paymentrecord/PaymentRecord';
import StudentList from '../student/StudentList';
import Login from '../login/Login';
import AddExpense from '../expense/AddExpense';
import PaymentReceipt from '../paymentrecord/PaymentReceipt';
import ViewStudentDetails from '../student/ViewStudentDetails';

const MainRouter = () => {
    return (
        <>
            <Routes>
                <Route element={<ProtectedRoutes />}>
                    <Route path='/dashboard' element={<Dashboard />} />
                    <Route path='/students-list' element={<StudentList />} />
                    <Route path='/students-details' element={<ViewStudentDetails />} />
                    <Route path='/add-student' element={<AddStudent />} />
                    <Route path='/add-user' element={<AddUser />} />
                    <Route path='/add-batch' element={<AddBatch />} />
                    <Route path='/add-course' element={<AddCourse />} />
                    <Route path='/add-expense' element={<AddExpense />} />
                    <Route path='/payment' element={<Payment />} />
                    <Route path='/payment-receipt' element={<PaymentReceipt />} />
                    <Route path='/payment-records' element={<PaymentRecord />} />
                    <Route path='/manage-students' element={<Dashboard />} />
                </Route>
                <Route path="/" element={<Login />} />
            </Routes>
        </>
    )
}

export default MainRouter;