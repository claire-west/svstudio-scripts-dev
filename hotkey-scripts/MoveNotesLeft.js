// moves a selection left based on the current snap setting (or a specified distance)
// recommended hotkey: left arrow
var SCRIPT_TITLE = "Move Notes Left";

// move distance based on current snap setting
var MOVE_BY_SNAP_SETTING = true;

// snap the final note position to the grid
var SNAP_FINAL_POSITION = true;

// if SNAP_FINAL_POSITION is true, only snap the final position if it is close to the grid
// this is helpful if a note is intentionally offset by 25-50% of the current snap setting, so as not to override the user's timing changes
// for example, a note with 1/32 offset on a 1/8 or 1/16 grid is assumed to be intentional and will not snap to the larger grid, but a 1/32 offset on a 1/4 grid will snap
// to always snap to grid, set it to 0.51
// to never snap to grid, set it to 0 (or set SNAP_FINAL_POSITION to false)
// to manually snap to the grid, use the built-in "Snap to Grid" function under the "Modify" menu
var SNAP_THRESHOLD = 0.25;

// if MOVE_BY_SNAP_SETTING is false, always move notes the specified distance
// to move 1 measure at a time, change this to 4
// to move 1/8 at a time, set it to 0.5
var QUARTERS_TO_MOVE = 1;

function getClientInfo() {
  return {
    "name": SV.T(SCRIPT_TITLE),
    "category": "Claire's Scripts - Hotkey Scripts",
    "author": "https://github.com/claire-west/svstudio-scripts",
    "versionNumber": 3,
    "minEditorVersion": 65537
  }
}

function move() {
  var selection = SV.getMainEditor().getSelection();
  var selectedNotes = selection.getSelectedNotes();
  if (selectedNotes.length == 0) {
    return;
  }

  var shiftBy;
  var snapSetting = lib.getSnapSetting();
  if (MOVE_BY_SNAP_SETTING) {
    shiftBy = snapSetting * -1;
  } else {
    shiftBy = QUARTERS_TO_MOVE * SV.QUARTER * -1;
  }

  var snapDiff = 0;
  for (var i = 0; i < selectedNotes.length; i++) {
    var currOnset = selectedNotes[i].getOnset();
    var newOnset = currOnset + shiftBy;

    // only perform snapping on the first note in selection, adjust all others by same amount
    if (i === 0 && SNAP_FINAL_POSITION) {
      var snappedOnset = lib.smartSnap(newOnset, snapSetting * SNAP_THRESHOLD);
      snapDiff = snappedOnset - newOnset;
    }

    if (newOnset < 0) {
      newOnset = 0;
    }
    selectedNotes[i].setOnset(newOnset + snapDiff);
  }
}

function main() {
  move();
  SV.finish();
}

@@getSnapSetting
@@smartSnap