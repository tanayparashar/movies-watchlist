import React, { useEffect, useState } from 'react';
import jwt from 'jsonwebtoken';
import { useNavigate } from 'react-router-dom';
import { MovieCard } from './movieCard';
export const Home = () => {
	const navigate = useNavigate();
	const [search,setSearch]=useState("");
	const [movies,setMovies]=useState(null);
	function searchOMDB()
	{
		fetch(`https://www.omdbapi.com/?s=${search}&apikey=b6e41423`)
			.then(response => response.json())
  			.then(data => {setMovies(data); console.log(data)});
	}
	async function checkToken() {
		const req = await fetch('http://localhost:3001/loginCheck', {
			headers: {
				'x-access-token': localStorage.getItem('token'),
			},
		})

		const data = await req.json()
		console.log(data);
		if (data.status === 'ok') {
			console.log("logged in");
		} else {
			alert(data.error);
			navigate("/");
		}
	}
	useEffect(() => {
		const token = localStorage.getItem('token')
		if (token) {
			const user = jwt.decode(token);
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
        		<div style={{margin:"10px"}} className="navheader"><h2 style={{color:"#0acfa9"}}>Movies Search</h2></div>
				<div className='navbutton'><h3>watchlist</h3> </div>
      		</div>
			<div className='searchDiv'>
				<input placeholder="Search your movie here..." value={search} onChange={(e)=>{setSearch(e.target.value)}}/>
				<button onClick={searchOMDB}>Search</button>
			</div >
			<div className="centerMovies">
			{
				movies?
				movies?.Response==="True"?
					movies?.Search?.map((ele)=>
						<MovieCard Title={ele.Title} Year={ele.Year} Type={ele.Type} Poster={ele.Poster} imdbID={ele.imdbID}/>
					):<h2 style={{color:"white"}}>No search result Found</h2>:<h1 style={{color:"white"}}>search your favourite movies</h1>
			}
			</div>
		</div>
	)
}

