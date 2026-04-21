// import products from './data.js';

// // Elements - IDs matched strictly to your index.html
// const productDisplay = document.getElementById('productDisplay');
// const genderSelection = document.getElementById('gender_select');
// const genderRadios = document.querySelectorAll('#products input[type="radio"]');
// const ratingInput = document.getElementById('rate');
// const ratingValue = document.getElementById('rate_val');
// const searchInput = document.getElementById('search');

// /**
//  * Renders product cards into the productDisplay section
//  */
// const displayProducts = (productsToRender) => {
//   productDisplay.innerHTML = ``;
//   productsToRender.forEach((currentProduct) => {
//     const card = document.createElement('div');
//     card.className = 'product-card';
//     card.innerHTML = `
//     <img src="${currentProduct.imgUrl}" alt="${currentProduct.name}"/>
//     <h3>${currentProduct.name}</h3>
//     <p class="card-rating-discount-strip">
//       <span>${currentProduct.rating} 🌟🌟</span>
//       <span>${currentProduct.discountPercentage}% off</span>
//     </p>
//     <p class="card-cart-button-strip">
//       <span class="price">₹${currentProduct.discountedPrice}</span>
//       <span class="original-price">₹${currentProduct.price}</span>
//       <button class="product-button">Add to cart</button>
//     </p>
//     `;
//     productDisplay.append(card);
//   });
// };

// // --- Initial Load ---
// displayProducts(products);

// // --- Event Listeners ---

// // 1. Gender Dropdown Filter
// genderSelection.addEventListener('change', (e) => {
//   const filter = e.target.value.trim();
//   if (filter === '') {
//     displayProducts(products);
//   } else {
//     const filteredProducts = products.filter((curr) => curr.gender === filter);
//     displayProducts(filteredProducts);
//   }
// });

// // 2. Gender Radio Buttons Filter
// genderRadios.forEach((radio) => {
//   radio.addEventListener('change', (e) => {
//     const selectedGender = e.target.value;
//     const filteredProducts = products.filter(
//       (p) => p.gender === selectedGender
//     );
//     displayProducts(filteredProducts);
//   });
// });

// // 3. Rating Range Filter
// ratingInput.addEventListener('input', (e) => {
//   const rating = Number(e.target.value);
//   ratingValue.innerText = rating; // Updates the 0 in your <span id="rate_val">
//   const filteredProducts = products.filter((curr) => curr.rating >= rating);
//   displayProducts(filteredProducts);
// });

// // 4. Search Bar Filter (Changed to 'input' for real-time filtering)
// searchInput.addEventListener('input', (e) => {
//   const searchText = e.target.value.toLowerCase();

//   const filteredProducts = products.filter((product) => {
//     return (
//       product.name.toLowerCase().includes(searchText) ||
//       (product.description &&
//         product.description.toLowerCase().includes(searchText))
//     );
//   });

//   displayProducts(filteredProducts);
// });

// // 5. Clear Filters Button
// document.getElementById('clearBtn').addEventListener('click', () => {
//   // Resetting UI elements
//   searchInput.value = '';
//   genderSelection.value = ' ';
//   ratingInput.value = 0;
//   ratingValue.innerText = 0;
//   genderRadios.forEach((r) => (r.checked = false));

//   // Reset display
//   displayProducts(products);
// });
import products from './data.js';

// 1. Get our HTML elements
const productDisplay = document.getElementById('productDisplay');
const genderSelection = document.getElementById('gender_select');
const ratingInput = document.getElementById('rate');
const ratingValue = document.getElementById('rate_val');
const searchInput = document.getElementById('search');
const clearButton = document.getElementById('clearBtn');

/**
 * Function to draw the products on the screen
 */
function displayProducts(productsArray) {
  // Clear the current list first
  productDisplay.innerHTML = "";

  // Loop through each product
  for (let i = 0; i < productsArray.length; i++) {
    const item = productsArray[i];

    // Create a new div for the product card
    const card = document.createElement('div');
    card.className = 'productCard';

    // Fill the card with HTML
    card.innerHTML = `
      <img src="${item.imgUrl}" alt="${item.name}"/>
      <h3>${item.name}</h3>
      <div class="card-info">
        <span>Rating: ${item.rating} ⭐</span>
        <span>${item.discountPercentage}% OFF</span>
      </div>
      <div class="card-price">
        <strong>₹${item.discountedPrice}</strong>
        <del>₹${item.price}</del>
        <button>Add to cart</button>
      </div>
    `;

    // Add the card to the display area
    productDisplay.appendChild(card);
  }
}

// Show all products when the page first opens
displayProducts(products);

// --- 2. Filter by Gender (Dropdown) ---
genderSelection.addEventListener('change', function() {
  const selectedValue = genderSelection.value;
  
  if (selectedValue === "") {
    displayProducts(products); // Show all if "Select Gender" is picked
  } else {
    const filtered = products.filter(function(item) {
      return item.gender === selectedValue;
    });
    displayProducts(filtered);
  }
});

// --- 3. Filter by Rating (Range Slider) ---
ratingInput.addEventListener('input', function() {
  const currentLevel = ratingInput.value;
  ratingValue.innerText = currentLevel; // Update the number on screen

  const filtered = products.filter(function(item) {
    return item.rating >= currentLevel;
  });
  displayProducts(filtered);
});

// --- 4. Search Bar ---
searchInput.addEventListener('input', function() {
  const text = searchInput.value.toLowerCase();

  const filtered = products.filter(function(item) {
    const nameMatch = item.name.toLowerCase().includes(text);
    return nameMatch;
  });
  displayProducts(filtered);
});

// --- 5. Reset Button ---
clearButton.addEventListener('click', function() {
  // Reset UI back to defaults
  searchInput.value = "";
  genderSelection.value = "";
  ratingInput.value = 0;
  ratingValue.innerText = 0;

  // Show the original list
  displayProducts(products);
});