// Promise qui récupère les données API et lance la fonction buildTeddies si tout se passe bien
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const product_id = urlParams.get('_id')

let getTeddies = fetch("http://localhost:3000/api/teddies/"+product_id, {
  method: "GET",
})
  .then((response) => {
    return response.json();
  })
  .then((element) => {
    
      showTeddyDetail(element);
      console.log(element);
  
  })
  .catch((error) => alert("Erreur: " + error));


// Afficher le détail du produit sur la page product.html
let showTeddyDetail = (element) => {
    let teddyName2 = document.getElementById("teddy-name2");
    teddyName2.innerHTML = element.name;

    let teddyPicContainer = document.getElementById("teddypic-container");
    teddyPicContainer.setAttribute("src", element.imageUrl);
    
    let teddyDetails = document.getElementById("teddyDetails");
    teddyDetails.innerHTML = element.description;
    
    let teddyPrice2 = document.getElementById("teddy-price");
    teddyPrice2.innerHTML = element.price;
    teddyPrice2.classList.add('price');

    let teddyColor = document.getElementById("teddy-color");
   let colors = element.colors;
    colors.forEach(color => {
        let option = document.createElement('option');
        teddyColor.appendChild(option)
        option.innerHTML = color;
    });
  }