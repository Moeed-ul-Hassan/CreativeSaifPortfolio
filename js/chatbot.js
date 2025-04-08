// ==================== Chat Bot Implementation ====================

// Chat bot elements
const chatMessages = document.querySelector('.chat-messages');
const userMessageInput = document.getElementById('user-message');
const sendMessageBtn = document.getElementById('send-message');

// Bot responses data
const botResponses = {
    // Greeting patterns
    greetings: [
        { pattern: /^(hello|hi|hey|howdy|greetings)/i, responses: [
            "Hello! I'm Prof Saifullah's assistant. How can I help you today?",
            "Hi there! How can I assist you regarding Prof Saifullah's services?",
            "Hey! What would you like to know about Prof Saifullah?"
        ]},
        
        // Service/work related patterns
        { pattern: /portfolio|work|project|writing|sample/i, responses: [
            "Prof Saifullah has an extensive portfolio of content writing work ranging from articles to copywriting. Is there a specific type of content you're interested in?",
            "Prof Saifullah specializes in various forms of content writing including articles, blog posts, and compelling copy. Would you like to know more about a specific area?",
            "In his portfolio, you'll find examples of academic writing, blog posts, articles, and marketing copy. Which area interests you most?"
        ]},
        
        // Contact related patterns
        { pattern: /contact|reach|email|call|hire|services/i, responses: [
            "You can contact Prof Saifullah through the contact form on this website, or by sending an email to contact@saifullahkhalid.com",
            "The best way to reach Prof Saifullah is through the contact form in the Contact section. Would you like me to guide you there?",
            "To discuss potential projects or collaborations, please use the contact form or send an email to contact@saifullahkhalid.com"
        ]},
        
        // Education/background related patterns
        { pattern: /education|degree|qualification|background|experience/i, responses: [
            "Prof Saifullah has a Master's degree in English. He has extensive experience in content writing and has worked with numerous clients across various industries.",
            "With a Master's in English, Prof Saifullah has developed strong linguistic skills that he applies to his content writing. His experience spans several years in the field.",
            "Prof Saifullah's educational background includes a Master's in English, which has equipped him with advanced language skills that enhance his content writing."
        ]},
        
        // Skills related patterns
        { pattern: /skill|expert|specialt|ability/i, responses: [
            "Prof Saifullah specializes in content writing, copywriting, SEO, research, and editing. Is there a specific skill you'd like to know more about?",
            "His core skills include content creation, copywriting, SEO optimization, thorough research, and precise editing. Which of these interests you most?",
            "Prof Saifullah is known for his content writing, copywriting, SEO expertise, research capabilities, and editing precision. How can these skills help your project?"
        ]},
        
        // About related patterns
        { pattern: /about|who|info/i, responses: [
            "Prof Saifullah Khalid is a content writer with a Master's in English. He specializes in creating engaging and effective content across various domains.",
            "Prof Saifullah is a professional content writer who transforms complex ideas into clear, engaging content that resonates with diverse audiences.",
            "As a content writer with strong skills and an academic background in English, Prof Saifullah helps clients communicate effectively through quality writing."
        ]},
        
        // Pricing related patterns
        { pattern: /price|cost|rate|fee|charges|how much/i, responses: [
            "Pricing varies depending on the project scope, complexity, and timeline. For a personalized quote, please use the contact form to describe your project.",
            "Each project is unique, so pricing is customized based on specific requirements. Would you like to submit an inquiry through the contact form?",
            "To get an accurate quote for your project, please reach out through the contact form with details about your needs and timeline."
        ]},
        
        // Process related patterns
        { pattern: /process|how do you work|steps|approach/i, responses: [
            "Prof Saifullah's process typically involves understanding client requirements, research, drafting, revisions, and final delivery. Would you like more details about any particular stage?",
            "The writing process begins with a thorough understanding of your needs, followed by research, writing, editing, and revisions until you're satisfied with the final result.",
            "Prof Saifullah follows a structured approach: consultation, research, writing, editing, and revisions. This ensures high-quality content that meets your objectives."
        ]},
        
        // Feedback related patterns
        { pattern: /feedback|review|testimonial/i, responses: [
            "Prof Saifullah has received positive feedback from clients across various industries. Many appreciate his attention to detail and ability to capture their brand voice.",
            "Clients often praise Prof Saifullah's ability to deliver well-researched, engaging content that effectively communicates their message.",
            "The testimonials from previous clients highlight Prof Saifullah's professionalism, quality of work, and ability to meet deadlines."
        ]},
        
        // Timeline related patterns
        { pattern: /time|deadline|duration|how long|turnaround/i, responses: [
            "Project timelines vary based on scope and complexity. Prof Saifullah always aims to meet agreed deadlines and communicates proactively about progress.",
            "Turnaround times depend on the project requirements and current workload. For urgent projects, please mention this in your initial inquiry.",
            "Prof Saifullah works efficiently to deliver quality content within agreed timeframes. Specific timelines can be discussed during the initial consultation."
        ]},
        
        // Thank you patterns
        { pattern: /thank|thanks/i, responses: [
            "You're welcome! Is there anything else I can help you with?",
            "My pleasure! Do you have any other questions about Prof Saifullah's services?",
            "No problem at all! Feel free to ask if you need any more information."
        ]},
        
        // Goodbye patterns
        { pattern: /bye|goodbye|see you|farewell/i, responses: [
            "Goodbye! Feel free to return if you have more questions.",
            "Thanks for chatting. Have a great day!",
            "Bye! Don't hesitate to reach out if you need further assistance."
        ]},
        
        // Default responses for unrecognized inquiries
        { pattern: /.*/, responses: [
            "I'm not sure I understand your question. Could you rephrase it, or ask about Prof Saifullah's services, portfolio, or contact information?",
            "I might need more information to assist you properly. Would you like to know about Prof Saifullah's services, background, or how to contact him?",
            "I apologize, but I'm not sure how to respond to that. Is there something specific about Prof Saifullah's content writing services that interests you?"
        ]}
    ]
};

