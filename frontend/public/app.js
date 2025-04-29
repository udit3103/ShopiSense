// Initialize cart from localStorage or create empty cart
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Product data
const products = [
    {
        id: 1,
        name: "Smart Watch Pro",
        category: "wearables",
        price: 24999,
        description: "Advanced smartwatch with health monitoring and notifications",
        image: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=300",
        rating: 4.5
    },
    {
        id: 2,
        name: "Gaming Laptop X",
        category: "electronics",
        price: 89999,
        description: "High-performance gaming laptop with RTX graphics",
        image: "https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=300",
        rating: 4.8
    },
    {
        id: 3,
        name: "Wireless Earbuds Pro",
        category: "accessories",
        price: 14999,
        description: "Premium wireless earbuds with noise cancellation",
        image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=300",
        rating: 4.3
    },
    {
        id: 4,
        name: "Smartphone X",
        category: "electronics",
        price: 69999,
        description: "Latest smartphone with advanced camera system",
        image: "https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=300",
        rating: 4.7
    },
    {
        id: 5,
        name: "4K Gaming Monitor",
        category: "electronics",
        price: 39999,
        description: "27-inch 4K monitor with 144Hz refresh rate and HDR",
        image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=300",
        rating: 4.6
    },
    {
        id: 6,
        name: "Mechanical Keyboard",
        category: "accessories",
        price: 11999,
        description: "RGB mechanical keyboard with custom switches",
        image: "https://images.unsplash.com/photo-1595225476474-87563907a212?w=300",
        rating: 4.4
    },
    {
        id: 7,
        name: "Smart Home Hub",
        category: "smart-home",
        price: 9999,
        description: "Central hub for controlling all your smart home devices",
        image: "https://images.unsplash.com/photo-1558002038-1055907df827?w=300",
        rating: 4.2
    },
    {
        id: 8,
        name: "Wireless Gaming Mouse",
        category: "accessories",
        price: 5999,
        description: "High-precision wireless gaming mouse with RGB",
        image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=300",
        rating: 4.5
    },
    {
        id: 9,
        name: "Smart Security Camera",
        category: "smart-home",
        price: 12999,
        description: "1080p wireless security camera with night vision",
        image: "https://images.unsplash.com/photo-1557324232-b8917d8c3908?w=300",
        rating: 4.3
    },
    {
        id: 10,
        name: "Fitness Tracker",
        category: "wearables",
        price: 6999,
        description: "Water-resistant fitness band with heart rate monitoring",
        image: "https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=300",
        rating: 4.4
    },
    {
        id: 11,
        name: "Smart LED Bulbs",
        category: "smart-home",
        price: 2999,
        description: "Color-changing smart LED bulbs with voice control",
        image: "https://images.unsplash.com/photo-1550985543-f1ea83691cd8?w=300",
        rating: 4.1
    },
    {
        id: 12,
        name: "Tablet Pro",
        category: "electronics",
        price: 49999,
        description: "12.9-inch tablet with high-resolution display and stylus support",
        image: "https://images.unsplash.com/photo-1561154464-82e9adf32764?w=300",
        rating: 4.7
    }
];

// Update cart count in the UI
function updateCartCount() {
    console.log('Updating cart count');
    const cartCount = document.querySelector('.cart-count');
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    if (cartCount) {
        const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
        cartCount.textContent = totalItems;
        console.log('Cart count updated to:', totalItems);
    }
}

