// Classifier Variable
let classifier;
// Model URL
let imageModelURL = 'https://teachablemachine.withgoogle.com/models/w4UEY-UTF/';

// Video
let video;
let label = '';

// Load the model first
function preload() {
    classifier = ml5.imageClassifier(imageModelURL + 'model.json');
}

function setup() {
    // Create the canvas and attach it to the #canvas-container
    let canvas = createCanvas(320, 260);
    canvas.parent('sketch');

    // Create the video
    video = createCapture(VIDEO);
    video.size(320, 240);
    video.hide();

    // Start classifying
    classifyVideo();
}

function draw() {
    background(255, 250, 205); // Helles Gelb
    // Draw the video
    image(video, 0, 0);

    // Draw the label on the canvas
    fill(90, 61, 43); // Dunkelbraun
    textSize(16);
    textAlign(CENTER);
    text(label, width / 2, height - 4);
}

// Get a prediction for the current video frame
function classifyVideo() {
    classifier.classify(video, gotResult);
}

// When we get a result
function gotResult(results) {
	console.log(results);
    // The results are in an array ordered by confidence.
	// console.log(results[0]);
    label = results[0].label;

    // Display the result in the #results div
    document.getElementById('results').textContent = `Ergebnis: ${label}`;

    // Classify again
    classifyVideo();
}
