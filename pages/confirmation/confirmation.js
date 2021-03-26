window.onload = () => {
  console.log(localStorage);

  let showOrderId = () => {
    let orderId = JSON.parse(localStorage.getItem("orderId"));
    console.log(orderId);
    let orderIdContainer = document.getElementById("identifier");
    orderIdContainer.innerHTML = orderId;
  };

  showOrderId();

  let showTotalAmount = () => {
    let totalAmount = JSON.parse(localStorage.getItem("totalAmount"));
    console.log(totalAmount);
    let totalAmountContainer = document.getElementById("total-price-confirmation");
    totalAmountContainer.innerHTML = totalAmount;
  };

  showTotalAmount();


};

window.onbeforeunload = closingCode;
function closingCode(){
  localStorage.clear();
   return null;
}