// Function to render products
function renderProducts(productsToRender = products) {
    console.log('renderProducts called with:', productsToRender?.length || 0, 'products');
    const productContainer = document.getElementById('product-container');
    if (!productContainer) {
        console.error('No product container found in renderProducts');
        return;
    }

    // Clear existing products
    console.log('Clearing product container');
    productContainer.innerHTML = '';

    // Check if we have products to render
    if (!productsToRender || productsToRender.length === 0) {
        console.log('No products to display');
        productContainer.innerHTML = '<div class="no-products">No products found</div>';
        return;
    }

    console.log('Starting to render products');
    productsToRender.forEach((product, index) => {
        try {
            console.log(`Rendering product ${index + 1}:`, product.name);
            const productCard = document.createElement('div');
            productCard.className = 'product-card';
            productCard.setAttribute('data-aos', 'fade-up');
            productCard.setAttribute('data-aos-delay', (index * 100).toString());
            
            productCard.innerHTML = `
                <img src="${product.image}" alt="${product.name}" class="product-image">
                <div class="product-info">
                    <div class="product-category">${product.category}</div>
                    <h3 class="product-title">${product.name}</h3>
                    <p class="product-description">${product.description}</p>
                    <div class="product-price">₹${product.price.toLocaleString('en-IN')}</div>
                    <div class="product-rating">
                        ${'★'.repeat(Math.floor(product.rating))}${'☆'.repeat(5 - Math.floor(product.rating))}
                        (${product.rating})
                    </div>
                    <div class="product-actions">
                        <button class="buy-now-btn" onclick="handleBuyNow(${product.id})">Buy Now</button>
                        <button class="add-to-cart-btn" onclick="handleAddToCart(${product.id})">Add to Cart</button>
                    </div>
                </div>
            `;
            productContainer.appendChild(productCard);
        } catch (error) {
            console.error(`Error rendering product ${index}:`, error);
        }
    });
    console.log('Finished rendering', productsToRender.length, 'products');
}

// Filter products by category
function filterProducts(category) {
    const filteredProducts = category === 'all' 
        ? products 
        : products.filter(product => product.category === category);
    renderProducts(filteredProducts);
}

// Sort products
function sortProducts(productsToSort, sortBy) {
    const sortedProducts = [...productsToSort];
    
    switch(sortBy) {
        case 'price-low':
            return sortedProducts.sort((a, b) => a.price - b.price);
        case 'price-high':
            return sortedProducts.sort((a, b) => b.price - a.price);
        case 'rating':
            return sortedProducts.sort((a, b) => b.rating - a.rating);
        default:
            return sortedProducts;
    }
}

// Handle Buy Now functionality
function handleBuyNow(productId) {
    console.log('Processing Buy Now for product:', productId);
    const product = products.find(p => p.id === productId);
    if (!product) {
        console.error('Product not found:', productId);
        return;
    }

    // Clear existing cart since this is a direct buy
    localStorage.removeItem('cart');
    
    // Create new cart with just this item
    const cart = [{
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        quantity: 1,
        category: product.category,
        description: product.description
    }];
    
    // Save to localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
    console.log('Cart updated for direct buy:', cart);
    
    // Update cart count
    updateCartCount();
    
    // Create order data
    const subtotal = product.price;
    const gst = Math.round(subtotal * 0.18);
    const total = subtotal + gst;
    
    const orderData = {
        cart: cart,
        pricing: {
            subtotal: subtotal,
            shipping: 0, // Will be selected on checkout page
            gst: gst,
            total: total
        }
    };

    try {
        // Save order data
        localStorage.setItem('orderData', JSON.stringify(orderData));
        console.log('Order data saved:', orderData);
        
        // Redirect to checkout page
        console.log('Redirecting to checkout page...');
        window.location.href = 'checkout.html';
    } catch (error) {
        console.error('Error processing Buy Now:', error);
        alert('There was an error processing your request. Please try again.');
    }
}

// Function to show add to cart feedback
function showAddToCartFeedback() {
    const feedback = document.createElement('div');
    feedback.className = 'add-to-cart-feedback';
    feedback.textContent = 'Added to cart!';
    feedback.style.position = 'fixed';
    feedback.style.top = '20px';
    feedback.style.right = '20px';
    feedback.style.backgroundColor = '#4CAF50';
    feedback.style.color = 'white';
    feedback.style.padding = '10px 20px';
    feedback.style.borderRadius = '5px';
    feedback.style.zIndex = '1000';
    document.body.appendChild(feedback);
    setTimeout(() => feedback.remove(), 2000);
}

// Add to cart function
function handleAddToCart(productId) {
    console.log('Adding product to cart:', productId);
    const product = products.find(p => p.id === productId);
    if (!product) {
        console.error('Product not found:', productId);
        return;
    }

    cart = JSON.parse(localStorage.getItem('cart')) || []; // Get fresh cart data
    console.log('Current cart:', cart);

    const existingItemIndex = cart.findIndex(item => item.id === productId);
    console.log('Existing item index:', existingItemIndex);

    if (existingItemIndex !== -1) {
        cart[existingItemIndex].quantity += 1;
        console.log('Updated quantity for existing item');
    } else {
        const newItem = {
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: 1,
            category: product.category,
            description: product.description
        };
        cart.push(newItem);
        console.log('Added new item to cart:', newItem);
    }

    // Save updated cart to localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
    console.log('Saved cart to localStorage:', cart);

    // Update cart count
    updateCartCount();

    // Show feedback to user
    showAddToCartFeedback();
}

