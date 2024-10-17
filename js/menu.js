async function fetchMenuData() {
  try {
      const response = await fetch('https://khanadotcom.in:8000/cart/', {
          method: 'GET',
          headers: {
              'Content-Type': 'application/json',
          }
      });

      if (!response.ok) {
          throw new Error(`Error: ${response.status} ${response.statusText}`);
      }

      const menuData = await response.json();
      displayMenuItems(menuData); // Assuming the menu items are in the root of the response
  } catch (error) {
      console.error("Error: Failed to retrieve menu data", error);
      displayErrorMessage("Failed to retrieve menu data.");
  }
}

function displayMenuItems(menuItems) {
  const menuList = document.getElementById('menu-list');
  menuList.innerHTML = ''; // Clear existing content

  if (menuItems.length === 0) {
      menuList.innerHTML = '<p>No items available.</p>';
      return;
  }

  menuItems.forEach(item => {
      const menuItem = document.createElement('div');
      menuItem.classList.add('menu-item');

      menuItem.innerHTML = `
          <div class="menu-item-content">
              <h3>${item.name}</h3>
              <p>Price: ₹${item.price}</p>
              <p>Description: ${item.description}</p>
              <button class="add-to-cart" data-id="${item.id}">Add to Cart</button>
          </div>
      `;

      menuList.appendChild(menuItem);
  });

  // Attach event listeners for 'Add to Cart' buttons
  attachAddToCartListeners();
}

function attachAddToCartListeners() {
  const addToCartButtons = document.querySelectorAll('.add-to-cart');
  addToCartButtons.forEach(button => {
      button.addEventListener('click', addToCart);
  });
}

async function addToCart(event) {
  const menuItemId = event.target.getAttribute('data-id');
  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzI5MjE1ODEyLCJpYXQiOjE3MjkxNjU0MTIsImp0aSI6ImRkZDMzYTJhZDY4NDQxMjk4ZDRiMDQ3YTAxYWIyODdkIiwidXNlcl9pZCI6OTl9._cioTKU3omYETrMgJjZOb6UwGheWNuwovaOp3yWolck'; // Replace with your token

  try {
      const response = await fetch(`https://khanadotcom.in:8000/cart/add/`, {
          method: 'POST',
          headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({
              menu_item_id: menuItemId,
              quantity: 1
          })
      });

      if (!response.ok) {
          throw new Error(`Error: ${response.status} ${response.statusText}`);
      }

      alert('Item added to cart!');
  } catch (error) {
      console.error("Error: Failed to add item to cart", error);
      alert("Failed to add item to cart.");
  }
}

function displayErrorMessage(message) {
  const menuList = document.getElementById('menu-list');
  menuList.innerHTML = `<p class="error-message">${message}</p>`;
}

// Fetch menu data when the page loads
document.addEventListener('DOMContentLoaded', fetchMenuData);
