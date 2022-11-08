/*
  note: Note,
  args: {
    OFFSET_H: blicks,
    OFFSET_V: pitch,
    SCROLL_H: bool,
    SCROLL_V: bool
  }
*/
lib.scrollToNote = function(note, args) {
  var OFFSET_H = args.OFFSET_H || 0;
  var OFFSET_V = args.OFFSET_V || -6;
  var SCROLL_H = (typeof(args.SCROLL_H) !== 'undefined') ? args.SCROLL_H : true;
  var SCROLL_V = (typeof(args.SCROLL_V) !== 'undefined') ? args.SCROLL_V : true;

  var viewport = SV.getMainEditor().getNavigation();

  if (SCROLL_H) {
    var onset = note.getOnset();
    var distanceToMiddle = (note.getEnd() - onset) / 2;
    var viewportRange = viewport.getTimeViewRange();
    var viewportWidth = viewportRange[1] - viewportRange[0];
    var targetLeft = onset + distanceToMiddle - (viewportWidth / 2);
    if (targetLeft < 0) {
      targetLeft = 0;
    }
    viewport.setTimeLeft(targetLeft + OFFSET_H);
  }

  if (SCROLL_V) {
    viewport.setValueCenter(note.getPitch() + OFFSET_V);
  }
}