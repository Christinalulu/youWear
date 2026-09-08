

const shopProductsContainer = document.querySelector(".shop-products-container");

const loadMoreButton = document.querySelector(".load-more-button");


  let visibleProducts = 12;
  let allProducts = [];

  function displayProducts(products){

    shopProductsContainer.innerHTML = "";

    products.forEach(product => {

        shopProductsContainer.innerHTML += `
         <div class="product-card">
        <img src="${product.thumbnail}" alt="${product.title}">
        <h3>${product.title}</h3>
        <p>$${product.price}</p>
        </div>
        `;

    });

  }

fetch("https://dummyjson.com/products?limit=194")
  .then(response => {
    return response.json();
  })
  .then(productsData => {

    allProducts = productsData.products;
    
  const productsToSHow = productsData.products.slice(0, visibleProducts);

  displayProducts(productsToSHow);
  


  });


loadMoreButton.addEventListener("click", () => {
 visibleProducts += 12;

 const productsToSHow = allProducts.slice(0, visibleProducts);
 displayProducts(productsToSHow);
});

