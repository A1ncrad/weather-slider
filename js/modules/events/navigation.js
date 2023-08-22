import * as navigation from "../navigation.js";

const slider = document.querySelector(".slider");

document.addEventListener("click", e => {
	if (e.target.closest(".slide__navigation--next")) navigation.nextSlide();
	if (e.target.closest(".slide__navigation--prev")) navigation.prevSlide();
});


let startY;
let currentY;

document.addEventListener("touchstart", e => {
	startY = e.touches[0].clientY;
});

document.addEventListener("touchmove", e => {
	currentY = e.touches[0].clientY;
});

document.addEventListener("touchend", () => {
	if (startY - currentY > 20) navigation.nextSlide();
	if (startY - currentY < 20) navigation.prevSlide();
});