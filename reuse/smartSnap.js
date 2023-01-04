lib.smartSnap = function(position, maxSnapDistance) {
  var viewport = SV.getMainEditor().getNavigation();
  var newPos = viewport.snap(position);
  if (Math.abs(position - newPos) < maxSnapDistance) {
    return newPos;
  }
  return position;
};