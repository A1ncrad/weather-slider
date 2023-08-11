import { iconsMap } from "../config/icons.js";


const slider = document.querySelector(".slider");
let number = 0;

export default function (city, country, weather) {
	const slide = document.createElement("section");
	slide.className = "slider__item slide";

	const background = new Image();
	background.src = `https://picsum.photos/1920/1080?random=${number}`;
	number++;

	const header = createHeader(city, country);


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