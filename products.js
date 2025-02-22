document.addEventListener("DOMContentLoaded", function () {
  const apiUrl = `https://api.escuelajs.co/api/v1/products/`;

  fetch(apiUrl)
    .then((response) => response.json())
    .then((products) => {
      // Sort products by creationAt in descending order
      products.sort((a, b) => new Date(b.creationAt) - new Date(a.creationAt));

      const productList = document.getElementById("productList");
      products.forEach((product) => {
        console.log(882, "prodcut", product.images);
        const productItem = document.createElement("div");
        productItem.className = "product-item";
        const truncatedDescription =
          product.description.length > 100
            ? product.description.substring(0, 100) + "..."
            : product.description;
        productItem.innerHTML = `
          <h2>${product.title}</h2>
          <p>Price: $${product.price}</p>
          <p>${truncatedDescription}</p>
          <img src="${product.images[0]}" alt="${product.title}" />
          <button class="edit-product" data-id="${product.id}">Edit</button>
        `;
        productList.appendChild(productItem);
      });

      document.querySelectorAll(".edit-product").forEach((button) => {
        button.addEventListener("click", function () {
          const productId = this.getAttribute("data-id");
          window.location.href = `edit-product.html?id=${productId}`;
        });
      });
    })
    .catch((error) => console.error("Error fetching products:", error));
});
