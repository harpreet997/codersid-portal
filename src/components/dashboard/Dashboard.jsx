import FirstImage from '../../assets/Dashboard1.png';
import SecondImage from '../../assets/Dashboard2.png';
import ThirdImage from '../../assets/Dashboard3.png';
import FourthImage from '../../assets/Dashboard4.png';
import FifthImage from '../../assets/Dashboard5.png';
import SixthImage from '../../assets/Dashboard6.png';
import SeventhImage from '../../assets/Dashboard7.png';
import '../../styles/dashboard/dashboard.css';

const Dashboard = () => {
    return (
        <div className="dashboardcard">
            <img className='dashboard-image1' src={FirstImage} alt="FirstImage" />
            <img className='dashboard-image2' src={SecondImage} alt="SecondImage" />
            <img className='dashboard-image3' src={ThirdImage} alt="ThirdImage" />
            <img className='dashboard-image4' src={FourthImage} alt="FourthImage" />
            <img className='dashboard-image5' src={FifthImage} alt="FifthImage" />
            <img className='dashboard-image6' src={SixthImage} alt="SixthImage" />
            <img className='dashboard-image7' src={SeventhImage} alt="SeventhImage" />
        </div>
    );
}

export default Dashboard;
