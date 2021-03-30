window.onload = () => {
  // Recuperer l'ID du teddy dans l'URL
  const getUrl = () => {
    const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const product_id = urlParams.get("_id");
  return product_id;
  }
  

  // Promise qui récupère les données API du teddy et lance la fonction showTeddyDetail si tout se passe bien
 let teddy;
 let product_id = getUrl();
  const getTeddy = fetch("http://localhost:3000/api/teddies/" + product_id, {
    method: "GET",
  })
    .then((response) => {
      return response.json();
    })
    .then((element) => {
      teddy = element;
      showTeddyDetail(teddy);
      const colorList = document.getElementsByTagName("option");
      const firstColor = colorList[0].innerHTML;
      teddy.chosenColor = firstColor;
      return teddy;
    })
    .catch((error) => alert("Erreur: " + error));

  // Afficher le détail du produit sur la page product.html
  const showTeddyDetail = (teddy) => {
    const teddyName = document.getElementById("teddy-name2");
    teddyName.innerHTML = teddy.name;

    const teddyPicContainer = document.getElementById("teddypic-container");
    teddyPicContainer.setAttribute("src", teddy.imageUrl);

    const teddyDetails = document.getElementById("teddyDetails");
    teddyDetails.innerHTML = teddy.description;

    const teddyPrice2 = document.getElementById("teddy-price");
    teddyPrice2.innerHTML = teddy.price;
    teddyPrice2.classList.add("price");

    getColorList(teddy);
  };

  // Fonction qui recupere la liste des couleur disponible pour ce teddy et les affiche dans une liste deroulante
  const getColorList = (teddy) => {
    const teddyColor = document.getElementById("teddy-color");
    const colors = teddy.colors;
    colors.forEach((color) => {
      const option = document.createElement("option");
      teddyColor.appendChild(option);
      option.innerHTML = color;
    });
    getChosenColor(teddy);
  };

  // Fonction qui recupere la couleur choisie dans le menu deroulant et qui l'ajoute a l'objet teddy
  const getChosenColor = (teddy) => {
    const teddyColor = document.getElementById("teddy-color");
    teddyColor.addEventListener("change", (event) => {
      const clickedColor = event.target.value;
      teddy.chosenColor = clickedColor;
      console.log(clickedColor);
      console.log(teddy);
      return teddy;
    });
  };

  // Fonction qui ajoute le teddy au panier
  const addTeddyToCart = () => {
    const existing = localStorage.getItem("teddy");
    let teddies;
    if (existing) {
      teddies = JSON.parse(existing);
    } else {
      teddies = [];
    }
    console.log(teddy);
    teddies.push(teddy);
    localStorage.setItem("teddy", JSON.stringify(teddies));
    console.log(localStorage.getItem("teddy"));

    showSuccessMessage();
    showCartItemNumber();
  };

  // Fonction qui fait apparaitre un message de succes lors de l'ajout au panier
  const showSuccessMessage = () => {
    const successAlert = document.getElementById("alert-success");
    successAlert.innerHTML =
      "Félicitations ! Vous avez ajouté cet article à votre panier !";
    successAlert.classList.add("alert", "alert-success", "mt-3");
    addToCartButton.remove();
  };

  const addToCartButton = document.getElementById("add-cart");
  addToCartButton.onclick = addTeddyToCart;

  // Fonction qui fait apparaitre le nombre d'articles dans le panier
const showCartItemNumber = () => {
  const productList = JSON.parse(localStorage.getItem("teddy"));
  const numberOfItem = productList.length;
  console.log(numberOfItem);
  const numberOfItemContainer = document.getElementById('cart-length');
  numberOfItemContainer.innerHTML = numberOfItem;
}
showCartItemNumber();
};
