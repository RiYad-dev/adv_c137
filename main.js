let video;
let status;
objects = [];
function preload() {
    video = createVideo('video.mp3');
}
function setup() {
    canvas = createCanvas(400, 400);
    canvas.center();
    video.hide();
}
function draw() {
    image(video, 0, 0, 400, 400);
    if (status != "") {
        objectDetector.detect(video, gotResult);
        for (var i = 0; i < objects.length; i++) {
            document.getElementById("status").innerHTML = "Status: Objects Detected";
            document.getElementById("objects").innerHTML = "No. of detected objects are " + objects.length;

            fill('#ff0000');
            stroke('#ff0000');
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%", objects[i].x, objects[i].y);
            noFill();
            stroke('#ff0000');
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        }
    }
}
function start() {
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting Objects";
}
function modelLoaded() {
    console.log("model loaded!!");
    status = true;
    video.loop();
    video.speed(1);
    video.volume(0);
}
function gotResult(error, result) {
    if (error) {
        console.log(error);
    } else {
        console.log(result);
        objects = result;
    }
}