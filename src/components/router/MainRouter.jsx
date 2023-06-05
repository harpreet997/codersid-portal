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
import UpdatedAddExpense from '../expense/UpdatedAddExpense';
import AddExpenseCategory from '../expense/AddExpenseCategory';
import MainPaymentReceipt from '../paymentrecord/MainPaymentReceipt';
import ExpenseManagement from '../expense/ExpenseManagement';
import UpdatedExpenseManagement from '../expense/UpdatedExpenseManagement';
import StudentDetails from '../student/StudentDetails';
import ExpenseDetails from '../expense/ExpenseDetails';
import UpdatedExpenseDetails from '../expense/UpdatedExpenseDetails';
import SignIn from '../login/SignIn';
import UpdateStudent from '../student/UpdateStudent';
import UpdateExpense from '../expense/UpdateExpense';
import UpdatedEditExpense from '../expense/UpdatedEditExpense';
import FinanceRecord from '../finance/FinanceRecord';
import AllLeads from '../leads/AllLeads';
import Followup from '../leads/Followup';
import ColdReachOut from '../leads/ColdReachOut';
import ConvertedLead from '../leads/ConvertedLead';
import LostLead from '../leads/LostLead';
import WalkIn from '../../components/leads/WalkIn';
import ViewLeadDetails from '../leads/ViewLeadDetails';
import CreateTest from '../test/CreateTest';
import AllTests from '../test/AllTests';
import NewQuestions from '../questions/NewQuestion';
import ReactTest from '../test/ReactTest';
import NodeTest from '../test/NodeTest';
import JavascriptTest from '../test/JavascriptTest';
import AllAssessment from '../test/AllAssessment';

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
                    {/* <Route path='/manage-expense' element={<UpdatedExpenseManagement />} />
                    <Route path='/add-expense' element={<UpdatedAddExpense />} />
                    <Route path='/update-expense' element={<UpdatedEditExpense />} />
                    <Route path='/expense-details' element={<UpdatedExpenseDetails />} /> */}
                    <Route path='/payment' element={<Payment/>} />
                    <Route path='/payment-receipt' element={<MainPaymentReceipt />} />
                    <Route path='/payment-records' element={<PaymentRecord />} />
                    <Route path='/manage-students' element={<Dashboard />} />
                    <Route path='/finance' element={<FinanceRecord />} />
                    <Route path='/all-leads' element={<AllLeads />} />
                    <Route path='/followup' element={<Followup />} />
                    <Route path='/cold-reach-out' element={<ColdReachOut />} />
                    <Route path='/convered-leads' element={<ConvertedLead />} />
                    <Route path='/lost-leads' element={<LostLead />} />
                    <Route path='/walk-in' element={<WalkIn />} />
                    <Route path='/lead-details' element={<ViewLeadDetails />} />
                    <Route path='/create-test' element={<CreateTest />} />
                    {/* <Route path='/all-tests' element={<AllTests />} /> */}
                    <Route path='/all-tests' element={<AllAssessment/>}/>
                    <Route path='/react-test' element={<ReactTest />} />
                    <Route path='/node-test' element={<NodeTest />} />
                    <Route path='/javascript-test' element={<JavascriptTest />} />
                    {/* <Route path='/create-question' element={<NewQuestions />} /> */}
                </Route>
                <Route path="/" element={<SignIn />} />
            </Routes>
        </>
    )
}

export default MainRouter;