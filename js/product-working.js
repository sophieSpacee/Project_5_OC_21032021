window.onload = () => {
  // Recuperer l'ID du teddy dans l'URL
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const product_id = urlParams.get("_id");

  console.log(product_id);

  // Promise qui récupère les données API du teddy et lance la fonction showTeddyDetail si tout se passe bien
  let teddy = "";
  //je ne sais pas a quoi ca sert de declarer teddy
  let getTeddy = fetch("http://localhost:3000/api/teddies/" + product_id, {
    method: "GET",
  })
    .then((response) => {
      return response.json();
    })
    .then((element) => {
      showTeddyDetail(element);
      teddy = element;
      console.log(teddy);
      //je ne sais pas a quoi ca sert de declarer teddy
    })
    .catch((error) => alert("Erreur: " + error));


    console.log(teddy);

  // Afficher le détail du produit sur la page product.html
  let showTeddyDetail = (element) => {
    let teddyName = document.getElementById("teddy-name2");
    teddyName.innerHTML = element.name;

    let teddyPicContainer = document.getElementById("teddypic-container");
    teddyPicContainer.setAttribute("src", element.imageUrl);

    let teddyDetails = document.getElementById("teddyDetails");
    teddyDetails.innerHTML = element.description;

    let teddyPrice2 = document.getElementById("teddy-price");
    teddyPrice2.innerHTML = element.price;
    teddyPrice2.classList.add("price");

    getColorList(element);
  };

  // Fonction qui recupere la liste des couleur disponible pour ce teddy et les affiche dans une liste deroulante
  let getColorList = (element) => {
    let teddyColor = document.getElementById("teddy-color");
    let colors = element.colors;
    colors.forEach((color) => {
      let option = document.createElement("option");
      teddyColor.appendChild(option);
      option.innerHTML = color;
    });
    getChosenColor();
  };

  // Fonction qui recupere la couleur choisie dans le menu deroulant et qui l'ajoute a l'objet teddy
  let getChosenColor = (element) => {
    let teddyColor = document.getElementById("teddy-color");
    teddyColor.addEventListener("change", (event) => {
      let chosenColor = event.target.value;
      teddy.chosenColor = chosenColor;
      console.log(chosenColor);
      console.log( teddy)
      return chosenColor;
      
    });
  };

console.log(teddy)
  // Fonction qui ajoute le teddy au panier
  var addTeddyToCart = () => {
    var existing = localStorage.getItem("teddy");
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
  };

  // Fonction qui fait apparaitre un message de succes lors de l'ajout au panier
  let showSuccessMessage = () => {
    let successAlert = document.getElementById("alert-success");
    successAlert.innerHTML =
      "Félicitations ! Vous avez ajouté cet article à votre panier !";
    successAlert.classList.add("alert", "alert-success", "mt-3");
    addToCartButton.remove();
  };

  let addToCartButton = document.getElementById("add-cart");
  addToCartButton.onclick = addTeddyToCart;

  // localStorage.clear();
};
