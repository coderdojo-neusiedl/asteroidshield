var Base = function Base(center, width, height) {

   var TOTAL_MISSILE_COUNT = 5;
   var count               = TOTAL_MISSILE_COUNT;

   this.getTotalMissileCount = function getTotalMissileCount() {
      return TOTAL_MISSILE_COUNT;
   };

   this.getCenter = function getCenter() {
      return center;
   };

   this.getWidth = function getWidth() {
      return width;
   };

   this.getHeight = function getHeight() {
      return height;
   };

   this.getBuildingVertices = function getBuildingVertices() {
      return [ {x: center.x - width / 2, y: center.y + height},
               {x: center.x - width / 2, y: center.y},
               {x: center.x + width / 2, y: center.y},
               {x: center.x + width / 2, y: center.y + height}];
   };

   this.draw = function draw() {         
      var diameter  = 20;
      var gunLength = 30;
   
      arc(center.x, center.y, diameter, diameter, 3.1415, 0);
   
      push();
      translate(center.x, center.y);
      rotate(getRotation(center));
      strokeWeight(3);
      line(0, 0, 0, -gunLength);
      pop();

      textFont('Courier New');
      textSize(20);
      var withOfText = textWidth(count);
      text(count, center.x - withOfText / 2, center.y + 20);
   };
   
   this.fireTo = function fireTo(endPosition) {
      var missile;
      if(count > 0) {
         count--;
         missile = new Missile(center, endPosition);
      }
      return missile;
   };
};