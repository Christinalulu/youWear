


//  Home page

const productsContainer = document.querySelector(".products-container");

 fetch("https://dummyjson.com/products?limit=10")
 .then(response => {
 
    return response.json();

 }) 
 .then(productsData => {

    const featuredProducts = productsData.products.slice(0, 4);

  
    featuredProducts.forEach(product =>{
        
        productsContainer.innerHTML += `
            <div class="product-card">
            <img src="${product.thumbnail}" alt="${product.title}">
            <h3>${product.title}</h3>
            <p>$${product.price}</p>
            </div>
            `;
    })

 });
 

