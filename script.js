document
  .getElementById("productForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    const productTitle = document.getElementById("inputProductTitle").value;
    const productPrice = document.getElementById("inputProductPrice").value;
    const productDescription = document.getElementById(
      "inputProductDescription"
    ).value;
    const productCategoryId = document.getElementById(
      "inputProductCategoryId"
    ).value;
    const productImage = document.getElementById("inputProductImage").value;

    console.log(
      "Ini data Product",
      productTitle,
      productPrice,
      productDescription,
      productCategoryId,
      productImage
    );

    const apiUrl = `https://api.escuelajs.co/api/v1/products/`;

    fetch(apiUrl, {
      // Adding method type
      method: "POST",

      // Adding body or contents to send
      body: JSON.stringify({
        title: productTitle,
        price: productPrice,
        description: productDescription,
        categoryId: productCategoryId,
        images: [productImage], // Ensure images is an array
      }),

      // Adding headers to the request
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      // Converting to JSON
      .then((response) => response.json())

      // Displaying results to console
      .then((json) => console.log(json));
  });
