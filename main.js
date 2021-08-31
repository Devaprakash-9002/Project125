function setup() {
    video = createCapture(VIDEO);
    video.size(500, 500);

    canvas = createCanvas(500, 500);
    canvas.position(650, 95);

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function draw() {
    background('#969A97');
    document.getElementById("square_side").innerHTML = "Size of text: " + difference + "px.";
    textSize(difference);
    color("#F90093");
    text("HERE", noseX, noseY);
}

function modelLoaded() {
    console.log("PoseNet has initialized!");
}

function gotPoses(results) {
    if(results.length > 0) {
        console.log(results);
        noseX = results[0].pose.nose.x;
        noseY = results[0].pose.nose.y;
        console.log("nose x = " + noseX + ", noseY = " + noseY);

        leftWristX = results[0].pose.leftWrist.x;
        rightWristX = results[0].pose.rightWrist.x;
        difference = floor(leftWristX - rightWristX);
        console.log("left wrist = " + leftWristX + ", right wrist = " + rightWristX + ", difference = " + difference);
    }
}

noseX = 0;
noseY = 0;
rightWristX = 0;
leftWristX = 0;
difference = 0;