document.addEventListener('DOMContentLoaded', () => {
    const chatToggle = document.getElementById('chat-toggle');
    const chatbotContainer = document.querySelector('.chatbot-container');
    const closeBtn = document.querySelector('.close-btn');
    const chatMessages = document.querySelector('.chat-messages');
    const userInput = document.querySelector('.chat-input input');
    const sendButton = document.getElementById('send-message');

    // Remove default activation for production
    // chatbotContainer.classList.add('active');

    if (chatToggle) {
        chatToggle.addEventListener('click', () => {
            chatbotContainer.classList.toggle('active');
            console.log('Chatbot toggled:', chatbotContainer.classList.contains('active'));
        });
    } else {
        console.error('Chat toggle button not found');
    }

    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            chatbotContainer.classList.remove('active');
            console.log('Chatbot closed');
        });
    } else {
        console.error('Close button not found');
    }

    if (sendButton) {
        sendButton.addEventListener('click', sendMessage);
    } else {
        console.error('Send button not found');
    }

    if (userInput) {
        userInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') sendMessage();
        });
    } else {
        console.error('User input field not found');
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
}); 