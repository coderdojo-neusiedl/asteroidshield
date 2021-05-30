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

   this.draw = function draw() {
      var currentTime = Date.now();
      var millisSinceLastDraw = currentTime - lastDrawTime;
      
      var distance = getDistance({x: x, y: y}, endPosition);
      if (lastDistance === undefined || distance < lastDistance) {
         drawMissileImage();
         x = x + (xIncrementPerMilli * millisSinceLastDraw);
         y = y + (yIncrementPerMilli * millisSinceLastDraw);
         lastDistance = distance;
      } else {
         missiles = missiles.filter(missile => missile.id !== this.id);
      }

      lastDrawTime = currentTime;
   };
};