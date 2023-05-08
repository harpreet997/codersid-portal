import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import '../../styles/signin/signin.css';
import { toast } from "react-toastify";
import { login } from '../../postdata/postdata';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import HeaderLogo from '../../assets/HeaderLogo.png';
import { Blocks } from 'react-loader-spinner'

const Signin = () => {
    const [logindata, setLogindata] = useState({
        email: "",
        password: ""
    });
    const navigate = useNavigate();

    const handleChange = (event) => {
        setLogindata({
            ...logindata,
            [event.target.name]: event.target.value
        })
    }

    const [loader, setLoader] = useState(false);

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
            <div className='card-align login-background'>

                <Card className='card-width'>
                    <CardContent>
                        <Box component="form" onSubmit={handleLogin}>
                            <div className='text-center mb-2'>
                                <img src={HeaderLogo} className='avatar' alt="LoginLogo" />
                            </div>
                            <TextField
                                name='email'
                                type='email'
                                className='w-100'
                                required
                                id="outlined-required"
                                label="Email"
                                placeholder='Enter Email Address'
                                onChange={handleChange}
                            />
                            <TextField
                                name='password'
                                type='password'
                                className='w-100 mt-4'
                                required
                                id="outlined-required"
                                label="Password"
                                placeholder='Enter Password'
                                onChange={handleChange}
                            />
                            <Button type="submit" className='mt-4 w-100' variant="contained">SIGN IN</Button>
                        </Box>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}

export default Signin;