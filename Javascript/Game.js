var bases = [];
var missiles = [];
var nextMissileId = 1;

var drawBase = function drawBase(base) {         
   line( base.getCenter().x - base.getWidth() / 2, base.getCenter().y + base.getHeight(), 
         base.getCenter().x - base.getWidth() / 2, base.getCenter().y);
   line( base.getCenter().x - base.getWidth() / 2, base.getCenter().y,
         base.getCenter().x + base.getWidth() / 2, base.getCenter().y);
   line( base.getCenter().x + base.getWidth() / 2, base.getCenter().y,
         base.getCenter().x + base.getWidth() / 2, base.getCenter().y + base.getHeight());

   var diameter  = 20;
   var gunLength = 30;

   arc(base.getCenter().x, base.getCenter().y, diameter, diameter, 3.1415, 0);

   push();
   translate(base.getCenter().x, base.getCenter().y);
   rotate(getRotation(base));
   strokeWeight(3);
   line(0, 0, 0, -gunLength);
   pop();
};

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
      drawBase(base);
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
   var startPosition = {x: nearestBase.getCenter().x, y: nearestBase.getCenter().y};
   var endPosition   = {x: mouseX,              y: mouseY};
   missiles.push(new Missile(startPosition, endPosition));
}