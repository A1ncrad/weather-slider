import displaySearchResult from "../fetchData.js";
import search from "../search/index.js";
import * as modal from "../modal.js"


const modalSearch = document.querySelector(".modal");
const searchInput = document.querySelector(".search__input");
const searchResults = document.querySelector(".search__results");



document.addEventListener("click", (e) => {
	if (e.target.closest(".slide__button--search")) {
		modal.show(modalSearch)
		if (!searchInput.value) return;
		searchResults.innerHTML = "";
		search(searchInput.value);
	}

	if (e.target.matches(".modal")) modal.hide(modalSearch);
});


modalSearch.addEventListener("keyup", (e) => {
	if (e.key == "Escape") modal.hide(modalSearch);
});


searchInput.addEventListener("keyup", e => {
	searchResults.innerHTML = "";
	const value = e.target.value;

	if (!value) return;

	search(e.target.value);
});


searchResults.addEventListener("click", e => {
	const api = e.target.dataset.api;

	displaySearchResult(api);
})