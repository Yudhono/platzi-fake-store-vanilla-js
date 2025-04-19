document.addEventListener("DOMContentLoaded", function () {
  const apiUrl = `https://api.escuelajs.co/api/v1/products/`;

  fetch(apiUrl)
    .then((response) => response.json())
    .then((products) => {
      console.log(77321, "products", products);
      // Sort products by creationAt in descending order
      products.sort((a, b) => new Date(b.creationAt) - new Date(a.creationAt));

      const productList = document.getElementById("productList");
      products.forEach((product) => {
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
          <button class="delete-product" data-id="${product.id}">Delete</button>
        `;
        productItem.setAttribute("data-id", product.id);
        productList.appendChild(productItem);
      });

      document.querySelectorAll(".edit-product").forEach((button) => {
        button.addEventListener("click", function (event) {
          event.stopPropagation();
          const productId = this.getAttribute("data-id");
          window.location.href = `edit-product.html?id=${productId}`;
        });
      });

      document.querySelectorAll(".product-item").forEach((productItem) => {
        productItem.addEventListener("click", function () {
          const productId = this.getAttribute("data-id");
          window.location.href = `product-details.html?id=${productId}`;
        });
      });

      document.querySelectorAll(".delete-product").forEach((button) => {
        button.addEventListener("click", function () {
          const productId = this.getAttribute("data-id");

          Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
          }).then((result) => {
            if (result.isConfirmed) {
              fetch(`${apiUrl}${productId}`, {
                method: "DELETE",
              })
                .then((response) => response.json())
                .then((data) => {
                  console.log("Product deleted:", data);
                  Swal.fire({
                    title: "Deleted!",
                    text: "Your file has been deleted.",
                    icon: "success",
                  });
                  setTimeout(() => {
                    window.location.reload();
                  }, 1000);
                })
                .catch((error) =>
                  console.error("Error deleting product:", error)
                );
            }
          });
        });
      });
    })
    .catch((error) => console.error("Error fetching products:", error));
});
