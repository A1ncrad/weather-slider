import worldcities from "../config/worldcities.js";
import random from "./utilities/random.js";

import fetchWeather from "./fetchWeather.js";
import createSlide from "./createSlide.js";
import * as navigation from "./navigation.js";
import * as modal from "./modal.js";


export async function load(data = null) {
	const { city, country, lat, lng } = data || random(worldcities);
	const weather = await fetchWeather(lat, lng);
	createSlide(city, country, weather);

	if (!data) return;
	navigation.lastSlide();
	modal.hide(document.querySelector(".modal"));
}

load();
load();