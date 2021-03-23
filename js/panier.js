window.onload = () => {
    console.log(localStorage);
let productList = JSON.parse(localStorage.getItem("teddy"));
console.log(productList);
console.log(typeof productList);

let firstItem = productList[0];
console.log(firstItem);



for(let item of productList){
    console.log(item)
    let productLine = document.createElement('div');

    let productLineContainer = document.getElementById('products-container');
    console.log(productLineContainer)
    productLineContainer.appendChild(productLine);
    productLine.classList.add('row', 'bg-white', 'my-3');

    let productCol1 = document.createElement('div');
    productCol1.classList.add('col-4');
    productLine.appendChild(productCol1);

    let productCard = document.createElement('div');
    productCard.classList.add('card');
    productCol1.appendChild(productCard);

    let teddyImage = document.createElement('img');
    teddyImage.classList.add('card-image-top');
    productCard.appendChild(teddyImage);
    teddyImage.setAttribute('src', item.imageUrl)

    let productCol2 = document.createElement('div');
    productCol2.classList.add('col-4', 'my-auto');
    productLine.appendChild(productCol2);

    let productName = document.createElement('h2');
    productName.classList.add('card-title');
    productCol2.appendChild(productName);
    productName.innerHTML = item.name;

    let productColor = document.createElement('p');
    productColor.classList.add('card-text');
    productCol2.appendChild(productColor);
    productColor.innerHTML = 'couleur'

    let productCol3 = document.createElement('div')
    productCol3.classList.add('col-4', 'my-auto');
    productLine.appendChild(productCol3);

    let productPrice = document.createElement('p');
    productPrice.classList.add('align-middle', 'my-auto', 'text-right', 'mr-2', 'price');
    productCol3.appendChild(productPrice);
    productPrice.innerHTML = item.price;

}

let totalPriceCalculation = (productList) => {
    console.log(productList);
    let totalPrice = 0;
    for (let item of productList){
        totalPrice = totalPrice + item.price;
        console.log(item)
    }
    return totalPrice;
}

let totalPriceContainer = document.getElementById('total-price');
totalPriceContainer.innerHTML = totalPriceCalculation(productList);

}
