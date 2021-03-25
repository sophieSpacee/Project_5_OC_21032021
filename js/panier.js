window.onload = () => {
  // Fonction qui fait apparaitre les elements du panier sur la page a partir du local storage
  let productList = JSON.parse(localStorage.getItem("teddy"));
  let products = [];
  let showCartItems = () => {
    for (let item of productList) {
      let productLine = document.createElement("div");

      let productLineContainer = document.getElementById("products-container");
      productLineContainer.appendChild(productLine);
      productLine.classList.add("row", "bg-white", "my-3");

      let productCol1 = document.createElement("div");
      productCol1.classList.add("col-4");
      productLine.appendChild(productCol1);

      let productCard = document.createElement("div");
      productCard.classList.add("card");
      productCol1.appendChild(productCard);

      let teddyImage = document.createElement("img");
      teddyImage.classList.add("card-image-top");
      productCard.appendChild(teddyImage);
      teddyImage.setAttribute("src", item.imageUrl);

      let productCol2 = document.createElement("div");
      productCol2.classList.add("col-4", "my-auto");
      productLine.appendChild(productCol2);

      let productName = document.createElement("h2");
      productName.classList.add("card-title");
      productCol2.appendChild(productName);
      productName.innerHTML = item.name;

      let productColor = document.createElement("p");
      productColor.classList.add("card-text");
      productCol2.appendChild(productColor);
      productColor.innerHTML = item.chosenColor;

      let productCol3 = document.createElement("div");
      productCol3.classList.add("col-4", "my-auto");
      productLine.appendChild(productCol3);

      let productPrice = document.createElement("p");
      productPrice.classList.add(
        "align-middle",
        "my-auto",
        "text-right",
        "mr-2",
        "price"
      );
      productCol3.appendChild(productPrice);
      productPrice.innerHTML = item.price;

      // Construction de la liste des ID a envoyer au serveur
      products.push(item._id);
    }
  };

  showCartItems();

  // verifications
  console.log(
    "liste des ID dans la liste qui sera envoyee au serveur : ",
    products
  );

  //Calcul du prix total
  let totalPriceCalculation = (productList) => {
    console.log(productList);
    let totalPrice = 0;
    for (let item of productList) {
      totalPrice = totalPrice + item.price;
      console.log("Chaque produit present dans le panier : ", item);
    }
    console.log("Prix total calcule par la fonction", totalPrice);
    return totalPrice;
  };

  //Affichage du prix total dans le panier
  let totalPriceContainer = document.getElementById("total-price");
  totalPriceContainer.innerHTML = totalPriceCalculation(productList);

  // Construction de l'objet contact a envoyer au serveur
  let nom;
  let prenom;
  let addresse;
  let ville;
  let mail;

  let nameContainer = document.getElementById("lastName");
  nameContainer.addEventListener("change", function (event) {
    nom = event.target.value;
    console.log(nom);
  });

  let firstNameContainer = document.getElementById("firstName");
  firstNameContainer.addEventListener("change", function (event) {
    prenom = event.target.value;
    console.log(prenom);
  });

  let addressContainer = document.getElementById("address");
  addressContainer.addEventListener("change", function (event) {
    addresse = event.target.value;
    console.log(addresse);
  });

  let cityContainer = document.getElementById("city");
  cityContainer.addEventListener("change", function (event) {
    ville = event.target.value;
    console.log(ville);
  });

  let mailContainer = document.getElementById("mail");
  mailContainer.addEventListener("change", function (event) {
    mail = event.target.value;
    console.log(mail);
  });

  let getContactInfo = () => {
    let contactInfo = {
      firstName: prenom,
      lastName: nom,
      address: addresse,
      city: ville,
      email: mail,
    };
    
    console.log("Objet Contact dans la fonction getContactInfo", contactInfo);
    return contactInfo;
  };

  // Envoyer les donnees au serveur avec Promise
  let apiResponse;
  let sendOrderToServer = function () {
    let contact = getContactInfo();
    let jsonBody = {
      contact,
      products,
    };
    console.log("final jsonbody", jsonBody);
    fetch("http://localhost:3000/api/teddies/order", {
      headers: { "Content-Type": "application/json" },
      method: "POST",
      body: JSON.stringify(jsonBody),
    })
      .then((response) => {
        return response.json();
      })
      .then((jsonResponse) => {
        console.log("Reponse JSON si la requete se passe bien", jsonResponse);
        apiResponse = jsonResponse;
        sendOrderInfoToLocalStorage(apiResponse);
        showOrderId(apiResponse);
      })
      .catch((error) => alert("Erreur: " + error));
  };

  // Envoyer l'order ID et le montant total vers le local storage
  let sendOrderInfoToLocalStorage = (apiResponse) => {
    let orderId = apiResponse.orderId;
    localStorage.setItem("orderId", JSON.stringify(orderId));
    let totalAmount = totalPriceCalculation(productList);
    localStorage.setItem("totalAmount", JSON.stringify(totalAmount));
  };
  // verification
  console.log(localStorage);
 


  // Lancer la fonction sendOrderToServer quand on clique sur le bouton commander
  let confirmationButton = document.getElementById("confirmation-button");
  confirmationButton.addEventListener("click", sendOrderToServer);

  // Fonction test pour faire apparaitre l'order ID sur la page panier -
  // cette fonction sera supprimee avant soumission du projet
  let showOrderId = (apiResponse) => {
    let orderId = apiResponse.orderId;
    let orderIdContainer = document.getElementById("identifiant");
    orderIdContainer.innerHTML = orderId;
  };
};

//Envoyer les donnees au serveur avec XMLHttp (ca marche pas)

//   let  request = new XMLHttpRequest();
//   request.onreadystatechange = function () {
//   if(this.readyState == XMLHttpRequest.DONE && this.status == 200) {
//     let response = JSON.parse(this.responseText)
//     console.log(response)
//   } else {
//     console.log('error')
//   }
// };
// request.open("POST", "http://localhost:3000/api/teddies/order");
// request.setRequestHeader("Content-Type", "application/json");
// request.send(JSON.stringify(jsonBody));
