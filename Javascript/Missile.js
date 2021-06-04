var missileImage;

var createMissileImage = function createMissileImage() {
   var bitmap = [ [0, 0, 0, 0, 1, 0, 0, 0, 0],
                  [0, 0, 0, 1, 1, 1, 0, 0, 0],
                  [0, 0, 1, 0, 1, 0, 1, 0, 0],
                  [0, 0, 0, 0, 1, 0, 0, 0, 0],
                  [0, 0, 0, 0, 1, 0, 0, 0, 0],
                  [0, 0, 0, 0, 1, 0, 0, 0, 0],
                  [0, 0, 0, 0, 1, 0, 0, 0, 0],
                  [0, 0, 0, 1, 1, 1, 0, 0, 0],
                  [0, 0, 1, 1, 1, 1, 1, 0, 0]];
   
   missileImage = createImage(9, 9);
   missileImage.loadPixels();

   var yellow      = color(255, 255,   0, 255);
	var transparent = color(255, 255, 255, 0);
			
   for (var x = 0; x < missileImage.width; x++) {
      for (var y = 0; y < missileImage.height; y++) {
			var colorToUse = (bitmap[y][x] === 0) ? transparent : yellow;
         missileImage.set(x, y, colorToUse);
      }
   }

   missileImage.updatePixels();
};

var Missile = function Missile(startPosition, endPosition) {
   var movementPerSecond = 150;
   var millisPerSecond   = 1000;
   var x = startPosition.x;
   var y = startPosition.y;
   var distance = getDistance(startPosition, endPosition);
   var flightTimeInMillis = (distance / movementPerSecond) * millisPerSecond;
   var distanceX = endPosition.x - startPosition.x;
	var distanceY = endPosition.y - startPosition.y;
	var xIncrementPerMilli = distanceX / flightTimeInMillis;
	var yIncrementPerMilli = distanceY / flightTimeInMillis;
	var heading = Math.atan(distanceX / Math.max(0, (distanceY * -1)));
   
   var lastDistance;
   var lastDrawTime = Date.now();
   var state = 'flying';
   var explosionDiameter = 2;
   var explosionColor = {r: 255, g: 156, b:12};

   this.id = nextMissileId++;
   
   if (missileImage === undefined) {
      createMissileImage();
   }

   var drawMissileImage = function drawMissileImage() {
		push();
		translate(x, y);
		rotate(heading);
		image(missileImage, -4, -4);
		pop();
   };

   var drawCross = function drawCross() {
      var width = 16;
      strokeWeight(1);
      line(endPosition.x - width / 2, endPosition.y,             endPosition.x + width / 2, endPosition.y);
      line(endPosition.x,             endPosition.y - width / 2, endPosition.x,             endPosition.y + width / 2);
      noFill();
      arc(endPosition.x, endPosition.y, width, width, 0, 2 * 3.1415);
   };

   var drawTarget = function drawTarget() {
      drawCross();
   };

   var drawExplosion = function drawExplosion() {
      var colorToUse = color(explosionColor.r, explosionColor.g, explosionColor.b);
      stroke(colorToUse);
      fill(colorToUse);
      arc(endPosition.x, endPosition.y, explosionDiameter, explosionDiameter, 0, 2 * 3.1415);
      if (explosionDiameter > 40) {
         state = 'delete';
      }
      explosionColor.r = explosionColor.r - 15;
      explosionColor.g = explosionColor.g + 15;
      explosionDiameter = explosionDiameter * 2;
   };

   this.draw = function draw() {
      var currentTime = Date.now();
      var millisSinceLastDraw = currentTime - lastDrawTime;
      
      var distance = getDistance({x: x, y: y}, endPosition);
      if (state === 'flying' && (lastDistance === undefined || distance < lastDistance)) {
         drawMissileImage();
         drawTarget();
         x = x + (xIncrementPerMilli * millisSinceLastDraw);
         y = y + (yIncrementPerMilli * millisSinceLastDraw);
         lastDistance = distance;
      } else {
         if (state === 'flying') {
            state = 'exploding';
         }
         if (state === 'exploding') {
            drawExplosion();
         }
         if (state === 'delete') {
            missiles = missiles.filter(missile => missile.id !== this.id);
         }
      }

      lastDrawTime = currentTime;
   };
};