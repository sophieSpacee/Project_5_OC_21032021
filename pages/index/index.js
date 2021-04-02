window.onload = () => {
  // Promise qui récupère les données API et lance la fonction buildItemCard si tout se passe bien
  const getItemsFromApi = fetch("http://localhost:3000/api/teddies", {
    method: "GET",
  })
    .then((response) => {
      return response.json();
    })
    .then((jsonResponse) => {
      jsonResponse.forEach((element) => {
        buildItemCard(element);
      });
    })
    .catch((error) => alert("Erreur: " + error));

  const buildItemCard = (element) => {
    // Fonction qui construit une carte par produit sur la page d'accueil
    const itemCardContainer = document.createElement("div");
    itemCardContainer.onclick = () => {
      window.location.href = "./pages/product/product.html?_id=" + element._id;
    };
    const itemsContainer = document.getElementById("items-container");
    itemsContainer.appendChild(itemCardContainer);
    itemCardContainer.classList.add(
      "col-12",
      "col-lg-4",
      "col-sm-6",
      "mt-3",
      "mb-3",
      "pointer"
    );

    itemCardContainer.innerHTML = `<div class="card card-hover">
      <img src="${element.imageUrl}" class="card-image-top img-center"></img>
      <div class="card-body">
        <h2 class="card-title">${element.name}</h2>
        <p class="card-text price text-right">${element.price}</p>
      </div>
    </div>`;
  };

  const calcutateNumberOfItemsInCart = (productList) => {
    // Calcul du nombre de produits dans le panier
    let numberOfItemsInCart = 0;
    if (productList !== null) {
      productList.forEach((element) => {
        numberOfItemsInCart += element.chosenQuantity;
      });
    }
    return numberOfItemsInCart;
  };

  const showCartItemNumber = () => {
    // Fonction qui fait apparaitre le nombre d'articles dans le panier
    const productList = JSON.parse(localStorage.getItem("selectedItems"));
    const numberOfItem = calcutateNumberOfItemsInCart(productList);
    const numberOfItemContainer = document.getElementById("cart-length");
    numberOfItemContainer.innerHTML = numberOfItem;
  };
  showCartItemNumber();
};
