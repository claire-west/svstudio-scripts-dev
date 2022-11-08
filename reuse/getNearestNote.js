/*
  selection: TrackInnerSelectionState,
  currentGroup: NoteGroup,
  backward: bool,
  wrap: bool
*/
lib.getNearestNote = function(selection, currentGroup, backward, wrap) {
  var selectedNotes = selection.getSelectedNotes();
  var noteCount = currentGroup.getNumNotes();

  if (selectedNotes.length > 0) {
    return selectedNotes[0];
  } else if (backward) {
    // return first note prior to playhead position
    var timeAxis = SV.getProject().getTimeAxis();
    var playheadSeconds = SV.getPlayback().getPlayhead();
    var playhead = timeAxis.getBlickFromSeconds(playheadSeconds);

    for (var i = noteCount - 1; i >= 0; i--) {
      var note = currentGroup.getNote(i);
      if (note.getOnset() < playhead) {
        return note;
      }
    }
    // no notes before playhead, return last note if wrapping or abort if not
    if (wrap) {
      return currentGroup.getNote(noteCount - 1);
    }
  } else {
    // return first note following playhead position
    var timeAxis = SV.getProject().getTimeAxis();
    var playheadSeconds = SV.getPlayback().getPlayhead();
    var playhead = timeAxis.getBlickFromSeconds(playheadSeconds);

    for (var i = 0; i < noteCount; i++) {
      var note = currentGroup.getNote(i);
      if (note.getOnset() > playhead) {
        return note;
      }
    }
    // no notes after playhead, return first note if wrapping or abort if not
    if (wrap) {
      return currentGroup.getNote(0);
    }
  }
  return null;
}