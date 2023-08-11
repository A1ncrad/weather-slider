import fetchHandler from "../utilities/fetchHandler.js";

export default async function(query) {
	const url = `https://api.teleport.org/api/cities/?search=${query}`;
	const data = await fetchHandler(url);

	return data._embedded["city:search-results"];
}