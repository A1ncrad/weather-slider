import fetchHandler from "./utilities/fetchHandler.js";


export default async function (latitude, longitude) {
	const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&daily=weathercode,temperature_2m_max&timezone=GMT`;
	const data = await fetchHandler(url);

	return data.daily;
}