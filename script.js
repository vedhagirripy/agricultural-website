function showPage(id) {
  document.querySelectorAll(".page").forEach(p => p.classList.remove("active"));
  document.getElementById(id).classList.add("active");
}

function showCategory(type) {
  const data = {
    fruits: ["Mango", "Banana", "Apple", "Guava"],
    vegetables: ["Carrot", "Potato", "Tomato", "Onion"],
    spinach: ["Palak", "Methi", "Amaranth"],
    seeds: ["Tomato Seeds", "Carrot Seeds", "Spinach Seeds"]
  };
  const list = data[type].map(item => `<p>${item}</p>`).join('');
  document.getElementById("categoryDisplay").innerHTML = list;
}

function searchProduct() {
  const value = document.getElementById("searchInput").value.toLowerCase();
  const items = {
    apple: { name: "Apple", price: 120, img: "image/apple.jpg" },
    mango: { name: "Mango", price: 100, img: "image/mango.jpg" },
    banana: { name: "Banana", price: 50, img: "image/banana.jpg" },
    guava: { name: "Guava", price: 80, img: "image/guava.jpg" },
    fig: { name: "fig", price: 90, img: "image/fig.jpg" },
     custard_apple: { name: " custard Apple", price: 100, img: "image/ custard apple.jpg" },
      dragon_fruit: { name: "dragon fruit", price: 120, img: "image/dragon fruit.jpg" },
       orange : { name: "orange", price: 70, img: "image/orange.jpg" },
        jamun: { name: "jamun", price: 120, img: "image/jamun.jpg" },
         jack_fruit : { name: "jack fruit", price: 120, img: "image/jack fruit.jpg" },
    tomato: { name: "Tomato", price: 40, img: "image/tomato.jpg" },
     angular_gourd: { name: "angular gourd", price: 40, img: "image/angular gourd.jpg" },
     beetroot: { name: "beetroot", price: 50, img: "image/beetroot.jpg" },
      brinjal: { name: "brinjal", price: 20, img: "image/brinjal.jpg" },
      cabbage: { name: "cabbage", price: 50, img: "image/cabbage.jpg" },
      capsicum: { name: "capsicum", price: 10, img: "image/capsicum.jpg" },
      carrot: { name: "carrot", price: 60, img: "image/image/carrot .jpg "},
      cauliflower: { name: "cauliflower", price: 20, img: "image/cauliflower.jpg" },
      
     
    "tomato seeds": { name: "Tomato Seeds", price: 20, img: "image/tomato-seeds.jpg" }
  };
  const p = items[value];
  if (p) {
    document.getElementById("searchResult").innerHTML = `
      <img src="${p.img}" width="200" height="100" />
      <p>${p.name} - ₹${p.price}</p>
      <button onclick="addToCart('${p.name}')">Add to Cart</button>
      <button onclick="buyNow('${p.name}', ${p.price})">Buy Now</button>
    `;
  } else {
    document.getElementById("searchResult").innerText = "Item not found.";
  }
}

let cart = [];
let orders = [];
let currentItem = null;
let currentPrice = 0;

function addToCart(item) {
  cart.push(item);
  document.getElementById("cartItems").innerHTML = cart.map(i => `<p>${i}</p>`).join('');
}

function buyNow(item, price) {
  currentItem = item;
  currentPrice = price;
  document.getElementById("paymentItem").value = item;
  document.getElementById("paymentAmount").value = price;
  showPage('payment');
}

function placeOrder(item, delivery) {
  orders.push({ item, delivery });
  document.getElementById("orderList").innerHTML = orders.map(o => `<p>${o.item} - Delivery by ${o.delivery}</p>`).join('');
  showPage('orders');
}

function signupUser(e) {
  e.preventDefault();
  const formData = new FormData(e.target);
  fetch('signup.php', {
    method: 'POST',
    body: formData
  })
  .then(res => res.text())
  .then(msg => {
    document.getElementById("signupMessage").innerText = msg;
    e.target.reset();
  });
}

function loginUser(e) {
  e.preventDefault();
  const formData = new FormData(e.target);
  fetch('login.php', {
    method: 'POST',
    body: formData
  })
  .then(res => res.text())
  .then(msg => {
    document.getElementById("loginMessage").innerText = msg;
    e.target.reset();
  });
}



function makePayment(e) {
  e.preventDefault();
  const formData = new FormData(e.target);
  fetch('payment.php', {
    method: 'POST',
    body: formData
  })
  .then(res => res.text())
  .then(msg => {
    const msgBox = document.getElementById("paymentMsg");
    const enteredAmount = parseInt(formData.get("amount"));
    if (enteredAmount === currentPrice) {
      const delivery = new Date(Date.now() + 3 * 86400000).toDateString();
      msgBox.innerText = `✅ Payment Successful! ${currentItem} will be delivered by ${delivery}`;
      msgBox.className = "success";
      placeOrder(currentItem, delivery);
    } else {
      msgBox.innerText = "❌ Payment Error: Please check the amount.";
      msgBox.className = "error";
    }
    e.target.reset();
  })
  .catch(() => {
    const msgBox = document.getElementById("paymentMsg");
    msgBox.innerText = "❌ Payment failed.";
    msgBox.className = "error";
  });
}
