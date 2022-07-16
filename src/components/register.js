import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { Loader } from "./loader";
export const Register =()=>{
    const navigate = useNavigate();
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const [name,setName]=useState("");
    const [errMsg,setErrMsg]=useState("");
    const [loader,setLoader]=useState(false);
    async function handleRegister(e)
    {
        setLoader(true);
        e.preventDefault();
        const response = await fetch('https://movies-watchlist-2022.herokuapp.com/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name,
                    email,
                    password,
                }),
            })

            const data = await response.json()
            setLoader(false);
            if (data.status === 'ok') {
                navigate('/')
            }
            else
            {
                setErrMsg(data.message);
            }
    }
    return(
        <div>
            <Loader isVisible={loader} />
            <div className="background">
                <div className="shape"></div>
                <div className="shape"></div>
            </div>
            <form>
                <h3 style={{marginTop:"10px"}}>Sign-up</h3>

                <label htmlFor="name">Name</label>
                <input type="text" placeholder="Name" id="name" value={name} onChange={(e)=>{setName(e.target.value)}}/>

                <label htmlFor="email">email</label>
                <input type="email" placeholder="Email" id="email" value={email} onChange={(e)=>{setEmail(e.target.value)}}/>

                <label htmlFor="password">Password</label>
                <input type="password" placeholder="Password" id="password" value={password} onChange={(e)=>{setPassword(e.target.value)}}/>

                <button onClick={handleRegister}>Sign Up</button>
            </form>
            <div style={{color:"red"}}>
                {errMsg}
            </div>
        </div>

          
    );
}