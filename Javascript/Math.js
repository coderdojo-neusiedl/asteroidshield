var getDistance = function getDistance(pos1, pos2) {
   return Math.pow(Math.pow(pos1.x - pos2.x, 2) + Math.pow(pos1.y - pos2.y, 2), 0.5);
};

var getRotation = function getRotation(base) {
   var distanceX = mouseX - base.getCenter().x;
   var distanceY = Math.max(0, base.getCenter().y - mouseY);
   var rotation  = Math.atan(distanceX / distanceY);
   return rotation;
};