// Update cart display function
function updateCartDisplay() {
    console.log('Updating cart display');
    const cartItemsContainer = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    cart = JSON.parse(localStorage.getItem('cart')) || []; // Get fresh cart data
    
    if (cartItemsContainer) {
        cartItemsContainer.innerHTML = '';
        let total = 0;

        if (cart.length === 0) {
            cartItemsContainer.innerHTML = `
                <div class="empty-cart-message">
                    Your cart is empty
                </div>
            `;
        } else {
            cart.forEach(item => {
                const itemTotal = item.price * item.quantity;
                total += itemTotal;
                
                const cartItem = document.createElement('div');
                cartItem.className = 'cart-item';
                cartItem.innerHTML = `
                    <img src="${item.image}" alt="${item.name}" class="cart-item-image">
                    <div class="cart-item-info">
                        <div class="cart-item-title">${item.name}</div>
                        <div class="cart-item-price">₹${item.price.toLocaleString('en-IN')}</div>
                        <div class="cart-item-quantity">
                            <button onclick="updateQuantity(${item.id}, -1)" class="quantity-btn">-</button>
                            <span>${item.quantity}</span>
                            <button onclick="updateQuantity(${item.id}, 1)" class="quantity-btn">+</button>
                        </div>
                    </div>
                    <div class="cart-item-total">
                        ₹${itemTotal.toLocaleString('en-IN')}
                    </div>
                    <button onclick="removeFromCart(${item.id})" class="remove-item">×</button>
                `;
                cartItemsContainer.appendChild(cartItem);
            });
        }

        // Update total
        if (cartTotal) {
            cartTotal.textContent = `₹${total.toLocaleString('en-IN')}`;
        }
        
        console.log('Cart display updated with', cart.length, 'items');
    }

    // Update cart count
    updateCartCount();
}

// Function to remove item from cart
function removeFromCart(productId) {
    console.log('Removing product from cart:', productId);
    cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart = cart.filter(item => item.id !== productId);
    localStorage.setItem('cart', JSON.stringify(cart));
    
    // Update displays
    updateCartDisplay();
    updateCartCount();
    
    // If on cart page, re-render the cart
    if (document.getElementById('cart-items-container')) {
        renderCartItems();
        updateCartSummary();
    }
}

// Function to update quantity
function updateQuantity(productId, change) {
    console.log('Updating quantity for product:', productId, 'change:', change);
    cart = JSON.parse(localStorage.getItem('cart')) || [];
    const itemIndex = cart.findIndex(item => item.id === productId);
    
    if (itemIndex !== -1) {
        cart[itemIndex].quantity = Math.max(1, cart[itemIndex].quantity + change);
        localStorage.setItem('cart', JSON.stringify(cart));
        
        // Update displays
        updateCartDisplay();
        updateCartCount();
        
        // If on cart page, re-render the cart
        if (document.getElementById('cart-items-container')) {
            renderCartItems();
            updateCartSummary();
        }
    }
}

// Initialize cart functionality
function initializeCart() {
    console.log('Initializing cart functionality');
    const cartIcon = document.getElementById('cart-icon');
    
    if (cartIcon) {
        cartIcon.style.cursor = 'pointer';
        cartIcon.addEventListener('click', () => {
            window.location.href = 'cart.html';
        });
    }

    // Initial cart count update
    updateCartCount();
}

