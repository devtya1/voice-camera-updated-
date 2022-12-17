var SpeechRecognition = window.webkitSpeechRecognition;
var recognition = new SpeechRecognition();

function Start(){
    document.getElementById("textbox").innerHTML = "";
    recognition.start();
}
recognition.onresult = function(event)
{
    console.log(event);
    var content = event.results[0][0].transcript;
    console.log(content);
    document.getElementById("textbox").innerHTML = content;
    if(content == "Take my selfie."){
        speak();
    }
    
}

function speak(){
    var synth = window.speechSynthesis;
    var speak_data = "taking selfie in 5 seconds";
    var utterThis = new SpeechSynthesisUtterance(speak_data);
    synth.speak(utterThis);
    Webcam.attach(camera);
    setTimeout(function(){
        take_snapshot();
        save();
    },5000);
}
camera = document.getElementById("camera");
Webcam.set({
    width: 350,
    height: 250,
    image_format: 'png',
    png_quality: 90
 });

 function take_snapshot(){
    Webcam.snap(function (data_uri){
        document.getElementById("result").innerHTML = "<img src=" + data_uri +" id='selfie_image'>";
    })
 }
 function save(){
    link = document.getElementById("link");
    image = document.getElementById("selfie_image").src;
    link.href = image;
    link.click();
 }