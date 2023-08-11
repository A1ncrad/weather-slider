export default function (arr) {
	const max = arr.length;
	const id = Math.floor(Math.random() * max) + 1;
	return arr[id];
}