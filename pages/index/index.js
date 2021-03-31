window.onload = () => {
  // Promise qui récupère les données API et lance la fonction buildTeddies si tout se passe bien
  const getTeddies = fetch("http://localhost:3000/api/teddies", {
    method: "GET",
  })
    .then((response) => {
      return response.json();
    })
    .then((jsonResponse) => {
      jsonResponse.forEach((element) => {
        buildTeddy(element);
      });
    })
    .catch((error) => alert("Erreur: " + error));

  // Fonction qui construit une carte par produit sur la page d'accueil
  const buildTeddy = (element) => {
    const teddy = document.createElement("div");
    teddy.onclick = () => {
      window.location.href = "./pages/product/product.html?_id=" + element._id;
    };
    const teddyContainer = document.getElementById("teddy-container");
    teddyContainer.appendChild(teddy);
    teddy.classList.add(
      "col-12",
      "col-lg-4",
      "col-sm-6",
      "mt-3",
      "mb-3",
      "pointer"
    );

    const teddyCard = document.createElement("div");
    teddy.appendChild(teddyCard);
    teddyCard.classList.add("card", "card-hover");

    const teddyPic = document.createElement("img");
    teddyCard.appendChild(teddyPic);
    teddyPic.setAttribute("src", element.imageUrl);
    teddyPic.classList.add("card-image-top", "img-center");

    const teddyCardBody = document.createElement("div");
    teddyCard.appendChild(teddyCardBody);
    teddyCardBody.classList.add("card-body");

    const teddyName = document.createElement("h2");
    teddyCardBody.appendChild(teddyName);
    teddyName.innerHTML = element.name;
    teddyName.classList.add("card-title");

    const teddyPrice = document.createElement("p");
    teddyCardBody.appendChild(teddyPrice);
    teddyPrice.innerHTML = element.price;
    teddyPrice.classList.add("card-text", "price", "text-right");
  };

  // Fonction qui fait apparaitre le nombre d'articles dans le panier
  const showCartItemNumber = () => {
    const productList = JSON.parse(localStorage.getItem("teddy"));
    let numberOfItem = 0;
    if (productList !== null) {
      numberOfItem = productList.length;
    }
    const numberOfItemContainer = document.getElementById("cart-length");
    numberOfItemContainer.innerHTML = numberOfItem;
  };

  showCartItemNumber();
};
