var bases = [];
var missiles = [];
var nextMissileId = 1;

var drawBase = function drawBase(base) {         
   line( base.centerX - base.width / 2, base.centerY + base.height, 
         base.centerX - base.width / 2, base.centerY);
   line( base.centerX - base.width / 2, base.centerY,
         base.centerX + base.width / 2, base.centerY);
   line( base.centerX + base.width / 2, base.centerY,
         base.centerX + base.width / 2, base.centerY + base.height);

   var diameter  = 20;
   var gunLength = 30;

   arc(base.centerX, base.centerY, diameter, diameter, 3.1415, 0);

   push();
   translate(base.centerX, base.centerY);
   rotate(getRotation(base));
   strokeWeight(3);
   line(0, 0, 0, -gunLength);
   pop();
};

var getNearestBase = function getNearestBase(mouseX) {
   var currentMinimumDistance = width;
   var nearestBase;
   bases.forEach(base => {
      var distance = Math.abs(mouseX - base.centerX);
      if(distance < currentMinimumDistance) {
         currentMinimumDistance = distance;
         nearestBase = base;
      }
   });
   return nearestBase;
};

var drawGroundScene = function drawGroundScene() {
   var groundY   = height * 0.95;
   var x         = 0;
   var y         = groundY;

   stroke('yellow');
   fill('yellow');
   strokeWeight(3);
   
   bases.forEach(base => {
      line(x, y, base.centerX - base.width / 2, base.centerY + base.height);
      drawBase(base);
      x = base.centerX + base.width / 2;
      y = base.centerY + base.height;
   });
   line(x, y, width, groundY);
   
};

function setup() {
   createCanvas(600, 600);
   var leftBase  = { centerX: width * 0.15, centerY: height * 0.85, width: width * 0.1,  height: height * 0.05};
   var rightBase = { centerX: width * 0.90, centerY: height * 0.85, width: width * 0.15, height: height * 0.05};
   bases = [leftBase, rightBase];
};

function draw() {
   background('black');
   drawGroundScene();
   missiles.forEach(missile => missile.draw());
};

function mouseClicked() {
   var nearestBase = getNearestBase(mouseX);
   var startPosition = {x: nearestBase.centerX, y: nearestBase.centerY};
   var endPosition   = {x: mouseX,              y: mouseY};
   missiles.push(new Missile(startPosition, endPosition));
}