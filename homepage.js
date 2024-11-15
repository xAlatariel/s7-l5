const API_URL = "https://striveschool-api.herokuapp.com/api/product/";
const TOKEN = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzM3NGEwNGFlZGU3ODAwMTU3OTM2NGEiLCJpYXQiOjE3MzE2NzY2NzYsImV4cCI6MTczMjg4NjI3Nn0.2vq80uxkiLIlBU3XhLADkf9OugSHFmiLSIm10Dm10HE";

async function fetchProducts() {
  try {
    const response = await fetch(API_URL, {
      headers: { Authorization: TOKEN },
    });

    if (response.ok) {
      const products = await response.json();
      displayProducts(products);
    } else {
      console.error("Errore nel recupero dei prodotti");
    }
  } catch (error) {
    console.error("Errore di rete:", error);
  }
}

function displayProducts(products) {
  const productList = document.getElementById("productList");
  productList.innerHTML = "";

  products.forEach((product) => {
    const productCard = document.createElement("div");
    productCard.classList.add("col-md-4", "mb-3");

    productCard.innerHTML = `
      <div class="card h-100">
        <img src="${product.imageUrl}" class="card-img-top" alt="${product.name}">
        <div class="card-body">
          <h5 class="card-title">${product.name}</h5>
          <p class="card-text">${product.description}</p>
          <p class="card-text"><strong>Prezzo:</strong> €${product.price.toFixed(2)}</p>
          <button onclick="deleteProduct('${product._id}')" class="btn btn-danger">Elimina</button>
        </div>
      </div>
    `;

    productList.appendChild(productCard);
  });
}

async function deleteProduct(productId) {
  try {
    const response = await fetch(`${API_URL}${productId}`, {
      method: "DELETE",
      headers: { Authorization: TOKEN },
    });

    if (response.ok) {
      alert("Prodotto eliminato con successo!");
      fetchProducts();
    } else {
      console.error("Errore durante l'eliminazione del prodotto");
    }
  } catch (error) {
    console.error("Errore di rete:", error);
  }
}

fetchProducts();
