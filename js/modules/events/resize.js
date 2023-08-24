function setViewportHeight() {
	const vh = window.innerHeight;
	document.documentElement.style.setProperty("--vh", vh);
}

window.addEventListener("resize", setViewportHeight);