import products from './data.js';

// Elements
const productDisplay = document.getElementById('productDisplay');
const genderSelect = document.getElementById('gender_select');
const genderRadios = document.querySelectorAll('#products input[type="radio"]');
const ratingInput = document.getElementById('rate');
const ratingValue = document.getElementById('rate_val');
const searchInput = document.getElementById('search');
const categoryChecks = document.querySelectorAll('.cat_check');
const clearBtn = document.getElementById('clearBtn');

// ✅ Force radio grouping (since HTML doesn't have name)
genderRadios.forEach((radio) => {
  radio.name = "gender";
});

// Display Products
const displayProducts = (list) => {
  productDisplay.innerHTML = '';

  list.forEach((p) => {
    const card = document.createElement('div');
    card.className = 'productCard'; // matches CSS

    card.innerHTML = `
      <img src="${p.imgUrl}" alt="${p.name}" />
      <h3>${p.name}</h3>

      <p>
        <span>${p.rating} 🌟</span> |
        <span>${p.discountPercentage}% off</span>
      </p>

      <p>
        <span>₹${p.discountedPrice}</span>
        <span style="text-decoration: line-through;">₹${p.price}</span>
      </p>

      <button>Add to cart</button>
    `;

    productDisplay.appendChild(card);
  });
};

// Initial load
displayProducts(products);

// 🔹 Apply all filters
const applyFilters = () => {
  let filtered = [...products];

  // ✅ Gender (radio priority over dropdown)
  let selectedGender = "";

  genderRadios.forEach((radio) => {
    if (radio.checked) {
      selectedGender = radio.value;
    }
  });

  if (!selectedGender) {
    const val = genderSelect.value.trim();
    if (val && val !== "__GENDER__") {
      selectedGender = val;
    }
  }

  if (selectedGender) {
    filtered = filtered.filter((p) => p.gender === selectedGender);
  }

  // ✅ Rating
  const rating = Number(ratingInput.value);
  ratingValue.innerText = rating;
  filtered = filtered.filter((p) => p.rating >= rating);

  // ✅ Search
  const text = searchInput.value.toLowerCase();
  if (text) {
    filtered = filtered.filter(
      (p) =>
        p.name.toLowerCase().includes(text) ||
        p.description.toLowerCase().includes(text)
    );
  }

  // ✅ Category
  const selectedCategories = [];
  categoryChecks.forEach((c) => {
    if (c.checked) selectedCategories.push(c.value);
  });

  if (selectedCategories.length > 0) {
    filtered = filtered.filter((p) =>
      selectedCategories.includes(p.category)
    );
  }

  displayProducts(filtered);
};

// 🔹 Radio behavior fix (only one selected + reset dropdown)
genderRadios.forEach((radio) => {
  radio.addEventListener('change', () => {
    genderRadios.forEach((r) => {
      if (r !== radio) r.checked = false;
    });

    genderSelect.value = " ";
    applyFilters();
  });
});

// 🔹 Dropdown sync with radio
genderSelect.addEventListener('change', () => {
  const val = genderSelect.value.trim();

  genderRadios.forEach((r) => (r.checked = false));

  genderRadios.forEach((r) => {
    if (r.value === val) {
      r.checked = true;
    }
  });

  applyFilters();
});

// 🔹 Other filters
ratingInput.addEventListener('input', applyFilters);
searchInput.addEventListener('input', applyFilters);

categoryChecks.forEach((c) => {
  c.addEventListener('change', applyFilters);
});

// 🔹 Clear all filters
clearBtn.addEventListener('click', () => {
  genderSelect.value = " ";
  searchInput.value = '';
  ratingInput.value = 0;
  ratingValue.innerText = 0;

  genderRadios.forEach((r) => (r.checked = false));
  categoryChecks.forEach((c) => (c.checked = false));

  displayProducts(products);
});