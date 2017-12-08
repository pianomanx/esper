
var recognition;
var recognizing = false;
var start_timestamp;


if (!('webkitSpeechRecognition' in window)) {
  upgrade();
} else {
  recognition = new webkitSpeechRecognition();
  recognition.continuous = true;
  recognition.interimResults = true;


  recognition.onstart = function() {
    recognizing = true;
    start_img.src = 'mic-animate.gif';
  };
  
  recognition.onresult = function(event) {

    for (var i = event.resultIndex; i < event.results.length; ++i) {
      //if (event.results[i].isFinal) {
        console.log( event.results[i][0].transcript);
        switch(event.results[i][0].transcript.trim()) {
			case 'enhance':
			case 'in harness':
			case 'in harmony':
				enhance();
				break;
			case 'pan right':
			case 'and right':
			case 'pam right':
			case 'hang right':
			case 'right':
				panRight();
				break;
			case 'pan left':
			case 'and left':
			case 'pam left':
			case 'hang left':
			case 'left':			
				panLeft();
				break;
			case 'pan up':
			case 'and up':
			case 'pam up':	
			case 'hang up':	
			case 'up':		
				panUp();
				break;
			case 'pan down':
			case 'and down':
			case 'pam down':
			case 'hang down':
			case 'down':			
				panDown();
				break;
			case 'pull out':
			case 'pull back':
			case 'Holbeck':
			case 'out':				
				pullOut();
				break;				
			case 'stop':
			case 'hold':
			case 'wait':
				esperStop();
				break;
		}
     // }
    }
  };
  

  recognition.onerror = function(event) {
    alert(event.error);
    if (event.error == 'no-speech') {
      start_img.src = 'mic.gif';
      alert('info_no_speech');
      ignore_onend = true;
    }
    if (event.error == 'audio-capture') {
      start_img.src = 'mic.gif';
      alert('info_no_microphone');
      ignore_onend = true;
    }
    if (event.error == 'not-allowed') {
      if (event.timeStamp - start_timestamp < 100) {
        alert('info_blocked');
      } else {
        alert('info_denied');
      }
      ignore_onend = true;
    }
    
  };
  
  recognition.onend = function() {
    recognizing = false;
    start_img.src = 'mic.gif';
  }
}

function startButton(event) {
  if (recognizing == false) {
	recognition.start();
  	start_timestamp = event.timeStamp;
  } else {
  	esperStop();
  	recognition.stop();
  }
}

function upgrade() {
  start_button.style.visibility = 'hidden';
  showInfo('info_upgrade');
}