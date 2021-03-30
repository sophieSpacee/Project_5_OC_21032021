window.onload = () => {
  //Calcul du prix total
  const totalPriceCalculation = (productList) => {
    let totalPrice = 0;
    for (let item of productList) {
      totalPrice += item.price;
    }
    return totalPrice;
  };

  //Affichage du prix total dans le panier
  const showTotalPrice = () => {
    let productList = JSON.parse(localStorage.getItem("teddy"));
    const totalPriceContainer = document.getElementById("total-price");
    totalPriceContainer.innerHTML = totalPriceCalculation(productList);
  };

  //Fonction qui fait apparaitre dans le panier les articles contenus dans local storage
  const showCartItems = () => {
    let productList = JSON.parse(localStorage.getItem("teddy"));
    if (productList.length===0) {
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
        productColor.classList.add("card-text");
        productCol2.appendChild(productColor);
        productColor.innerHTML = item.chosenColor;

        const productCol3 = document.createElement("div");
        productCol3.classList.add("col-3", "my-auto");
        productLine.appendChild(productCol3);

        const productPrice = document.createElement("p");
        productPrice.classList.add(
          "align-middle",
          "my-auto",
          "text-right",
          "mr-2",
          "price"
        );
        productCol3.appendChild(productPrice);
        productPrice.innerHTML = item.price;

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

  showCartItems();

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
  mailContainer.addEventListener("input", function (event) {
    mail = event.target.value;
    console.log(mail);
  });

  const getContactInfo = () => {
    const mailFormat = /[A-Za-z0-9._%+-]+@[a-z0-9.-]/;
    if (
      prenom !== undefined &&
      nom !== undefined &&
      addresse !== undefined &&
      ville !== undefined &&
      mail !== undefined &&
      mail.match(mailFormat)
    ) {
      const contactInfo = {
        firstName: prenom,
        lastName: nom,
        address: addresse,
        city: ville,
        email: mail,
      };
      return contactInfo;
    } else {
      console.log("Formulaire non complet");
      return false;
    }
  };

  // Cache le formulaire si le panier est vide, construit la liste produit à envoyer au serveur si le panier est rempli

  const getProductList = () => {
    let productList = JSON.parse(localStorage.getItem("teddy"));
    let products = [];
    if (productList.length === 0) {
      let formContainer = document.getElementById("form-container");
      formContainer.classList.add("invisible");
      return false;
    } else {
      for (let item of productList) {
        products.push(item._id);
      }
      return products;
    }
  };
  getProductList();

  // Suppression d'un produit du panier

  const deleteItem = (productIndex) => {
    const existing = localStorage.getItem("teddy");
    console.log(existing);
    if (existing) {
      let teddies = JSON.parse(existing);
      console.log(teddies);
      teddies.splice(productIndex, 1);
      console.log(productIndex);
      localStorage.setItem("teddy", JSON.stringify(teddies));
      window.location.reload();
    } else {
      return false;
    }
  };

  // Envoyer les donnees au serveur avec Promise

  const confirmationButton = document.getElementById("confirmation-button");

  const sendOrderToServer = (e) => {
    const formContainer = document.getElementById("form-container");
    formContainer.reportValidity();
    e.preventDefault();
    const contact = getContactInfo();
    const products = getProductList(productList);
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
          const totalAmount = totalPriceCalculation(productList);
          localStorage.setItem("totalAmount", JSON.stringify(totalAmount));
          window.location.href = "../confirmation/confirmation.html";
        })
        .catch((error) => console.error(error));
    }
  };

  // Lancer la fonction sendOrderToServer quand on clique sur le bouton commander
  confirmationButton.addEventListener("click", (e) => sendOrderToServer(e));
};
