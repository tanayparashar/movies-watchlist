
export const MovieCard=(props)=>{
    const {Title,Year,Type,Poster,imdbID}=props;
    async function handleAddToWatchList(event)
    {
        event.preventDefault()
		const req = await fetch('http://localhost:3001/addToWatchlist', {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
				'x-access-token': localStorage.getItem('token'),
			},
			body: JSON.stringify({
				imdbID,
			}),
		})
		const data = await req.json()
		if (data.status === 'ok') {
			alert('added to watchlist')
		} else {
			alert(data.error)
		}
    }
    return(
        <div className="movieContainer" style={{color:"white"}}>
            <div className="moviePosterContainer">
                {Poster ? (
          <img style={{height:"400px", width:"100%", maxWidth:"400px"}}
            src={Poster}
            alt={`${Title} Poster`}
          />
        ) : (
          <div className="filler-poster" />
        )}
            </div>
            <div className="movieDetailsContainer">
                    <div>
                        <h1 style={{fontSize:"50px"}}>{Title}</h1>
                    </div>
                    <div>
                        <h2>{Type==="series"?"Series":"Movie"}</h2>
                        <h2>{Year}</h2>
                    </div>
                    <div>
                        <button onClick={handleAddToWatchList}>Add to watchlist</button>
                    </div>
            </div>
        </div>
    );
}