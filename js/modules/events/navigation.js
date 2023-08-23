import * as navigation from "../navigation.js";


document.addEventListener("click", e => {
	if (e.target.closest(".slide__navigation--next")) navigation.nextSlide();
	if (e.target.closest(".slide__navigation--prev")) navigation.prevSlide();
});


const slider = document.querySelector(".slider");
let startY;
let currentY;


slider.addEventListener("touchstart", e => {
	startY = e.touches[0].clientY;
});


slider.addEventListener("touchmove", e => {
	currentY = e.touches[0].clientY;
});


slider.addEventListener("touchcancel", () => {
	currentY = undefined;
});


slider.addEventListener("touchend", () => {
	if (startY - currentY > 20) navigation.nextSlide();
	if (startY - currentY < 20) navigation.prevSlide();

	currentY = undefined;
});

