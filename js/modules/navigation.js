import { load } from "./load.js";

const slider = document.querySelector(".slider");
let slideIndex = 0;


export function nextSlide() {
	slideIndex++;
	slider.style.transform = `translateX(-${slider.offsetWidth * slideIndex}px)`;
	load();

	return slideIndex;
}


export function prevSlide() {
	if (slideIndex == 0) return;

	slideIndex--;
	slider.style.transform = `translateX(-${slider.offsetWidth * slideIndex}px)`;
}


export function lastSlide() {
	slideIndex = slider.children.length - 1;
	slider.style.transform = `translateX(-${slider.offsetWidth * slideIndex}px)`;
	load();
}