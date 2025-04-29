import * as THREE from 'three';
import { gsap } from 'gsap';

// Initialize 3D scene
function init3DScene() {
    const container = document.getElementById('3d-container');
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true });

    renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(renderer.domElement);

    const geometry = new THREE.BoxGeometry();
    const material = new THREE.MeshPhongMaterial({ 
        color: 0x4a90e2,
        specular: 0x111111,
        shininess: 30
    });
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0xffffff, 1);
    pointLight.position.set(10, 10, 10);
    scene.add(pointLight);

    camera.position.z = 5;

    function animate() {
        requestAnimationFrame(animate);
        cube.rotation.x += 0.01;
        cube.rotation.y += 0.01;
        renderer.render(scene, camera);
    }
    animate();
}

// Initialize products
function initProducts() {
    const products = [
        {
            id: 1,
            name: "Smart Watch Pro",
            price: 299.99,
            image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&h=500&fit=crop",
            description: "Advanced smartwatch with health monitoring",
            category: "Electronics",
            rating: 4.8,
            reviews: 125
        },
        {
            id: 2,
            name: "Wireless Earbuds",
            price: 149.99,
            image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop",
            description: "Premium wireless earbuds with noise cancellation",
            category: "Audio",
            rating: 4.6,
            reviews: 89
        },
        {
            id: 3,
            name: "Gaming Laptop",
            price: 1299.99,
            image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500&h=500&fit=crop",
            description: "High-performance gaming laptop",
            category: "Computers",
            rating: 4.9,
            reviews: 45
        }
    ];

    const container = document.getElementById('product-container');
    container.innerHTML = products.map(product => `
        <div class="product-card">
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}">
                <div class="product-category">${product.category}</div>
            </div>
            <div class="product-info">
                <h3>${product.name}</h3>
                <p class="product-description">${product.description}</p>
                <div class="product-rating">
                    ${'★'.repeat(Math.floor(product.rating))}${'☆'.repeat(5 - Math.floor(product.rating))}
                    <span class="reviews">(${product.reviews} reviews)</span>
                </div>
                <p class="price">$${product.price}</p>
                <div class="product-actions">
                    <button class="buy-now" data-id="${product.id}">Buy Now</button>
                    <button class="add-to-cart" data-id="${product.id}">Add to Cart</button>
                </div>
            </div>
        </div>
    `).join('');

    // Add event listeners for product actions
    document.querySelectorAll('.buy-now').forEach(button => {
        button.addEventListener('click', () => {
            const productId = button.dataset.id;
            const product = products.find(p => p.id === parseInt(productId));
            alert(`Proceeding to checkout for ${product.name}`);
        });
    });

    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', () => {
            const productId = button.dataset.id;
            const product = products.find(p => p.id === parseInt(productId));
            alert(`Added ${product.name} to cart!`);
        });
    });
}

// Initialize settings panel
function initSettingsPanel() {
    const settingsPanel = document.getElementById('settings-panel');
    const settingsToggle = document.getElementById('settings-toggle');
    const closeSettings = document.querySelector('.close-settings');

    settingsToggle.addEventListener('click', () => {
        settingsPanel.classList.toggle('active');
    });

    closeSettings.addEventListener('click', () => {
        settingsPanel.classList.remove('active');
    });

    // Theme controls
    document.querySelectorAll('.theme-btn').forEach(button => {
        button.addEventListener('click', () => {
            const theme = button.dataset.theme;
            document.body.setAttribute('data-theme', theme);
            localStorage.setItem('theme', theme);
        });
    });

    // Font size controls
    document.querySelectorAll('.font-btn').forEach(button => {
        button.addEventListener('click', () => {
            const size = button.dataset.size;
            document.documentElement.style.setProperty('--font-size', 
                size === 'small' ? '14px' : 
                size === 'medium' ? '16px' : '18px'
            );
            localStorage.setItem('fontSize', size);
        });
    });

    // Layout controls
    document.querySelectorAll('.layout-btn').forEach(button => {
        button.addEventListener('click', () => {
            const layout = button.dataset.layout;
            const productGrid = document.querySelector('.product-grid');
            if (layout === 'list') {
                productGrid.classList.add('list-view');
            } else {
                productGrid.classList.remove('list-view');
            }
            localStorage.setItem('layout', layout);
        });
    });

    // Load saved settings
    const savedTheme = localStorage.getItem('theme') || 'light';
    const savedFontSize = localStorage.getItem('fontSize') || 'medium';
    const savedLayout = localStorage.getItem('layout') || 'grid';

    document.body.setAttribute('data-theme', savedTheme);
    document.documentElement.style.setProperty('--font-size', 
        savedFontSize === 'small' ? '14px' : 
        savedFontSize === 'medium' ? '16px' : '18px'
    );
    if (savedLayout === 'list') {
        document.querySelector('.product-grid').classList.add('list-view');
    }
}

// Initialize chatbot
function initChatbot() {
    const chatMessages = document.getElementById('chat-messages');
    const userInput = document.getElementById('user-input');
    const sendButton = document.getElementById('send-message');
    const closeChat = document.querySelector('.close-chat');
    const chatToggle = document.getElementById('chat-toggle');
    const chatContainer = document.querySelector('.chatbot-container');

    function toggleChat() {
        const isVisible = chatContainer.style.display !== 'none';
        chatContainer.style.display = isVisible ? 'none' : 'block';
    }

    function addMessage(text, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${sender}`;
        messageDiv.textContent = text;
        chatMessages.appendChild(messageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    function getAIResponse(message) {
        const lowerMessage = message.toLowerCase();
        
        if (lowerMessage.includes('hello') || lowerMessage.includes('hi')) {
            return "Hello! How can I help you with your shopping today?";
        }
        if (lowerMessage.includes('product') || lowerMessage.includes('item')) {
            return "We have several products available. You can browse our collection in the featured products section.";
        }
        if (lowerMessage.includes('price') || lowerMessage.includes('cost')) {
            return "Our products range from $149.99 to $1299.99. Which product are you interested in?";
        }
        if (lowerMessage.includes('watch')) {
            return "Our Smart Watch Pro is a premium device with health monitoring features. It's priced at $299.99.";
        }
        if (lowerMessage.includes('earbud') || lowerMessage.includes('headphone')) {
            return "Our Wireless Earbuds offer premium sound quality and noise cancellation. They're available for $149.99.";
        }
        if (lowerMessage.includes('laptop')) {
            return "The Gaming Laptop is a high-performance machine perfect for gaming and professional work. It's priced at $1299.99.";
        }
        
        return "I'm here to help you with any questions about our products. You can ask about specific products, prices, or features.";
    }

    function sendMessage() {
        const message = userInput.value.trim();
        if (!message) return;

        addMessage(message, 'user');
        userInput.value = '';

        const response = getAIResponse(message);
        setTimeout(() => {
            addMessage(response, 'bot');
        }, 500);
    }

    sendButton.addEventListener('click', sendMessage);
    userInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') sendMessage();
    });

    closeChat.addEventListener('click', toggleChat);
    chatToggle.addEventListener('click', () => {
        if (chatContainer.style.display === 'none') {
            chatContainer.style.display = 'block';
        } else {
            chatContainer.style.display = 'none';
        }
    });

    // Add welcome message
    addMessage("Hello! I'm your AI shopping assistant. How can I help you today?", 'bot');
}

// Initialize everything when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    init3DScene();
    initProducts();
    initSettingsPanel();
    initChatbot();
}); 