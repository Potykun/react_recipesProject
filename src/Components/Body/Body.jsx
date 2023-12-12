import React from "react";
import { useState } from "react";
import "./body.css";

import axios from "axios";
export default function Body() {
	const [keyword, setKeyword] = useState(null);
	let [diet1, setdiet1] = useState(null);
	const [exclude, setExclude] = useState(null);
	const [response, setResponse] = useState(null);
	const YOURAPIKEY = "653c3b9016e54562bf3bc2317f7619e2";
	const options = {
		method: "GET",
		url: "api/recipes/complexSearch?apiKey=653c3b9016e54562bf3bc2317f7619e2&includeNutrition=true.",
		params: {
			query: keyword,
			diet: diet1,
			excludeIngredients: exclude,
			number: "20",
			offset: "0",
			addRecipeInformation: true,
			maxReadyTime: 100,
		},
		headers: {
			"x-rapidapi-host":
				"spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
			"x-rapidapi-key": YOURAPIKEY,
		},
	};
	const getRecipes = async () => {
		try {
			let res = await axios(options);
			const data = await res.data;
			console.log("data", data.results);
			await setResponse(data.results);
		} catch (error) {
			console.error(error.res);
		}
	};
	return (
		<div className="bodytr">
			<h1 className="header">Recipe Search</h1>
			{/* <h2 className="">Search recipes from all over the world.</h2> */}
			<form
				className="form"
				onSubmit={(e) => {
					getRecipes();
					e.preventDefault();
					e.stopPropagation();
				}}
			>
				<input
					type="text"
					className="recipe"
					placeholder="Enter a recipe"
					onChange={(e) => {
						setKeyword(e.target.value);
						setResponse(null);
					}}
				/>
				<div className="diet">
					<div className="Exclude">
						<select
							className=""
							onChange={(e) => setdiet1(e.target.value)}
						>
							{[
								"Select",
								"Pescetarian",
								"Lacto vegetarian",
								"Ovo vegetarian",
								"Vegan",
								"Vegetarian",
							].map((diet1, indx) => {
								return (
									<option
										key={indx}
										value={diet1}
									>
										{diet1}
									</option>
								);
							})}
						</select>
						<label>Diet</label>
					</div>
					<div className="Exclude">
						<label className="">Exclude Ingredients</label>
						<input
							type="text"
							className=""
							placeholder="write here"
							onChange={(e) => setExclude(e.target.value)}
						></input>
					</div>
				</div>
				<button
					className="buttonSearch"
					type="submit"
				>
					Search
				</button>
			</form>
			{response && ( // Render only if response is not null
				<div className="responce">
					<div className="cnt-item">
						{response.map((recipe) => (
							<div
								key={recipe.id}
								className="responce-item"
							>
								<span className="imageSpan">
									<img
										src={recipe.image}
										className=""
										alt={recipe.id}
									/>
								</span>
								<div className="itemDescription">
									<h3 className="titleRecipes">{recipe.title}</h3>
									<span className="">
										Ready in {recipe.readyInMinutes} minutes <br />{" "}
									</span>
									<span>{recipe.servings} Servings</span>
									<a
										className=""
										href={recipe.sourceUrl}
									>
										Go to Recipe
									</a>
								</div>
							</div>
						))}
					</div>
				</div>
			)}
		</div>
	);
}
