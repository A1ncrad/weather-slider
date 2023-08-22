import { load } from "./load.js";

const slider = document.querySelector(".slider");
let slideIndex = 0;


function translate(slideIndex) {
	if (window.innerWidth <= 998) {
		slider.style.transform = `translateY(-${window.innerHeight * slideIndex}px)`;
		return;
	}

	slider.style.transform = `translateX(-${slider.offsetWidth * slideIndex}px)`;
}


export function nextSlide() {
	slideIndex++;
	translate(slideIndex);
	load();

	return slideIndex;
}


export function prevSlide() {
	if (slideIndex == 0) return;

	slideIndex--;
	translate(slideIndex);
}


export function lastSlide() {
	slideIndex = slider.children.length - 1;
	translate(slideIndex);
	load();
}