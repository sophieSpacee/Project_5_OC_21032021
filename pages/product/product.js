window.onload = () => {
  const getIdFromUrl = () => {
    // Recuperer l'ID du produit dans l'URL
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const product_id = urlParams.get("_id");
    return product_id;
  };

  // Promise qui récupère les données API du produit et lance la fonction showProductDetail si tout se passe bien
  let productInfoFromApi;
  let product_id = getIdFromUrl();
  const getProductAttributeList = fetch(
    "http://localhost:3000/api/teddies/" + product_id,
    {
      method: "GET",
    }
  )
    .then((response) => {
      return response.json();
    })
    .then((element) => {
      productAttributeList = element;
      showProductDetail(productAttributeList);
      const colorList = document.getElementsByTagName("option");
      const firstColor = colorList[0].innerHTML;
      productAttributeList.chosenColor = firstColor;
      productAttributeList.chosenQuantity = 1;
      return productAttributeList;
    })
    .catch((error) => alert("Erreur: " + error));

  const showProductDetail = (productAttributeList) => {
    // Afficher le détail du produit sur la page product.html
    const productName = document.getElementById("product-name");
    productName.innerHTML = productAttributeList.name;

    const productPicContainer = document.getElementById("productpic-container");
    productPicContainer.setAttribute("src", productAttributeList.imageUrl);

    const productDescription = document.getElementById("product-description");
    productDescription.innerHTML = productAttributeList.description;

    const productPrice = document.getElementById("product-price");
    productPrice.innerHTML = productAttributeList.price;
    productPrice.classList.add("price");

    getColorList(productAttributeList);
    getQuantity(productAttributeList);
  };

  const getColorList = (productAttributeList) => {
    // Fonction qui recupere la liste des options disponible pour ce produit et les affiche dans une liste deroulante
    const productColor = document.getElementById("product-color");
    const colors = productAttributeList.colors;
    colors.forEach((color) => {
      const option = document.createElement("option");
      productColor.appendChild(option);
      option.innerHTML = color;
    });
    getChosenColor(productAttributeList);
  };

  const getChosenColor = (productAttributeList) => {
    // Fonction qui recupere la couleur choisie dans le menu deroulant et qui l'ajoute a l'objet produit en tant qu'attribut
    const productColor = document.getElementById("product-color");
    productColor.addEventListener("change", (event) => {
      const clickedColor = event.target.value;
      productAttributeList.chosenColor = clickedColor;
      return productAttributeList;
    });
  };

  const getQuantity = (productAttributeList) => {
    //Recuperer la quantité choisie par l'utilisateur
    const quantity = document.getElementById("quantity");
    quantity.addEventListener("change", (event) => {
      const chosenQuantity = parseInt(event.target.value);
      productAttributeList.chosenQuantity = chosenQuantity;
      return chosenQuantity;
    });
  };

  const addProductToCart = () => {
    // Fonction qui ajoute le produit au panier
    const existing = localStorage.getItem("selectedItems");
    let productArray;
    if (existing) {
      productArray = JSON.parse(existing);
    } else {
      productArray = [];
    }
    let alreadyInCart = false;
    productArray.forEach((element) => {
      if (
        productAttributeList._id === element._id &&
        productAttributeList.chosenColor === element.chosenColor
      ) {
        element.chosenQuantity += productAttributeList.chosenQuantity;
        alreadyInCart = true;
      }
    });
    if (!alreadyInCart) {
      productArray.push(productAttributeList);
    }
    localStorage.setItem("selectedItems", JSON.stringify(productArray));
    showSuccessMessage();
    showCartItemNumber();
  };

  const showSuccessMessage = () => {
    // Fonction qui fait apparaitre un message de succes lors de l'ajout au panier
    const successAlert = document.getElementById("alert-success");
    successAlert.innerHTML =
      "Félicitations ! Vous avez ajouté cet article à votre panier !";
    successAlert.classList.add("alert", "alert-success", "mt-3");
  };

  const addToCartButton = document.getElementById("add-cart");
  addToCartButton.onclick = addProductToCart;

  const calcutateNumberOfItemsInCart = (productList) => {
    // Fonction qui calcule le nombre de produits dans le panier
    let itemNumber = 0;
    if (productList !== null) {
      productList.forEach((element) => {
        itemNumber += element.chosenQuantity;
      });
    }
    return itemNumber;
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
