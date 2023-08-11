import fetchHandler from "./utilities/fetchHandler.js";
import { load } from "./load.js";



export default async function(url) {
	const data = await fetchHandler(url);

	const fullName = data.full_name.split(", ");
	const city = fullName[0];
	const country = fullName.at(-1);
	const { latitude : lat, longitude : lng } = data.location.latlon;

	load({ city, country, lat, lng });
}