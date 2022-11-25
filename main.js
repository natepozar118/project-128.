function setup() {
    canvas = createCanvas(280, 280);
    Canvas.Center();
    background("white");
    canvas.mouseReleased(classifyCanvas);
    synth = window.speechSynthesis;
}

function preload()  {
    classifier = ml5.imageClassifier('DoodleNet');
}

function clearCanvas() {

    background("white");
}

function draw()  {
    strokeWeight(13);
    stroke(0);
    if (mouseIsPressed) {
        line(pmouseX, pmouseY, mouseX, mouseY);
    }
}

function classifyCanvas() {
    classifier.Classify(canvas, gotResults);
}

function gotResults(error, results) {
    if (error)  {
        console.error(error);
    }
    console.log(results); 
    document.getElementById('label').innerHTML = 'label: ' + results[0].label;

    document.getElementById('confident').innerHTML = 'Confidence: ' +Math.round(results[0].confidence * 100) + '%';

    utterThis - new SpeechSynthesisUtterance(results[0].label);
    synth.speak(utterThis);
}