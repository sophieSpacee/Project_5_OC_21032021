
// Promise qui récupère les données API et lance la fonction buildTeddies si tout se passe bien
let getTeddies = fetch("http://localhost:3000/api/teddies", {
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
let buildTeddy = (element) => {
  const teddy = document.createElement("div");
  teddy.onclick = () => {
    window.location.href="/product.html?_id="+element._id
  }
  let teddyContainer = document.getElementById("teddy-container");
  teddyContainer.appendChild(teddy);
  teddy.classList.add("col-12", "col-lg-4",  "col-sm-6", "mt-5", "mb-5", "pointer");
  
  const teddyCard = document.createElement("div");
  teddy.appendChild(teddyCard);
  teddyCard.classList.add('card', 'card-hover');

  const teddyPic = document.createElement("img");
  teddyCard.appendChild(teddyPic);
  teddyPic.setAttribute("src", element.imageUrl);
  teddyPic.classList.add('card-image-top', 'img-center');

  const teddyCardBody = document.createElement("div");
  teddyCard.appendChild(teddyCardBody);
  teddyCardBody.classList.add('card-body');

  const teddyName = document.createElement("h2");
  teddyCardBody.appendChild(teddyName);
  teddyName.innerHTML = element.name;
  teddyName.classList.add('card-title');

  const teddyPrice = document.createElement("p");
  teddyCardBody.appendChild(teddyPrice);
  teddyPrice.innerHTML = element.price;
  teddyPrice.classList.add('card-text', 'price', 'text-right');
};



// Ancienne version du code avec XMLHttpRequest

// const request = new XMLHttpRequest();
// request.onreadystatechange = function () {
//   if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
//     var response = JSON.parse(this.responseText);
//     console.log(response);
//     response.forEach((element) => {
//       console.log(element._id);
//       const teddy = document.createElement("div");
//       let teddyContainer = document.getElementById("teddy-container");
//       teddyContainer.appendChild(teddy);
//       const teddyName = document.createElement("span");
//       teddy.appendChild(teddyName);
//       teddyName.innerHTML = element.name;
//       const teddyPrice = document.createElement("span");
//       teddy.appendChild(teddyPrice);
//       teddyPrice.innerHTML = element.price;
//       const teddyDescription = document.createElement("span");
//       teddy.appendChild(teddyDescription);
//       teddyDescription.innerHTML = element.description;
//       const teddyPic = document.createElement("img");
//       teddy.appendChild(teddyPic);
//       teddyPic.setAttribute("src", element.imageUrl);
//       const teddyColors = document.createElement("span");
//       teddy.appendChild(teddyColors);
//       teddyColors.innerHTML = element.colors;
//     });
//   }
// };

// request.open("GET", "http://localhost:3000/api/teddies");
// request.send();
