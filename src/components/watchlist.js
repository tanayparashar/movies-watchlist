import { useEffect } from "react";
async function handleAddToWatchList()
    {
		const req = await fetch('http://localhost:3001/makepublic', {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
				'x-access-token': localStorage.getItem('token'),
			}
		})
		const data = await req.json()
		if (data.status === 'ok') {
			alert('added to watchlist')
		} else {
            
		}
    }
export const Watchlist=()=>{
    useEffect(()=>{
        // fetch('http://localhost:3001/watchlist', {
		// 	headers: {
		// 		'x-access-token': localStorage.getItem('token'),
		// 	},
		// }).then(res=>console.log(res))
        handleAddToWatchList();
    },[])
    return(
        <div>
            hello;
        </div>
    );
}