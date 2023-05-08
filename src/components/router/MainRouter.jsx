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

const MainRouter = () => {
    return (
        <>
            <Routes>
                <Route element={<ProtectedRoutes />}>
                    <Route path='/dashboard' element={<Dashboard />} />
                    <Route path='/students-list' element={<StudentList />} />
                    <Route path='/add-student' element={<AddStudent />} />
                    <Route path='/add-user' element={<AddUser />} />
                    <Route path='/add-batch' element={<AddBatch />} />
                    <Route path='/add-course' element={<AddCourse />} />
                    <Route path='/payment' element={<Payment />} />
                    <Route path='/payment-records' element={<PaymentRecord />} />
                    <Route path='/manage-students' element={<Dashboard />} />
                </Route>
                <Route path="/" element={<Signin />} />
            </Routes>
        </>
    )
}

export default MainRouter;