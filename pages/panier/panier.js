window.onload = () => {
  const showCartItems = () => {
    //Fonction qui fait apparaitre dans le panier les articles contenus dans local storage
    let productList = JSON.parse(localStorage.getItem("selectedItems"));
    if (productList === null) {
      const errormessage = document.getElementById("error-message-panier");
      errormessage.classList.add("alert");
      errormessage.innerHTML = "Votre panier est vide";
    } else {
      for (let index in productList) {
        const item = productList[index];
        const productLine = document.createElement("div");
        const productLineContainer = document.getElementById(
          "products-container"
        );
        productLineContainer.appendChild(productLine);
        productLine.classList.add("row", "bg-white", "my-3");
        const quantityTimesPrice = () => {
          let totalPrice;
          totalPrice = item.price * item.chosenQuantity;
          return totalPrice;
        };
        productLine.innerHTML = ` <div class="col-6 col-md-3 pl-0">
            <div class="card">
              <img class="card-image-top" src="${item.imageUrl}"></img>
            </div>
          </div>
          <div class="col-6 col-md-4 my-auto">
            <h2 class="card-title">${item.name}</h2>
            <p class="card-text color">${item.chosenColor}</p>
            <p class="card-text quantity">${item.chosenQuantity}</p>
          </div>
          <div class="col-6 col-md-4 my-2 my-md-auto pl-0">
            <p class="align-middle text-right mr-2 unity-price">${
              item.price
            }</p>
            <p class="align-middle text-right mr-2 total-price">${quantityTimesPrice()}</p>
          </div>
          <div class="col-6 col-md-1 my-auto">
            <input class="remove-item btn-primary" type="button" value="X" id="delete-button--${index}"></input>
          </div>`;
        const deleteButton = document.getElementById("delete-button--" + index);
        deleteButton.onclick = () => deleteItem(index);
      }
      showTotalPrice();
    }
  };

  const totalPriceCalculation = () => {
    //Fonction qui calcule le prix total
    const productList = JSON.parse(localStorage.getItem("selectedItems"));
    let totalPrice = 0;
    for (let item of productList) {
      let totalItemPrice = item.price * item.chosenQuantity;
      totalPrice += totalItemPrice;
    }
    return totalPrice;
  };

  const showTotalPrice = () => {
    //Affichage du prix total dans le panier
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

  const nameContainer = document.getElementById("lastName");
  nameContainer.addEventListener("change", function (event) {
    nom = event.target;
    nomValue = event.target.value;
  });

  const firstNameContainer = document.getElementById("firstName");
  firstNameContainer.addEventListener("change", function (event) {
    prenom = event.target;
    prenomValue = event.target.value;
  });

  const addressContainer = document.getElementById("address");
  addressContainer.addEventListener("change", function (event) {
    adresse = event.target;
    adresseValue = event.target.value;
  });

  const cityContainer = document.getElementById("city");
  cityContainer.addEventListener("change", function (event) {
    ville = event.target;
    villeValue = event.target.value;
  });

  const mailContainer = document.getElementById("mail");
  mailContainer.addEventListener("input", function (event) {
    mail = event.target;
    mailValue = event.target.value;
  });

  // Fonction qui construit l'objet contact si le formulaire est bien rempli
  const getContactInfo = () => {
    if (
      prenom.checkValidity() &&
      nom.checkValidity() &&
      adresse.checkValidity() &&
      ville.checkValidity() &&
      mail.checkValidity()
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

  const getProductList = () => {
    // Cache le formulaire si le panier est vide, construit la liste produit à envoyer au serveur si le panier est rempli
    const productList = JSON.parse(localStorage.getItem("selectedItems"));
    let products = [];
    if (productList === null || productList.length === 0) {
      const formContainer = document.getElementById("form-container");
      formContainer.classList.add("invisible");
      return false;
    } else {
      for (let item of productList) {
        const numberOfIteration = item.chosenQuantity;
        for (let i = 0; i < numberOfIteration; i++) {
          products.push(item._id);
        }
      }
      return products;
    }
  };
  getProductList();

  const deleteItem = (productIndex) => {
    // Suppression d'un produit du panier
    const existing = localStorage.getItem("selectedItems");
    if (existing) {
      const productsInCart = JSON.parse(existing);
      productsInCart.splice(productIndex, 1);
      localStorage.setItem("selectedItems", JSON.stringify(productsInCart));
      window.location.reload();
    }
  };
  const confirmationButton = document.getElementById("confirmation-button");

  const sendOrderToServer = (e) => {
    // Envoyer les donnees au serveur
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
