document.addEventListener("DOMContentLoaded", function () {
  const loginButtons = document.querySelectorAll(".loginButton");
  const isLoggedIn = localStorage.getItem("isLoggedIn");
  const token = localStorage.getItem("accessToken");

  // Popup elements
  const logoutPopup = document.getElementById("logoutPopup");
  const confirmLogoutButton = document.getElementById("confirmLogout");
  const cancelLogoutButton = document.getElementById("cancelLogout");
  const Signuptoggle = document.getElementById("signup-toggle");

  loginButtons.forEach((loginButton) => {
      if (isLoggedIn === "true") {
          loginButton.innerHTML = '<a href="#" class="logoutLink">Logout</a>';
          Signuptoggle.style.display='none'
          try {
              fetch('https://khanadotcom.in/profile-user/', {
                  method: 'GET',
                  headers: {
                      'Authorization': `Bearer ${token}`
                  }
              })
                  .then(response => response.json())
                  .then(data => {
                      const userType = data.user_type;
                      if (userType === 'restaurant_owner') {
                          const restaurantOwnerLinks = document.querySelector('.restaurant-owner-links');
                          restaurantOwnerLinks.style.display = 'flex';
                      }
                  })
                  .catch(error => {
                      console.log('There was an error in fetching the Restaurant owner options: ' + error);
                  });
          } catch (error) {
              console.error('Error occurred during fetching user type:', error);
          }

      } else {
          loginButton.innerHTML = '<a href="login.html">Login</a>';
      }
  });

  // Show popup on logout click
  document.querySelectorAll(".logoutLink").forEach((logoutLink) => {
      logoutLink.addEventListener("click", function (event) {
          event.preventDefault();
          logoutPopup.style.display = "block";
      });
  });

  // Confirm logout
  confirmLogoutButton.addEventListener("click", function () {
      localStorage.setItem("isLoggedIn", "false");
      localStorage.removeItem("accessToken");
      localStorage.removeItem("userRole");

      // Reset button text to "Login" after logging out
      loginButtons.forEach((loginButton) => {
          loginButton.innerHTML = '<a href="login.html">Login</a>';
      });

      window.location.href = "index.html";
  });

  // Cancel logout
  cancelLogoutButton.addEventListener("click", function () {
      logoutPopup.style.display = "none";
  });
});

// Header Toggle Functionality
const navMenu = document.getElementById('nav-menu');
// const filterMenu = document.getElementById('filter-menu');
const SignupMenu = document.getElementById('sign-menu');
const ChatBot = document.getElementById('ChatBot-Box');

document.getElementById('menu-toggle').addEventListener('click', function (event) {
  event.stopPropagation();
  navMenu.classList.toggle('show');
  // filterMenu.classList.remove("show");
  SignupMenu.classList.remove("show");
  ChatBot.classList.remove("show");
});

// document.getElementById('filter-toggle').addEventListener('click', function (event) {
//     event.stopPropagation();
//     filterMenu.classList.toggle('show');
//     navMenu.classList.remove("show");
//     SignupMenu.classList.remove("show");
//     ChatBot.classList.remove("show");
// });

document.getElementById('signup-toggle').addEventListener('click', function (event) {
  event.stopPropagation();
  SignupMenu.classList.toggle('show');
  navMenu.classList.remove("show");
  // filterMenu.classList.remove("show");
  ChatBot.classList.remove("show");
});

document.getElementById('bot-toggle').addEventListener('click', function (event) {
  event.stopPropagation();
  ChatBot.classList.toggle("show");
  SignupMenu.classList.remove('show');
  navMenu.classList.remove("show");
  // filterMenu.classList.remove("show");
});

document.addEventListener('click', function (event) {
  if (!navMenu.contains(event.target) && !SignupMenu.contains(event.target) && !ChatBot.contains(event.target)) {
      navMenu.classList.remove("show");
      SignupMenu.classList.remove("show");
      ChatBot.classList.remove("show");
  }
});

// Cart Value Management

// Function to add item to the cart
function addToCart(itemId) {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  if (!cart.includes(itemId)) {
    cart.push(itemId);
    localStorage.setItem('cart', JSON.stringify(cart));
  }
  updateCartCount();
}

// Function to remove item from the cart
function removeFromCart(itemId) {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  cart = cart.filter(id => id !== itemId);
  localStorage.setItem('cart', JSON.stringify(cart));
  updateCartCount();
}

// Function to update the cart count
function updateCartCount() {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  const cartCountElement = document.querySelector('.cart-count-number');
  const itemInCartElement = document.getElementById('itemincart');
  
  if (cartCountElement) {
    cartCountElement.textContent = cart.length;
  }

  if (itemInCartElement) {
    itemInCartElement.textContent = cart.length;
  }
}
document.addEventListener('DOMContentLoaded', updateCartCount);


// Restaurant owner Dashboard toggle
let Dashboard = document.querySelector('.restaurant-owner-links')
let DashboardPopup = document.querySelector('.restaurant-dashboard')
let CloseDashboardPopup = document.querySelector('.close-dash')
let MainContent = document.querySelector('.main-content')
Dashboard.addEventListener('click', function () {
  DashboardPopup.style.display = 'block'
  MainContent.classList.add('blurred')
})
CloseDashboardPopup.addEventListener('click' , function(){
  DashboardPopup.style.display = 'none'
  MainContent.classList.remove('blurred')
})