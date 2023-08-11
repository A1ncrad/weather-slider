import fetchResults from "./fetchResults.js";

const searchResults = document.querySelector(".search__results");

export default async function(query) {
	const searchList = await fetchResults(query);

	for (let i = 0; i < searchList.length; i++) {
		const item = searchList[i];

		const api = item._links["city:item"].href;
		const li = document.createElement("li");

		li.textContent = item.matching_full_name;
		li.dataset.api = api;

		searchResults.append(li);
	}
}