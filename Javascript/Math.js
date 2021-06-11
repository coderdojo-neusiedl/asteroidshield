var getDistance = function getDistance(pos1, pos2) {
   return Math.pow(Math.pow(pos1.x - pos2.x, 2) + Math.pow(pos1.y - pos2.y, 2), 0.5);
};

var getRotation = function getRotation(center) {
   var distanceX = mouseX - center.x;
   var distanceY = Math.max(0, center.y - mouseY);
   var rotation  = Math.atan(distanceX / distanceY);
   return rotation;
};