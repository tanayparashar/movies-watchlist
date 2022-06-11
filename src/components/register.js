import { useState } from "react";
import { useNavigate } from 'react-router-dom';

export const Register =()=>{
    const navigate = useNavigate();
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const [name,setName]=useState("");
    const [errMsg,setErrMsg]=useState("");
    async function handleRegister(e)
    {
        e.preventDefault();
        const response = await fetch('http://localhost:3001/register', {
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