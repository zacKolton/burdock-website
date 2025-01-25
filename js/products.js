
import { getProducts } from "./config";

/**
 * - Initializes product loading on page load and sets up a click event listener on the "Home" button.
 * - This ensures products are dynamically loaded into the designated area both initially and when the "Home" button is clicked.
 * - The event listener prevents the default button action to avoid page reloads and calls `loadProducts()` to refresh the product display.
 */
document.addEventListener("DOMContentLoaded", function() {
    loadProducts();  // Load products when the page loads

    document.getElementById("button_home").addEventListener('click', function(e) {
        e.preventDefault();
        loadProducts();  // Reload products when the home button is clicked
    });
});


function loadProducts() {
    const productArea = document.getElementById('product-area');
    productArea.innerHTML = '';  // Clear existing products

    let productJson = getProducts();
    productJson.forEach(product => {
        const productElement = createProductElement(product);
        productArea.appendChild(productElement);
    });
}

/**
 * Creates and returns a DOM element for a product with structured data.
 *
 * This function constructs a DOM element representing a single product using provided product data.
 * The product element includes child elements for the product's image, name, and price.
 * Each product is assigned a unique ID generated from its name, ensuring that individual product elements
 * can be uniquely identified within the DOM.
 *
 * Parameters:
 * - product (Object): The product data object, which must include 'name', 'image-path', and 'price' properties.
 *
 * Returns:
 * - HTMLElement: The fully constructed product DOM element ready to be inserted into the webpage.
 *
 * Usage:
 * This function is intended to be used when dynamically building the display of products on a webpage,
 * typically called from a loop that processes an array of product data.
 */
function createProductElement(product) {
    const productDiv = document.createElement('div');
    productDiv.className = 'product';
    productDiv.id = `product-${hashProductName(product.name)}`;  // Creating a unique ID based on product name

    const imageDiv = document.createElement('div');
    imageDiv.className = 'image';
    const img = document.createElement('img');
    img.src = product['image-path'];
    img.alt = product.name;
    imageDiv.appendChild(img);

    const titleDiv = document.createElement('div');
    titleDiv.className = 'title';
    titleDiv.textContent = product.name;

    const priceDiv = document.createElement('div');
    priceDiv.className = 'price';
    priceDiv.textContent = `$${product.price}`;

    productDiv.appendChild(imageDiv);
    productDiv.appendChild(titleDiv);
    productDiv.appendChild(priceDiv);

    return productDiv;
}

/**
 * Generates a simple hash code from a product name.
 *
 * This function uses a basic hashing algorithm to convert a product name string into a numeric hash.
 * It is primarily used to create unique identifiers for product elements by hashing their names.
 * The hash is generated using a reduction method that combines character codes in a way that
 * minimally satisfies uniqueness for typical product naming conventions.
 *
 * Parameters:
 * - name (String): The name of the product to hash.
 *
 * Returns:
 * - Number: The hash code derived from the product name.
 *
 * Usage:
 * This hash function is utilized in the creation of unique HTML element IDs for dynamically generated
 * product elements, aiding in element selection and manipulation in the DOM.
 */
function hashProductName(name) {
    // Simple hash function for example purposes
    return name.split('').reduce((a, b) => {
        a = ((a << 5) - a) + b.charCodeAt(0); 
        return a & a
    }, 0);
}