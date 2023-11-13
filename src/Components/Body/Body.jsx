import React, { useEffect, useState } from "react";
function Body(props) {
	const [users, setUsers] = useState([]);

	const fetchDataUsers = () => {
		fetch()
			// "https://api.spoonacular.com/recipes/716429/information?apiKey=b343e33843de486b805a2225d34b8b44&includeNutrition=true."
			.then((response) => response.json())
			.then((data) => setUsers(data));
	};
	useEffect(() => {
		fetchDataUsers();
	}, []);
	console.log("users", users);
	return (
		<div>
			{users ?? (
				<ul>
					<li>{users.sourceName}</li>
				</ul>
			)}
		</div>
	);
}

export default Body;
