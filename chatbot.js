// ==============================================
// CHATBOT INTEGRATION USING GPT-4-MINI WITH RAG
// ==============================================
// Hey there! This is a RAG (Retrieval Augmented Generation) chatbot
// that uses OpenAI's GPT-4o-mini model to answer questions about me - aakulya
// RAG means it looks up information from a knowledge base (data.txt)
// and uses that to give accurate answers!
// 
// API Key is loaded from config.js for better security practice

// This variable will store all the information about Yaakulya
// We use it as a cache so we don't need to fetch the data every time
let knowledgeBase = null;

// ==============================================
// INITIALIZATION - WHEN THE PAGE LOADS
// ==============================================
// This runs when the HTML document is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    // First, we create the chat button that users will click to open the chat
    // We're creating this element through JavaScript instead of HTML
    const chatButton = document.createElement('div');
    chatButton.className = 'chat-button'; // This connects to our CSS styles
    chatButton.innerHTML = '<i class="fas fa-comment-dots"></i><span>Chat with Yaakulya\'s AI</span>';
    document.body.appendChild(chatButton); // Add the button to the page

    // Now we create the actual chat window container
    // This stays hidden until the user clicks the button
    const chatContainer = document.createElement('div');
    chatContainer.className = 'chat-container';
    // We use template literals (backticks) to create the HTML structure
    chatContainer.innerHTML = `
        <div class="chat-header">
            <div class="chat-title">Ask me anything about Yaakulya</div>
            <div class="chat-close"><i class="fas fa-times"></i></div>
        </div>
        <div class="chat-messages"></div>
        <div class="chat-input-container">
            <input type="text" class="chat-input" placeholder="Type your question here...">
            <button class="chat-send"><i class="fas fa-paper-plane"></i></button>
        </div>
    `;
    document.body.appendChild(chatContainer); // Add the chat container to the page

    // ==============================================
    // EVENT LISTENERS - MAKING THE CHAT INTERACTIVE
    // ==============================================
    // When the chat button is clicked, show/hide the chat window
    chatButton.addEventListener('click', toggleChat);
    
    // When the close button is clicked, hide the chat window
    document.querySelector('.chat-close').addEventListener('click', toggleChat);
    
    // Allow users to send messages by pressing Enter key
    document.querySelector('.chat-input').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });
    
    // Allow users to send messages by clicking the send button
    document.querySelector('.chat-send').addEventListener('click', sendMessage);

    // Add welcome message to start the conversation
    addMessage('bot', 'Hello! 👋 I\'m an AI assistant trained and deployed by Yaakulya. You can ask anything about him, and I\'ll give my best to answer! For starters, you can ask me about his GPA this semester.');

    // Load the information about Yaakulya when the chat initializes
    loadKnowledgeBase();
});

// ==============================================
// TOGGLE CHAT - SHOW/HIDE THE CHAT WINDOW
// ==============================================
// This function handles showing and hiding the chat window
function toggleChat() {
    const chatContainer = document.querySelector('.chat-container');
    const chatButton = document.querySelector('.chat-button');
    
    // If the chat is open, close it. If it's closed, open it.
    if (chatContainer.classList.contains('active')) {
        chatContainer.classList.remove('active');
        chatButton.classList.remove('hidden');
    } else {
        chatContainer.classList.add('active');
        chatButton.classList.add('hidden');
        // Automatically focus the input field when the chat opens
        // The setTimeout gives the animation time to complete
        setTimeout(() => {
            document.querySelector('.chat-input').focus();
        }, 300);
    }
}

// ==============================================
// LOAD KNOWLEDGE BASE - GET INFO ABOUT YAAKULYA
// ==============================================
// This function fetches the data.txt file which contains
// all the information about Yaakulya
async function loadKnowledgeBase() {
    try {
        // Use fetch API to get the data.txt file
        const response = await fetch('data.txt');
        // Check if the file was found
        if (!response.ok) {
            throw new Error('Failed to load knowledge base');
        }
        // Store the text content of the file
        knowledgeBase = await response.text();
        console.log('Knowledge base loaded successfully');
    } catch (error) {
        // If there's an error, log it and inform the user
        console.error('Error loading knowledge base:', error);
        addMessage('bot', 'I\'m having trouble accessing my knowledge base. Please try again later.');
    }
}

// ==============================================
// SEND MESSAGE - HANDLE USER INPUT
// ==============================================
// This function is called when the user sends a message
function sendMessage() {
    // Get the input element and the message text
    const inputElement = document.querySelector('.chat-input');
    const userMessage = inputElement.value.trim();
    
    // Don't do anything if the message is empty
    if (userMessage === '') return;
    
    // Clear the input field after sending
    inputElement.value = '';
    
    // Add the user's message to the chat
    addMessage('user', userMessage);
    
    // Show the typing indicator (the animated dots)
    showTypingIndicator();
    
    // Process the message with the GPT model
    processMessageWithGPT(userMessage);
}

