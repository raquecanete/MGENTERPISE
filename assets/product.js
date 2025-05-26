
document.addEventListener('DOMContentLoaded', function() {
  // Product data (would normally come from an API/database)
  const products = [
    { id: 1, name: "Mini shoulder Bag", color: "Black", price: 350, category: "Shoulder Bags", featured: true, dateAdded: "2023-05-15" },
    { id: 2, name: "Tote Bag", color: "White", price: 249, category: "Tote Bags", featured: true, dateAdded: "2023-06-20" },
    { id: 3, name: "Leader bag", color: "Black", price: 499, category: "Shoulder Bags", featured: false, dateAdded: "2023-07-10" },
    { id: 4, name: "Designer bag", color: "Black", price: 499, category: "Clutches", featured: false, dateAdded: "2023-08-05" },
    { id: 5, name: "Evening Clutch", color: "Gold", price: 399, category: "Clutches", featured: true, dateAdded: "2023-09-12" },
    { id: 6, name: "Travel Bags", color: "Blue", price: 299, category: "Backpacks", featured: false, dateAdded: "2023-10-18" },
    { id: 7, name: "Leather Tote", color: "Brown", price: 450, category: "Tote Bags", featured: true, dateAdded: "2023-11-22" },
    { id: 8, name: "Mini Backpack", color: "Red", price: 375, category: "Backpacks", featured: false, dateAdded: "2023-12-05" },
    { id: 9, name: "Evening Purse", color: "Gold", price: 425, category: "Clutches", featured: true, dateAdded: "2024-01-15" },
    { id: 10, name: "Crossbody Bag", color: "Black", price: 325, category: "Shoulder Bags", featured: false, dateAdded: "2024-02-10" },
    { id: 11, name: "Beach Tote", color: "Multicolor", price: 275, category: "Tote Bags", featured: false, dateAdded: "2024-03-08" },
    { id: 12, name: "Office Bag", color: "Black", price: 550, category: "Shoulder Bags", featured: true, dateAdded: "2024-04-12" },
    { id: 13, name: "Weekender Bag", color: "Blue", price: 600, category: "Tote Bags", featured: false, dateAdded: "2024-05-01" },
    { id: 14, name: "Mini Clutch", color: "White", price: 350, category: "Clutches", featured: true, dateAdded: "2024-05-15" },
    { id: 15, name: "Hiking Backpack", color: "Green", price: 700, category: "Backpacks", featured: false, dateAdded: "2024-05-20" },
    { id: 16, name: "Designer Tote", color: "Multicolor", price: 650, category: "Tote Bags", featured: true, dateAdded: "2024-05-25" },
    { id: 17, name: "Evening Shoulder Bag", color: "Red", price: 480, category: "Shoulder Bags", featured: false, dateAdded: "2024-05-28" },
    { id: 18, name: "Leather Backpack", color: "Brown", price: 750, category: "Backpacks", featured: true, dateAdded: "2024-06-01" },
    { id: 19, name: "Party Clutch", color: "Gold", price: 420, category: "Clutches", featured: false, dateAdded: "2024-06-05" },
    { id: 20, name: "Casual Tote", color: "White", price: 290, category: "Tote Bags", featured: false, dateAdded: "2024-06-10" },
    { id: 21, name: "Mini Shoulder Bag", color: "Pink", price: 320, category: "Shoulder Bags", featured: true, dateAdded: "2024-06-15" },
    { id: 22, name: "Travel Backpack", color: "Black", price: 680, category: "Backpacks", featured: false, dateAdded: "2024-06-20" },
    { id: 23, name: "Designer Clutch", color: "Silver", price: 520, category: "Clutches", featured: true, dateAdded: "2024-06-25" },
    { id: 24, name: "Large Tote", color: "Beige", price: 380, category: "Tote Bags", featured: false, dateAdded: "2024-06-30" }
  ];

  // DOM elements
  const sortSelect = document.querySelector('select:nth-of-type(1)');
  const categorySelect = document.querySelector('select:nth-of-type(2)');
  const colorSelect = document.querySelector('select:nth-of-type(3)');
  const productGrid = document.querySelector('.grid');
  const paginationContainer = document.querySelector('.flex.justify-center nav');
  
  // Pagination variables
  let currentPage = 1;
  const itemsPerPage = 12;
  let totalPages = Math.ceil(products.length / itemsPerPage);
  
  // Initialize
  renderProducts();
  renderPagination();
  
  // Event listeners
  sortSelect.addEventListener('change', filterProducts);
  categorySelect.addEventListener('change', filterProducts);
  colorSelect.addEventListener('change', filterProducts);
  
  // Filter and sort products
  function filterProducts() {
    currentPage = 1; // Reset to first page when filters change
    
    let filteredProducts = [...products];
    
    // Category filter
    const selectedCategory = categorySelect.value;
    if (selectedCategory !== "All Categories") {
      filteredProducts = filteredProducts.filter(product => product.category === selectedCategory);
    }
    
    // Color filter
    const selectedColor = colorSelect.value;
    if (selectedColor !== "All Colors") {
      filteredProducts = filteredProducts.filter(product => product.color === selectedColor);
    }
    
    // Sort
    const sortOption = sortSelect.value;
    switch(sortOption) {
      case "Price: Low to High":
        filteredProducts.sort((a, b) => a.price - b.price);
        break;
      case "Price: High to Low":
        filteredProducts.sort((a, b) => b.price - a.price);
        break;
      case "Newest Arrivals":
        filteredProducts.sort((a, b) => new Date(b.dateAdded) - new Date(a.dateAdded));
        break;
      default: // "Featured" or default
        filteredProducts.sort((a, b) => b.featured - a.featured);
    }
    
    // Update pagination
    totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
    renderProducts(filteredProducts);
    renderPagination();
  }
  
  // Render products
  function renderProducts(filteredProducts = products) {
    // Calculate start and end index for current page
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const productsToDisplay = filteredProducts.slice(startIndex, endIndex);
    
    // Clear existing products
    productGrid.innerHTML = '';
    
    // Add products to grid
    productsToDisplay.forEach(product => {
      const productCard = document.createElement('div');
      productCard.className = 'group relative w-full border border-black-400 bg-[#F4F2EF]';
      productCard.innerHTML = `
        <div class="flex justify-end py-3 px-5">
          <i class="ri-heart-line text-xl text-sm hover:text-red-900"></i>
        </div>
        <div class="aspect-square w-full flex items-center justify-center p-4 relative overflow-hidden">
          <img src="./img/shoulderbag-removebg-preview.png" alt="${product.name}" class="max-h-full max-w-full object-cover transition-opacity duration-300 group-hover:opacity-0">
          <img src="./img/shoulderbag2.jfif" alt="${product.name} Details" class="absolute inset-0 max-h-full w-full object-cover opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        </div>
        <div class="mt-4 flex justify-between w-full px-4 py-2">
          <div>
            <h3 class="text-sm font-medium text-gray-900">${product.name}</h3>
            <p class="mt-1 text-sm text-gray-500">${product.color}</p>
          </div>
          <p class="text-sm font-medium text-gray-900">P${product.price}</p>
        </div>
      `;
      productGrid.appendChild(productCard);
    });
  }
  
  // Render pagination
  function renderPagination() {
    paginationContainer.innerHTML = '';
    
    // Previous button
    const prevButton = document.createElement('button');
    prevButton.className = 'px-3 py-1 rounded border border-gray-300 text-gray-600 hover:bg-gray-100';
    prevButton.innerHTML = '<i class="fas fa-chevron-left"></i>';
    prevButton.addEventListener('click', () => {
      if (currentPage > 1) {
        currentPage--;
        renderProducts();
        renderPagination();
      }
    });
    paginationContainer.appendChild(prevButton);
    
    // Page numbers
    const maxVisiblePages = 5;
    let startPage, endPage;
    
    if (totalPages <= maxVisiblePages) {
      startPage = 1;
      endPage = totalPages;
    } else {
      const maxPagesBeforeCurrent = Math.floor(maxVisiblePages / 2);
      const maxPagesAfterCurrent = Math.ceil(maxVisiblePages / 2) - 1;
      
      if (currentPage <= maxPagesBeforeCurrent) {
        startPage = 1;
        endPage = maxVisiblePages;
      } else if (currentPage + maxPagesAfterCurrent >= totalPages) {
        startPage = totalPages - maxVisiblePages + 1;
        endPage = totalPages;
      } else {
        startPage = currentPage - maxPagesBeforeCurrent;
        endPage = currentPage + maxPagesAfterCurrent;
      }
    }
    
    for (let i = startPage; i <= endPage; i++) {
      const pageButton = document.createElement('button');
      pageButton.className = `px-3 py-1 rounded ${i === currentPage ? 'bg-black text-white' : 'border border-gray-300 text-gray-600 hover:bg-gray-100'}`;
      pageButton.textContent = i;
      pageButton.addEventListener('click', () => {
        currentPage = i;
        renderProducts();
        renderPagination();
      });
      paginationContainer.appendChild(pageButton);
    }
    
    // Next button
    const nextButton = document.createElement('button');
    nextButton.className = 'px-3 py-1 rounded border border-gray-300 text-gray-600 hover:bg-gray-100';
    nextButton.innerHTML = '<i class="fas fa-chevron-right"></i>';
    nextButton.addEventListener('click', () => {
      if (currentPage < totalPages) {
        currentPage++;
        renderProducts();
        renderPagination();
      }
    });
    paginationContainer.appendChild(nextButton);
  }
});
