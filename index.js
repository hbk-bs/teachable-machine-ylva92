// Classifier Variable
let classifier;
// Model URL
let imageModelURL = 'https://teachablemachine.withgoogle.com/models/w4UEY-UTF/';

// Video
let video;
let label = '';
let showLink = false; // Flag to control link display
let linkTimeout; // Timeout reference

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

    if (showLink) {
        // Display the link and text
        fill(90, 61, 43); // Dunkelbraun
        textSize(16);
        textAlign(CENTER);
        text('https://www.wikihow.com/Gen-Alpha-Slang', width / 2, height / 2 - 10);
        textSize(12);
        text('...dann brauchst du vielleicht Hilfe, die jungen Leute zu verstehen. (ich auch)', width / 2, height / 2 + 20);
    } else {
        // Draw the video
        image(video, 0, 0);

        // Draw the label on the canvas
        fill(90, 61, 43); // Dunkelbraun
        textSize(16);
        textAlign(CENTER);
        text(label, width / 2, height - 4);
    }
}

// Get a prediction for the current video frame
function classifyVideo() {
    classifier.classify(video, gotResult);
}

// When we get a result
function gotResult(results) {
    console.log(results);
    // The results are in an array ordered by confidence.
    label = results[0].label;

    if (label === 'von gestern') {
        // If "von gestern" is detected, show the link for 10 seconds
        if (!showLink) {
            showLink = true;
            linkTimeout = setTimeout(() => {
                showLink = false;
            }, 10000); // 10 Sekunden
        }
    }

    // Classify again
    classifyVideo();
}
