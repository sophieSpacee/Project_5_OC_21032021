window.onload = () => {
  //Fonction qui fait apparaitre dans le panier les articles contenus dans local storage
  const showCartItems = () => {
    let productList = JSON.parse(localStorage.getItem("teddy"));
    if (productList === null) {
      let errormessage = document.getElementById("error-message-panier");
      errormessage.classList.add("alert");
      errormessage.innerHTML = "Votre panier est vide";
    } else {
      for (let index in productList) {
        let item = productList[index];
        const productLine = document.createElement("div");

        const productLineContainer = document.getElementById(
          "products-container"
        );
        productLineContainer.appendChild(productLine);
        productLine.classList.add("row", "bg-white", "my-3");

        const productCol1 = document.createElement("div");
        productCol1.classList.add("col-4", "pl-0");
        productLine.appendChild(productCol1);

        const productCard = document.createElement("div");
        productCard.classList.add("card");
        productCol1.appendChild(productCard);

        const teddyImage = document.createElement("img");
        teddyImage.classList.add("card-image-top");
        productCard.appendChild(teddyImage);
        teddyImage.setAttribute("src", item.imageUrl);

        const productCol2 = document.createElement("div");
        productCol2.classList.add("col-4", "my-auto");
        productLine.appendChild(productCol2);

        const productName = document.createElement("h2");
        productName.classList.add("card-title");
        productCol2.appendChild(productName);
        productName.innerHTML = item.name;

        const productColor = document.createElement("p");
        productColor.classList.add("card-text", "color");
        productCol2.appendChild(productColor);
        productColor.innerHTML = item.chosenColor;

        const productQuantity = document.createElement("p");
        productQuantity.classList.add("card-text", "quantity");
        productCol2.appendChild(productQuantity);
        productQuantity.innerHTML = item.chosenQuantity;

        const productCol3 = document.createElement("div");
        productCol3.classList.add("col-3", "my-auto");
        productLine.appendChild(productCol3);

        const productPrice = document.createElement("p");
        productPrice.classList.add(
          "align-middle",

          "text-right",
          "mr-2",
          "unity-price"
        );
        productCol3.appendChild(productPrice);
        productPrice.innerHTML = item.price;

        const productTotalPrice = document.createElement("p");
        productTotalPrice.classList.add(
          "align-middle",

          "text-right",
          "mr-2",
          "total-price"
        );
        productCol3.appendChild(productTotalPrice);
        let quantityTimesPrice = () => {
          let totalPrice;
          totalPrice = item.price * item.chosenQuantity;
          return totalPrice;
        };
        productTotalPrice.innerHTML = quantityTimesPrice();

        const deleteButton = document.createElement("input");
        deleteButton.classList.add("remove-item", "btn-primary");
        deleteButton.type = "button";
        deleteButton.value = "X";
        deleteButton.onclick = () => deleteItem(index);

        const productCol4 = document.createElement("div");
        productCol4.classList.add("col-1", "my-auto");
        productLine.appendChild(productCol4);
        productCol4.appendChild(deleteButton);
      }
      showTotalPrice();
    }
  };

  //Calcul du prix total
  const totalPriceCalculation = () => {
    let productList = JSON.parse(localStorage.getItem("teddy"));
    let totalPrice = 0;
    for (let item of productList) {
      let totalItemPrice = item.price * item.chosenQuantity;
      totalPrice += totalItemPrice;
    }
    return totalPrice;
  };

  //Affichage du prix total dans le panier
  const showTotalPrice = () => {
    const totalPriceContainer = document.getElementById("total-price");
    totalPriceContainer.innerHTML = totalPriceCalculation();
  };

  showCartItems();

  // Construction de l'objet contact a envoyer au serveur
  let nom;
  let prenom;
  let adresse;
  let ville;
  let mail;

  let nameContainer = document.getElementById("lastName");
  nameContainer.addEventListener("change", function (event) {
    nom = event.target;
    nomValue = event.target.value;
  });

  let firstNameContainer = document.getElementById("firstName");
  firstNameContainer.addEventListener("change", function (event) {
    prenom = event.target;
    prenomValue = event.target.value;
  });

  let addressContainer = document.getElementById("address");
  addressContainer.addEventListener("change", function (event) {
    adresse = event.target;
    adresseValue = event.target.value;
  });

  let cityContainer = document.getElementById("city");
  cityContainer.addEventListener("change", function (event) {
    ville = event.target;
    villeValue = event.target.value;
  });

  let mailContainer = document.getElementById("mail");
  mailContainer.addEventListener("input", function (event) {
    mail = event.target;
    mailValue = event.target.value;
  });

  // Fonction qui construit l'objet contact si le formulaire est bien rempli
  const getContactInfo = () => {
    if (
      prenom.checkValidity() === true &&
      nom.checkValidity() === true &&
      adresse.checkValidity() === true &&
      ville.checkValidity() === true &&
      mail.checkValidity() === true
    ) {
      const contactInfo = {
        firstName: prenomValue,
        lastName: nomValue,
        address: adresseValue,
        city: villeValue,
        email: mailValue,
      };
      return contactInfo;
    } else {
      console.error("Formulaire non complet");
      return false;
    }
  };

  // Cache le formulaire si le panier est vide, construit la liste produit à envoyer au serveur si le panier est rempli
  const getProductList = () => {
    let productList = JSON.parse(localStorage.getItem("teddy"));
    let products = [];
    if (productList === null || productList.length === 0) {
      let formContainer = document.getElementById("form-container");
      formContainer.classList.add("invisible");
      return false;
    } else {
      for (let item of productList) {
        let numberOfIteration = item.chosenQuantity;
        for (let i = 0; i < numberOfIteration; i++) {
          products.push(item._id);
        }
      }
    }
  };
  getProductList();

  // Suppression d'un produit du panier
  const deleteItem = (productIndex) => {
    const existing = localStorage.getItem("teddy");
    if (existing) {
      let teddies = JSON.parse(existing);
      teddies.splice(productIndex, 1);
      localStorage.setItem("teddy", JSON.stringify(teddies));
      window.location.reload();
    }
  };

  // Envoyer les donnees au serveur avec Promise
  const confirmationButton = document.getElementById("confirmation-button");

  const sendOrderToServer = (e) => {
    const formContainer = document.getElementById("form-container");
    formContainer.reportValidity();
    e.preventDefault();
    const contact = getContactInfo();
    const products = getProductList();
    const jsonBody = {
      contact,
      products,
    };
    if (!contact || !products) {
      console.error("error");
      return false;
    } else {
      return fetch("http://localhost:3000/api/teddies/order", {
        headers: { "Content-Type": "application/json" },
        method: "POST",
        body: JSON.stringify(jsonBody),
      })
        .then((response) => {
          return response.json();
        })
        .then((jsonResponse) => {
          const orderId = jsonResponse.orderId;
          localStorage.setItem("orderId", JSON.stringify(orderId));
          const totalAmount = totalPriceCalculation();
          localStorage.setItem("totalAmount", JSON.stringify(totalAmount));
          window.location.href = "../confirmation/confirmation.html";
        })
        .catch((error) => console.error(error));
    }
  };

  // Lancer la fonction sendOrderToServer quand on clique sur le bouton commander
  confirmationButton.addEventListener("click", (e) => sendOrderToServer(e));
};
