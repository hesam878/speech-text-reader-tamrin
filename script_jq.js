$(document).ready(function (){
const main = $('#main');
const voicesSelect = $('#voices');
const textarea = $('#text');
const readBtn = $('#read');
const toggleBtn = $('#toggle');
const closeBtn = $('#close');

// console.log(typeof $)
// document.addEventListener('keydown', function(event) {
//     console.log("کلید:", event.keyCode);
// });


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

// Create speech boxes
function createBox(item) {
// const box = $('<div class="card show"></div>');

//   const { image, textfa ,text} = item;

//   $(box).addClass('box');

//   $(box).html( `
//     <img src="${image}" alt="${textfa}" />
//     <p class="info">${textfa}</p>
//   `);

//   $(box).on('click', () => {
//     setTextMessage(text);
//     speakText();

//     // Add active effect
//     $(box).addClass('active');
//     setTimeout(() => $(box).removeClass('active'), 800);
//   });

//   main.append(box);
  const box = document.createElement('div');

  const { image, text } = item;

  box.classList.add('box');

  box.innerHTML = `
    <img src="${image}" alt="${text}" />
    <p class="info">${text}</p>
  `;

  box.addEventListener('click', () => {
    setTextMessage(text);
    speakText();

    // Add active effect
    box.classList.add('active');
    setTimeout(() => box.classList.remove('active'), 800);
  });

  main.appendChild(box);
}


// Init speech synth
const message = new SpeechSynthesisUtterance();

// Store voices
let voices = [];

function getVoices() {
  voices = speechSynthesis.getVoices();

  voices.forEach(voice => {
    const option = document.createElement('option');

    $(option).val(voice.name);
    $(option).text(`${voice.name} ${voice.lang}`);

    voicesSelect.append($(option));
  });
}

// Set text
function setTextMessage(text) {
  message.text = text;
}

// Speak text
function speakText() {
  speechSynthesis.speak(message);
}

// Set voice
function setVoice(e) {
  message.voice = voices.find(voice => voice.name === e.target.val());
}

// Voices changed
speechSynthesis.addEventListener('voiceschanged', getVoices);

// Toggle text box
toggleBtn.on('click', () =>
  $('#text-box').toggleClass('show')
);

// Close button
closeBtn.on('click', () =>
  $('#text-box').removeClass('show')
);

// Change voice
voicesSelect.on('change', setVoice);

// Read text button
readBtn.on('click', () => {
  setTextMessage(textarea.val());
  speakText();
});

textarea.on('input', function (){
if (textarea.val().trim().length  >0){
    textarea.css('direction','ltr');
}else{
    textarea.css('direction','rtl');
}
});
getVoices();

})