// ==============================================
// ADD MESSAGE - DISPLAY MESSAGES IN THE CHAT
// ==============================================
// This function adds a message to the chat window
function addMessage(sender, message) {
    // Get the container where messages are displayed
    const messagesContainer = document.querySelector('.chat-messages');
    
    // Create a new message element
    const messageElement = document.createElement('div');
    messageElement.className = `chat-message ${sender}-message`;
    
    // Format the message content
    let formattedMessage = message;
    
    // If it's a bot message, convert URLs to clickable links
    if (sender === 'bot') {
        // This regex finds URLs in the text and the replace function
        // converts them to <a> tags (clickable links)
        formattedMessage = formattedMessage.replace(
            /(https?:\/\/[^\s]+)/g, 
            '<a href="$1" target="_blank" rel="noopener noreferrer">$1</a>'
        );
    }
    
    // Set the HTML content of the message
    messageElement.innerHTML = formattedMessage;
    messagesContainer.appendChild(messageElement);
    
    // Automatically scroll to the newest message
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

// ==============================================
// TYPING INDICATOR - SHOW THE BOT IS "TYPING"
// ==============================================
// This creates the animated dots to show the bot is working
function showTypingIndicator() {
    const messagesContainer = document.querySelector('.chat-messages');
    
    // Create the typing indicator element
    const typingIndicator = document.createElement('div');
    typingIndicator.className = 'typing-indicator';
    typingIndicator.innerHTML = '<span></span><span></span><span></span>';
    
    // Add it to the chat
    messagesContainer.appendChild(typingIndicator);
    
    // Scroll to make sure it's visible
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

// ==============================================
// REMOVE TYPING INDICATOR
// ==============================================
// This removes the typing animation when the response is ready
function removeTypingIndicator() {
    const typingIndicator = document.querySelector('.typing-indicator');
    if (typingIndicator) {
        typingIndicator.remove();
    }
}

// ==============================================
// PROCESS MESSAGE WITH GPT - THE AI MAGIC HAPPENS HERE!
// ==============================================
// This function sends the user's message to the OpenAI API
// and gets a response based on the knowledge base
async function processMessageWithGPT(userMessage) {
    // First, make sure we have the knowledge base loaded
    if (!knowledgeBase) {
        await loadKnowledgeBase();
        if (!knowledgeBase) {
            removeTypingIndicator();
            addMessage('bot', 'I\'m having trouble accessing information about Yaakulya. Please try again later.');
            return;
        }
    }
    
    try {
        // Check if API access is configured
        const apiAccess = CONFIG.getApiAccess();
        
        if (!apiAccess.isConfigured) {
            removeTypingIndicator();
            addMessage('bot', CONFIG.API_UNAVAILABLE_MESSAGE);
            return;
        }
        
        // Create a system prompt with instructions for the AI
        // This helps the AI understand its role and how to respond
        const systemPrompt = `You are an AI assistant trained and deployed by Yaakulya Sabbani to answer questions about him.
        
        IMPORTANT GUIDELINES:
        1. Keep all responses VERY CONCISE and brief - no more than 3-4 short sentences total
        2. Be specific and direct when answering questions
        3. Refer to Yaakulya as "he/him" in your responses
        4. Avoid unnecessary elaboration or long lists
        5. Use ONLY the information provided about Yaakulya
        6. For complex questions, provide only the most relevant highlights
        7. If you don't find the answer in the provided information, keep your response to a single sentence
        
        INFORMATION ABOUT YAAKULYA:
        ${knowledgeBase}`;
        
        // Here's where we actually call the OpenAI API
        const response = await fetch(apiAccess.apiEndpoint, {
            // Using POST method to send data to the API
            method: 'POST',
            // Setting the headers for the API request
            headers: {
                'Content-Type': 'application/json',
                'Authorization': apiAccess.authorization
            },
            // Convert our request data to JSON format
            body: JSON.stringify({
                model: CONFIG.CHATBOT_SETTINGS.model,
                messages: [
                    { role: 'system', content: systemPrompt },
                    { role: 'user', content: userMessage }
                ],
                max_tokens: CONFIG.CHATBOT_SETTINGS.maxTokens,
                temperature: CONFIG.CHATBOT_SETTINGS.temperature,
                presence_penalty: CONFIG.CHATBOT_SETTINGS.presence_penalty
            })
        });
        
        // Check if the API call was successful
        if (!response.ok) {
            throw new Error(`API error: ${response.status}`);
        }
        
        // Parse the JSON response from the API
        const data = await response.json();
        // Extract the bot's reply from the response
        const botReply = data.choices[0].message.content;
        
        // Remove the typing indicator and add the bot's response to the chat
        removeTypingIndicator();
        addMessage('bot', botReply);
        
    } catch (error) {
        // Handle any errors that occur during the API call
        console.error('Error processing message with GPT:', error);
        removeTypingIndicator();
        addMessage('bot', 'I\'m having trouble generating a response right now. Please try again later.');
    }
} 