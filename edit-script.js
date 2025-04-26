document.addEventListener("DOMContentLoaded", function () {
  const urlParams = new URLSearchParams(window.location.search);
  const productId = urlParams.get("id");
  const apiUrl = `https://api.escuelajs.co/api/v1/products/${productId}`;

  fetch(apiUrl)
    .then((response) => response.json())
    .then((product) => {
      console.log(88321, "single product", product);
      console.log(88321, "product", product);

      document.getElementById("editProductTitle").value = product.title;
      document.getElementById("editProductPrice").value = product.price;
      document.getElementById("editProductDescription").value =
        product.description;
      document.getElementById("editProductCategoryId").value =
        product.category.id;
      document.getElementById("editProductImage").value = product.images[0];
    })
    .catch((error) => console.error("Error fetching product:", error));

  document
    .getElementById("editProductForm")
    .addEventListener("submit", function (event) {
      event.preventDefault();
      const productTitle = document.getElementById("editProductTitle").value;
      const productPrice = document.getElementById("editProductPrice").value;
      const productDescription = document.getElementById(
        "editProductDescription"
      ).value;
      const productCategoryId = document.getElementById(
        "editProductCategoryId"
      ).value;
      const productImage = document.getElementById("editProductImage").value;

      fetch(apiUrl, {
        method: "PUT",
        body: JSON.stringify({
          title: productTitle,
          price: productPrice,
          description: productDescription,
          categoryId: productCategoryId,
          images: [productImage],
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      })
        .then((response) => response.json())
        .then((json) => {
          console.log(888312, "json", json);
          if (json.error) {
            Swal.fire({
              title: "Error, Product not updated!",
              text: json.message,
              icon: "error",
              confirmButtonText: "OK",
            });
            return;
          }
          if (json.id) {
            Swal.fire({
              title: "Success!",
              text: "Product updated successfully!",
              icon: "success",
              confirmButtonText: "OK",
            }).then(() => {
              window.location.href = "index.html";
            });
            return;
          }
        })
        .catch((error) => console.error("Error updating product:", error));
    });
});