// Function to add a message to the chat
function addMessage(text, isUser = false) {
    const messageElement = document.createElement('div');
    messageElement.classList.add('message');
    messageElement.classList.add(isUser ? 'user' : 'bot');
    
    const messageText = document.createElement('p');
    messageText.textContent = text;
    
    messageElement.appendChild(messageText);
    chatMessages.appendChild(messageElement);
    
    // Scroll to the bottom of the chat
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Function to generate a bot response based on user input
function getBotResponse(userMessage) {
    // Convert to lowercase for easier matching
    const message = userMessage.toLowerCase();
    
    // Check against each pattern in our responses
    for (const category of botResponses.greetings) {
        if (category.pattern.test(message)) {
            // Return a random response from the matching category
            const randomIndex = Math.floor(Math.random() * category.responses.length);
            return category.responses[randomIndex];
        }
    }
    
    // If no match is found, return a default response
    const defaultResponses = [
        "I'm not sure I understand. Could you please rephrase your question?",
        "That's interesting, but could you provide more context so I can help better?",
        "I'd like to help, but I need more information about what you're looking for."
    ];
    
    const randomIndex = Math.floor(Math.random() * defaultResponses.length);
    return defaultResponses[randomIndex];
}

// Function to handle sending a message
function sendMessage() {
    const userMessage = userMessageInput.value.trim();
    
    // Don't send empty messages
    if (!userMessage) return;
    
    // Add user message to chat
    addMessage(userMessage, true);
    
    // Clear input field
    userMessageInput.value = '';
    
    // Simulate bot "typing" with a slight delay
    setTimeout(() => {
        const botResponse = getBotResponse(userMessage);
        addMessage(botResponse);
    }, 500 + Math.random() * 1000); // Random delay between 500ms and 1500ms
}

// Event listeners for sending messages
sendMessageBtn.addEventListener('click', sendMessage);

userMessageInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        sendMessage();
    }
});

// Initialize chatbot with a welcome message
document.addEventListener('DOMContentLoaded', () => {
    // Wait a moment before showing the initial message
    setTimeout(() => {
        addMessage("Hello! I'm Prof Saifullah's virtual assistant. How can I help you today?");
    }, 500);
});

// Add "thinking" animation when bot is responding
function showBotTyping() {
    const typingElement = document.createElement('div');
    typingElement.classList.add('message', 'bot', 'typing');
    
    const typingDots = document.createElement('div');
    typingDots.classList.add('typing-dots');
    
    for (let i = 0; i < 3; i++) {
        const dot = document.createElement('span');
        typingDots.appendChild(dot);
    }
    
    typingElement.appendChild(typingDots);
    chatMessages.appendChild(typingElement);
    
    // Scroll to the bottom
    chatMessages.scrollTop = chatMessages.scrollHeight;
    
    return typingElement;
}

// Enhanced send message with typing indicator
function sendMessageWithTyping() {
    const userMessage = userMessageInput.value.trim();
    
    // Don't send empty messages
    if (!userMessage) return;
    
    // Add user message to chat
    addMessage(userMessage, true);
    
    // Clear input field
    userMessageInput.value = '';
    
    // Show typing indicator
    const typingElement = showBotTyping();
    
    // Simulate bot "thinking" with a slight delay
    setTimeout(() => {
        // Remove typing indicator
        typingElement.remove();
        
        // Add bot response
        const botResponse = getBotResponse(userMessage);
        addMessage(botResponse);
    }, 1000 + Math.random() * 1500); // Random delay between 1000ms and 2500ms
}

// Update event listeners to use the new function
sendMessageBtn.addEventListener('click', sendMessageWithTyping);

userMessageInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        sendMessageWithTyping();
    }
});
