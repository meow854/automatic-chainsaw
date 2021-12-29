Webcam.set({
    width: 350,
    height: 300,
    image_format: 'png',
    png_quality: 90
});

camera= document.getElementById("camera");
Webcam.attach('#camera');

function takepic() {
    Webcam.snap(function (data_uri) {
        document.getElementById("result").innerHTML= "<img src='" + data_uri + "' id='takenimg'>";
    });
}

console.log("ml5 version", ml5.version);
classifier= ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/gTPOl30d3/model.json", modelLoaded);

function modelLoaded() {
    console.log("model loaded");
}

predict1= ""
predict2= ""

function speak() {
    synth= window.speechSynthesis;
    speach1= "The First Prediction Is" + predict1;
    speach2= " And The Second Prediction Is" + predict2;
    utterThis= new SpeechSynthesisUtterance (speach1 + speach2);
    synth.speak(utterThis);
}

function check() {
    img= document.getElementById("takenimg");
    classifier.classify(img, gotResult);
}

function gotResult(error, results) {
    if(error) {
        console.log(error);
    }
    else {
        console.log(results);
        document.getElementById("emo1").innerHTML= results[0].label;
        document.getElementById("emo2").innerHTML= results[1].label;
        predict1= results[0].label;
        predict2= results[1].label;
        speak();
        if(results[0].label == "Happy") {
            document.getElementById("emoji1").innerHTML= "&#128512";
        }
        else if(results[0].label == "Sad") {
            document.getElementById("emoji1").innerHTML= "&#128546";
        }
        else if(results[0].label == "Angry") {
            document.getElementById("emoji1").innerHTML= "&#128545";
        }
        if(results[1].label == "Happy") {
            document.getElementById("emoji2").innerHTML= "&#128512";
        }
        else if(results[1].label == "Sad") {
            document.getElementById("emoji2").innerHTML= "&#128546";
        }
        else if(results[1].label == "Angry") {
            document.getElementById("emoji2").innerHTML= "&#128545";
        }
    }
}