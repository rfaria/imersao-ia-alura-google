import { GoogleGenerativeAI } from "@google/generative-ai";
const conv = new showdown.Converter();

// Create an array to store chat instances
const chatInstances = [];

const createChat = () => {
  const genAI = new GoogleGenerativeAI(google_ai_api_key);
  const gen_model = genAI.getGenerativeModel({ model: "gemini-1.0-pro" });
  const chat = gen_model.startChat({
    generationConfig: {
        maxOutputTokens: 1000,
    },
  });
  chatInstances.push(chat);
  return chat;
}

// Create chat instances for each chatbot
const chat1 = createChat();
const chat2 = createChat();
const chat3 = createChat();
const chat4 = createChat();

const chatGemini = async (message, chatIndex) => {
  const chat = chatInstances[chatIndex];
  addMessage(message, "end", chatIndex);
  let res = await chat.sendMessage(message);
  res = await res.response;
  console.log(res);
  let html = conv.makeHtml(res.text());
  addMessage(html, "start", chatIndex);
}

const addMessage = (msg, direction, chatIndex) => {
    const messageHolder = document.getElementById(`messageHolder${chatIndex + 1}`);  // Update messageHolder ID with chatIndex
    const message = document.createElement("div");
    const colour = direction !== "start" ? "blue" : "green";
    message.innerHTML = `
      <div class="flex flex-col items-${direction}">
              <div class="bg-${colour}-500 px-4 py-2 rounded-md text-white w-fit 
              max-w-4xl mb-1">${msg}</div>
          </div>
      `;
    messageHolder.appendChild(message);
  }

// Get the message input and send button elements for each chatbot
const chat1Input = document.getElementById("chat1");
const chat1Btn = document.getElementById("btn1");

const chat2Input = document.getElementById("chat2"); // Add similar lines for chat2, chat3, and chat4
const chat2Btn = document.getElementById("btn2");

const chat3Input = document.getElementById("chat3"); // Add similar lines for chat2, chat3, and chat4
const chat3Btn = document.getElementById("btn3");

const chat4Input = document.getElementById("chat4"); // Add similar lines for chat2, chat3, and chat4
const chat4Btn = document.getElementById("btn4");

// Add event listeners for each chatbot's send button
chat1Btn.addEventListener("click", function () {
  const message = chat1Input.value;
  chatGemini(message, 0); // Pass chat index (0 for chat1)
  chat1Input.value = "";
});

chat2Btn.addEventListener("click", function () {
  const message = chat2Input.value;
  chatGemini(message, 1); // Pass chat index (1 for chat2)
  chat2Input.value = "";
});

chat3Btn.addEventListener("click", function () {
    const message = chat3Input.value;
    chatGemini(message, 2); // Pass chat index (1 for chat2)
    chat3Input.value = "";
  });

  chat4Btn.addEventListener("click", function () {
    const message = chat4Input.value;
    chatGemini(message, 3); // Pass chat index (1 for chat2)
    chat4Input.value = "";
  });
