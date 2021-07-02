var bases = [];
var missiles = [];
var asteroids = [];
var vertices = [];
var polygonVertices = [];
var asteroidCount = 0;
var asteroidInterval;
var totalAsteroidCount;

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
   var groundY = height * 0.95;
   var x       = 0;
   var y       = groundY;

   if (vertices.length === 0) {
      vertices.push({x: 0, y: groundY});
      bases.forEach(base => {
         var buildingVertices = base.getBuildingVertices();
         buildingVertices.forEach(v => vertices.push(v));
      });
      vertices.push({x: width, y: groundY});

      vertices.forEach(v => polygonVertices.push(v));
      polygonVertices.push({x: width, y: height});
      polygonVertices.push({x: 0,     y: height});
   }

   stroke('black');
   fill('black');
  
   beginShape();
   polygonVertices.forEach(v => vertex(v.x, v.y));
   endShape(CLOSE);

   stroke('yellow');
   fill('yellow');
   strokeWeight(3);
   
   for(var i = 1; i < vertices.length; i++) {
      var from = vertices[i - 1];
      var to   = vertices[i];
      line(from.x, from.y, to.x, to.y)
   }

   bases.forEach(base => base.draw());
};

var getRandomX = function getRandomX() {
   return width * 0.05 + Math.random() * width * 0.9;
}

var deleteAsteroid = function deleteAsteroid(idToDelete) {
   asteroids = asteroids.filter(asteroid => asteroid.id !== idToDelete);
};

var createAsteroid = function createAsteroid() {
   if (asteroidCount >= totalAsteroidCount) {
      clearInterval(asteroidInterval);
   } else {
      var startX = getRandomX();
      var endX   = getRandomX();
      asteroids.push(new Asteroid({x: startX, y: 50}, {x: endX, y: height}, deleteAsteroid));
      asteroidCount++;
   }
};

var getStruckAsteroids = function getStruckAsteroids() {
   var explodingMissiles = missiles.filter(missile => missile.isExploding());
   explodingMissiles.forEach(missile => {
      var missileExplosionRadius = missile.getExplosionRadius();
      var missilePosition        = missile.getPosition();
      asteroids.filter(asteroid => asteroid.isFlying()).forEach(asteroid => {
         var asteroidPosition = asteroid.getPosition();
         var distance = dist(missilePosition.x, missilePosition.y, asteroidPosition.x, asteroidPosition.y);
         if (distance <= missileExplosionRadius) {
            asteroid.explode();
         }
      });
   });
};

function setup() {
   createCanvas(600, 600);
   var leftBase  = new Base({x: width * 0.15, y: height * 0.85}, width * 0.1,  height * 0.05);
   var rightBase = new Base({x: width * 0.90, y: height * 0.85}, width * 0.15, height * 0.05);
   bases = [leftBase, rightBase];
   totalAsteroidCount = 0;
   bases.forEach(base => totalAsteroidCount += base.getTotalMissileCount());
   asteroidInterval = setInterval(createAsteroid, 1500);
};

function draw() {
   background('black');
   getStruckAsteroids();
   asteroids.forEach(asteroid => asteroid.draw());
   missiles.forEach(missile => missile.draw());
   drawGroundScene();
};

function mouseClicked() {
   var nearestBase = getNearestBase(mouseX);
   var endPosition = {x: mouseX, y: mouseY};
   var missile = nearestBase.fireTo(endPosition);
   if (missile) {
      missiles.push(missile);
   }
}