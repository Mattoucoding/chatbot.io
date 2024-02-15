import './index.scss';

document.body.innerHTML = `
<div class="container">
<div class="chatbot">
<header>
  <h2>Chatbot</h2>
  <i class="ri-close-line"></i>
</header>
<ul class="chatbox">
  <li class="chat incoming">
    <i class="ri-robot-2-line"></i>
    <p>
      Hi there <br />
      How can I help you today?
    </p>
  </li>
</ul>
<div class="chat-input">
  <textarea placeholder="Enter a message..." required></textarea>
  <i class="ri-send-plane-2-line"></i>
</div>
</div>
</div>

`;

const chatInput = document.querySelector('.chat-input textarea');
const sendChatBtn = document.querySelector('.chat-input i');
const chatbox = document.querySelector('.chatbox');

let userMessage;
const API_KEY = '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';
const inputInitHeight = chatInput.scrollHeight;

const createChatLi = (message, className) => {
  // create a chat <li> element with passed message and className
  const chatLi = document.createElement('li');
  chatLi.classList.add('chat', className);
  const chatContent = className === 'outgoing' ? '<p></p>' : "<i class='ri-robot-2-line'></i><p></p>";
  chatLi.innerHTML = chatContent;
  chatLi.querySelector('p').textContent = message;
  return chatLi;
};

const generateResponse = (incomingChatLi) => {
  const API_URL = 'https://api.openai.com/v1/chat/completions';
  const messageElement = incomingChatLi.querySelector('p');

  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
      Authorization: `Bearer ${API_KEY}`
    },
    body: JSON.stringify({
      model: 'gpt-3.5-turbo',
      message: [{ role: 'user', content: userMessage }]
    })
  };
  // send POST request to API, get response
  fetch(API_URL, requestOptions)
    .then(res => res.json())
    .then(data => {
      console.log(data);
    }).catch(() => {
      messageElement.textContent = 'Oops! Something went wrong. Please try again.';
    })
    .finally(() => chatbox.scrollTo(0, chatbox.scrollHeight));
};

const handleChat = () => {
  userMessage = chatInput.value.trim();
  if (!userMessage) return;
  chatInput.value = '';
  chatInput.style.height = `${inputInitHeight}px`;

  // append the user's message to the chatbox
  chatbox.appendChild(createChatLi(userMessage, 'outgoing'));
  chatbox.scrollTo(0, chatbox.scrollHeight);

  setTimeout(() => {
    // Display "Thinking..." message while waiting for the response
    const incomingChatLi = createChatLi('Thinking...', 'incoming');
    chatbox.appendChild(incomingChatLi);
    chatbox.scrollTo(0, chatbox.scrollHeight);
    generateResponse(incomingChatLi);
  }, 600);
};
chatInput.addEventListener('input', () => {
  // adjust the height of the input textarea based on its content
  chatInput.style.height = `${inputInitHeight}px`;
  chatInput.style.height = `${chatInput.scrollHeight}px`;
});
chatInput.addEventListener('keyup', (e) => {
  if (e.key === 'Enter' && !e.shiftKey && window.innerWidth > 800) {
    e.preventDefault();
    handleChat();
  }
});

sendChatBtn.addEventListener('click', handleChat);
