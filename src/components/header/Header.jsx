import CodersidLogo from '../../assets/CodersidLogo.png';
import Logout from '../../assets/Logout.png';
import { useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";
import '../../styles/header/header.css';

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
            <div className="d-flex justify-content-between">
                <img className='header-logo' src={CodersidLogo} alt="CodersidLogo" />
                <img className='logout-icon' src={Logout} alt="Logout" onClick={logout} />
            </div>
        </div>
    );
}

export default Header;