// Initialize products page
function initializeProductsPage() {
    console.log('Initializing products page');
    const productContainer = document.getElementById('product-container');
    if (!productContainer) {
        console.error('Product container not found');
        return;
    }

    console.log('Found product container, rendering products...');
    // Initial render of all products
    renderProducts();

    // Set up category filters
    const categoryFilters = document.querySelectorAll('.category-btn');
    console.log('Setting up category filters:', categoryFilters.length, 'filters found');
    categoryFilters.forEach(filter => {
        filter.addEventListener('click', () => {
            // Remove active class from all filters
            categoryFilters.forEach(f => f.classList.remove('active'));
            // Add active class to clicked filter
            filter.classList.add('active');
            
            const category = filter.dataset.category;
            console.log('Filtering products by category:', category);
            filterProducts(category);
        });
    });

    // Set up sort options
    const sortSelect = document.getElementById('sort-select');
    if (sortSelect) {
        console.log('Setting up sort select');
        sortSelect.addEventListener('change', () => {
            const category = document.querySelector('.category-btn.active')?.dataset.category || 'all';
            console.log('Sorting products. Category:', category, 'Sort by:', sortSelect.value);
            const productsToSort = category === 'all' ? products : products.filter(p => p.category === category);
            const sortedProducts = sortProducts(productsToSort, sortSelect.value);
            renderProducts(sortedProducts);
        });
    }

    console.log('Products page initialization complete');
}

// Make functions globally available
window.handleAddToCart = handleAddToCart;
window.removeFromCart = removeFromCart;
window.updateQuantity = updateQuantity;

// Settings Panel Functions
function initializeSettingsPanel() {
    const settingsToggle = document.getElementById('settings-toggle');
    const settingsPanel = document.getElementById('settings-panel');
    const closeSettings = document.querySelector('.close-settings');
    const productGrid = document.getElementById('product-container');

    // Load saved settings
    const savedTheme = localStorage.getItem('theme') || 'light';
    const savedFontSize = localStorage.getItem('fontSize') || 'medium';
    const savedLayout = localStorage.getItem('layout') || 'grid';

    // Apply saved settings
    document.body.className = savedTheme;
    document.body.setAttribute('data-font-size', savedFontSize);
    if (productGrid) {
        productGrid.className = `product-grid ${savedLayout}-view`;
    }

    // Toggle settings panel
    settingsToggle.addEventListener('click', () => {
        settingsPanel.classList.toggle('active');
    });

    // Close settings panel
    closeSettings.addEventListener('click', () => {
        settingsPanel.classList.remove('active');
    });

    // Close settings panel when clicking outside
    document.addEventListener('click', (e) => {
        if (!settingsPanel.contains(e.target) && !settingsToggle.contains(e.target)) {
            settingsPanel.classList.remove('active');
        }
    });

    // Theme controls
    document.querySelectorAll('.theme-btn').forEach(button => {
        button.addEventListener('click', () => {
            const theme = button.dataset.theme;
            // Remove all theme classes
            document.body.classList.remove('light', 'dark', 'blue');
            // Add the selected theme class
            document.body.classList.add(theme);
            localStorage.setItem('theme', theme);
            
            // Update active state
            document.querySelectorAll('.theme-btn').forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
        });
        
        // Set initial active state
        if (button.dataset.theme === savedTheme) {
            button.classList.add('active');
        }
    });

    // Font size controls
    document.querySelectorAll('.font-btn').forEach(button => {
        button.addEventListener('click', () => {
            const size = button.dataset.size;
            document.body.setAttribute('data-font-size', size);
            localStorage.setItem('fontSize', size);
            
            // Update active state
            document.querySelectorAll('.font-btn').forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
        });
        
        // Set initial active state
        if (button.dataset.size === savedFontSize) {
            button.classList.add('active');
        }
    });

    // Layout controls
    document.querySelectorAll('.layout-btn').forEach(button => {
        button.addEventListener('click', () => {
            const layout = button.dataset.layout;
            if (productGrid) {
                productGrid.className = `product-grid ${layout}-view`;
                localStorage.setItem('layout', layout);
                
                // Update active state
                document.querySelectorAll('.layout-btn').forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
            }
        });
        
        // Set initial active state
        if (button.dataset.layout === savedLayout) {
            button.classList.add('active');
        }
    });
}

// Ensure the chat toggle functionality is correctly set up
const chatToggle = document.getElementById('chat-toggle');
const chatbotContainer = document.querySelector('.chatbot-container');

chatToggle.addEventListener('click', () => {
    chatbotContainer.classList.toggle('active');
});

