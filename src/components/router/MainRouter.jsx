import { Routes, Route } from 'react-router-dom';
import Dashboard from '../dashboard/Dashboard';
import AddStudent from '../student/AddStudent';
import ProtectedRoutes from '../protectedroutes/ProtectedRoutes';
import AddUser from '../user/AddUser';
import UserList from '../user/UserList';
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
import AllAssessment from '../test/AllAssessment';
import StudentPerformance from '../studentperformance/StudentPerformance';
import AddAssessmentCategory from '../test/AddAssessmentCategory';
import Assessment from '../test/Assessment';
import QuestionDetails from '../question/QuestionDetails';
import LiveTest from '../test/LiveTest';
import AssessmentList from '../test/AssessmentList';
import CreateNewTest from '../test/CreateNewTest';
import ScoreCard from '../studentperformance/ScoreCard';
import NewQuestion from '../question/NewQuestion';
import EditNewQuestion from '../question/EditNewQuestion';
import StudentResponse from '../studentperformance/StudentResponse';

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
                    <Route path='/user-list' element={<UserList />} />
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
                    {/* <Route path='/create-test' element={<CreateTest />} /> */}
                    <Route path='/create-test' element={<CreateNewTest />} />
                    <Route path='/create-question' element={<NewQuestion />} />
                    <Route path='/edit-question' element={<EditNewQuestion />} />
                    <Route path='/all-tests' element={<AllAssessment/>}/>
                    {/* <Route path='/all-tests' element={<Assessment/>}/> */}
                    <Route path='/performance' element={<StudentPerformance />}/>
                    <Route path='/student-response' element={<StudentResponse />}/>
                    <Route path='/add-assessment-category' element={<AddAssessmentCategory />}/>
                    <Route path='/question-details' element={<QuestionDetails />}/>
                    <Route path='/score-card' element={<ScoreCard />}/>
                </Route>
                <Route path="/" element={<SignIn />} />
                <Route path='/assessment-list' element={<AssessmentList />}/>
                <Route path='/assessment-test/:id' element={<LiveTest />}/>
            </Routes>
        </>
    )
}

export default MainRouter;