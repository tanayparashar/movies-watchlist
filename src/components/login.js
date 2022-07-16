import { useState ,useEffect} from "react";
import { useNavigate } from 'react-router-dom';
import { Loader } from "./loader";
export const Login =()=>{
    const [email,setEmail]=useState("");
    const navigate = useNavigate();
    const[loader,setLoader]=useState(false);
    const [password,setPassword]=useState("");
    async function handleLogin(e)
    {
        setLoader(true);
        e.preventDefault();
        const response = await fetch('https://movies-watchlist-2022.herokuapp.com/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email,
                    password,
                }),
            });

            const data = await response.json();

            if (data.user) {
                localStorage.setItem('token', data.user);
                navigate("/home");
            } else {
                alert('Please check your username and password')
            }
            setLoader(false);
    }
    useEffect(()=>{
        localStorage.removeItem('token');
    },[])
    return(
        <div>
            <Loader isVisible={loader} />
            <div className="background">
                <div className="shape"></div>
                <div className="shape"></div>
            </div>
            <form>
                <h3>Login Here</h3>

                <label htmlFor="email">Email</label>
                <input type="email" placeholder="Email" id="email" value={email} onChange={(e)=>{setEmail(e.target.value)}} style={{color:"white"}}/>

                <label htmlFor="password">Password</label>
                <input type="password" placeholder="Password" id="password" value={password} onChange={(e)=>{setPassword(e.target.value)}}/>

                <button onClick={handleLogin}>Log In</button>
                <div className="sign-up">
                <div className="go" onClick={(e)=>{navigate('/register');}}>  SIGN-UP</div>
                </div>
            </form>
        </div>

          
    );
}