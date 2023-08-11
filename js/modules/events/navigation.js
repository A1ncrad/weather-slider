import * as navigation from "../navigation.js";


document.addEventListener("click", e => {
	if (e.target.closest(".slide__navigation--next")) navigation.nextSlide();
	if (e.target.closest(".slide__navigation--prev")) navigation.prevSlide();
})