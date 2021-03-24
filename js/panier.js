window.onload = () => {
  let productList = JSON.parse(localStorage.getItem("teddy"));
  let teddiesList = [];
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
      teddiesList.push(item._id);
    }
  };

  console.log(teddiesList);

  showCartItems();

  let totalPriceCalculation = (productList) => {
    console.log(productList);
    let totalPrice = 0;
    for (let item of productList) {
      totalPrice = totalPrice + item.price;
      console.log(item);
    }
    return totalPrice;
  };

  let totalPriceContainer = document.getElementById("total-price");
  totalPriceContainer.innerHTML = totalPriceCalculation(productList);

let nom = document.getElementById('lastName').value;
console.log(nom);


    //Construction de l'objet contact a envoyer au serveur 
    let contact = {
      firstName: "sophie",
      lastName: "gauthier",
      address: "rue du roule",
      city: "Paris",
      email: "sophie.lo@gmail.com",
    };
  
    // Construction du jsonBody contenant l'objet contact et la liste des ID commandees. 
    let jsonBody = {
        contact,
        teddiesList
    }
    console.log(jsonBody)

  //   //Envoyer les donnees au serveur
    let request = new XMLHttpRequest();
    request.open('POST', 'http://localhost:3000/api/teddies');
    request.send(JSON.stringify(jsonBody));
};
