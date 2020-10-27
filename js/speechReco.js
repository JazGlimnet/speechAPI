

var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;
var SpeechGrammarList = SpeechGrammarList || webkitSpeechGrammarList;
var SpeechRecognitionEvent = SpeechRecognitionEvent || webkitSpeechRecognitionEvent;
var recognition = new SpeechRecognition();

var inputPara = document.querySelector('#_input');
var resultPara = document.querySelector('#result');
var diagnosticPara = document.querySelector('#outout');

var startBtn = document.querySelector('#start');



function getMySound() {
  var grammar = '#JSGF V1.0; grammar phrase; public <phrase> = ' +';';
  var speechRecognitionList = new SpeechGrammarList();
  speechRecognitionList.addFromString(grammar, 1);
  recognition.grammars = speechRecognitionList;
  recognition.lang = 'en-US';
  recognition.interimResults = false;
  recognition.maxAlternatives = 1;

  recognition.start();

  recognition.onend = function(event) {
     //Fired when the speech recognition service has disconnected.
     console.log('SpeechRecognition.onend');
 }

  recognition.onnomatch = function(event) {
      //Fired when the speech recognition service returns a final result with no significant recognition. This may involve some degree of recognition, which doesn't meet or exceed the confidence threshold.
      console.log('SpeechRecognition.onnomatch');
  }


  recognition.onstart = function(event) {
      //Fired when the speech recognition service has begun listening to incoming audio with intent to recognize grammars associated with the current SpeechRecognition.
      console.log('SpeechRecognition.onstart');
      document.querySelector('._speechContainer').style.display = 'block';
  }

}

recognition.onresult = function(event) {

  var speechResult = event.results[0][0].transcript.toLowerCase();
  const outPutResult = diagnosticPara.textContent = speechResult;
  document.querySelector('._speechContainer').style.display = 'none';
  // speakUp(outPutResult);
  if(outPutResult.includes('home')){
    document.getElementById('main').scrollIntoView({
    behavior: 'smooth'
    });
  }
  else if(outPutResult.includes('programs')){
    document.getElementById('programs').scrollIntoView({
    behavior: 'smooth'
    });
  }
  else if(outPutResult.includes('apply')){
    document.getElementById('apply').scrollIntoView({
    behavior: 'smooth'
    });
    speakUp('do you wanna apply for corse?')
    getMySound();
    if(outPutResult.includes('yes')){
      speakUp('what is your first name');
    }
    applyForCorse();

    // if(outPutResult === 'yes'){
    //   speakUp('what is your name?');
    // }
  } else {
    speakUp('sorry, i dont understand you. you can navigat between home, programs and apply');
  }
}

  function applyForCorse(){
    var speechResult = event.results[0][0].transcript.toLowerCase();
    const outPutResult = diagnosticPara.textContent = speechResult;
    // getMySound();
    if(outPutResult === 'yes'){
      speakUp('what is your name?');
    }
  }

function speakUp(message){
  const talkToMe = new SpeechSynthesisUtterance();
  talkToMe.text = message;
  talkToMe.volume = 2;
  talkToMe.tate = 1;
  talkToMe.pitch = 1;
  talkToMe.lang = 'sv'
  speechSynthesis.speak(talkToMe);
}

window.addEventListener('load', (e) => {
  console.log('page is fully loaded');
  var msg = new SpeechSynthesisUtterance('I see dead people!');
  msg.voice = speechSynthesis.getVoices().filter(function(voice) { return voice.name == 'Whisper'; })[0];
  speechSynthesis.speak(msg);
  window.addEventListener('keydown', onKeyDown, true);
  function onKeyDown(evt) {
  const keyy = evt.keyCode;
  console.log(evt.keyCode);
  if(keyy == "16"){
    getMySound();
    }
  }
});


startBtn.addEventListener('click', ()=>{
  speakUp("speak up");
  function speakUp(message){
    const talkToMe = new SpeechSynthesisUtterance();
    talkToMe.text = message;
    talkToMe.volume = 0;
    talkToMe.tate = 0;
    talkToMe.pitch = 0;
    speechSynthesis.speak(talkToMe);
  }
});
