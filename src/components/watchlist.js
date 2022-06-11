import { useEffect ,useState} from "react";
import {MovieWatchListCard} from "./movieWatchListCard";
import { useNavigate } from 'react-router-dom';
async function makepublic()
    {
		const req = await fetch('http://localhost:3001/makepublic', {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
				'x-access-token': localStorage.getItem('token'),
			}
		})
		const data = await req.json()
		if (data.status === 'success') {
			alert('watchlist made public access at /watchlist/[your email]')
		} else {
            
		}
    }
async function makeprivate()
{
	const res = await fetch('http://localhost:3001/makeprivate', {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json',
			'x-access-token': localStorage.getItem('token'),
		}
	})
	const data = await res.json()
	if (data.status === 'success') {
		alert('watchlist made [private]')
	} else {
		
	}
}

export const Watchlist=()=>{
	const [moviesId,setMoviesId]=useState([]);
	const [movies,setMovies]=useState([]);
	const navigate = useNavigate();

	async function moviesAdd()
	{		
		const res = await fetch('http://localhost:3001/watchlist', {
			headers: {
				'x-access-token': localStorage.getItem('token'),
			},
		})
		var data = await res.json();
		setMoviesId(data.data);
	} 
    useEffect(()=>{
		moviesAdd();
    },[])
    return(
        <div>
			<div>
				<div className='navbar'>
					<div style={{margin:"10px"}} className="navheader" onClick={()=>{navigate("/home")}}><h2 style={{color:"#0acfa9"}}>Movies Search</h2></div>
				</div>
				<div className="watclistButtons">
					<button onClick={makepublic} style={{margin:"1%",marginTop:"3%", backgroundColor:"#D72323"}}>Make Public</button>
					<button onClick={makeprivate}style={{margin:"1%",marginTop:"3%", backgroundColor:"#17B978"}}>Make Private</button>
				</div>
				<div className="centerMovies">
				{
					moviesId.map((ele)=><MovieWatchListCard imdbID={ele}/>)
				}
				</div>
		    </div>
        </div> 
    );
}