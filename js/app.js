import { iconsMap } from "./config/icons.js";
import { cities } from "./config/worldcities.js";


const slider = document.querySelector(".slider");


function createHeader(city, country) {
	const header = document.createElement("header");
	header.className = "slide__header";

	const main = document.createElement("section");

	const title = document.createElement("h2");
	title.className = "slide__title"
	title.textContent = city;

	const subtitle = document.createElement("p");
	subtitle.className = "slide__subtitle";
	subtitle.textContent = country;

	const btnPrev = document.createElement("button");
	const btnNext = document.createElement("button");
	btnPrev.className = "slide__navigation slide__navigation--prev fa-solid fa-chevron-left";
	btnNext.className = "slide__navigation slide__navigation--next fa-solid fa-chevron-right";
	
	main.append(title);
	main.append(subtitle);
	main.append(btnPrev);
	main.append(btnNext);


	const buttons = document.createElement("section");
	buttons.className = "slide__buttons";

	const search = document.createElement("button");
	search.className = "slide__button slide__button--search";

	const searchIcon = document.createElement("span");
	searchIcon.className = "fa-solid fa-magnifying-glass";

	search.append(searchIcon);
	buttons.append(search);


	header.append(main);
	header.append(buttons);

	return header;
}

let number = 0;

function createSlide(city, country, imageURL, weather) {
	const slide = document.createElement("section");
	slide.className = "slider__item slide";

	const background = new Image();
	background.src = `https://picsum.photos/1920/1080?random=${number}`;
	number++;

	const header = createHeader(city, country)


	slide.append(background);
	slide.append(header);
	slider.append(slide);

	const statistics = document.createElement("section");
	statistics.className = "slide__statistics statistics";

	for (let i = 0; i < 7; i++) {
		const weathercode = weather.weathercode[i];
		const temperature = Math.round(weather.temperature_2m_max[i]);

		const tile = document.createElement("section");
		tile.className = "statisctics__tile";
		statistics.append(tile);

		const icon = document.createElement("span");
		icon.className = "statistics__icon fa-solid" + " " + iconsMap[weathercode];
		tile.append(icon);

		const text = document.createElement("p");
		text.className = "statistics__text";
		text.innerHTML = temperature + " C&deg";
		tile.append(text);
	}

	slide.append(statistics);
}

function randomInteger(max) {
	return Math.floor(Math.random() * max) + 1;
}

function countElementsInArray(arr) {
	let sum = 0;

	for (let i = 0; i < arr.length; i++) {
		sum++;
	}

	return sum;
}

async function fetchPhoto(cityName) {
	cityName = cityName.toLowerCase().replace(/\s+/g, '-');
	console.log(cityName);
	const url = `https://api.teleport.org/api/urban_areas/slug:${cityName}/images/`;

	try {
		let response = await fetch(url);
		let data = await response.json();

		return data?.photos?.[0].image;
	} catch (error) {
		console.error(error);
	}
}


async function fetchWeather(latitude, longitude) {
	const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&daily=weathercode,temperature_2m_max&timezone=GMT`;

	try {
		let response = await fetch(url);
		let data = await response.json();

		console.log(data.daily);
		return data.daily;
	} catch(error) {
		console.error(error);
	}
}

function pickCity() {
	const countOfCities = countElementsInArray(cities);
	const indexOfCity = randomInteger(countOfCities);
	const city = cities[indexOfCity];

	loadSlide(city.city, city.country, city.lat, city.lng);
}

async function loadSlide(city, country, lat, lang) {
	const images = await fetchPhoto("tokyo");
	const weather = await fetchWeather(lat, lang);
	createSlide(city, country, images.mobile, weather);
}

pickCity();
pickCity();



let slideIndex = 0;

slider.addEventListener("click", e => {
	if (e.target.matches(".slide__navigation--next")) nextSlide();
	if (e.target.matches(".slide__navigation--prev")) prevSlide();
	if (e.target.closest(".slide__button--search")) displayModal();
})


function nextSlide() {
	slideIndex++;
	slider.style.transform = `translateX(-${slider.offsetWidth * slideIndex}px)`;
	pickCity();
}

function LastSlide() {
	slideIndex = slider.children.length - 1;
	slider.style.transform = `translateX(-${slider.offsetWidth * slideIndex}px)`;
	pickCity();
}

function prevSlide() {
	if (slideIndex == 0) return;

	slideIndex--;
	slider.style.transform = `translateX(-${slider.offsetWidth * slideIndex}px)`;
}


const modal = document.querySelector(".modal");
const search = document.querySelector(".search__input");
const searchResults = document.querySelector(".search__results");

modal.addEventListener("click", (e) => {
	if (e.target.matches(".modal")) hideModal();
})

document.addEventListener("keyup", (e) => {
	if (e.key == "Escape") hideModal();
})

function displayModal() {
	modal.style.display = "block";
	if(search.value) searchCity(search.value);
}

function hideModal() {
	modal.style.display = "none";
}



search.addEventListener("keyup", e => {
	searchResults.innerHTML = "";
	const value = e.target.value;

	if (!value) return;

	searchCity(e.target.value);
});


searchResults.addEventListener("click", e => {
	const api = e.target.dataset.api;

	fetchCoords(api);
})

async function fetchCoords(url) {
	try {
		const response = await fetch(url);
		const data = await response.json();

		const text = data.full_name.split(", ");
		const lat = data.location.latlon.latitude;
		const lon = data.location.latlon.longitude;

		await loadSlide(text[0], text[2], lat, lon);
		LastSlide();
		hideModal();
	} catch(err) {
		console.error(err);
	}
}


async function fetchCity(city) {
	const apiUrl = `https://api.teleport.org/api/cities/?search=${city}`;

	try {
		const response = await fetch(apiUrl);
		const data = await response.json();

		return data._embedded["city:search-results"];
	} catch {
		return null;
	}
}


async function searchCity(city) {
	const list = await fetchCity(city);

	for(let i = 0; i < list.length; i++) {
		const item = list[i];
		const api = item._links["city:item"].href;
		const li = document.createElement("li");
		
		li.textContent = item.matching_full_name;
		li.dataset.api = api;

		searchResults.append(li);
	}
}


function updateCursor({clientX : x, clientY : y}) {
	document.documentElement.style.setProperty("--x", x + "px");
	document.documentElement.style.setProperty("--y", y + "px");
}


slider.addEventListener("pointermove", updateCursor);