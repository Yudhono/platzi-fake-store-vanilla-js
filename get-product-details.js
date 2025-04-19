document.addEventListener("DOMContentLoaded", function () {
  const urlParams = new URLSearchParams(window.location.search);
  const productId = urlParams.get("id");
  const apiUrl = `https://api.escuelajs.co/api/v1/products/${productId}`;

  fetch(apiUrl)
    .then((response) => response.json())
    .then((product) => {
      console.log(88321, "single product", product);

      document.getElementById("editProductTitle").textContent = product.title;
      document.getElementById("editProductPrice").textContent = product.price;
      document.getElementById("editProductDescription").textContent =
        product.description;
      document.getElementById("editProductCategoryId").textContent =
        product.category.id;
      document.getElementById("editProductImage").textContent =
        product.images[0];
    })
    .catch((error) => console.error("Error fetching product:", error));

  // Remove the form submission logic since <p> tags are not editable
});
