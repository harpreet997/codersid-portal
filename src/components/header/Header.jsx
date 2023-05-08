import CodersidLogo from '../../assets/CodersidLogo.png';
import SearchIcon from '../../assets/SearchIcon.png';
import CalendarIcon from '../../assets/Calendar.png';
import Logout from '../../assets/Logout.png';
import '../../styles/header/header.css';
import { useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";

const Header = () => {
    const navigate = useNavigate();

    const logout = () => {
        localStorage.removeItem('token');
        toast.success("Logging out", {
            position: "top-center",
            autoClose: 1000
        })
        navigate('/');
    }
    return (
        <div className='header'>
            <img className='header-logo' src={CodersidLogo} alt="CodersidLogo" />
            {/* <div className=''>
                <input className='search-box' type="text" name='search' placeholder='Search' />
                <img className='search-icon' src={SearchIcon} alt="SearchIcon" />
            </div> */}
            {/* <img className='calendar-icon' src={CalendarIcon} alt="CalendarIcon" /> */}
            <div className='logout-icon-position'><img className='logout' src={Logout} alt="Logout" 
            onClick={logout}/></div>
        </div>
    );
}

export default Header;