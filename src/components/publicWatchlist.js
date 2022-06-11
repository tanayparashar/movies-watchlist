import { useEffect,useState } from "react";
import { useParams } from "react-router-dom";
import {MovieWatchListCard} from "./movieWatchListCard";

export const PublicWatchlist=()=>{
    let { email } = useParams();
    const[visible,setVisible]=useState(false);
    const [moviesID,setMovieID]=useState([]);
    async function reqwatchlist()
    {
        const req = await fetch(`https://movies-watchlist-2022.herokuapp.com/watchlist/${email}`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				'x-access-token': localStorage.getItem('token'),
			}
		})
		const data = await req.json()
		if (data.message ) {
			
		} else {
            setMovieID(data);
            setVisible(true);
		}
    }
    useEffect(()=>{
        reqwatchlist();
    },[])
    return(
        <div style={{color:"white"}}>
            <h1>
                {email} Watchlist
            </h1>
            <div className="centerMovies">
				{
                    visible?moviesID.map((ele)=><MovieWatchListCard imdbID={ele}/>):<div>You cannot acces this watchlist</div>
				}
			</div>
        </div>
    );
}