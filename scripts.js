const productList = document.getElementById("productList");
const searchInput = document.getElementById("searchInput");
const searchButton = document.getElementById("searchButton");
const sortBySelect = document.getElementById("sortBy");

let products = [];
const jsonFilePath ='./products.json' ;
//'./ex8/products.json'

// Function to fetch data from the server
function fetchProducts() {
    fetch(jsonFilePath)
        .then(response => response.json())
        .then(data => {
            products = data;
            console.log(products)
            renderProducts();
        })
        .catch(error => console.error('Error fetching products:', error));
}


// Function to render products based on search and sorting criteria
function renderProducts() {
    productList.innerHTML = '';

    // Filter products based on search input
    const searchTerm = searchInput.value.toLowerCase();
    const filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(searchTerm) ||
        product.description.toLowerCase().includes(searchTerm)
    );

    // Sort products based on the selected sorting option
    const sortBy = sortBySelect.value;
    filteredProducts.sort((a, b) => {
        if (sortBy === 'name') {
            return a.name.localeCompare(b.name);
        } else if (sortBy === 'price') {
            return a.price - b.price;
        }
    });

    // Generate HTML for each product
    filteredProducts.forEach(product => {
        const productDiv = document.createElement('div');
        productDiv.classList.add('product');

        const productName = document.createElement('h2');
        productName.textContent = product.name;

        const productDescription = document.createElement('p');
        productDescription.textContent = product.description;

        const productPrice = document.createElement('p');
        productPrice.textContent = `Price: $${product.price.toFixed(2)}`;

        const productImage = document.createElement('img');
        productImage.src = product.image;
        productImage.alt = product.name;

        productDiv.appendChild(productImage);
        productDiv.appendChild(productName);
        productDiv.appendChild(productDescription);
        productDiv.appendChild(productPrice);

        productList.appendChild(productDiv);
    });
}

// Event listeners
searchButton.addEventListener('click', renderProducts);
searchInput.addEventListener('keyup', renderProducts);
sortBySelect.addEventListener('change', renderProducts);

// Initial data fetch
fetchProducts();



