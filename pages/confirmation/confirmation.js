window.onload = () => {
  const showOrderId = () => {
    // Fonction qui fait apparaitre le numéro de commande renvoyé par le serveur
    const orderId = JSON.parse(localStorage.getItem("orderId"));
    const orderIdContainer = document.getElementById("identifier");
    orderIdContainer.innerHTML = orderId;
  };
  showOrderId();

  const showTotalAmount = () => {
    // Fonction qui fait apparaitre le montant total de la commande envoyée
    const totalAmount = JSON.parse(localStorage.getItem("totalAmount"));
    const totalAmountContainer = document.getElementById(
      "total-price-confirmation"
    );
    totalAmountContainer.innerHTML = totalAmount;
  };
  showTotalAmount();
};

window.onbeforeunload = closingCode;
function closingCode() {
  //Fonction qui vide le panier une fois la page confirmation quittée
  localStorage.clear();
  return null;
}
