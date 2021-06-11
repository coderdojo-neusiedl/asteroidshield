var bases = [];
var missiles = [];
var nextMissileId = 1;

var getNearestBase = function getNearestBase(mouseX) {
   var currentMinimumDistance = width;
   var nearestBase;
   bases.forEach(base => {
      var distance = Math.abs(mouseX - base.getCenter().x);
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
      line(x, y, base.getCenter().x - base.getWidth() / 2, base.getCenter().y + base.getHeight());
      base.draw();
      x = base.getCenter().x + base.getWidth() / 2;
      y = base.getCenter().y + base.getHeight();
   });
   line(x, y, width, groundY);
   
};

function setup() {
   createCanvas(600, 600);
   var leftBase  = new Base({x: width * 0.15, y: height * 0.85}, width * 0.1,  height * 0.05);
   var rightBase = new Base({x: width * 0.90, y: height * 0.85}, width * 0.15, height * 0.05);
   bases = [leftBase, rightBase];
};

function draw() {
   background('black');
   drawGroundScene();
   missiles.forEach(missile => missile.draw());
};

function mouseClicked() {
   var nearestBase = getNearestBase(mouseX);
   var endPosition = {x: mouseX, y: mouseY};
   var missile = nearestBase.fireTo(endPosition);
   if (missile) {
      missiles.push(missile);
   }
}