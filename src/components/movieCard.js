
export const MovieCard=(props)=>{
    const {Title,Year,Type,Poster,imdbID}=props;
    async function handleAddToWatchList(event)
    {
        event.preventDefault()
		const req = await fetch('http://localhost:3001/addToWatchlist', {
			method: 'POST',
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
          <img
            src={Poster}
            alt={`${Title} Poster`}
          />
        ) : (
          <div className="filler-poster" />
        )}
            </div>
            <div className="movieDetailsContainer">
                    <div>
                        <h1>{Title}</h1>
                    </div>
                    <div>
                        <h4>{Type}</h4>
                        <h4>{Year}</h4>
                    </div>
                    <div>
                        <button onClick={handleAddToWatchList}>Add to watchlist</button>
                    </div>
            </div>
        </div>
    );
}