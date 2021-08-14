song = "";
leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;
leftScoreY = 0;
rightScoreY = 0;

function preload(){
    song = loadSound("music.mp3");
}

function setup(){
    canvas = createCanvas(600,500);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
    poseNet = ml5.poseNet(video,modelLoaded);
    poseNet.on("pose",gotPoses);
}

function gotPoses(results){
    if(results.length > 0){
        console.log(results);
        leftScoreY = results[0].pose.keypoints[9].score;
        rightScoreY = results[0].pose.keypoints[10].score;
        console.log("Left Wrist Y score = "+leftScoreY+" Right Wrist Y score = "+rightScoreY);
        
        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log("leftWrist x = "+leftWristX+" leftWrist y = "+leftWristY);
        
        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("rightWrist x = "+rightWristX+" rightWrist y = "+rightWristY);
    }
}

function modelLoaded(){
    console.log("PoseNet model is ready.");
}

function draw(){
    image(video,0,0,600,500);

    fill("#ff0000");
    stroke("#ff0000");
    circle(rightWristX,rightWristY,20);
    
    if(rightScoreY > 0.2){
    if(rightWristY > 0 && rightWristY <=100){
        document.getElementById("speed").innerHTML = "Speed = 0.5x";
        song.rate(0.5);
    }
    else if(rightWristY > 100 && rightWristY <= 200){
        document.getElementById("speed").innerHTML = "Speed = 1x";
        song.rate(1);
    }
    else if(rightWristY > 200 && rightWristY <=300){
        document.getElementById("speed").innerHTML = "Speed = 1.5x";
        song.rate(1.5);
    }
    else if(rightWristY > 300 && rightWristY <=400){
        document.getElementById("speed").innerHTML = "Speed = 2x";
        song.rate(2);
    }
    else if(rightWristY > 400 && rightWristY <= 500){
        document.getElementById("speed").innerHTML = "Speed = 2.5x";
        song.rate(2.5);
    }
    }

    if(leftScoreY > 0.2){
        fill("#ff0000");
        stroke("#ff0000");
        circle(leftWristX,leftWristY,20);
        leftWristYint = Number(leftWristY);
        leftYdecimal = floor(leftWristYint);
        volume = leftYdecimal/500;
        document.getElementById("volume").innerHTML = "Volume = "+volume;
        song.setVolume(volume);
    }
}

function play(){

    song.play();
    song.setVolume(1);
    song.rate(1);
}