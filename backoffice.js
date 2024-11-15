const API_URL = "https://striveschool-api.herokuapp.com/api/product/"; 
const TOKEN = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzM3NGEwNGFlZGU3ODAwMTU3OTM2NGEiLCJpYXQiOjE3MzE2NzY2NzYsImV4cCI6MTczMjg4NjI3Nn0.2vq80uxkiLIlBU3XhLADkf9OugSHFmiLSIm10Dm10HE";

// recupero prodotti
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

// aggiungere un prodotto
document.getElementById("productForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = document.getElementById("productName").value.trim();
  const description = document.getElementById("productDescription").value.trim();
  const price = parseFloat(document.getElementById("productPrice").value);
  const imageUrl = document.getElementById("productImage").value.trim();
  const brand = document.getElementById("productBrand").value.trim();

  if (!name || !description || isNaN(price) || !imageUrl || !brand) {
    alert("Compila tutti i campi correttamente!");
    return;
  }

  const product = { name, description, price, imageUrl, brand };

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: TOKEN,
      },
      body: JSON.stringify(product),
    });

    if (response.ok) {
      alert("Prodotto aggiunto con successo!");
      document.getElementById("productForm").reset();

      // recupera la lista aggiornata 
      fetchProducts(); 
    } else {
      const errorData = await response.json();
      alert(`Errore: ${errorData.message}`);
    }
  } catch (error) {
    console.error("Errore di rete:", error);
    alert("Si è verificato un errore durante la connessione al server.");
  }
});


