function setViewportHeight() {
	const vh = window.innerHeight;
	document.documentElement.style.setProperty("--vh", vh + "pxhttp://192.168.0.34:3000");
}

setViewportHeight();
document.addEventListener("DOMContentLoaded", setViewportHeight);
window.addEventListener("resize", setViewportHeight);