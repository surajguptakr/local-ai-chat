# LocalAI Chat 
 
A private, local AI chat application powered by the QVAC SDK. 
 
LocalAI Chat runs AI inference directly on your device using QVAC, without sending conversations to cloud AI services. 
 
## Features 
 
- Local AI chat using QVAC 
- Private, on-device inference 
- Multi-turn conversation history 
- Browser-based interface 
- Responsive UI 
- No OpenAI, Gemini, Claude, or other cloud AI API 
- Llama 3.2 1B instruction model through QVAC 
 
## Requirements 
 
- Node.js 22.20.0 or newer 
- npm 10.9.3 or newer 
- QVAC-supported system 
 
## QVAC SDK Version 
 
Built with @qvac/sdk v0.19.0.
 
## Installation 
 
Clone the repository: 
 
    git clone https://github.com/surajguptakr/local-ai-chat.git 
    cd local-ai-chat 
    npm install 
 
## Run 
 
    npm start 
 
Then open: http://localhost:3000 
 
## QVAC Functions Used 
 
The application directly calls loadModel(), completion(), and unloadModel(). 
 
- loadModel() loads the Llama 3.2 1B model locally. 
- completion() generates AI responses locally. 
- unloadModel() releases the model when the server shuts down. 
 
The main implementation is in src/app.js. 
 
## How It Works 
 
1. The user enters a message in the browser. 
2. The browser sends the conversation to the local Express server. 
3. The server passes the conversation to QVAC. 
4. QVAC runs the Llama model locally on the device. 
5. The generated response is returned to the browser. 
 
## Privacy 
 
Chat inference is performed locally through QVAC. No hosted LLM API is required for inference. 
 
## License 
 
This project is licensed under the MIT License.
 
## Project Structure 
 
    local-ai-chat/ 
    ÃÄÄ public/ 
    ³   ÀÄÄ index.html 
    ÃÄÄ src/ 
    ³   ÃÄÄ app.js 
    ³   ÀÄÄ test-qvac.js 
    ÃÄÄ .gitignore 
    ÃÄÄ LICENSE 
    ÃÄÄ package.json 
    ÃÄÄ package-lock.json 
    ÀÄÄ README.md
 
Files: 
- public/index.html 
- src/app.js 
- src/test-qvac.js 
- package.json 
- package-lock.json 
- LICENSE