// Initialize chatbot
function initializeChatbot() {
    const chatMessages = document.getElementById('chat-messages');
    const userInput = document.getElementById('user-input');
    const sendButton = document.getElementById('send-message');
    const closeBtn = document.querySelector('.close-btn');

    if (!chatToggle || !chatbotContainer || !closeBtn || !chatMessages || !userInput || !sendButton) {
        console.error('Chatbot elements not found');
        return;
    }

    // Load conversation history
    let conversationHistory = JSON.parse(localStorage.getItem('chatHistory')) || [];

    // Toggle chatbot
    chatToggle.addEventListener('click', () => {
        chatbotContainer.classList.toggle('active');
    });

    closeBtn.addEventListener('click', () => {
        chatbotContainer.classList.remove('active');
    });

    // Load previous messages
    function loadPreviousMessages() {
        chatMessages.innerHTML = '';
        conversationHistory.forEach(msg => {
            addMessage(msg.text, msg.sender);
        });
    }

    // Add message to chat
    function addMessage(text, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${sender}`;
        messageDiv.textContent = text;
        chatMessages.appendChild(messageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    // Send message
    function sendMessage() {
        const message = userInput.value.trim();
        if (message) {
            addMessage(message, 'user');
            conversationHistory.push({ text: message, sender: 'user' });
            userInput.value = '';

            // Simulate AI response
            setTimeout(() => {
                const response = getAIResponse(message);
                addMessage(response, 'ai');
                conversationHistory.push({ text: response, sender: 'ai' });
                localStorage.setItem('chatHistory', JSON.stringify(conversationHistory));
            }, 1000);
        }
    }

    // Event listeners for sending messages
    sendButton.addEventListener('click', sendMessage);
    userInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });

    // Add welcome message
    addMessage("Hello! I'm your AI shopping assistant. How can I help you today?", 'bot');
}

// Shared Order Summary Function
function updateOrderSummary(containerId, totalsId) {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const itemsContainer = document.getElementById(containerId);
    const totalsContainer = document.getElementById(totalsId);
    
    if (!itemsContainer || !totalsContainer) {
        console.error('Container not found:', containerId, totalsId);
        return;
    }
    
    let subtotal = 0;
    let itemsHTML = '';
    
    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        subtotal += itemTotal;
        itemsHTML += `
            <div class="summary-item">
                <div class="item-info">
                    <h4>${item.name}</h4>
                    <p class="item-details">
                        <span>Quantity: ${item.quantity}</span>
                        <span>Price: ₹${item.price.toLocaleString('en-IN')}</span>
                    </p>
                </div>
                <div class="item-price">₹${itemTotal.toLocaleString('en-IN')}</div>
            </div>
        `;
    });
    
    itemsContainer.innerHTML = itemsHTML;
    
    // Calculate totals
    const shipping = calculateShippingCost(document.querySelector('input[name="shipping"]:checked')?.value);
    const gst = Math.round(subtotal * 0.18); // 18% GST
    const total = subtotal + shipping + gst;
    
    totalsContainer.innerHTML = `
        <div class="subtotal">
            <span>Subtotal</span>
            <span>₹${subtotal.toLocaleString('en-IN')}</span>
        </div>
        <div class="shipping">
            <span>Shipping</span>
            <span>₹${shipping.toLocaleString('en-IN')}</span>
        </div>
        <div class="tax">
            <span>GST (18%)</span>
            <span>₹${gst.toLocaleString('en-IN')}</span>
        </div>
        <div class="total">
            <span>Total</span>
            <span>₹${total.toLocaleString('en-IN')}</span>
        </div>
    `;

    // Store pricing details in localStorage
    const pricingDetails = {
        subtotal,
        shipping,
        gst,
        total
    };
    localStorage.setItem('pricingDetails', JSON.stringify(pricingDetails));
}

// Checkout Page Functionality
function initializeCheckout() {
    console.log('Initializing checkout...');
    const checkoutForm = document.getElementById('checkout-form');
    
    if (!checkoutForm) {
        console.error('Checkout form not found');
        return;
    }

    // Load cart data
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    if (cart.length === 0) {
        console.log('Cart is empty, redirecting to cart page...');
        window.location.href = 'cart.html';
        return;
    }

    // Initial order summary update
    updateOrderSummary('checkout-items', 'summary-totals');
    
    // Setup shipping options
    const shippingOptions = document.querySelectorAll('input[name="shipping"]');
    shippingOptions.forEach(option => {
        option.addEventListener('change', () => {
            updateOrderSummary('checkout-items', 'summary-totals');
        });
    });
    
    setupPincodeValidation();
    
    // Handle form submission
    checkoutForm.addEventListener('submit', handleCheckoutSubmission);
}

function calculateShippingCost(method) {
    switch(method) {
        case 'express':
            return 99;
        case 'same-day':
            return 199;
        default: // standard
            return 0;
    }
}

function setupPincodeValidation() {
    const pincodeInput = document.getElementById('pincode');
    if (!pincodeInput) return;

    pincodeInput.addEventListener('input', function() {
        const pincode = this.value;
        if (pincode.length === 6 && /^[1-9][0-9]{5}$/.test(pincode)) {
            this.setCustomValidity('');
        } else {
            this.setCustomValidity('Please enter a valid 6-digit PIN code');
        }
    });
}

// Handle checkout submission
function handleCheckoutSubmission(e) {
    e.preventDefault();
    console.log('Processing checkout submission...');
    
    // Get form data
    const formData = new FormData(e.target);
    
    // Get cart data
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    if (cart.length === 0) {
        alert('Your cart is empty!');
        return;
    }
    
    // Validate required fields
    const requiredFields = ['firstName', 'lastName', 'email', 'phone', 'address', 'city', 'state', 'pincode'];
    const missingFields = requiredFields.filter(field => !formData.get(field));
    
    if (missingFields.length > 0) {
        alert('Please fill in all required fields: ' + missingFields.join(', '));
        return;
    }

    // Calculate totals
    let subtotal = 0;
    cart.forEach(item => {
        subtotal += item.price * item.quantity;
    });
    
    const shippingMethod = formData.get('shipping') || 'standard';
    const shipping = calculateShippingCost(shippingMethod);
    const gst = Math.round(subtotal * 0.18);
    const total = subtotal + shipping + gst;
    
    // Create order data
    const orderData = {
        contact: {
            firstName: formData.get('firstName'),
            lastName: formData.get('lastName'),
            email: formData.get('email'),
            phone: formData.get('phone')
        },
        shipping: {
            address: formData.get('address'),
            landmark: formData.get('landmark') || '',
            locality: formData.get('locality') || '',
            city: formData.get('city'),
            state: formData.get('state'),
            pincode: formData.get('pincode'),
            method: shippingMethod
        },
        cart: cart,
        pricing: {
            subtotal: subtotal,
            shipping: shipping,
            gst: gst,
            total: total
        },
        timestamp: new Date().toISOString()
    };

    try {
        // Save order data
        localStorage.setItem('orderData', JSON.stringify(orderData));
        console.log('Order data saved:', orderData);
        
        // Redirect to payment page
        window.location.href = 'payment.html';
    } catch (error) {
        console.error('Error saving order data:', error);
        alert('There was an error processing your order. Please try again.');
        console.error('Error processing payment:', error);
        alert('There was an error processing your request. Please try again.');
    }
}

// Payment Page Functionality
function initializePayment() {
    console.log('Initializing payment page...');
    const paymentContainer = document.querySelector('.payment-container');
    if (!paymentContainer) {
        console.log('Payment container not found');
        return;
    }

    // Load order data
    const orderData = JSON.parse(localStorage.getItem('orderData'));
    if (!orderData) {
        console.log('No order data found, redirecting to cart...');
        window.location.href = 'cart.html';
        return;
    }

    // Update order summary
    updateOrderSummary('summary-items', 'summary-totals');

    // Setup payment tabs
    setupPaymentTabs();
    
    // Setup PayPal
    setupPayPalButton();
    
    // Setup card form
    setupCardForm();
}

function setupPaymentTabs() {
    const tabs = document.querySelectorAll('.tab-btn');
    const contents = document.querySelectorAll('.tab-content');

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Remove active class from all tabs and contents
            tabs.forEach(t => t.classList.remove('active'));
            contents.forEach(c => c.classList.remove('active'));

            // Add active class to clicked tab and corresponding content
            tab.classList.add('active');
            const content = document.getElementById(`${tab.dataset.tab}-tab`);
            if (content) content.classList.add('active');
        });
    });
}

function setupPayPalButton() {
    const paypalContainer = document.getElementById('paypal-button-container');
    if (!paypalContainer) return;

    const orderData = JSON.parse(localStorage.getItem('orderData'));
    if (!orderData) return;

    paypal.Buttons({
        createOrder: (data, actions) => {
            return actions.order.create({
                purchase_units: [{
                    amount: {
                        currency_code: 'INR',
                        value: (orderData.pricing.total / 100).toFixed(2) // Convert from paise to rupees
                    }
                }]
            });
        },
        onApprove: (data, actions) => {
            return actions.order.capture().then(function(details) {
                handlePaymentSuccess('paypal', details.id);
            });
        },
        onError: (err) => {
            console.error('PayPal error:', err);
            alert('There was an error processing your PayPal payment. Please try again.');
        }
    }).render('#paypal-button-container');
}

function setupCardForm() {
    const cardForm = document.getElementById('card-payment-form');
    if (!cardForm) return;

    const cardNumber = document.getElementById('card-number');
    const expiry = document.getElementById('expiry');
    const cvv = document.getElementById('cvv');

    // Format card number
    cardNumber?.addEventListener('input', (e) => {
        let value = e.target.value.replace(/\D/g, '');
        e.target.value = value.replace(/(\d{4})(?=\d)/g, '$1 ').trim();
    });

    // Format expiry date
    expiry?.addEventListener('input', (e) => {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length > 2) {
            value = value.slice(0,2) + '/' + value.slice(2,4);
        }
        e.target.value = value;
    });

    // Format CVV
    cvv?.addEventListener('input', (e) => {
        let value = e.target.value.replace(/\D/g, '');
        e.target.value = value;
    });

    // Handle form submission
    cardForm.addEventListener('submit', (e) => {
        e.preventDefault();
        processCardPayment();
    });
}

function processCardPayment() {
    const cardNumber = document.getElementById('card-number')?.value.replace(/\s/g, '');
    const expiry = document.getElementById('expiry')?.value;
    const cvv = document.getElementById('cvv')?.value;
    const cardName = document.getElementById('card-name')?.value;

    // Validate inputs
    if (!cardNumber || !expiry || !cvv || !cardName) {
        alert('Please fill in all card details');
        return;
    }

    // Basic validation
    if (!/^\d{16}$/.test(cardNumber)) {
        alert('Please enter a valid 16-digit card number');
        return;
    }

    if (!/^\d{2}\/\d{2}$/.test(expiry)) {
        alert('Please enter a valid expiry date (MM/YY)');
        return;
    }

    const [month, year] = expiry.split('/');
    const now = new Date();
    const currentYear = now.getFullYear() % 100;
    const currentMonth = now.getMonth() + 1;

    if (parseInt(year) < currentYear || 
        (parseInt(year) === currentYear && parseInt(month) < currentMonth) ||
        parseInt(month) > 12) {
        alert('Please enter a valid expiry date');
        return;
    }

    if (!/^\d{3}$/.test(cvv)) {
        alert('Please enter a valid 3-digit CVV');
        return;
    }

    // Disable the submit button and show processing state
    const submitButton = document.querySelector('.pay-button');
    submitButton.disabled = true;
    submitButton.textContent = 'Processing...';

    // Simulate payment processing
    simulatePayment();
}

function simulatePayment() {
    // In a real application, this would make an API call to your payment processor
    setTimeout(() => {
        const transactionId = 'CARD_' + Date.now();
        handlePaymentSuccess('card', transactionId);
    }, 2000);
}

function handlePaymentSuccess(method, transactionId) {
    const orderData = JSON.parse(localStorage.getItem('orderData'));
    if (!orderData) {
        console.error('No order data found');
        alert('There was an error processing your payment. Please try again.');
        return;
    }

    // Create final order details
    const orderDetails = {
        ...orderData,
        payment: {
            method: method,
            transactionId: transactionId,
            amount: orderData.pricing.total,
            currency: 'INR',
            status: 'completed',
            timestamp: new Date().toISOString()
        },
        status: 'confirmed',
        orderId: 'ORD' + Date.now()
    };

    try {
        // Save to order history
        const orderHistory = JSON.parse(localStorage.getItem('orderHistory')) || [];
        orderHistory.push(orderDetails);
        localStorage.setItem('orderHistory', JSON.stringify(orderHistory));

        // Clear cart and order data
        localStorage.removeItem('cart');
        localStorage.removeItem('orderData');

        // Show success message
        alert('Payment successful! Your order has been placed.');

        // Redirect to order confirmation
        window.location.href = 'order-confirmation.html';
    } catch (error) {
        console.error('Error saving order:', error);
        alert('Payment successful, but there was an error saving your order. Please contact support.');
    }
}

// Function to render cart items
function renderCartItems() {
    console.log('Rendering cart items');
    const cartContainer = document.getElementById('cart-items-large');
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    if (!cartContainer) {
        console.error('Cart items container not found');
        return;
    }

    if (cart.length === 0) {
        cartContainer.innerHTML = `
            <div class="empty-cart">
                <h3>Your cart is empty</h3>
                <p>Browse our products and add items to your cart</p>
                <a href="products.html" class="continue-shopping">Continue Shopping</a>
            </div>
        `;
        updateCartSummary(0, 0, 0);
        return;
    }

    let cartHTML = '';
    let subtotal = 0;

    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        subtotal += itemTotal;

        cartHTML += `
            <div class="cart-item-large" data-id="${item.id}">
                <div class="item-image">
                    <img src="${item.image}" alt="${item.name}">
                </div>
                <div class="item-details">
                    <h3>${item.name}</h3>
                    <p class="item-price">₹${item.price.toLocaleString('en-IN')}</p>
                    <div class="quantity-controls">
                        <button class="quantity-btn minus" onclick="updateQuantity(${item.id}, -1)">-</button>
                        <span class="quantity">${item.quantity}</span>
                        <button class="quantity-btn plus" onclick="updateQuantity(${item.id}, 1)">+</button>
                    </div>
                    <button class="remove-item" onclick="removeFromCart(${item.id})">Remove</button>
                </div>
                <div class="item-total">
                    ₹${itemTotal.toLocaleString('en-IN')}
                </div>
            </div>
        `;
    });

    cartContainer.innerHTML = cartHTML;

    // Calculate and update summary
    const gst = Math.round(subtotal * 0.18); // 18% GST
    const total = subtotal + gst;
    updateCartSummary(subtotal, gst, total);
}

// Update cart summary amounts
function updateCartSummary(subtotal, gst, total) {
    const subtotalElement = document.getElementById('subtotal-amount');
    const taxElement = document.getElementById('tax-amount');
    const totalElement = document.getElementById('total-amount');

    if (subtotalElement) subtotalElement.textContent = `₹${subtotal.toLocaleString('en-IN')}`;
    if (taxElement) taxElement.textContent = `₹${gst.toLocaleString('en-IN')}`;
    if (totalElement) totalElement.textContent = `₹${total.toLocaleString('en-IN')}`;
}

// Initialize cart page
function initializeCartPage() {
    console.log('Initializing cart page');
    renderCartItems();
    
    // Setup checkout button
    const checkoutBtn = document.getElementById('proceed-to-checkout');
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', () => {
            const cart = JSON.parse(localStorage.getItem('cart')) || [];
            if (cart.length === 0) {
                alert('Your cart is empty!');
                return;
            }
            window.location.href = 'checkout.html';
        });
    }
}

// Update the cart icon to link to cart page
function updateCartIcon() {
    const cartIcon = document.getElementById('cart-icon');
    if (cartIcon) {
        cartIcon.style.cursor = 'pointer';
        cartIcon.addEventListener('click', () => {
            window.location.href = 'cart.html';
        });
    }
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    console.log('Initializing application');
    
    // Initialize all functionality
    initializeSettingsPanel();
    initializeCart();
    
    // Initialize products page
    if (window.location.pathname.includes('products.html') || window.location.pathname.endsWith('/')) {
        console.log('On products page - rendering products');
        initializeProductsPage();
    }
    
    if (window.location.pathname.includes('payment.html')) {
        console.log('On payment page - initializing payment methods');
        setupPayPalButton();
        setupCardForm();
    }
    
    if (window.location.pathname.includes('checkout.html')) {
        console.log('On checkout page - initializing checkout');
        initializeCheckout();
    }
    
    if (window.location.pathname.includes('cart.html')) {
        console.log('On cart page - initializing cart page');
        initializeCartPage();
    }
    
    // Update cart count
    updateCartCount();
    
    // Initialize AOS animations
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            once: true,
            offset: 100
        });
    }
    
    console.log('Application initialization complete');
});

// Make functions globally available
window.handleAddToCart = handleAddToCart;
window.removeFromCart = removeFromCart;
window.updateQuantity = updateQuantity;
window.handleBuyNow = handleBuyNow; 