// Get cart from localStorage or initialize empty array
let cart = JSON.parse(localStorage.getItem('cart')) || [];

function updateCartDisplay() {
    const cartItemsContainer = document.getElementById('cart-items-container');
    const cartCount = document.querySelector('.cart-count');
    const subtotalElement = document.getElementById('subtotal');
    const shippingElement = document.getElementById('shipping');
    const totalElement = document.getElementById('total');

    // Update cart count
    cartCount.textContent = cart.length;

    // Clear and update cart items
    cartItemsContainer.innerHTML = '';
    let subtotal = 0;

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<div class="empty-cart">Your cart is empty</div>';
        subtotalElement.textContent = '$0.00';
        shippingElement.textContent = '$0.00';
        totalElement.textContent = '$0.00';
        return;
    }

    cart.forEach((item, index) => {
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <img src="${item.image}" alt="${item.name}">
            <div class="cart-item-info">
                <h3>${item.name}</h3>
                <p>${item.description}</p>
                <div class="cart-item-price">$${item.price}</div>
            </div>
            <div class="cart-item-actions">
                <button class="remove-item" data-index="${index}">Remove</button>
            </div>
        `;
        cartItemsContainer.appendChild(cartItem);
        subtotal += item.price;
    });

    // Calculate shipping (free for orders over $100)
    const shipping = subtotal > 100 ? 0 : 10;
    const total = subtotal + shipping;

    // Update summary
    subtotalElement.textContent = `$${subtotal.toFixed(2)}`;
    shippingElement.textContent = shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`;
    totalElement.textContent = `$${total.toFixed(2)}`;
}

function initializeCartPage() {
    // Update cart display
    updateCartDisplay();

    // Add event listeners for remove buttons
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('remove-item')) {
            const index = parseInt(e.target.dataset.index);
            cart.splice(index, 1);
            localStorage.setItem('cart', JSON.stringify(cart));
            updateCartDisplay();
        }
    });

    // Handle checkout
    const checkoutBtn = document.querySelector('.checkout-btn');
    checkoutBtn.addEventListener('click', () => {
        if (cart.length === 0) {
            alert('Your cart is empty!');
            return;
        }
        alert('Proceeding to checkout...');
        // Here you would typically redirect to a checkout page
    });
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', initializeCartPage);

// Remove undefined Chatbot initialization
// const chatbot = new Chatbot();
// chatbot.init();

// Ensure the chat toggle functionality is correctly set up
document.getElementById('chat-toggle').addEventListener('click', function() {
    const chatbotContainer = document.querySelector('.chatbot-container');
    chatbotContainer.classList.toggle('active');
}); 