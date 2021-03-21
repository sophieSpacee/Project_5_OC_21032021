let request = new XMLHttpRequest();
request.onreadystatechange = function() {
  if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
      var response = JSON.parse(this.responseText);
      console.log(response);
     response.forEach(element => {
  console.log(element._id);
  const teddy = document.createElement("div");
  let teddyContainer = document.getElementById('teddy-container');
  teddyContainer.appendChild(teddy);
  const teddyName = document.createElement("span");
  teddy.appendChild(teddyName);
  teddyName.innerHTML = element.name;
  const teddyPrice = document.createElement("span");
  teddy.appendChild(teddyPrice);
  teddyPrice.innerHTML = element.price;
  const teddyDescription = document.createElement("span");
  teddy.appendChild(teddyDescription);
  teddyDescription.innerHTML = element.description;
  const teddyPic = document.createElement("img");
  teddy.appendChild(teddyPic);
  teddyPic.setAttribute("src", element.imageUrl);
  const teddyColors = document.createElement("span");
  teddy.appendChild(teddyColors);
  teddyColors.innerHTML = element.colors;
  
});
  }
};

request.open('GET', 'http://localhost:3000/api/teddies');
request.send();

