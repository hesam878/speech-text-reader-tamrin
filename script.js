const main = document.querySelector('main');
const voicesSelect = document.getElementById('voices');
const textarea = document.getElementById('text');
const readBtn = document.getElementById('read');
const toggleBtn = document.getElementById('toggle');
const closeBtn = document.getElementById('close');

const data = [
{
  image: '../img/drink.jpg',
  textfa: "من تشنه‌ام",
  text: "I'm Thirsty"
},
{
  image: '../img/food.jpg',
  textfa: "من گرسنه‌ام",
  text: "I'm Hungry"
},
{
  image: '../img/tired.jpg',
  textfa: "من خسته‌ام",
  text: "I'm Tired"
},
{
  image: '../img/hurt.jpg',
  textfa: "من آسیب دیدم",
  text: "I'm Hurt"
},
{
  image: '../img/happy.jpg',
  textfa: "من خوشحالم",
  text: "I'm Happy"
},
{
  image: '../img/angry.jpg',
  textfa: "من عصبانی‌ام",
  text: "I'm Angry"
},
{
  image: '../img/sad.jpg',
  textfa: "من ناراحتم",
  text: "I'm Sad"
},
{
  image: '../img/scared.jpg',
  textfa: "من ترسیده‌ام",
  text: "I'm Scared"
},
{
  image: '../img/outside.jpg',
  textfa: "می‌خوام برم بیرون",
  text: "I Want To Go Outside"
},
{
  image: '../img/home.jpg',
  textfa: "می‌خوام برم خونه",
  text: "I Want To Go Home"
},
{
  image: '../img/school.jpg',
  textfa: "می‌خوام برم مدرسه",
  text: "I Want To Go To School"
},
{
  image: '../img/grandma.jpg',
  textfa: "می‌خوام برم خونه مامان‌بزرگ",
  text: "I Want To Go To Grandmas"
}
];

data.forEach(createBox);

function createBox(item) {
  const box = document.createElement('div');
  const { image, textfa ,text} = item;
  box.classList.add('box');
  box.innerHTML = `
    <img src="${image}" alt="${textfa}" />
    <p class="info">${textfa}</p>
  `;

  box.addEventListener('click', () => {
    setTextMessage(text);
    speakText();

    box.classList.add('active');
    setTimeout(() => box.classList.remove('active'), 800);
  });

  main.appendChild(box);
}

const message = new SpeechSynthesisUtterance();

let voices = [];

function getVoices() {
  voices = speechSynthesis.getVoices();

  voices.forEach(voice => {
    const option = document.createElement('option');

    option.value = voice.name;
    option.innerText = `${voice.name} ${voice.lang}`;

    voicesSelect.appendChild(option);
  });
}

function setTextMessage(text) {
  message.text = text;
}

function speakText() {
  speechSynthesis.speak(message);
}

function setVoice(e) {
  message.voice = voices.find(voice => voice.name === e.target.value);
}

speechSynthesis.addEventListener('voiceschanged', getVoices);

toggleBtn.addEventListener('click', () =>
  document.getElementById('text-box').classList.toggle('show')
);

closeBtn.addEventListener('click', () =>
  document.getElementById('text-box').classList.remove('show')
);

voicesSelect.addEventListener('change', setVoice);

readBtn.addEventListener('click', () => {
  setTextMessage(textarea.value);
  speakText();
});

textarea.addEventListener('input', function (){
if (textarea.value.trim().length  >0){
    textarea.style.direction='ltr';
}else{
    textarea.style.direction='rtl';
}
});
getVoices();