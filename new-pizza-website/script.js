function selectPizza(name) {
  document.getElementById("selectedPizza").value = name;
}

function placeOrder() {
  let name = document.getElementById("name").value;
  let address = document.getElementById("address").value;
  let pizza = document.getElementById("selectedPizza").value;
  let qty = document.getElementById("qty").value;

  if (!name || !address || !pizza || !qty) {
    document.getElementById("result").innerText = "Please complete all fields!";
    return;
  }

  document.getElementById("result").innerText =
    `Order Confirmed 🍕 ${name}, your ${qty} ${pizza} will be delivered to ${address}.`;
}