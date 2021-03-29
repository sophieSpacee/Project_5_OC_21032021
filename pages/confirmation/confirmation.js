window.onload = () => {
  console.log(localStorage);

  const showOrderId = () => {
    const orderId = JSON.parse(localStorage.getItem("orderId"));
    console.log(orderId);
    const orderIdContainer = document.getElementById("identifier");
    orderIdContainer.innerHTML = orderId;
  };
  showOrderId();

  const showTotalAmount = () => {
    const totalAmount = JSON.parse(localStorage.getItem("totalAmount"));
    console.log(totalAmount);
    const totalAmountContainer = document.getElementById("total-price-confirmation");
    totalAmountContainer.innerHTML = totalAmount;
  };
  showTotalAmount();
};

window.onbeforeunload = closingCode;
function closingCode(){
  localStorage.clear();
   return null;
}