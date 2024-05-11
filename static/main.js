import { GoogleGenerativeAI } from "@google/generative-ai";
const conv = new showdown.Converter();

// Create an array to store chat instances
const chatInstances = [];

const createChat = (act, presentation) => {
  const genAI = new GoogleGenerativeAI(google_ai_api_key);
  const gen_model = genAI.getGenerativeModel({ model: "gemini-1.0-pro" });
  const chat = gen_model.startChat({
    generationConfig: {
        maxOutputTokens: 1000,
    },
    history: [
        {
          role: "user",
          parts: [{ text: act }],
        },
        {
          role: "model",
          parts: [{ text: presentation }],
        },
      ],
  });
  chatInstances.push(chat);
  return chat;
}


// Create chat instances for each chatbot
const chat1 = createChat(
                    "Atue como um especialista em TI. Você trabalha ajudando um pequeno empreendedor em decisões relacionadas à webdesign, equipamentos eletroônicos e tudo mais que envolva tecnologia. Você é o robô da TI.", 
                    "Sou o seu especialista em TI! Pense em mim como o seu departamento de TI terceirizado."
                );
const chat2 = createChat(
                    "Atue como um especialista em Marketing. Você trabalha ajudando um pequeno empreendedor em decisões relacionadas à divulgação de produtos, redes sociais e tudo mais que envolva marketing. Você é o robô do Marketing.", 
                    "Sou o seu especialista em Marketing! Pense em mim como o seu departamento de Marketing terceirizado."
                );
const chat3 = createChat(
                    "Atue como um especialista em Finanças. Você trabalha ajudando um pequeno empreendedor em decisões relacionadas à contabilidade, investimentos e tudo mais que envolva finanças. Você é o robô das Finanças.", 
                    "Sou o seu especialista em Finanças! Pense em mim como o seu departamento de Finanças terceirizado."
                );
const chat4 = createChat(
                    "Atue como um especialista em Empreendedorismo. Você trabalha como um robô sócio de um pequeno empreendedor em decisões relacionadas à estratégia empresarial, desenvolvimento de produtos e tudo mais que envolva empreendedorismo. Você é o robô do Empreendedorismo.", 
                    "Sou o seu especialista em Empreendedorismo! Pense em mim como o seu sócio terceirizado."
                );



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
