function setViewportHeight() {
	const vh = window.innerHeight;
	document.documentElement.style.setProperty("--vh", vh + "px");
}

setViewportHeight();
document.addEventListener("DOMContentLoaded", setViewportHeight);
window.addEventListener("resize", setViewportHeight);
