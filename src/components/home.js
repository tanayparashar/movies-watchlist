import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MovieCard } from './movieCard';
import searchIMG from "../assets/search1.png";

export const Home = () => {
	const navigate = useNavigate();
	const [search,setSearch]=useState("");
	const [movies,setMovies]=useState(null);
	function searchOMDB()
	{
		fetch(`https://www.omdbapi.com/?s=${search}&apikey=b6e41423`)
			.then(response => response.json())
  			.then(data => {setMovies(data)});
	}
	async function checkToken() {
		const req = await fetch('https://movies-watchlist-2022.herokuapp.com/loginCheck', {
			headers: {
				'x-access-token': localStorage.getItem('token'),
			},
		})

		const data = await req.json()
		if (data.status === 'ok') {
			console.log("logged in");
		} else {
			alert(data.error);
			navigate("/");
		}
	}
	function setEnterSearch(e){
		if (e.key === 'Enter') {
			searchOMDB();
		 }
    }
	
	useEffect(() => {
		const token = localStorage.getItem('token')
		if (token) {
			const user = (token);
			if (!user) {
				localStorage.removeItem('token')
				navigate('/');
			} else {
				checkToken()
			}
		}
		else{
			navigate('/');
		}
	}, [])

	return (
		<div>
			<div className='navbar'>
        		<div style={{margin:"10px"}} className="navheader" onClick={()=>{navigate("/home");}}><h2 style={{color:"#0acfa9"}}>Movies Search</h2></div>
				<div className='navbutton' onClick={()=>{navigate("/watchlist");}}><h3>Watchlist</h3> </div>
      		</div>
			<div className='searchDiv'>
				<input placeholder="Search here..." value={search} onKeyUp={(e)=>{setEnterSearch(e)}} onChange={(e)=>{setSearch(e.target.value)}}/>
				<button onClick={searchOMDB}>Search</button>
			</div >
			<div className="centerMovies">
			{
				movies?
				movies?.Response==="True"?
					movies?.Search?.map((ele)=>
						<MovieCard Title={ele.Title} Year={ele.Year} Type={ele.Type} Poster={ele.Poster} imdbID={ele.imdbID}/>
					):<h2 style={{color:"white"}}>No search result found !!</h2>:<div> <img src={searchIMG} alt="search-png" style={{height:"250px"}}/> <h1 style={{color:"#6A097D"}}>Search Your Favourite Movies</h1></div>
			}
			</div>
		</div>
	)
}

