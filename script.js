import products from './data.js';

// Elements - IDs matched strictly to your index.html
const productDisplay = document.getElementById('productDisplay');
const genderSelection = document.getElementById('gender_select');
const genderRadios = document.querySelectorAll('#products input[type="radio"]');
const ratingInput = document.getElementById('rate');
const ratingValue = document.getElementById('rate_val');
const searchInput = document.getElementById('search');

/**
 * Renders product cards into the productDisplay section
 */
const displayProducts = (productsToRender) => {
  productDisplay.innerHTML = ``;
  productsToRender.forEach((currentProduct) => {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.innerHTML = `
    <img src="${currentProduct.imgUrl}" alt="${currentProduct.name}"/>
    <h3>${currentProduct.name}</h3>
    <p class="card-rating-discount-strip">
      <span>${currentProduct.rating} 🌟</span>
      <span>${currentProduct.discountPercentage}% off</span>
    </p>
    <p class="card-cart-button-strip">
      <span class="price">₹${currentProduct.discountedPrice}</span>
      <span class="original-price">₹${currentProduct.price}</span>
      <button class="product-button">Add to cart</button>
    </p>
    `;
    productDisplay.append(card);
  });
};

// --- Initial Load ---
displayProducts(products);

// --- Event Listeners ---

// 1. Gender Dropdown Filter
genderSelection.addEventListener('change', (e) => {
  const filter = e.target.value.trim();
  if (filter === '') {
    displayProducts(products);
  } else {
    const filteredProducts = products.filter((curr) => curr.gender === filter);
    displayProducts(filteredProducts);
  }
});

// 2. Gender Radio Buttons Filter
genderRadios.forEach((radio) => {
  radio.addEventListener('change', (e) => {
    const selectedGender = e.target.value;
    const filteredProducts = products.filter(
      (p) => p.gender === selectedGender
    );
    displayProducts(filteredProducts);
  });
});

// 3. Rating Range Filter
ratingInput.addEventListener('input', (e) => {
  const rating = Number(e.target.value);
  ratingValue.innerText = rating; // Updates the 0 in your <span id="rate_val">
  const filteredProducts = products.filter((curr) => curr.rating >= rating);
  displayProducts(filteredProducts);
});

// 4. Search Bar Filter (Changed to 'input' for real-time filtering)
searchInput.addEventListener('input', (e) => {
  const searchText = e.target.value.toLowerCase();

  const filteredProducts = products.filter((product) => {
    return (
      product.name.toLowerCase().includes(searchText) ||
      (product.description &&
        product.description.toLowerCase().includes(searchText))
    );
  });

  displayProducts(filteredProducts);
});

// 5. Clear Filters Button
document.getElementById('clearBtn').addEventListener('click', () => {
  // Resetting UI elements
  searchInput.value = '';
  genderSelection.value = ' ';
  ratingInput.value = 0;
  ratingValue.innerText = 0;
  genderRadios.forEach((r) => (r.checked = false));

  // Reset display
  displayProducts(products);
});
