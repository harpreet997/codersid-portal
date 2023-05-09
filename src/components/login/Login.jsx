import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";
import { login } from '../../postdata/postdata';
import CodersIDLogo from '../../assets/CodersidLogo.png';
import FormBackground from '../../assets/FormBackground.png';
import LoginImageBackground from '../../assets/LoginImageBackground.png';
import LoginImage from '../../assets/LoginImage.png';
import EmailIcon from '../../assets/EmailIcon.png';
import PasswordIcon from '../../assets/PasswordIcon.png';
import { Blocks } from 'react-loader-spinner'
import '../../styles/login/login.css';

const Login = () => {
    const [logindata, setLogindata] = useState({
        email: "",
        password: ""
    });
    const navigate = useNavigate();
    const [loader, setLoader] = useState(false);

    const handleChange = (event) => {
        setLogindata({
            ...logindata,
            [event.target.name]: event.target.value
        })
    }


    const handleLogin = (event) => {
        event.preventDefault();
        login(logindata)
            .then((response) => {
                if (response.data.role === 'admin') {
                    setLoader(true)
                    localStorage.setItem('token', response.data.token)
                    localStorage.setItem('role', response.data.role)
                    setTimeout(() => {
                        navigate('/dashboard');
                        setLoader(false)
                        window.location.reload(false);
                    }, 200)
                }
                else {
                    setLoader(true)
                    localStorage.setItem('token', response.data.token)
                    localStorage.setItem('role', response.data.role)
                    setTimeout(() => {
                        navigate('/dashboard');
                        setLoader(false)
                        window.location.reload(false);
                    }, 200)
                }
            })
            .catch((error) => {
                toast.error(error.response.data.msg, {
                    position: "top-center",
                    autoClose: 2000
                })
            })

    }

    return (
        <div>
            {loader ? <div className='text-center'><Blocks
                visible={true}
                height="80"
                width="80"
                ariaLabel="blocks-loading"
                wrapperStyle={{}}
                wrapperClass="blocks-wrapper"
            /></div> : null}
            <img className='loginlogo' src={CodersIDLogo} alt="CodersIDLogo" />
            <img className='FormBackground' src={FormBackground} alt="FormBackground" />
            <form onSubmit={handleLogin}>
                <p className='loginFormText'>Member Login</p>
                <p className='loginformTextSecondary'>Fill out the form below to</p>
                <p className='loginText'>login</p>
                <div className='loginFormContainer'>
                    <input type="email" className="login-form-input form-control w-50" id="email" name="email"
                        placeholder="Email" onChange={handleChange}
                        required /><img className='email-icon' src={EmailIcon} alt="EmailIcon" />

                    <input type="password" className="login-form-input form-control w-50" id="password" name="password"
                        placeholder="Password" onChange={handleChange}
                        required /><img className='password-icon' src={PasswordIcon} alt="PasswordIcon" />
                    <button className='login-form-button'>
                        <p className='login-form-button-text'>LOGIN</p>
                    </button>
                </div>
                <div>
                    <input className='checkbox' type="checkbox" name='RememberMe'/>
                    <p className='checkbox-text'>Remember me</p>
                </div>
            </form>
            <img className='loginFormBackground' src={LoginImageBackground} alt="LoginImageBackground" />
            <img className='loginFormBackground' src={LoginImage} alt="LoginImage" />
        </div>
    );
}

export default Login;