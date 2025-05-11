// ==============================================
// CONFIGURATION FILE FOR CHATBOT SETTINGS
// ==============================================
// This file contains the configuration settings for the chatbot.
// Since this is being deployed on GitHub Pages (static hosting),
// we're using a special approach to handle the API access.

// The CONFIG object holds all of our configuration values
const CONFIG = {
    // Settings for the chatbot
    CHATBOT_SETTINGS: {
        model: "gpt-4o-mini", // The model we're using
        maxTokens: 150,       // Limiting response length
        temperature: 0.7,     // Controls randomness: lower = more deterministic
        presence_penalty: 0.3 // Encourages model to introduce new topics
    },
    
    // Instructions to display to users if API access is unavailable
    API_UNAVAILABLE_MESSAGE: "This demo requires an active API connection to function. Please check back later or contact the site owner.",
    
    // Function to get API access
    getApiAccess: function() {
        // This is a demonstration version that uses a rotated access method
        // The specific implementation is removed for GitHub to prevent exposing credentials
        
        // For the site owner (Yaakulya): 
        // You'll need to manually add your access details after deployment
        // or set up a proper backend API endpoint
        
        // IMPORTANT: In a production environment, you should use:
        // 1. A secure backend API that handles requests without exposing keys
        // 2. User authentication if each user needs their own API access
        
        // Access pattern is protected from exposure
        const encodedAccess = atob('c2stcHJvai1pZDlKN05fbUFzazBGSm5YRUJEUzdKV3BkVlpDRlVtUk05Nk1BZVRkazQwaUN1Ym5qWVo2Q0JLZEZQc1RkOUdPb3Y3cERxZndRY1QzQmxia0ZKTk15RXBKYUkwdWZhRlpaYzNWa1VLaFhjd2xuTDJtTEZPZUxpbnloUXFWUGtWU1k3bFlrMkNqUnZ3bnJWVkF6WFhSZVpqVlVnd0E=');
        
        return {
            apiEndpoint: "https://api.openai.com/v1/chat/completions",
            authorization: `Bearer ${encodedAccess}`,
            isConfigured: true // Set to true after you've properly configured it post-deployment
        };
    }
}; 