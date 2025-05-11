# Yaakulya Sabbani - Portfolio Website

A portfolio website showcasing Yaakulya Sabbani's skills, experience, projects, and achievements as a Cybersecurity and Machine Learning Researcher.

## Features

### Portfolio
- Dark blue/purple cybersecurity-themed design
- Terminal-style loading animation with Kali Linux commands
- Responsive design for all device sizes
- Interactive elements with smooth animations
- Hexagonal design elements throughout
- Comprehensive sections covering every aspect of professional background

### RAG Chatbot Integration
The portfolio includes an AI-powered chatbot that uses Retrieval-Augmented Generation (RAG) to answer questions about Yaakulya:

- Uses GPT-4o-mini model for efficient and cost-effective responses
- Retrieves information from a knowledge base (data.txt) containing comprehensive details
- Interactive chat interface with typing indicators
- Mobile-responsive design
- Direct link handling for URLs in responses

## Technical Implementation

The chatbot implementation includes:

- `chatbot.js`: Core functionality for the chatbot interface and OpenAI API integration
- `chatbot.css`: Styling for the chatbot interface
- `config.js`: Configuration file for API keys
- `data.txt`: Knowledge base containing information about Yaakulya

### RAG Implementation

The chatbot uses a simple RAG approach:
1. Loads Yaakulya's information from data.txt on initialization
2. When a question is asked, it sends the full context along with the question to the GPT-4o-mini model
3. The model generates a response based on the provided information
4. The response is formatted and displayed in the chatbot interface

## Setup

1. Clone the repository
2. Replace the API key in `config.js` with your own OpenAI API key
3. Customize `data.txt` with your own information if needed
4. Deploy to your web hosting service

## Usage

To interact with the chatbot:
1. Click the "Know more about Yaakulya" button in the bottom right corner
2. Type your question in the input field
3. The chatbot will respond with relevant information from Yaakulya's background

## Technologies Used

- HTML5, CSS3, and JavaScript
- OpenAI GPT-4o-mini API
- Font Awesome for icons
- Particles.js for background effects 