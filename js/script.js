document.addEventListener('DOMContentLoaded', () => {
  const cartEndpoint = 'https://khanadotcom.in:8000/cart/';
  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzI5MjE1ODEyLCJpYXQiOjE3MjkxNjU0MTIsImp0aSI6ImRkZDMzYTJhZDY4NDQxMjk4ZDRiMDQ3YTAxYWIyODdkIiwidXNlcl9pZCI6OTl9._cioTKU3omYETrMgJjZOb6UwGheWNuwovaOp3yWolck';

  async function fetchCartData() {
      try {
          const response = await fetch(cartEndpoint, {
              method: 'GET',
              headers: {
                  'Authorization': `Bearer ${token}`,
                  'Content-Type': 'application/json'
              }
          });

          if (!response.ok) {
              throw new Error('Failed to retrieve cart data');
          }

          const cartData = await response.json();
          console.log(cartData);
          displayCartItems(cartData.items);
      } catch (error) {
          console.error('Error:', error);
      }
  }

  function displayCartItems(items) {
      const menuList = document.getElementById('menu-list');
      menuList.innerHTML = ''; // Clear the current content

      items.forEach(item => {
          const menuItem = document.createElement('div');
          menuItem.classList.add('menu-item');
          menuItem.innerHTML = `
              <h3>${item.menu_item_name}</h3>
              <p>Quantity: ${item.quantity}</p>
              <p>Price: ₹${item.price}</p>
              <p>Total: ₹${item.total_price}</p>
          `;
          menuList.appendChild(menuItem);
      });
  }

  // Fetch cart data when the page loads
  fetchCartData();
});
