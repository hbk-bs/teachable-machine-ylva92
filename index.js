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

    // Draw the video
    image(video, 0, 0);

    // Draw the label on the canvas
    fill(90, 61, 43); // Dunkelbraun
    textSize(16);
    textAlign(CENTER);
    text(label, width / 2, height - 4);

    // Display the link and text only the first time "von gestern" is detected
    if (label === 'von gestern' && !showLink) {
        showLink = true; // Set the flag to true to prevent repeated display

        // Delay the display of the link and text by 5 seconds
        setTimeout(() => {
            const container = document.getElementById('sketch');
            if (!document.getElementById('link-text')) {
                const link = document.createElement('h5');
                link.id = 'link-text';
                link.style.color = '#5a3d2b'; // Dunkelbraun
                link.style.textAlign = 'center';
                link.style.fontSize = '15px'; // Schriftgröße des Links
                link.innerHTML = '<a href="https://www.wikihow.com/Gen-Alpha-Slang" target="_blank" style="color: #5a3d2b; text-decoration: none;">https://www.wikihow.com/Gen-Alpha-Slang</a>';
                container.appendChild(link);

                const text = document.createElement('h5');
                text.style.color = '#5a3d2b'; // Dunkelbraun
                text.style.textAlign = 'center';
                text.style.fontSize = '12px'; // Schriftgröße des Textes
                text.textContent = '...dann brauchst du diese Infos vielleicht.';
                container.appendChild(text);
            }
        }, 5000); // 5 Sekunden Verzögerung
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
