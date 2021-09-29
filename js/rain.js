var starCount = 300;
var context;
function starInit() {
  var bg = document.querySelector("body");
  for (var i = 0; i < starCount; i++) {
    var star = document.createElement("div");
    star.classList.add("star");
    bg.appendChild(star);
  }
}
function starPosition() {
  var stars = document.querySelectorAll(".star");
  for (var i = 0; i < starCount; i++) {
    stars[i].style.left = Math.random() * window.innerWidth + "px";
    stars[i].style.top = Math.random() * window.innerHeight + "px";
    stars[i].style.animationDelay = Math.random() * 10 + "s";
  }
}

function init() {
  var Meteor = document.getElementById("Meteor");
  Meteor.width = window.innerWidth;
  Meteor.height = window.innerHeight;
  context = Meteor.getContext("2d");
}

function MeteorRain() {
  this.x = Math.random() * window.innerWidth;
  this.y = Math.random() * window.innerHeight;
  this.length = Math.ceil(Math.random() * 80 + 150);
  this.angle = 30;
  this.cos = Math.cos((this.angle * 3.14) / 180);
  this.sin = Math.sin((this.angle * 3.14) / 180);
  this.width = this.length * this.cos;
  this.height = this.length * this.sin;
  this.speed = Math.ceil(Math.random() + 0.5);
  this.shifting_x = this.speed * this.cos;
  this.shifting_y = this.speed * this.sin;

  this.countPos = function () {
    this.x = this.x - this.shifting_x;
    this.y = this.y + this.shifting_y;
  };
  this.draw = function () {
    context.save();
    context.beginPath();
    context.lineWidth = 1;
    context.globalAlpha = this.alpha;
    var line = context.createLinearGradient(
      this.x,
      this.y,
      this.x + this.width,
      this.y - this.height
    );
    line.addColorStop(0, "white");
    line.addColorStop(0.6, "grey");
    line.addColorStop(1.0, "#333");
    context.strokeStyle = line;
    context.moveTo(this.x, this.y);
    context.lineTo(this.x + this.width, this.y - this.height);
    context.closePath();
    context.stroke();
    context.restore();
  };
  this.move = function () {
    var x = this.x + this.width - this.shifting_x;
    var y = this.y - this.height + this.shifting_y;
    context.clearRect(
      x - 3,
      y - 3,
      this.shifting_x + 5,
      this.shifting_y + 5
    );
    this.countPos();
    this.alpha -= 0.002;
    this.draw();
  };
}
function playRains() {
  for (var n = 0; n < rainCount; n++) {
    var rain = rains[n];
    rain.move();
    if (rain.y > window.innerHeight) {
      context.clearRect(
        rain.x,
        rain.y - rain.height,
        rain.width,
        rain.height
      )
      rains[n] = new MeteorRain();
    }
  }
  setTimeout("playRains()", 2);
}
var rainCount = 20;
var rains = new Array();
init();
starInit();
starPosition();
for (var i = 0; i < rainCount; i++) {
  var rain = new MeteorRain();
  rain.draw();
  rains.push(rain);
}
playRains();
