lib.getSnapSetting = function() {
  var viewport = SV.getMainEditor().getNavigation();
  var blicks = 0;
  for (var i = 10000000; blicks === 0; i+= 5000000) {
    blicks = viewport.snap(blicks + i);
  }
  return blicks;
}