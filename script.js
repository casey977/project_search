// Get elements...

let product_list = document.getElementById('productList');
let searchbar = document.getElementById('searchBar');

// Consts...

const PRODUCTS_URL_LIST = 'https://raw.githubusercontent.com/servicepos/projectsearch/0f840c4a3793eca4f0c22141238f02373bbe49ea/products.json';
const SEARCH_DELAY = 2500;

// Vars...

let current_page = 0;
let products;
let new_search = false;
let search_delay = 2500; // In milliseconds
let interval = 100; // In milliseconds

// Intervals...

setInterval(function () {
	if (new_search) {
		if (search_delay > 0.0) {
			search_delay -= interval;
		} else {
			new_search = false;
			get_product_list(false, searchbar.value);
		}}
}, interval);

// Events...

searchbar.addEventListener('input', function() {
	new_search = true;
	search_delay = 2500;
});

// Main...

get_product_list(true, '');

// Functions...

function get_product_list(all, term) {

	// Remove the current list...
	while (product_list.firstChild) {
		product_list.removeChild(product_list.firstChild);
	}
	
	// Get a fresh product list...
	fetch(PRODUCTS_URL_LIST)
		.then(function (res) {
			if (res.ok) {
				return res.json();
			} else {
				throw new Error('ERROR: Couldn\'t get file!');
			}
		})
		.then(function (data) {
			products = data.content;
		})
		.then(function () {
			for (const [key, value] of Object.entries(products)) {
				if (all || value.title.toLowerCase().includes(term)) { // Check parameter first to short-circuit for speed
					let new_div = document.createElement('product');
					new_div.className = 'product';
					new_div.innerHTML = `<br><br>${value.title}`; // Prettify later
					product_list.appendChild(new_div);
				}
			}
		})
		.catch(function (error) {
			console.error('ERROR: Something went wrong!', error)
		});
}