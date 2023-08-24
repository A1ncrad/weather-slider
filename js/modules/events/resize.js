function setViewportHeight() {
	const vh = document.documentElement.clientHeight;
	document.documentElement.style.setProperty("--vh", vh);
}

document.addEventListener("DOMContentLoaded",setViewportHeight);
window.addEventListener("resize", setViewportHeight);