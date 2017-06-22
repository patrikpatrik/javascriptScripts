// bouncy ball with elastic slingshot via mouse 2.0
var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
canvas.width = 600;
canvas.height = 500;
document.body.appendChild(canvas);
// image
var backReady = false;
var backImage = new Image();
backImage.onload = function() {
	backReady = true;
};
backImage.src = "images/snows.jpg";
// vars
var paused = false,
	canW = canvas.width,
	canH = canvas.height,
	radius = 20,
	vx = 6,
	vy = 4,
	gravity = 0.3,
	damping = 0.8,
	friction = 0.7;
var bubbles = []; // empty array of bubbles
// mouse manipulation
canvas.addEventListener("mousedown", onMouseDown, false);
canvas.addEventListener("mouseup", onMouseUp, false);
function onMouseDown(e) {
	cx = e.clientX - canvas.offsetLeft;
	cy = e.clientY - canvas.offsetTop;
	vx = vy = 0;
	paused = true;
};
function onMouseUp(e) {
	vx = cx - e.clientX;
	vy = cy - e.clientY;
	paused = false;
	main();
};
// constructors
var orbObj = function(x, y, vx, vy) {
	this.x = x || 0;
	this.y = y || 0;
	var vx = vx; //|| Math.floor(Math.random() * 14) - 7; // random vx from -7 to 7
	var vy = vy; //|| Math.floor(Math.random() * 6) - 3;
	this.render = function(ctx, cx, cy, radius) {
		ctx.beginPath();
		ctx.fillStyle = "black";
		ctx.arc(cx, cy, radius, 0, 2*Math.PI, false);
		ctx.fill();
	}
	bubbles.push({"x":x,"y":y,"vx":vx,"vy":vy,"render":this.render});
};
// establishing assets outside function
var ball1 = new orbObj(100, 100, vx, vy);

function counts(bvx, bvy) {
	/* if(backReady) {
		document.getElementById("demo").innerHTML="vx is " + bvx + " vy is " + bvy;
	} */
};
// main & init()
function init() {
	ball1.render(ctx, ball1.x, ball1.y, radius);
	
	vy += gravity;
	ball1.x += vx;
	ball1.y += vy;
	/* for(var i = 0; i < bubbles.length; i++) {
		bub = bubbles[i];
		bub.render(ctx, bub.x, bub.y, radius);
		
		if(bub.x >= canW - radius) {
			vx = -vx * damping;
			bub.x = canW - radius;
		} else if(bub.x - radius <= 0) {
			vx = -vx * damping;
			bub.x = radius;
		}
		if(bub.y >= canH - radius) {
			vy = -vy * damping;
			bub.y = canH - radius;
			// friction here
			vx *= friction;
		} else if(bub.y - radius <= 0) {
			vy = -vy * damping;
			bub.y = radius;
		}
		
		vy += gravity;
		bub.x += vx;
		bub.y += vy;
		//counts(bub.vx, bub.vy);
	} */
	
};
function clear() {
	ctx.clearRect(0, 0, canW, canH);
};
function main() {
	clear();
	//init();
	ball1.render(ctx, ball1.x, ball1.y, radius);
	
	if(ball1.x >= canW - radius) {
		vx = -vx * damping;
		ball1.x = canW - radius;
	} else if(ball1.x - radius <= 0) {
		vx = -vx * damping;
		ball1.x = radius;
	}
	if(ball1.y >= canH - radius) {
		vy = -vy * damping;
		ball1.y = canH - radius;
		// friction here
		vx *= friction;
	} else if(ball1.y - radius <= 0) {
		vy = -vy * damping;
		ball1.y = radius;
	}
	vy += gravity;
	ball1.x += vx;
	ball1.y += vy;
	
	if(!paused) {
		requestAnimationFrame(main);
	}
};
main();
