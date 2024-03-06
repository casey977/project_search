const products_list_url = 'https://raw.githubusercontent.com/servicepos/projectsearch/0f840c4a3793eca4f0c22141238f02373bbe49ea/products.json';

let current_page = 0;
let products;

fetch(products_list_url)
.then(function (res) {
	if (res.ok) {
		//console.log('Success!');
		return res.json();
	} else {
		throw new Error('ERROR: Couldn\t get file!');
	}
})
.then(function (data) {
	products = data;
	//console.log(products);
})
.catch(function (error) {
	console.error('ERROR: Something went wrong!', error)
});