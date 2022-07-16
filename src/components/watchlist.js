import { useEffect ,useState} from "react";
import {MovieWatchListCard} from "./movieWatchListCard";
import { useNavigate } from 'react-router-dom';
import jwt_decode from "jwt-decode";
import { Loader } from "./loader";

export const Watchlist=()=>{
	const [moviesId,setMoviesId]=useState([]);
	const[loader,setLoader]=useState(false);
	const navigate = useNavigate();
	async function makepublic()
    {
		setLoader(true);
		const req = await fetch('https://movies-watchlist-2022.herokuapp.com/makepublic', {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
				'x-access-token': localStorage.getItem('token'),
			}
		})
		const data = await req.json()
		setLoader(false);
		if (data.status === 'success') {
			const decoded = jwt_decode(localStorage.getItem("token"));
			navigate(`/watchlist/${decoded.email}`);
		}
    }
	async function makeprivate()
	{
		setLoader(true);
		const res = await fetch('https://movies-watchlist-2022.herokuapp.com/makeprivate', {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
				'x-access-token': localStorage.getItem('token'),
			}
		})
		const data = await res.json();
		setLoader(false);
		if (data.status === 'success') {
			alert('watchlist made [private]');
		} 
	}

	async function moviesAdd()
	{		
		setLoader(true);
		const res = await fetch('https://movies-watchlist-2022.herokuapp.com/watchlist', {
			headers: {
				'x-access-token': localStorage.getItem('token'),
			},
		})
		var data = await res.json();
		setLoader(false);
		setMoviesId(data.data);
	} 
    useEffect(()=>{
		moviesAdd();
    },[])
    return(
        <div>
		<Loader isVisible={loader} />

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